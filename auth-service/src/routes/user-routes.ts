import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const router = Router();

router.post('/signup', UserController.SignUp);
router.post('/signin', UserController.SignIn);

export default router;