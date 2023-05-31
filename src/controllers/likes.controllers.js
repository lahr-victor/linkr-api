import likesRepository from '../repositories/likes.repository.js';
import postsRepository from '../repositories/posts.repository.js';

async function retrieveLikes(req, res) {
  const postId = parseInt(req.params.id, 10);
  if (Number.isNaN(postId)) return res.sendStatus(400);

  const post = await postsRepository.find(postId);
  if (!post) return res.sendStatus(404);

  try {
    const totalLikes = await likesRepository.retrieveTotal(postId);
    return res.status(200).send(totalLikes);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const likesControllers = { retrieveLikes };

export default likesControllers;
