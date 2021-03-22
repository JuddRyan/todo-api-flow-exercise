/**
 * All the CRUD endpoint actions together
 */

import parseTodo from './parseTodo.js';

/**
 * Getting the todos
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const getTodos = async (todo, request, response) => {
  try {
    response.status(200).json({ todos: await todo.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

export const getTodosCSV = async (todo, request, response) => {
  try {
    if (response.status(200)) {
      let json = await todo.get()
      let fields = Object.keys(json[0])
      let replacer = function(key, value) { return value === null ? '' : value } 
      let csv = json.map(function(row){
        return fields.map(function(fieldName){
          return JSON.stringify(row[fieldName], replacer)
        }).join(',')
      })
      csv.unshift(fields.join(',')) // add header column
      csv = csv.join('\r\n');
      response.header('Content-Type', 'text/csv');
      response.attachment("csv-calendar.csv")

      return response.send( csv )

    }
    // response.status(200).csv({ todos: await todo.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * Creates a new todo item
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const addTodo = async (todo, request, response) => {
  try {
    const obj = parseTodo(request, response);
    const newTodo = await todo.add(obj);
    response.status(201).json({ todo: newTodo });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a new todo item
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const updateTodo = async (todo, request, response) => {
  try {
    const { description } = parseTodo(request);
    const { id } = request.params;
    const updatedTodo = await todo.update(id, description);
    response.status(200).json({ todo: updatedTodo });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a todo item
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const deleteTodo = async (todo, request, response) => {
  try {
    const { id } = request.params;
    await todo.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
