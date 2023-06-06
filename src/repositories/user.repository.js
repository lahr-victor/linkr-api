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

async function followUser(followingId, followerId) {
  await db.query('INSERT INTO follows ("followingId", "followerId") VALUES ($1, $2);', [followingId, followerId]);
}

async function unfollowUser(unfollowingId, unfollowerId) {
  await db.query('DELETE FROM follows WHERE "followingId"=$1 AND "followerId"=$2;', [unfollowingId, unfollowerId]);
}

const userRepository = {
  findUser,
  createUser,
  findSession,
  createSession,
  deleteSession,
  followUser,
  unfollowUser,
};

export default userRepository;
