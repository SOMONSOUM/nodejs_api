import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    return await knex.schema.createTable('users', function (table) {
      table.increments()
      table.string('email')
      table.string('password')
      table.string('username')
      table.string('fullname')
      table.string('phone_number')
      table.string('profile_picture')
      table.timestamps(true, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {}
