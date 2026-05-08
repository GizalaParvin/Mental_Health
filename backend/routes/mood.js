const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
let GoogleGenAI;
try {
  const genai = require('@google/genai');
  GoogleGenAI = genai.GoogleGenAI;
} catch(e) {}

// Helper function: Basic Rule-Based Fallback
const basicRuleFallback = (message) => {
  const lowercaseMsg = message.toLowerCase();
  
  if (lowercaseMsg.includes('sad') || lowercaseMsg.includes('depress') || lowercaseMsg.includes('unhappy') || lowercaseMsg.includes('cry')) {
    return "I'm so sorry you're feeling down. Try doing something small that brings comfort. I'm here for you.";
  } else if (lowercaseMsg.includes('anxious') || lowercaseMsg.includes('panic') || lowercaseMsg.includes('worry')) {
    return "Anxiety is tough. Try slow, deep breaths. You are safe right now.";
  } else if (lowercaseMsg.includes('angry') || lowercaseMsg.includes('mad') || lowercaseMsg.includes('frustrat')) {
    return "It makes sense you are frustrated. It helps to channel that energy into writing or exercising.";
  } else if (lowercaseMsg.includes('hello') || lowercaseMsg.match(/^hi$/)) {
    return "Hello friend! I am Serenity AI. How can I support you today?";
  }
  return "I'm here to listen. Could you tell me more about how you're feeling?";
};


router.post('/', auth, async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Attempt to use Google Gemini AI if API Key is configured
  if (GoogleGenAI && process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are Serenity AI, a compassionate, empathetic, and gentle mental health companion assistant for a web application.
      
      User Message: "${message}"
      
      Instructions: Respond in 1 to 3 short sentences. Be incredibly supportive, validating, and calming. Never provide medical advice, just listen and suggest simple grounding techniques if they are stressed. Use a warm, human-like conversational tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return res.json({ reply: response.text });
      
    } catch (error) {
      console.error("Gemini AI generation failed, falling back to basic rules:", error.message);
      // Fallback
    }
  }

  // Fallback if no API key or AI generation fails
  res.json({ reply: basicRuleFallback(message) });
});

module.exports = router;
