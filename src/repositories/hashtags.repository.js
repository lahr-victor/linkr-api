import db from '../database/database.connection.js';

async function retrievePostsBy(hashtag) {
  const { rows } = await db.query(
    `
    SELECT 
      posts.id,
      posts.description,
      posts.url,
      users.id AS "userId",
      users.name AS "userName",
      users.photo AS "userImageUrl"      
    FROM posts 
    JOIN users ON users.id = posts."userId"
    JOIN hashtags ON hashtags."postId" = posts.id
    WHERE hashtags.hashtag = $1
    ORDER BY posts."createdAt" DESC;
    `,
    [hashtag],
  );

  return rows;
}

async function validate(hashtag) {
  const { rows } = await db.query(
    `
    SELECT EXISTS (SELECT * FROM hashtags WHERE hashtag = $1);
    `,
    [hashtag],
  );
  return rows[0].exists;
}

const hashtagsRepository = {
  retrievePostsBy,
  validate,
};

export default hashtagsRepository;
