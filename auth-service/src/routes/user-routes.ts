import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { validationMiddleware } from '../middleware/validation';
import { SignInUserValidationSchema } from '../utils/user-validation-schemas/sign-in-user-schema';
import { SignUpUserValidationSchema } from '../utils/user-validation-schemas/sign-up-user-schema';

const router = Router();

router.post('/signup', validationMiddleware(SignUpUserValidationSchema), UserController.SignUp);
router.post('/signin', validationMiddleware(SignInUserValidationSchema), UserController.SignIn);

export default router;