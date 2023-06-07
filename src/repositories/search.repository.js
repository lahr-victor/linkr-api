import db from '../database/database.connection.js';

async function searchUserName(name, userId) {
  const pattern = `%${name}%`;

  const users = await db.query(
    `
    SELECT
      users.id,
      users.name,
      users.photo,
      follows."followingId"
    FROM
      users
    LEFT JOIN
      follows
    ON
      users.id = follows."followerId" AND follows."followingId" = $1
    WHERE
      users.name
    ILIKE 
      $2
    ORDER BY
      "followingId"
    ;`,
    [userId, pattern],
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
