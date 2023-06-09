import db from '../database/database.connection.js';

async function searchUserName(name, userId) {
  const pattern = `%${name}%`;

  const users = await db.query(
    `
    SELECT
      users.id,
      users.name,
      users.photo,
      follows."followerId"
    FROM
      users
    LEFT JOIN
      follows
    ON
      users.id = follows."followingId" AND follows."followerId" = $1
    WHERE
      users.name
    ILIKE 
      $2
    ORDER BY
      "followerId"
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

async function searchPostsById({ userId, limit = 20, offset = 0 }) {
  const { rows } = await db.query(
    `
    SELECT 
      pr.id, 
      pr.description, 
      pr.url, 
      pr."userName", 
      pr."userImageUrl", 
      pr."userId",
      pr."repostUserId",
      pr."repostUserName",
      CAST(pr."repostCount" AS INTEGER),
      pr."createdAt"
    FROM posts_and_reposts pr 
    WHERE COALESCE(pr."repostUserId",pr."userId")=$1
    ORDER BY "createdAt" DESC LIMIT $2 OFFSET $3;
    ;`,
    [userId, limit, offset],
  );
  return rows;
}

const searchRepository = {
  searchUserName,
  searchUserId,
  searchPostsById,
};

export default searchRepository;
