import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Notification from '../components/notification';
import useSocketNotifications from '../hooks/useSocketNotifications';
import useIsMobile from '../utils/useScreenSize';

function MainLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const isMobile = useIsMobile();

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  useSocketNotifications(setNotification);

  // ✅ Redirect if typing in search bar and not on /collaborate
  useEffect(() => {
    if (path !== '/collaborate' && searchTerm.trim().length > 0) {
      navigate('/mytasks');
    }
  }, [searchTerm, path, navigate]);

  // Clear search term on page change
  useEffect(() => {
  if (!location.pathname.startsWith('/mytasks')) {
    setSearchTerm('');
  }
}, [location]);


  // Manage body scroll on screen size
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
    <div className="min-h-screen bg-white flex flex-col overflow-auto sm:overflow-hidden">
      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}

      {shouldShowHeader && (
        <PageHeader
          redTitle={red}
          blackTitle={black}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      <main className="flex-1">
        <Outlet context={{ searchTerm, setSearchTerm, setNotification }} />
      </main>
    </div>
  );
}

export default MainLayout;
