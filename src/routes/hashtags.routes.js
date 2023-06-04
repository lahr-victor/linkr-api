import { Router } from 'express';
import hashtagsControllers from '../controllers/hashtags.controllers.js';

const hashtagsRouter = Router();

hashtagsRouter.get(
  '/hashtag/:hashtag',
  hashtagsControllers.retrievePosts,
);

hashtagsRouter.get(
  '/trending',
  hashtagsControllers.retrieveTrending,
);

export default hashtagsRouter;
