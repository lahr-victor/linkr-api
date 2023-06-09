import { Router } from 'express';
import userControllers from '../controllers/user.controllers.js';
import authValidation from '../middlewares/authValidation.middleware.js';
import schemaMiddleware from '../middlewares/schema.middleware.js';
import userSchemas from '../schemas/user.schema.js';

const userRouter = Router();

userRouter.post('/sign-up', schemaMiddleware.validateSchema(userSchemas.signUp), userControllers.signUp);
userRouter.post('/', schemaMiddleware.validateSchema(userSchemas.logIn), userControllers.signIn);
userRouter.delete('/log-out', authValidation, userControllers.logOut);
userRouter.post('/user/:followingId', authValidation, userControllers.followUser);
userRouter.delete('/user/:unfollowingId', authValidation, userControllers.unfollowUser);
userRouter.get('/user/:followingId', authValidation, userControllers.isFollowing);
userRouter.get('/verify-follow', authValidation, userControllers.verifyFollowing);

export default userRouter;
