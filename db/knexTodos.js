/**
 * Create a simple connection with knex
 */

import knex from 'knex';

const knexTodos = knex({
  client: 'sqlite3',
  connection: {
    filename: './db/todos.sqlite3',
  },
  useNullAsDefault: true,
});

export default knexTodos;
