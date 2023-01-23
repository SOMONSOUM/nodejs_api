import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';

const knex = createKnexContext().default;

const UserQuery = async (req: Request, res: Response) => {
  const id = req.params.id;

  const [user] = await knex
    .table('users')
    .select(
      'id',
      'email',
      'username',
      'fullname',
      'phone_number as phoneNumber',
      'profile_picture as profilePicture'
    )
    .where({ id });

  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.json({ message: 'Failed to get user' });
  }
};

export { UserQuery };
