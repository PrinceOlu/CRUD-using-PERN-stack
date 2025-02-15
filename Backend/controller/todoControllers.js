const express = require('express');
const router = express.Router();
const pool = require("../dbConection/db");

// Create a todo
const createTodo = async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
        res.status(201).json(newTodo.rows[0]);
        // console.log(description);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Get all todos
const getAllTodos = async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Get a todo
const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Update a todo
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo
};
