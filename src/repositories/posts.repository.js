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
    `
    SELECT 
      posts.id, 
      posts.url, 
      posts.description,
      posts."createdAt",
      users.name AS "userName", 
      users.photo AS "userImageUrl",
      users.id AS "userId",
      COUNT(likes."postId") AS "totalLikes"
    FROM posts
    LEFT JOIN likes ON posts.id=likes."postId"
    JOIN users ON users.id=posts."userId"
    GROUP BY 
      posts.id, 
      posts.url, 
      posts.description,
      posts."createdAt",
      users.name, 
      users.photo,
      users.id
    ORDER BY posts."createdAt" DESC LIMIT $1;
    `,
    [limit],
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
  findAll,
  deleteById,
  update,
  find,
  validate,
};

export default postsRepository;
