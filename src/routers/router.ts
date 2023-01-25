import { Router } from 'express';
import { authenticateToken } from '../lib/jwt';
import validator from '../lib/Validator';
import { userSchema } from '../app/schema/UserSchema';
import { SignupMutation } from '../app/resolvers/Authentication/Mutation/SignupMutation';
import { LoginMutation } from '../app/resolvers/Authentication/Mutation/SigninMutation';
import { MeQuery } from '../app/resolvers/Authentication/Query/MeQuery';
import { UpdateUserMutation } from '../app/resolvers/User/Mutation/UpdateUserMutation';
import { UserListQuery } from '../app/resolvers/User/Query/UserListQuery';
import { UserQuery } from '../app/resolvers/User/Query/UserQuery';
import { RemoveUserMuation } from '../app/resolvers/User/Mutation/RemoveUserMutation';

const router = Router();

router.post('/signup', validator(userSchema), SignupMutation);
router.post('/login', validator(userSchema), LoginMutation);
router.get('/users', authenticateToken, UserListQuery);
router.get('/:email', authenticateToken, MeQuery);
router.put('/user/:id', authenticateToken, UpdateUserMutation);
router.get('/user/:id', authenticateToken, UserQuery);
router.delete('/user/:id', authenticateToken, RemoveUserMuation);

export default router;
