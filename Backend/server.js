require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require("./dbConection/db");
const userTodoRoutes = require('./route/todoRoutes'); // Assuming you will save the routes in a separate file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the todo routes
app.use('/todos', userTodoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
