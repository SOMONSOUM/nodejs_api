import { config } from 'dotenv';
config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: process.env.MYSQL_DEFAULT,
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      extension: 'ts',
      directory: `${__dirname}/seeds`,
    },
    useNullAsDefault: true,
  },
};
