import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyTasks from './pages/MyTasks';
import ViewTasks from './pages/ViewTasks';
import AddTasks from './pages/AddTasks';
import Edit from './pages/EditTasks';
import Collaborate from './pages/Collaborate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // This wraps the children with PageHeader
    children: [
      { path: '', element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'mytasks', element: <MyTasks /> },
      { path: 'viewtask/:id', element: <ViewTasks /> },
      { path: 'addtasks', element: <AddTasks /> },
      { path: 'edit', element: <Edit /> },
      { path: 'collaborate', element: <Collaborate /> },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
