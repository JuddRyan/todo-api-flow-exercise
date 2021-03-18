/**
 * Writing to a ToDo JSON file
 */

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import Logger from './Logger.js';

export default class TodoFile {
  constructor(filename) {
    this.filename = filename;
  }

  /**
   * Adds a todo to our file
   *
   * @param {string} description
   */
  add(description) {
    try {
      // get the todos
      const todos = this.get();

      // create a new todo
      const todo = {
        id: uuidv4(),
        description,
      };

      // push a new todo in our existing array
      todos.push(todo);

      // save the file
      this.save(todos);

      // return the todo (as a good practice)
      return todo;
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
  update(id, description) {
    try {
    // get all the todos
      const todos = this.get();

      // find the todo we'd like to update
      const todo = todos.find((t) => t.id === id);

      // error handling
      if (todo == null) throw new Error(`ToDo with ID ${id} does not exist`);

      // change the description
      todo.description = description;

      // save the data
      this.save(todos);

      // return the updated todo
      return todo;
    } catch (e) {
      return Logger.error(e.message);
    }
  }

  /**
   * Deletes a specific todo
   *
   * @param {string} id
   */
  delete(id) {
    try {
      // get all the todos
      const todos = this.get();

      // filter out the todo we want to delete
      const filteredTodos = todos.filter((t) => t.id !== id);

      // save the file
      return this.save(filteredTodos);
    } catch (e) {
      return Logger.error(e.message);
    }
  }

  /**
   * Get all the todo items
   */
  get() {
    try {
      const data = fs.readFileSync(this.filename, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      return Logger.error(e.message);
    }
  }

  /**
   * Save a todo array
   *
   * @param {array} todos
   */
  save(todos) {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(todos, null, 2));
    } catch (e) {
      Logger.error(e.message);
    }
  }
}
