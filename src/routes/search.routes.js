import { Router } from 'express';
import searchControllers from '../controllers/search.controllers.js';

const searchRouter = Router();

searchRouter.get('/search/user/:id', searchControllers.getUserById);
searchRouter.get('/search/user', searchControllers.searchUsersByName);
searchRouter.get('/search/posts/:id', searchControllers.searchPostsById);

export default searchRouter;
