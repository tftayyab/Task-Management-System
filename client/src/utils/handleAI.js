// utils/handleAI.js
import { enhanceTextWithAI } from './aiEnhancer';

export const animateTyping = (text, field, setNewTask) => {
  let i = 0;
  const textRef = { current: '' };

  setNewTask((prev) => ({ ...prev, [field]: '' }));

  const interval = setInterval(() => {
    textRef.current += text.charAt(i);
    i++;

    setNewTask((prev) => ({
      ...prev,
      [field]: textRef.current,
    }));

    if (i >= text.length) clearInterval(interval);
  }, 25);
};

export const handleEnhanceField = async ({
  field,
  newTask,
  setNewTask,
  setShowReload,
  setLoadingTitle,
  setLoadingDesc,
}) => {
  const localKey = `original${field.charAt(0).toUpperCase() + field.slice(1)}`;

  if (!localStorage.getItem(localKey)) {
    localStorage.setItem(localKey, newTask[field]);
  }

  const original = localStorage.getItem(localKey);
  if (!original || original.length < 3) return;

  if (field === 'title') setLoadingTitle(true);
  else setLoadingDesc(true);

  try {
    const result = await enhanceTextWithAI(
      field === 'title' ? original : '',
      field === 'description' ? original : ''
    );

    const improved = field === 'title' ? result?.enhancedTitle : result?.enhancedDescription;

    if (improved && typeof improved === 'string') {
      animateTyping(improved, field, setNewTask);
      setShowReload((prev) => ({ ...prev, [field]: true }));
    }
  } catch (err) {
    alert('AI Enhance failed. Check console for details.');
    console.error(err);
  } finally {
    if (field === 'title') setLoadingTitle(false);
    else setLoadingDesc(false);
  }
};

export const handleReload = (field, setNewTask) => {
  const original = localStorage.getItem(
    `original${field.charAt(0).toUpperCase() + field.slice(1)}`
  );
  if (original) {
    setNewTask((prev) => ({ ...prev, [field]: original }));
  }
};
