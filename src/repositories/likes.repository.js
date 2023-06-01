import db from '../database/database.connection.js';

async function add(postId, userId) {
  const { rows } = await db.query(
    `
    INSERT INTO likes ("postId", "userId")
    VALUES ($1, $2);
    `,
    [postId, userId],
  );

  return rows[0];
}

async function retrieveLatest(postId, quantity, userId) {
  const { rows } = await db.query(
    `
    SELECT users.id AS "userId", users.name as "userName" FROM users
    JOIN likes ON likes."userId" = users.id
    WHERE likes."postId" = $1 AND likes."userId" <> $3
    GROUP BY users.id, users.name, likes.id ORDER BY likes.id DESC LIMIT $2;
    `,
    [postId, quantity, userId],
  );

  return rows;
}

async function retrieveTotal(postId) {
  const { rows } = await db.query(
    `
    SELECT COUNT("userId") AS "totalLikes" FROM likes WHERE "postId" = $1;
    `,
    [postId],
  );

  return rows[0].totalLikes;
}

async function validateUserByPost(postId, userId) {
  const { rows } = await db.query(
    `
    SELECT EXISTS (SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2);
    `,
    [postId, userId],
  );

  return rows[0].exists;
}

const likesRepository = {
  add,
  retrieveLatest,
  retrieveTotal,
  validateUserByPost,
};

export default likesRepository;
