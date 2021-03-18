/**
 * Writing to a ToDo JSON file
 */

import knexTodos from '../../db/knexTodos.js';
import Logger from './Logger.js';

export default class TodoDb {
  /**
   * Adds a todo to our database
   *
   * @param {string} description
   */
  async add(description) {
    try {
      return await knexTodos('todos').insert({ description });
    } catch (e) {
      return Logger.error(e.message);
    }
  }

  /**
   * Updates an existing todo item
   *
   * @param {string} id
   * @param {string} description
   */
  // eslint-disable-next-line
  async update(id, description) {
    try {
      return await knexTodos('todos').where('id', id).update({ description });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Deletes a specific todo
   *
   * @param {string} id
   */
  async delete(id) {
    try {
      return await knexTodos('todos').where('id', id).del();
    } catch (e) {
      return Logger.error(e.message);
    }
  }

  /**
   * Get all the todo items
   */
  async get() {
    try {
      return await knexTodos('todos').select('*');
    } catch (e) {
      return Logger.error(e.message);
    }
  }
}
