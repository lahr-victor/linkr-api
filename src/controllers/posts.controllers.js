import postsRepository from '../repositories/posts.repository.js';

function extractHashtags(text) {
  if (!text) return [];
  return Array.from(new Set(text.match(/(?<=#)\S+/g)));
}

async function createNewPost(req, res) {
  const { description } = req.body;
  try {
    const hashtags = extractHashtags(description);
    const post = await postsRepository.create({
      ...req.body,
      userId: 1,
      hashtags,
    });
    res.status(201).send(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function getPosts(req, res) {
  const { limit } = req.query;
  try {
    const posts = await postsRepository.findAll({ limit: Number(limit) || 20 });
    res.send(posts);
  } catch (err) {
    res.sendStatus(500);
  }
}

const postsControllers = { createNewPost, getPosts };

export default postsControllers;
