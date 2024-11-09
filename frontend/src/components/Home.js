import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Table from 'react-bootstrap/Table';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import EditTodo from './EditTodo';



const url = "http://localhost:5000/todos";

function Home() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(url);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // to edit todo
  const handleEdit = (todo_id) => {
    console.log("Edit todo with id:", todo_id);
    navigate(`/Edit-Todo/${todo_id}`); // Navigate to the edit page for the todo
  };

  // to delete todo
  const handleDelete = async (todo_id) => {
    if (!todo_id) {
      console.error("Invalid todo ID for deletion:", todo_id);
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmed) {
      return; // Exit if the user did not confirm
    }

    try {
      await axios.delete(`${url}/${todo_id}`);
      fetchTodos(); // Refetch todos after deletion to ensure the state is updated correctly
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Todo List</th>
            <th colSpan={2}>Todo Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((data) => (
            <tr key={data.todo_id}>
              <td>{data.todo_id}</td>
              <td>{data.description}</td>
              <td>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(data.todo_id)}
                >
                  <FaEdit />
                </button>
              </td>
              <td>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(data.todo_id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
