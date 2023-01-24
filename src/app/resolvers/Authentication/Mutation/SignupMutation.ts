import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { SignupInput } from '../../../schema/UserSchema';
import { generateAccessToken } from '../../../../lib/jwt';

const knex = createKnexContext().default;

const SignupMutation = async (req: Request, res: Response) => {
  const {
    email,
    password,
    username,
    phoneNumber,
    profilePicture,
    fullname,
  } = req.body as SignupInput;

  const [id] = await knex.table('users').select('id').where({ email });
  if (!id) {
    const [user] = await knex.table('users').insert({
      email: email,
      password: password ? bcrypt.hashSync(password, 12) : undefined,
      username,
      fullname,
      phone_number: phoneNumber,
      profile_picture: profilePicture,
    });
    if (user) {
      const token = generateAccessToken(email);
      return res.status(201).json({
        user: {
          email,
          password,
          username,
          phoneNumber,
          profilePicture,
          fullname,
        },
        token: token,
      });
    } else {
      return res.status(424).json('Failed to create user');
    }
  } else {
    return res.status(409).json({ message: 'User already existed' });
  }
};

export { SignupMutation };
