import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-40 sm:top-20 right-4 z-50 w-auto max-w-sm px-5 py-3 rounded-xl shadow-2xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white text-base sm:text-sm font-semibold"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
