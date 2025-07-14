import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Notification from '../components/notification';
import useSocketNotifications from '../hooks/useSocketNotifications';
import useIsMobile from '../utils/useScreenSize';

function MainLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const isMobile = useIsMobile();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  useSocketNotifications(setNotification);

  // Search redirect
  useEffect(() => {
    if (path !== '/collaborate' && searchTerm.trim().length > 0) {
      navigate('/mytasks');
    }
  }, [searchTerm, path, navigate]);

  // Clear search on page change
  useEffect(() => {
    if (!location.pathname.startsWith('/mytasks')) {
      setSearchTerm('');
    }
  }, [location]);

  // Handle scroll behavior
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isMobile]);

  // Sync dark mode with localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const shouldShowHeader = !['/', '/login', '/register'].includes(path);

  const getTitles = (pathname) => {
    if (pathname.startsWith('/dashboard')) return { red: 'Dash', black: 'Board' };
    if (pathname.startsWith('/mytasks')) return { red: 'My', black: 'Tasks' };
    if (pathname.startsWith('/viewtask')) return { red: 'View', black: 'Task' };
    if (pathname.startsWith('/viewteamtask')) return { red: 'Team', black: 'Task' };
    if (pathname.startsWith('/collaborate')) return { red: 'Collab', black: 'orate' };
    return { red: '', black: '' };
  };

  const { red, black } = getTitles(path);

  return (
    <div className="min-h-screen flex flex-col overflow-auto sm:overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white">
      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}

      {shouldShowHeader && (
        <PageHeader
          redTitle={red}
          blackTitle={black}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
      )}

      <main className="flex-1">
        <Outlet context={{ searchTerm, setSearchTerm, setNotification }} />
      </main>
    </div>
  );
}

export default MainLayout;
