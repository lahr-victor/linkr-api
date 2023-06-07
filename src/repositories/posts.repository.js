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

async function findAllByFollow({ limit = 20 }, userId) {
  const { rows } = await db.query(
    `SELECT 
      posts.id,
      posts.description,
      posts.url, 
      users.name AS "userName",
      users.photo AS "userImageUrl",
      users.id AS "userId",
      follows."followingId"
    FROM posts
    JOIN users ON users.id=posts."userId" 
    JOIN follows ON posts."userId" = follows."followerId" AND follows."followingId" = $1
    ORDER BY posts."createdAt" DESC LIMIT $2;`,
    [userId, limit],
  );
  return rows;
}

async function find({ postId }) {
  const { rows } = await db.query('SELECT * FROM posts WHERE id=$1;', [postId]);
  return rows[0];
}

async function deleteById({ postId }) {
  await db.query('DELETE FROM posts WHERE id = $1;', [postId]);
}

async function update({ postId, url, description }) {
  const { rows } = await db.query(
    'UPDATE posts SET url=$1, description=$2 WHERE id=$3 RETURNING *;',
    [url, description, postId],
  );
  return rows[0];
}

async function validate(postId) {
  const { rows } = await db.query(
    `
    SELECT EXISTS (SELECT * FROM posts WHERE id = $1);
    `,
    [postId],
  );
  return rows[0].exists;
}

const postsRepository = {
  create,
  findAllByFollow,
  deleteById,
  update,
  find,
  validate,
};

export default postsRepository;
