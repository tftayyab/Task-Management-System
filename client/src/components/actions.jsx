import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // adjust path if needed

const Actions = ({ task, fetchTasksWithRetry }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      fetchTasksWithRetry();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await api.delete(`/task/${id}`);
          fetchTasksWithRetry();
        } catch (refreshErr) {
          console.error('Token refresh failed on delete');
          navigate('/login');
        }
      } else {
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <div className="inline-flex flex-col items-center rounded-md bg-white shadow-[12px_7px_4px_0_rgba(0,0,0,0),8px_4px_4px_0_rgba(0,0,0,0.01),4px_2px_3px_0_rgba(0,0,0,0.02),2px_1px_2px_0_rgba(0,0,0,0.03),0_0_1px_0_rgba(0,0,0,0.04)] px-[0.9375rem] pb-[0.8125rem] pt-0">
      <button
        onClick={() => navigate('/edit', { state: { task } })}
        className="flex w-[2.4375rem] h-4 px-2 pr-0 pb-1 items-center flex-shrink-0"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(task._id)}
        className="flex w-[2.4375rem] h-4 px-2 pr-0 pb-1 items-center flex-shrink-0"
      >
        Delete
      </button>
    </div>
  );
};

export default Actions;
