import { Request, Response } from 'express';
import createKnexContext from '../../../lib/CreateKnexContext';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../../../lib/jwt';
import { UserModel } from '../../models/user';

const knex = createKnexContext().default;

const Me = async (req: Request, res: Response) => {
  const { username } = req.params;

  const [me] = await knex
    .table('users')
    .select(
      'id',
      'email',
      'username',
      'fullname',
      'phone_number',
      'profile_picture'
    )
    .where({ username });

  if (me) {
    return res.status(200).json({ me });
  } else {
    return null;
  }
};

const UserList = async (req: Request, res: Response) => {
  const users: UserModel[] = await knex
    .table('users')
    .select(
      'id',
      'email',
      'username',
      'fullname',
      'phone_number',
      'profile_picture'
    )
    .orderBy('id', 'asc');

  if (users) {
    return res.status(200).json({ data: users });
  } else {
    throw new Error('Failed to get users');
  }
};

const UpdateUser = async (req: Request, res: Response) => {
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

const GetUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const [user] = await knex
    .table('users')
    .select(
      'id',
      'email',
      'username',
      'fullname',
      'phone_number',
      'profile_picture'
    )
    .where({ id });

  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.json({ message: 'Failed to get user' });
  }
};

const RemoveUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await knex.table('users').delete().where({ id });

  if (user) {
    return res.status(200).json({ message: `User has been deleted` });
  } else {
    return res.json({ message: 'Failed to delete user' });
  }
};

export { UserList, UpdateUser, GetUser, RemoveUser, Me };
