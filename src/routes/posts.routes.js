import { Router } from 'express';
import postsControllers from '../controllers/posts.controllers.js';
import schemaMiddleware from '../middlewares/schema.middleware.js';
import postSchema from '../schemas/post.schema.js';

const postsRouter = Router();

postsRouter.post(
  '/posts',
  schemaMiddleware.validateSchema(postSchema.create),
  postsControllers.createNewPost,
);

postsRouter.get('/posts', postsControllers.getPosts);

export default postsRouter;
