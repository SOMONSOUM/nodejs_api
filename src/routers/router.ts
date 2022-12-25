import { Router } from 'express';
import createKnexContext from '../lib/CreateKnexContext';
import bcrypt from 'bcryptjs';
import { generateAccessToken, authenticateToken } from '../lib/jwt';

const router = Router();
const knex = createKnexContext().default;

export interface User {
  email?: null | string;
  password?: null | string;
  username?: null | string;
  fullname?: null | string;
  phone_number?: null | string;
  profile_picture?: null | string;
}

router.post('/api/v1/signup', async (req, res) => {
  const {
    email,
    password,
    username,
    fullname,
    phone_number,
    profile_picture,
  } = req.body;

  const [id] = await knex.table('users').select('id').where({ username });

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
});

router.get('/api/v1/users', authenticateToken, async (req, res) => {
  const users: User[] = await knex
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
});

router.get('/api/v1/user/:id', authenticateToken, async (req, res) => {
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
});

router.put('/api/v1/user/:id', authenticateToken, async (req, res) => {
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
});

router.delete('/api/v1/user/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;

  const user = await knex.table('users').delete().where({ id });

  if (user) {
    return res.status(200).json({ message: `User has been deleted` });
  } else {
    return res.json({ message: 'Failed to delete user' });
  }
});

router.post('/api/v1/login', async (req, res) => {
  const { username, password } = req.body;

  const [user] = await knex.table('users').where({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = generateAccessToken(username);
    console.log(token);

    return res.status(201).json({ token: token });
  } else {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }
});

export default router;
