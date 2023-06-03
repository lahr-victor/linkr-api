import searchRepository from '../repositories/search.repository.js';

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await searchRepository.searchUserId(id);
    res.status(200).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function searchUsersByName(req, res) {
  const { name } = req.query;
  try {
    const users = await searchRepository.searchUserName(name);
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function searchPostsById(req, res) {
  const { id } = req.params;
  const { limit } = req.query;
  try {
    const post = await searchRepository.searchPostsById(id, { limit: Number(limit) || 20 });
    res.status(200).send(post);
  } catch (error) {
    res.sendStatus(500);
  }
}

const searchControllers = {
  getUserById,
  searchUsersByName,
  searchPostsById,
};

export default searchControllers;
