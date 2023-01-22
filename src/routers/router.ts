import { Router } from 'express';
import { authenticateToken } from '../lib/jwt';
import {
  GetUser,
  Me,
  RemoveUser,
  UpdateUser,
  UserList,
} from '../../src/app/controllers/user/UserController';
import { SigninUserController } from '../../src/app/controllers/authentication/SignupController';
import { LoginUserController } from '../../src/app/controllers/authentication/SigninController';

const router = Router();

router.post('/api/v1/signup', SigninUserController);
router.post('/api/v1/login', LoginUserController);
router.put('/api/v1/user/:id', authenticateToken, UpdateUser);
router.get('/api/v1/:username', authenticateToken, Me);
router.get('/api/v1/users', authenticateToken, UserList);
router.get('/api/v1/user/:id', authenticateToken, GetUser);
router.delete('/api/v1/user/:id', authenticateToken, RemoveUser);

export default router;
