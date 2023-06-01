import { Router } from 'express';
import likesRouter from './likes.routes.js';
import postsRoutes from './posts.routes.js';
import userRouter from './user.routes.js';
import searchRouter from './search.routes.js';

const indexRoutes = Router();

indexRoutes.use(likesRouter);
indexRoutes.use(postsRoutes);
indexRoutes.use(userRouter);
indexRoutes.use(searchRouter);

export default indexRoutes;
