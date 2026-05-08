const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenAI } = require('@google/genai');

router.post('/', auth, async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ reply: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.json({ reply: 'I am a placeholder bot! Please add your GEMINI_API_KEY to the backend .env file to chat with me.' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: "You are a gentle and supportive mental health companion called Serenity. Keep your answers brief, empathetic, and encouraging."
            }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ reply: 'I am sorry, I am having trouble connecting right now.' });
    }
});

module.exports = router;
