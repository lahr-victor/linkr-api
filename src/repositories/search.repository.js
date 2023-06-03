import db from '../database/database.connection.js';

async function searchUserName(name) {
  const pattern = `%${name}%`;

  const users = await db.query(
    'SELECT id, name, photo FROM users WHERE name ILIKE $1;',
    [pattern],
  );

  return users.rows;
}

async function searchUserId(id) {
  const { rows } = await db.query(
    `
      SELECT
        users.id, users.name, users.photo
        FROM
        users
        WHERE
        users.id = $1
      ;`,
    [id],
  );
  return rows[0];
}

async function searchPostsById(id, { limit = 20 }) {
  const { rows } = await db.query(
    `
      SELECT
      posts.id,
      posts.description,
      posts.url, 
      users.name AS "userName",
      users.photo AS "userImageUrl",
      users.id AS "userId"
        FROM
        posts
        JOIN users ON posts."userId" = users.id
        WHERE
        posts."userId" = $1
        ORDER BY posts."createdAt"
        DESC LIMIT $2
      ;`,
    [id, limit],
  );
  return rows;
}

const searchRepository = {
  searchUserName,
  searchUserId,
  searchPostsById,
};

export default searchRepository;
