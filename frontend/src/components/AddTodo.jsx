import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000/todos";

const AddTodo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value); // Set the todo state with the input value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data", todo);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: todo }), // Wrap todo in an object
      });

      if (response.ok) {
        console.log("Todo added successfully!");
        // Reset form data after successful submission
        setTodo("");

        // Navigate to the home page after successful submission
        navigate("/");
      } else {
        console.error("Failed to add todo. Status:", response.status);
      }
    } catch (error) {
      console.error("Error while adding todo:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTodo">
          <Form.Label>Add Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo here"
            value={todo}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTodo;
