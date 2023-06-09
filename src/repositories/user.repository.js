import db from '../database/database.connection.js';

async function findUser(email) {
  const { rows } = await db.query('SELECT * FROM users WHERE email=$1;', [email]);
  return rows[0];
}

async function createUser(name, email, photo, passwordHash) {
  await db.query(`
    INSERT INTO users (name, email, photo, password)
    VALUES ($1, $2, $3, $4);
    `, [name, email, photo, passwordHash]);
}

async function findSession(userId) {
  const { rows } = await db.query('SELECT * FROM sessions WHERE "userId"=$1;', [userId]);
  return rows[0];
}

async function createSession(userId) {
  const { rows } = await db.query(`
    INSERT INTO sessions ("userId")
    VALUES ($1);`, [userId]);
  return rows[0];
}

async function deleteSession(userId) {
  await db.query('DELETE FROM sessions WHERE "userId"=$1;', [userId]);
}

async function followUser(followerId, followingId) {
  await db.query('INSERT INTO follows ("followerId", "followingId") VALUES ($1, $2);', [followerId, followingId]);
}

async function unfollowUser(unfollowerId, unfollowingId) {
  await db.query('DELETE FROM follows WHERE "followerId"=$1 AND "followingId"=$2;', [unfollowerId, unfollowingId]);
}

async function isFollowing(followerId, followingId) {
  const { rows } = await db.query('SELECT * FROM follows WHERE "followerId"=$1 AND "followingId"=$2;', [followerId, followingId]);
  return rows[0];
}

async function verifyFollows(userId) {
  const { rows } = await db.query('SELECT * FROM follows WHERE "followerId"=$1;', [userId]);
  return rows;
}

const userRepository = {
  findUser,
  createUser,
  findSession,
  createSession,
  deleteSession,
  followUser,
  unfollowUser,
  isFollowing,
  verifyFollows,
};

export default userRepository;
