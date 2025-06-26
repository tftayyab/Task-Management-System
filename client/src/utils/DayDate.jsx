const today = new Date();

// Get full day name
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = days[today.getDay()];

// Format date as DD/MM/YYYY
const date = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

// ✅ Due label function
const getDueLabel = (dueDateStr) => {
  const today = new Date();
  const due = new Date(dueDateStr);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diff = (due - today) / (1000 * 60 * 60 * 24);
  const rounded = Math.round(diff);

  if (rounded === 0) return 'Today';
  if (rounded === -1) return 'Yesterday';
  if (rounded === 1) return 'Tomorrow';
  if (rounded > 1) return 'Later';
  return 'Old';
};

// ✅ Format date to "26 June 2025"
const formatDueDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export { day, date, getDueLabel, formatDueDate };
