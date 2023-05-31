import { Router } from 'express';
import postsRoutes from './posts.routes.js';
import userRouter from './user.routes.js';

const indexRoutes = Router();

indexRoutes.use(postsRoutes);
indexRoutes.use(userRouter);

export default indexRoutes;
