import { Router } from 'express';
import { logOut, signIn, signUp } from '../controllers/user.controllers.js';
import authValidation from '../middlewares/authValidation.middleware.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import { userSchema, logInSchema } from '../schemas/user.schema.js';

const userRouter = Router();

userRouter.post('/sign-up', validateSchema(userSchema), signUp);
userRouter.post('/', validateSchema(logInSchema), signIn);
userRouter.delete('/log-out', authValidation, logOut);

export default userRouter;
