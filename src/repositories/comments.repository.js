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

const commentsRepository = {
  add,
};

export default commentsRepository;
