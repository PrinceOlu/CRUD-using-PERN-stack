import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

const url = "http://localhost:5000/todos/";

function EditTodo() {
  const { todo_id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");

  // Fetch todo data when the component mounts
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${url}${todo_id}`);
        if (response.ok) {
          const todoData = await response.json();
          setTodo(todoData.description); // Set the fetched todo description to form state
        } else {
          console.error("Failed to fetch todo data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching todo data:", error);
      }
    };

    fetchTodo();
  }, [todo_id]); // Run this effect when the component mounts and when `todo_id` changes

  const handleChange = (e) => {
    setTodo(e.target.value); // Update todo state when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}${todo_id}`, {
        method: "PUT", // Use PUT to update the todo
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: todo }), // Send updated description
      });

      if (response.ok) {
        console.log("Todo updated successfully!");
        navigate("/"); // Redirect to home page after successful update
      } else {
        console.error("Failed to update todo. Status:", response.status);
      }
    } catch (error) {
      console.error("Error while updating todo:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTodo">
          <Form.Label>Edit Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Edit todo here"
            value={todo}
            onChange={handleChange} // Bind the input value to state
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditTodo;
