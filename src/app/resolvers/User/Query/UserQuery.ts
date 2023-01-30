import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { User } from '../../../schema/UserSchema';

const UserQuery = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { id } = req.params;

  const [user]: User[] = await knex
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

  if (user?.id) {
    return res.status(200).json({
      status: true,
      user: {
        id: user?.id,
        email: user?.email,
        username: user?.username,
        fullname: user?.fullname,
        phoneNumber: user?.phoneNumber,
        profilePicture: user?.profilePicture,
      },
    });
  } else {
    return res.json({ status: false, message: 'Failed to get user' });
  }
};

export { UserQuery };
