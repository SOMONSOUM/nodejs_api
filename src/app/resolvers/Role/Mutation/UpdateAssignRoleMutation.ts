import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { AssignRoleInput } from '../../../schema/RoleSchema';

export const UpdateAssignRoleMutation = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { pId } = req.params;
  const { userId, roleId } = req.body as AssignRoleInput;

  const role_permission = await knex
    .table('role_permissions')
    .update({ user_id: userId, role_id: roleId })
    .where({ id: pId });

  if (role_permission) {
    return res.status(201).json({
      status: true,
      rolePermission: {
        userId,
        roleId,
      },
    });
  } else {
    return res.status(424).json('Failed to update role permission');
  }
};
