import db from '../database/database.connection.js';

async function retrieveMostUsed(limit) {
  const { rows } = await db.query(
    `
    SELECT hashtag, COUNT(hashtag) AS "quantity" FROM hashtags
    WHERE "createdAt" >= NOW() - INTERVAL '1 DAY'
    GROUP BY hashtag ORDER BY quantity DESC, hashtag LIMIT $1;
    `,
    [limit],
  );

  return rows;
}

async function retrievePostsBy({ hashtag, limit = 20, offset = 0 }) {
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
    JOIN hashtags ON hashtags."postId"=pr.id
    WHERE hashtags.hashtag=$1
    ORDER BY "createdAt" DESC LIMIT $2 OFFSET $3;
    `,
    [hashtag, limit, offset],
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
  retrieveMostUsed,
  retrievePostsBy,
  validate,
};

export default hashtagsRepository;
