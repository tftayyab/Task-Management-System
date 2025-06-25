// utils/handleDelete.js
import api from '../api';

const handleDelete = async (id) => {
  try {
    await api.delete(`/task/${id}`);
    window.location.reload(); // ✅ refresh page after successful delete
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await api.get('/auth/refresh-token');
        const newToken = refreshRes.data.accessToken;
        localStorage.setItem('token', newToken);
        await api.delete(`/task/${id}`);
        window.location.reload(); // ✅ refresh after retry
      } catch {
        console.error('Token refresh failed on delete');
        window.location.href = '/login';
      }
    } else {
      console.error('Delete error:', error);
    }
  }
};

export default handleDelete;
