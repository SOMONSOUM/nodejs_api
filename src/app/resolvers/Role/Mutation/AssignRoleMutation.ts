import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { AssignRoleInput } from '../../../schema/RoleSchema';

export const AssignRoleMuation = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { userId, roleId } = req.body as AssignRoleInput;

  const [permission] = await knex
    .table('role_permissions')
    .insert({ user_id: userId, role_id: roleId });

  if (permission) {
    return res.status(201).json({
      status: true,
      rolePermission: {
        userId,
        roleId,
      },
    });
  } else {
    return res.status(424).json('Failed to assign role');
  }
};
