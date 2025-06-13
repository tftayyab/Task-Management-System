import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AllTasks from './pages/TasksReact';        
import TaskDetails from './pages/TaskByIdReact';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
