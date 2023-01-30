import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';

export const RemoveRoleMuation = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { roleId } = req.params;

  const role = await knex.table('roles').delete().where({ id: roleId });

  if (role) {
    return res
      .status(200)
      .json({ status: true, message: `Role has been deleted` });
  } else {
    return res.json({ status: false, message: 'Failed to delete role' });
  }
};
