import db from '../database/database.connection.js';

async function insertIntoHashtags({ hashtags, postId }) {
  if (!Array.isArray(hashtags) || hashtags.length === 0) return [];

  const createdTags = [];

  for (const tag of hashtags) {
    const { rows } = await db.query(
      `INSERT INTO hashtags("postId",hashtag)
      VALUES(${postId},$1) RETURNING *;`,
      [tag],
    );
    createdTags.push(rows[0]);
  }

  return createdTags;
}

async function insertIntoPosts({ url, description, userId }) {
  const { rows } = await db.query(
    `
    INSERT INTO posts(url,description,"userId") 
    VALUES($1,$2,$3) RETURNING *;`,
    [url, description, userId],
  );

  return rows[0];
}

async function create({
  url,
  description,
  userId,
  hashtags,
}) {
  const post = await insertIntoPosts({ url, description, userId });
  const hashtagsCreated = await insertIntoHashtags({
    hashtags,
    postId: post.id,
  });
  return { post, hashtags: hashtagsCreated };
}

async function findAll({ limit = 20 }) {
  const { rows } = await db.query(
    'SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT $1;',
    [limit],
  );
  return rows;
}

const postsRepository = { create, findAll };

export default postsRepository;
