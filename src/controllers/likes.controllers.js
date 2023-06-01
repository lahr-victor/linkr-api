import likesRepository from '../repositories/likes.repository.js';
import postsRepository from '../repositories/posts.repository.js';

async function retrieveLikes(req, res) {
  const { userId } = res.locals.session;

  const postId = parseInt(req.params.id, 10);
  if (Number.isNaN(postId)) return res.sendStatus(400);

  const post = await postsRepository.find(postId);
  if (!post) return res.sendStatus(404);

  const namedLikes = 2;

  try {
    const isLiked = await likesRepository.validateUserByPost(postId, userId);

    const latestLikes = await likesRepository.retrieveLatest(postId, namedLikes, userId);

    const totalLikes = await likesRepository.retrieveTotal(postId);

    return res.status(200).send({ isLiked, latestLikes, totalLikes });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function updateLikes(req, res) {
  const { userId } = res.locals.session;

  const postId = parseInt(req.params.id, 10);
  if (Number.isNaN(postId)) return res.sendStatus(400);

  const post = await postsRepository.find(postId);
  if (!post) return res.sendStatus(404);

  try {
    const isLiked = await likesRepository.validateUserByPost(postId, userId);

    if (isLiked) {
      await likesRepository.remove(postId, userId);
    } else {
      await likesRepository.add(postId, userId);
    }

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const likesControllers = { retrieveLikes, updateLikes };

export default likesControllers;
