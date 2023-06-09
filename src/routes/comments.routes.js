import { Router } from 'express';
import schemaMiddleware from '../middlewares/schema.middleware.js';
import commentSchema from '../schemas/comment.schema.js';
import authValidation from '../middlewares/authValidation.middleware.js';
import commentsControllers from '../controllers/comments.controllers.js';

const commentsRouter = Router();

commentsRouter.post(
  '/posts/:id/comments',
  schemaMiddleware.validateSchema(commentSchema.create),
  authValidation,
  commentsControllers.addComment,
);

commentsRouter.get(
  '/posts/:id/comments',
  authValidation,
  commentsControllers.retrieveComments,
);

export default commentsRouter;
