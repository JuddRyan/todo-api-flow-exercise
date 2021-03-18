/**
 * Writing to a ToDo JSON file
 */

import knexTodos from '../../db/knexTodos.js';
import Logger from './Logger.js';

export default class UserDb {
  async findOne(username) {
    try {
      return await knexTodos('users')
        .where({ username: username })
        .select('*')
        .first();
    } catch (e) {
      return Logger.error(e.message);
    }
  }
}
