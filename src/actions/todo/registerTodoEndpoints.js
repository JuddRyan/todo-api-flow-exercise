/**
 * Registering the ToDo API endpoints
 */

import express from 'express';
import TodoDb from '../../lib/TodoDb.js';
import { getTodos, addTodo, updateTodo, deleteTodo } from './crudTodo.js';

const app = express.Router();
const todoData = new TodoDb();

// get the todos
app.get('/', async (req, res) => {
  await getTodos(todoData, req, res);
});

// add a todo
app.post('/', async (req, res) => {
  await addTodo(todoData, req, res);
});

// update a todo
app.put('/:id', async (req, res) => {
  await updateTodo(todoData, req, res);
});

// delete a todo
app.delete('/:id', async (req, res) => {
  await deleteTodo(todoData, req, res);
});

export default app;
