import { Router } from 'express';
import likesControllers from '../controllers/likes.controllers.js';

const likesRouter = Router();

likesRouter.get(
  '/posts/:id/likes',
  likesControllers.retrieveLikes,
);

export default likesRouter;
