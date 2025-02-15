const express = require('express');
const router = express.Router();
const {
    createTodo,
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo} = require('../controller/todoControllers');

// Create a todo
router.post('/', createTodo);

// Get all todos
router.get('/', getAllTodos);

// Get a todo
router.get('/:id', getTodo);

// Update a todo
router.put('/:id', updateTodo);

// Delete a todo
router.delete('/:id', deleteTodo);

module.exports = router;
