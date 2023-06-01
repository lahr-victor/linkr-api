import { Router } from 'express';
import userControllers from '../controllers/user.controllers.js';
import authValidation from '../middlewares/authValidation.middleware.js';
import schemaMiddleware from '../middlewares/schema.middleware.js';
import userSchemas from '../schemas/user.schema.js';

const userRouter = Router();

userRouter.post('/sign-up', schemaMiddleware.validateSchema(userSchemas.signUp), userControllers.signUp);
userRouter.post('/', schemaMiddleware.validateSchema(userSchemas.logIn), userControllers.signIn);
userRouter.delete('/log-out', authValidation, userControllers.logOut);

export default userRouter;
