import { Router } from 'express';
import postsRoutes from './posts.routes.js';

const indexRoutes = Router();

indexRoutes.use(postsRoutes);

export default indexRoutes;
