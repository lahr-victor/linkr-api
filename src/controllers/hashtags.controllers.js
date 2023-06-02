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

async function retrieveTrending(req, res) {
  try {
    const limit = 10;
    const hashtags = await hashtagsRepository.retrieveMostUsed(limit);

    return res.status(200).send(hashtags);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const hashtagsControllers = { retrievePosts, retrieveTrending };

export default hashtagsControllers;
