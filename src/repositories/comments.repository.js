import db from '../database/database.connection.js';

async function add(postId, text, userId) {
  const { rows } = await db.query(
    `
      INSERT INTO comments ("postId", text, "userId")
      VALUES ($1, $2, $3);
    `,
    [postId, text, userId],
  );

  return rows[0];
}

async function retrieve(postId) {
  const { rows } = await db.query(
    `
    SELECT 
      comments.id,
      comments.text, 
      users.id AS "userId",
      users.name AS "userName", 
      users.photo AS "UserPicture",
      EXISTS (
        SELECT * FROM posts 
        WHERE posts."userId" = comments."userId" AND posts.id = $1
      ) AS "isAuthor",
      EXISTS (
        SELECT * FROM follows 
        JOIN posts ON posts.id = $1
        WHERE follows."followerId" = comments."userId" AND follows."followingId" = posts."userId"
      ) AS "isFollower"
    FROM comments
    JOIN users ON users.id = comments."userId"
    WHERE comments."postId" = $1;
    `,
    [postId],
  );

  return rows;
}

const commentsRepository = {
  add,
  retrieve,
};

export default commentsRepository;
