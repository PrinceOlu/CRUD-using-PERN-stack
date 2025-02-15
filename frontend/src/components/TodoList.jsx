import React, { useState, useEffect } from 'react';

function TodoList() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Get all todos
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Add todo
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      setDescription("");
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Update todo
  const updateTodo = async (id) => {
    try {
      const body = { description: editText };
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      setEditingId(null);
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>
                {editingId === todo.todo_id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />
                ) : (
                  todo.description
                )}
              </td>
              <td>
                {editingId === todo.todo_id ? (
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.todo_id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setEditingId(todo.todo_id);
                      setEditText(todo.description);
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TodoList;