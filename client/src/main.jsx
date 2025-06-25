import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import MyTasks from './pages/MyTasks';
import ViewTasks from './pages/ViewTasks';
import AddTasks from './pages/AddTasks';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';
import Register from './pages/Register';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="/viewtask/:id" element={<ViewTasks />} />
        <Route path="/addtasks" element={<AddTasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
