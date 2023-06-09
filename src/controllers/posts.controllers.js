import postsRepository from '../repositories/posts.repository.js';

function extractHashtags(text) {
  if (!text) return [];
  return Array.from(new Set(text.match(/(?<=#)\S+/g)));
}

async function createNewPost(req, res) {
  const { description } = req.body;
  const { userId } = res.locals.session;
  try {
    const hashtags = extractHashtags(description);
    const post = await postsRepository.create({
      ...req.body,
      userId,
      hashtags,
    });
    res.status(201).send(post);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function getPosts(req, res) {
  const { limit, offset } = req.query;
  const { userId } = res.locals.session;
  try {
    const posts = await postsRepository.findAllByFollow({
      limit,
      offset,
      userId,
    });
    res.send(posts);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function deletePost(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals.session;
  try {
    const postFound = await postsRepository.find({ postId });

    if (!postFound) return res.sendStatus(404);
    if (postFound.userId !== Number(userId)) return res.sendStatus(401);

    await postsRepository.deleteById({ postId });
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
}

async function updatePost(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals.session;
  const { url, description } = req.body;
  try {
    const postFound = await postsRepository.find({ postId });

    if (!postFound) return res.sendStatus(404);
    if (postFound.userId !== Number(userId)) return res.sendStatus(401);

    const oldDescription = postFound.description;

    const hashtags = extractHashtags(description);
    const newHashtags = hashtags.filter(
      (hashtag) => !oldDescription?.includes(hashtag),
    );

    const updatedPost = await postsRepository.update({
      postId,
      url,
      description,
      hashtags: newHashtags,
    });
    return res.send(updatedPost);
  } catch (err) {
    return res.sendStatus(500);
  }
}

async function createNewRepost(req, res) {
  const { userId } = res.locals.session;
  const { postId } = req.params;
  try {
    const postFound = await postsRepository.find({ postId });

    if (!postFound) return res.sendStatus(404);
    if (postFound.userId === Number(userId)) {
      return res.status(401).send('you cannot share your own post');
    }

    const repost = await postsRepository.createRepost({
      userId,
      postId,
    });
    return res.status(201).send(repost);
  } catch (err) {
    if (err.message?.includes('duplicate key')) {
      return res.status(409).send('you already shared this post');
    }
    return res.sendStatus(500);
  }
}

async function latestPostsUpdate(req, res) {
  const { createdAt } = req.query;
  const { userId } = res.locals.session;
  try {
    const posts = await postsRepository.findLatestPosts({
      userId,
      createdAt,
    });
    res.send(posts);
  } catch (err) {
    res.sendStatus(500);
  }
}

const postsControllers = {
  createNewPost,
  getPosts,
  deletePost,
  updatePost,
  createNewRepost,
  latestPostsUpdate,
};

export default postsControllers;
