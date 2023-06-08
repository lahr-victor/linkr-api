import { Router } from 'express';
import commentsRouter from './comments.routes.js';
import hashtagsRouter from './hashtags.routes.js';
import likesRouter from './likes.routes.js';
import postsRoutes from './posts.routes.js';
import userRouter from './user.routes.js';
import searchRouter from './search.routes.js';

const indexRoutes = Router();

indexRoutes.use(commentsRouter);
indexRoutes.use(hashtagsRouter);
indexRoutes.use(likesRouter);
indexRoutes.use(postsRoutes);
indexRoutes.use(userRouter);
indexRoutes.use(searchRouter);

export default indexRoutes;
