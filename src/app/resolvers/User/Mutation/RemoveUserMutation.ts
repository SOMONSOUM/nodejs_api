import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';

const knex = createKnexContext().default;

const RemoveUserMuation = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await knex.table('users').delete().where({ id });

  if (user) {
    return res.status(200).json({ message: `User has been deleted` });
  } else {
    return res.json({ message: 'Failed to delete user' });
  }
};

export { RemoveUserMuation };
