import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { Role } from '../../../schema/RoleSchema';

export const RoleDetailQuery = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { roleId } = req.params;

  const [role]: Role[] = await knex
    .table('roles')
    .select('id', 'role_name', 'read', 'write', 'read', 'modify', 'remove')
    .where({ id: roleId });

  if (role?.id) {
    return res.status(200).json({
      status: true,
      role: {
        id: role?.id,
        roleName: role?.role_name,
        read: role?.read,
        write: role?.write,
        modify: role?.modify,
        remove: role?.remove,
      },
    });
  } else {
    return res.json({ status: true, message: 'Failed to get role' });
  }
};
