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
import { CreateRoleMutation } from '../app/resolvers/Role/Mutation/CreateRoleMutation';
import { UpdateRoleMutation } from '../app/resolvers/Role/Mutation/UpdateRoleMutation';
import { RoleListQuery } from '../app/resolvers/Role/Query/RoleListQuery';
import { RoleDetailQuery } from '../app/resolvers/Role/Query/RoleDetailQuery';
import { RemoveRoleMuation } from '../app/resolvers/Role/Mutation/RemoveRoleMutation';
import { AssignRoleMuation } from '../app/resolvers/Role/Mutation/AssignRoleMutation';
import { UpdateAssignRoleMutation } from '../app/resolvers/Role/Mutation/UpdateAssignRoleMutation';

const router = Router();

/* User Routes  */
router.post('/signup', validator(userSchema), SignupMutation);
router.post('/login', validator(userSchema), LoginMutation);
router.get('/users', authenticateToken, UserListQuery);
router.get('/:email', authenticateToken, MeQuery);
router.put('/user/:id', authenticateToken, UpdateUserMutation);
router.get('/user/:id', authenticateToken, UserQuery);
router.delete('/user/:id', authenticateToken, RemoveUserMuation);

/* Role Routes  */
router.get('/role/all', authenticateToken, RoleListQuery);
router.get('/role/:roleId', authenticateToken, RoleDetailQuery);
router.post('/role/create', authenticateToken, CreateRoleMutation);
router.put('/role/update/:roleId', authenticateToken, UpdateRoleMutation);
router.delete('/role/:roleId', authenticateToken, RemoveRoleMuation);
router.post('/role/permission/create', authenticateToken, AssignRoleMuation);
router.put(
  '/role/permission/update/:pId',
  authenticateToken,
  UpdateAssignRoleMutation
);

export default router;
