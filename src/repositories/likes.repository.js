import db from '../database/database.connection.js';

async function retrieveTotal(postId) {
  const { rows } = await db.query(
    'SELECT COUNT("userId") AS "totalLikes" FROM likes WHERE "postId" = $1;',
    [postId],
  );
  return rows;
}

const likesRepository = { retrieveTotal };

export default likesRepository;
