import db from '../database/database.connection.js';

async function searchUserName(name) {
  const ilikePattern = `%${name}%`;

  const { rows } = await db.query(
    `
      SELECT
        users.id, users.name, users.photo
        FROM
        users
        WHERE
        users.name ILIKE $1
      ;`,
    [ilikePattern],
  );
  return rows;
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
        posts.id, posts.url, posts.description, posts."userId", users.name, users.photo
        FROM
        posts
        JOIN users ON posts."userId" = users.id
        WHERE
        posts."userId" = $1
        ORDER BY "createdAt"
        DESC LIMIT $2
      ;`,
    [id, limit],
  );
  return rows;
}

const searchRepository = {
  searchUserName, searchUserId, searchPostsById,
};

export default searchRepository;
