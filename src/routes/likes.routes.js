import { Router } from 'express';
import authValidation from '../middlewares/authValidation.middleware.js';
import likesControllers from '../controllers/likes.controllers.js';

const likesRouter = Router();

likesRouter.get(
  '/posts/:id/likes',
  authValidation,
  likesControllers.retrieveLikes,
);

likesRouter.post(
  '/posts/:id/like-it',
  authValidation,
  likesControllers.addLike,
);

export default likesRouter;
