import { Router } from 'express';
import postsControllers from '../controllers/posts.controllers.js';
import schemaMiddleware from '../middlewares/schema.middleware.js';
import postSchema from '../schemas/post.schema.js';
import authValidation from '../middlewares/authValidation.middleware.js';

const postsRouter = Router();

postsRouter.post(
  '/posts',
  schemaMiddleware.validateSchema(postSchema.create),
  authValidation,
  postsControllers.createNewPost,
);

postsRouter.delete(
  '/posts/:postId',
  authValidation,
  postsControllers.deletePost,
);

postsRouter.put(
  '/posts/:postId',
  schemaMiddleware.validateSchema(postSchema.create),
  authValidation,
  postsControllers.updatePost,
);

postsRouter.get('/posts', authValidation, postsControllers.getPosts);

export default postsRouter;
