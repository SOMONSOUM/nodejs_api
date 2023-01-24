import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';

const knex = createKnexContext().default;

const MeQuery = async (req: Request, res: Response) => {
  const { email } = req.params;

  const [me] = await knex
    .table('users')
    .select(
      'id',
      'email',
      'username',
      'fullname',
      'phone_number as phoneNumber',
      'profile_picture as profilePicture'
    )
    .where({ email });

  if (me) {
    return res.status(200).json({ me });
  } else {
    return null;
  }
};

export { MeQuery };
