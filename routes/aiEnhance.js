const express = require('express');
const axios = require('axios');
const verifyToken = require('../middleware/verifyToken');
const asyncWrapper = require('../middleware/asyncWrapper');

const router = express.Router();
router.use(verifyToken);

router.post(
  '/enhance',
  asyncWrapper(async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.length < 3) {
      return res.status(400).json({ message: 'Valid text is required' });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ message: 'Gemini API key is missing' });
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are being used as an API inside a task management app. Your job is to improve how users write their task titles and descriptions.

The goal is to rewrite the input to be clearer and more helpful — but always sound like something a real person would write, not AI-generated. Don't use generic or robotic language. Make it feel natural, like the user wrote it themselves.

If the input is short or vague, treat it as a task title. Make it specific, and keep it under 6 words. Don’t return multiple options — just one good title. No bullet points or explanations for titles.

If the input is long or detailed, treat it as a task description. Improve it clearly. Use full sentences, organize thoughts clearly. You can use bullet points if helpful.

Return only the improved version — no labels like "Title:" or "Description:", no explanations, just the rewritten text as if someone typed it directly into the app.

Input:  
"${text}"
`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }
      );

      const candidates = response.data?.candidates || [];
      const improved = candidates[0]?.content?.parts?.[0]?.text?.trim() || '';

      if (!improved) {
        return res.status(500).json({ message: 'Gemini did not return any text' });
      }

      res.json({ improved });
    } catch (err) {
      console.error('Gemini error:', err.response?.data || err.message);
      res.status(500).json({ message: 'Gemini API call failed' });
    }
  })
);

module.exports = router;
