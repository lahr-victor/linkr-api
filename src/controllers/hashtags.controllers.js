import hashtagsRepository from '../repositories/hashtags.repository.js';

async function retrievePosts(req, res) {
  const { hashtag } = req.params;

  const valid = await hashtagsRepository.validate(hashtag);
  if (!valid) return res.sendStatus(404);

  try {
    const posts = await hashtagsRepository.retrievePostsBy(hashtag);

    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const hashtagsControllers = { retrievePosts };

export default hashtagsControllers;
