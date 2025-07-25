import { useEffect, useState } from 'react';
import { MenuIcon, SearchIcon } from './svg';
import { day, date } from '../utils/DayDate';
import Menu from './Menu';
import { motion, AnimatePresence } from 'framer-motion';

const PageHeader = ({
  redTitle = '',
  blackTitle = '',
  searchTerm = '',
  setSearchTerm = () => {},
  setIsMenuOpen = () => {},
  toggleDarkMode = () => {},
  darkMode = false,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    document.title = redTitle + blackTitle;
  }, [redTitle, blackTitle]);

  useEffect(() => {
    if (!hasAnimated) setHasAnimated(true);
  }, []);

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full bg-[#fad3d3] dark:bg-[#2d2d2d] shadow-md py-4 sm:py-6 px-4 sm:px-10 z-10"
    >
      {/* Desktop Menu */}
      <motion.div
        className="hidden sm:block border-r border-gray-200 dark:border-gray-700"
        initial={!hasAnimated ? { opacity: 0 } : false}
        animate={!hasAnimated ? { opacity: 1 } : false}
        transition={{ duration: 0.6 }}
      >
        <Menu toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black/40 z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowMenu(false);
                setIsMenuOpen(false);
              }}
            />
            <motion.div
              key="menu"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="fixed top-0 left-0 z-50 sm:hidden w-[85%] h-full bg-white dark:bg-[#1c1c1e]"
            >
              <Menu
                onClose={() => {
                  setShowMenu(false);
                  setIsMenuOpen(false);
                }}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title */}
        <div className="w-full relative flex items-center justify-center sm:justify-start">
          <button
            onClick={handleMenuToggle}
            className="absolute sm:hidden left-0 p-2 hover:bg-[#ffbfbf] dark:hover:bg-[#444] rounded-full transition-all"
          >
            <MenuIcon />
          </button>
          <h1 className="text-[1.75rem] sm:text-[2.5rem] font-inter font-semibold text-center sm:text-left transition-all group">
            <span className="text-[#FF6767] group-hover:underline">{redTitle}</span>
            <span className="text-black dark:text-white group-hover:underline">{blackTitle}</span>
          </h1>
        </div>

        {/* Search & Date */}
        <div className="flex sm:flex-row flex-col sm:gap-x-30 sm:items-end items-center gap-2 sm:mt-0 mt-2 w-full sm:w-auto">
          <div className="w-full sm:w-[120vh] max-w-full px-2 sm:px-0">
            <div className="relative flex items-center w-full group">
              <SearchIcon className="absolute left-3 w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-[#FF6767]" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search by title, status, date..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#1e1e1e] text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6767] transition-all border border-transparent group-hover:border-[#FF6767] group-hover:shadow-md"
              />
            </div>
          </div>

          <div className="text-center hidden sm:block sm:text-right transition-all hover:text-[#FF6767] cursor-default">
            <p className="text-black dark:text-white font-inter text-sm sm:text-base font-medium transition-colors">
              {day}
            </p>
            <p className="text-[#3ABEFF] dark:text-[#81D4FA] font-inter text-xs sm:text-sm font-medium transition-colors">
              {date}
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default PageHeader;
