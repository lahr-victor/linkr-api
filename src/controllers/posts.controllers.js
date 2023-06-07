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
  try {
    const posts = await postsRepository.findAll({
      limit,
      offset,
    });
    res.send(posts);
  } catch (err) {
    console.log(err);
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
  try {
    const postFound = await postsRepository.find({ postId });

    if (!postFound) return res.sendStatus(404);
    if (postFound.userId !== Number(userId)) return res.sendStatus(401);

    const updatedPost = await postsRepository.update({ postId, ...req.body });
    return res.send(updatedPost);
  } catch (err) {
    return res.sendStatus(500);
  }
}

const postsControllers = {
  createNewPost,
  getPosts,
  deletePost,
  updatePost,
};

export default postsControllers;
