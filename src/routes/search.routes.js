import { Router } from 'express';
import searchControllers from '../controllers/search.controllers.js';
import authValidation from '../middlewares/authValidation.middleware.js';

const searchRouter = Router();

searchRouter.get('/search/user/:id', authValidation, searchControllers.getUserById);
searchRouter.get('/search/user', authValidation, searchControllers.searchUsersByName);
searchRouter.get('/search/posts/:id', authValidation, searchControllers.searchPostsById);

export default searchRouter;
