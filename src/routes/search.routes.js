import { Router } from 'express';
import searchControllers from '../controllers/search.controllers.js';
import schemaMiddleware from '../middlewares/schema.middleware.js';
import searchSchema from '../schemas/search.schema.js';

const searchRouter = Router();

searchRouter.get('/search/user/:id', searchControllers.getUserById);
searchRouter.get('/search/user', schemaMiddleware.validateSchema(searchSchema.searchName), searchControllers.searchUsersByName);
searchRouter.get('/search/posts/:id', searchControllers.searchPostsById);

export default searchRouter;
