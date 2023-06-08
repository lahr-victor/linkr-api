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

async function findAll({ limit = 20, offset = 0 }) {
  const { rows } = await db.query(
    `SELECT 
      posts.id,
      posts.description,
      posts.url, 
      users.name AS "userName",
      users.photo AS "userImageUrl",
      users.id AS "userId"
    FROM posts JOIN users ON users.id=posts."userId" 
    ORDER BY posts."createdAt" DESC LIMIT $1 OFFSET $2;`,
    [limit, offset],
  );
  return rows;
}

async function findAllPostsAndReposts({ limit = 20, offset = 0 }) {
  const { rows } = await db.query(
    `SELECT 
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
    ORDER BY "createdAt" DESC LIMIT $1 OFFSET $2;`,
    [limit, offset],
  );
  return rows;
}

async function findById({ postId }) {
  const { rows } = await db.query('SELECT * FROM posts WHERE id=$1;', [postId]);
  return rows[0];
}

async function deleteById({ postId }) {
  await db.query('DELETE FROM posts WHERE id = $1;', [postId]);
}

async function update({
  postId,
  url,
  description,
  hashtags,
}) {
  const { rows } = await db.query(
    'UPDATE posts SET url=$1, description=$2 WHERE id=$3 RETURNING *;',
    [url, description, postId],
  );
  const hashtagsCreated = await insertIntoHashtags({ hashtags, postId });
  return { post: rows[0], hashtags: hashtagsCreated };
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

const find = findById;

const postsRepository = {
  create,
  findAll,
  deleteById,
  update,
  find,
  findById,
  validate,
  findAllPostsAndReposts,
};

export default postsRepository;
