import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from './components/AddTodo';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-new" element={<AddTodo />} />
          <Route path="/Edit-Todo/:todo_id" element={<EditTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
