import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      email: 'superadmin@admin.com',
      username: 'admin',
      password: bcrypt.hashSync('123', 12),
      fullname: 'Super Admin',
      phone_number: '099999444',
      profile_picture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },

    {
      email: 'user@user.com',
      username: 'user',
      password: bcrypt.hashSync('123', 12),
      fullname: 'User',
      phone_number: '099999333',
      profile_picture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },
  ]);
}
