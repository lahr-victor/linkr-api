import { Router } from 'express';
import likesRouter from './likes.routes.js';
import postsRoutes from './posts.routes.js';

const indexRoutes = Router();

indexRoutes.use(likesRouter);
indexRoutes.use(postsRoutes);

export default indexRoutes;
