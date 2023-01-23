import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import createKnexContext from '../../../../lib/CreateKnexContext';

const knex = createKnexContext().default;

const UpdateUserMutation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    email,
    password,
    username,
    fullname,
    phone_number,
    profile_picture,
  } = req.body;

  const user = await knex
    .table('users')
    .update({
      email: email,
      password: password ? bcrypt.hashSync(password, 12) : undefined,
      username,
      fullname,
      phone_number,
      profile_picture,
    })
    .where({ id });

  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.json({ message: 'Failed to update user' });
  }
};

export { UpdateUserMutation };
