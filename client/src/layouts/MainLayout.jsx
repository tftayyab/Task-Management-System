import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

function MainLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const path = location.pathname;

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
      {shouldShowHeader && (
        <PageHeader
          redTitle={red}
          blackTitle={black}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {/* ✅ Remove overflow-y-auto here */}
      <main className="flex-1">
        <Outlet context={{ searchTerm, setSearchTerm }} />
      </main>
    </div>
  );
}

export default MainLayout;
