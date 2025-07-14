import api from '../api';

export const enhanceTextWithAI = async (title, description) => {
  try {
    const res = await api.post('/ai/enhance', {
      title,
      description,
    });

    return {
      enhancedTitle: res.data.enhancedTitle || '',
      enhancedDescription: res.data.enhancedDescription || '',
    };
  } catch (err) {
    console.error('AI Enhance Error:', err.response?.data || err.message);
    throw new Error('Failed to enhance title and description');
  }
};
