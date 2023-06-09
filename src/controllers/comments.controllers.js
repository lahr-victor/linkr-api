import commentsRepository from '../repositories/comments.repository.js';
import postsRepository from '../repositories/posts.repository.js';

async function addComment(req, res) {
  const { text } = req.body;
  const { userId } = res.locals.session;

  const postId = parseInt(req.params.id, 10);
  if (Number.isNaN(postId)) return res.sendStatus(400);

  const valid = await postsRepository.validate(postId);
  if (!valid) return res.sendStatus(404);

  try {
    await commentsRepository.add(
      postId,
      text,
      userId,
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function retrieveComments(req, res) {
  const { userId } = res.locals.session;

  const postId = parseInt(req.params.id, 10);
  if (Number.isNaN(postId)) return res.sendStatus(400);

  const valid = await postsRepository.validate(postId);
  if (!valid) return res.sendStatus(404);

  try {
    const comments = await commentsRepository.retrieve(postId, userId);

    return res.status(200).send(comments);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const commentsControllers = { addComment, retrieveComments };

export default commentsControllers;
