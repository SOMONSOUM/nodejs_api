import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { RoleInput } from '../../../schema/RoleSchema';

export const CreateRoleMutation = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { roleName, read, write, modify, remove } = req.body as RoleInput;

  const [role] = await knex
    .table('roles')
    .insert({ role_name: roleName, read, write, modify, remove });

  if (role) {
    return res.status(201).json({
      role: {
        roleName,
        read,
        write,
        modify,
        remove,
      },
    });
  } else {
    return res.status(424).json('Failed to create role');
  }
};
