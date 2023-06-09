import { Router } from 'express';
import hashtagsControllers from '../controllers/hashtags.controllers.js';
import schemaMiddleware from '../middlewares/schema.middleware.js';
import postSchema from '../schemas/post.schema.js';

const hashtagsRouter = Router();

hashtagsRouter.get(
  '/hashtag/:hashtag',
  schemaMiddleware.validateQuery(postSchema.query),
  hashtagsControllers.retrievePosts,
);

hashtagsRouter.get('/trending', hashtagsControllers.retrieveTrending);

export default hashtagsRouter;
