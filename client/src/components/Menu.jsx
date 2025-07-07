import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardSelectedIcon, DashboardNotSelectedIcon,
  LogoutIcon,
  MyTasksSelectedIcon, MyTasksNotSelectedIcon,
  CollaborationNotSelectedIcon, CollaborationSelectedIcon
} from './svg';
import { handleLogout } from '../utils/handleTasks';
import { motion, AnimatePresence } from 'framer-motion';

function Menu({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const isDashboard = location.pathname === '/dashboard';
  const isTasks = location.pathname === '/mytasks';
  const isCollaborate = location.pathname === '/collaborate';

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      <AnimatePresence>
        {/* Fade overlay (Mobile only) */}
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/30 z-40 sm:hidden"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>

      {/* Static menu drawer (no animation) */}
      <div className="fixed sm:bottom-0 left-0 w-[95%] z-50 h-full sm:w-[20rem] sm:h-[80vh] bg-[#1c1c1e] rounded-tr-2xl rounded-br-2xl shadow-2xl flex flex-col justify-between">
        {/* Top */}
        <div className="p-6 flex flex-col gap-6">
          <div className="text-white text-center mt-4 space-y-1">
            <p className="text-lg font-semibold tracking-wide">{username}</p>
            <p className="text-sm font-light text-gray-400">{email}</p>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            <MenuButton
              label="Dashboard"
              isActive={isDashboard}
              IconActive={DashboardSelectedIcon}
              IconInactive={DashboardNotSelectedIcon}
              onClick={() => handleNavigate('/dashboard')}
            />
            <MenuButton
              label="My Tasks"
              isActive={isTasks}
              IconActive={MyTasksSelectedIcon}
              IconInactive={MyTasksNotSelectedIcon}
              onClick={() => handleNavigate('/mytasks')}
            />
            <MenuButton
              label="Collaborate"
              isActive={isCollaborate}
              IconActive={CollaborationSelectedIcon}
              IconInactive={CollaborationNotSelectedIcon}
              onClick={() => handleNavigate('/collaborate')}
            />
          </nav>
        </div>

        {/* Bottom - Logout */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={() => handleLogout(navigate)}
            className="group flex items-center gap-3 px-5 py-3 w-full rounded-lg font-medium text-white hover:bg-red-500/90 transition-all duration-200"
          >
            <LogoutIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="group-hover:translate-x-1 transition-all">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

function MenuButton({ label, isActive, IconActive, IconInactive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 px-5 py-3 w-full rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-white text-[#FF6767]'
          : 'text-white hover:bg-white/10 hover:text-[#FF6767]'
      }`}
    >
      {isActive ? (
        <IconActive className="w-6 h-6 transition-transform duration-200" />
      ) : (
        <IconInactive className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      )}
      <span className="group-hover:translate-x-1 transition-transform duration-200">{label}</span>
    </button>
  );
}

export default Menu;
