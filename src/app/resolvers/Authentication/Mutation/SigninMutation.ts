import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../../../../lib/JWT';
import { SigninInput } from '../../../schema/UserSchema';

const knex = createKnexContext().default;

const LoginMutation = async (req: Request, res: Response) => {
  const { email, password } = req.body as SigninInput;

  const [user] = await knex.table('users').where({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = generateAccessToken(email);

    return res.status(201).json({ token: token });
  } else {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }
};

export { LoginMutation };
