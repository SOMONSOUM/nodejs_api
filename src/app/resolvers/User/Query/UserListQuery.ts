import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';

const knex = createKnexContext().default;

const UserListQuery = async (req: Request, res: Response) => {
  const users = await knex
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

export { UserListQuery };