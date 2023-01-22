import { Request, Response } from 'express';
import createKnexContext from '../../../lib/CreateKnexContext';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../../../lib/jwt';

const knex = createKnexContext().default;

const SigninUserController = async (req: Request, res: Response) => {
  const {
    email,
    password,
    username,
    fullname,
    phone_number,
    profile_picture,
  } = req.body;

  const [id] = await knex.table('users').select('id').where({ email });

  if (!id) {
    const [user] = await knex.table('users').insert({
      email: email,
      password: password ? bcrypt.hashSync(password, 12) : undefined,
      username,
      fullname,
      phone_number,
      profile_picture,
    });
    if (user) {
      const token = generateAccessToken(username);
      return res.status(201).json({
        user: { email, username, fullname, phone_number, profile_picture },
        token: token,
      });
    } else {
      return res.status(424).json('Failed to create user');
    }
  } else {
    return res.status(409).json({ message: 'User already existed' });
  }
};

export { SigninUserController };
