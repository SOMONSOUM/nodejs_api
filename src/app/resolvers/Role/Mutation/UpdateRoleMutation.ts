import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { RoleInput } from '../../../schema/RoleSchema';

export const UpdateRoleMutation = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { roleId } = req.params;
  const { roleName, read, write, modify, remove } = req.body as RoleInput;

  const role = await knex
    .table('roles')
    .update({ role_name: roleName, read, write, modify, remove })
    .where({ id: roleId });

  if (role) {
    return res.status(201).json({
      status: true,
      role: {
        roleName,
        read,
        write,
        modify,
        remove,
      },
    });
  } else {
    return res.status(424).json('Failed to update role');
  }
};
