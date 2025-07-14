const express = require('express');
const axios = require('axios');
const verifyToken = require('../middleware/verifyToken');
const asyncWrapper = require('../middleware/asyncWrapper');

const router = express.Router();
router.use(verifyToken);

router.post(
  '/enhance',
  asyncWrapper(async (req, res) => {
    const { title, description } = req.body;

    if ((!title || title.length < 3) && (!description || description.length < 3)) {
      return res.status(400).json({
        message: 'Title or description must be at least 3 characters.',
      });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ message: 'Gemini API key is missing' });
    }

    const makePrompt = (type, input) => {
      if (type === 'title') {
        return `You are being used as an API inside a task management app.
                Rewrite this task title to be clear, specific, and under 10 words. Avoid robotic language. Return only the improved title, no explanation.
                Input:
"${input}"`;
      } else {
        return `Rewrite this task description to sound more helpful and clear. Use full sentences and organize info naturally. Bullet points are allowed.
                Just return the improved task description. Do not include explanations, introductions, or extra text.
                Input:
"${input}"`;
      }
    };

    const sendToGemini = async (text) => {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [{ text }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }
      );
      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    };

    const result = {};
    if (title && title.length >= 3) {
      result.enhancedTitle = await sendToGemini(makePrompt('title', title));
    }
    if (description && description.length >= 3) {
      result.enhancedDescription = await sendToGemini(makePrompt('description', description));
    }

    res.json(result);
  })
);

module.exports = router;
