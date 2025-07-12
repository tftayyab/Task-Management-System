import api from '../api';

export const enhanceTextWithAI = async (text) => {
  try {
    const res = await api.post('/ai/enhance', { text });
    return res.data.improved;
  } catch (err) {
    console.error('AI Enhance Error:', err.response?.data || err.message);
    throw new Error('Failed to enhance text');
  }
};
