import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Notification from '../components/notification'; // ✅ Import
import useSocketNotifications from '../hooks/useSocketNotifications'; // ✅ Import the hook


function MainLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null); // ✅ State for notification

  const location = useLocation();
  const path = location.pathname;

  useSocketNotifications(setNotification); // ✅ Activate socket listeners


  // Reset search term on page change
  useEffect(() => {
    setSearchTerm('');
  }, [location]);

  // ✅ Disable scroll globally
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const shouldShowHeader = !['/', '/login', '/register'].includes(path);

  const getTitles = (pathname) => {
    if (pathname.startsWith('/dashboard')) return { red: 'Dash', black: 'Board' };
    if (pathname.startsWith('/mytasks')) return { red: 'My', black: 'Tasks' };
    if (pathname.startsWith('/viewtask')) return { red: 'View', black: 'Task' };
    if (pathname.startsWith('/collaborate')) return { red: 'Collab', black: 'orate' };
    return { red: '', black: '' };
  };

  const { red, black } = getTitles(path);

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {/* ✅ Global notification */}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
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
        {/* ✅ Pass setNotification to children via Outlet */}
        <Outlet context={{ searchTerm, setSearchTerm, setNotification }} />
      </main>
    </div>
  );
}

export default MainLayout;
