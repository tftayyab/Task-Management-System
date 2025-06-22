import { useNavigate } from 'react-router-dom';
import api from '../api';

function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <>
      <div className="w-[22.8125rem] h-[54.25rem] flex-shrink-0 rounded-tr-[0.5rem] rounded-br-[0.5rem] bg-black shadow-[0_4px_12px_0_rgba(0,0,0,0.08)]">
        <div className="p-4 flex flex-col gap-4">
            <p className="text-white font-inter text-center text-base font-semibold leading-none">
                tftayyab</p>
            <p className="text-white font-inter text-base text-center font-semibold leading-none">
                tftayyabfaisal@gmail.com</p>
          <button
            
            class="flex w-72 h-[3.6875rem] justify-center items-center flex-shrink-0 rounded-tr-md text-white font-inter text-center text-base font-semibold leading-none rounded-br-md"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          
          <button
            className="text-white border border-white px-4 py-2 rounded"
            onClick={() => navigate('/tasks')}
          >
            My Tasks
          </button>

          <button
            className="text-white border border-red-500 px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Menu;
