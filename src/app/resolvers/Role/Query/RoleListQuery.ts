import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { Role } from '../../../schema/RoleSchema';

export const RoleListQuery = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const roles: Role[] = await knex
    .table('roles')
    .select('*')
    .orderBy('id', 'asc');

  if (roles) {
    return res.status(200).json({
      status: true,
      roles: roles.map((role: Role) => {
        return {
          id: role?.id,
          roleName: role?.role_name,
          read: role?.read,
          write: role?.write,
          modify: role?.modify,
          remove: role?.remove,
        };
      }),
    });
  } else {
    throw new Error('Failed to get roles');
  }
};
