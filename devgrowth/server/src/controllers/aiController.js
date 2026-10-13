const { GoogleGenAI } = require('@google/genai');

const extractGeminiText = (payload) => {
  if (!payload) return '';

  if (typeof payload === 'string') return payload;

  if (payload.text) return payload.text;

  if (Array.isArray(payload.candidates)) {
    const parts = payload.candidates
      .flatMap((candidate) => candidate?.content?.parts || [])
      .map((part) => part?.text)
      .filter(Boolean)
      .join('\n');

    if (parts) return parts;
  }

  return JSON.stringify(payload);
};

const getCareerAdvice = async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: 'A prompt is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: `[Gemini Career Advisor] Focused feedback for: "${prompt.trim()}". Build one production-grade project that demonstrates system design, observability, testing, and strong communication in your README and architecture decisions.`,
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a senior engineering mentor. Give practical, concise advice for a software engineer. Prompt: ${prompt.trim()}`,
    });

    const reply = extractGeminiText(response);
    return res.json({ reply: reply || 'No advice generated.' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to generate AI advice',
      error: error.message,
    });
  }
};

const generateRoadmap = async (req, res) => {
  const { targetRole } = req.body;
  const role = targetRole || 'Full Stack Engineer';

  res.json({
    role,
    milestones: [
      { phase: 'Phase 1: Core Architecture', focus: 'TypeScript, data modeling, and API design' },
      { phase: 'Phase 2: Scale & Systems', focus: 'Caching, distributed workflows, and observability' },
      { phase: 'Phase 3: Production Mastery', focus: 'CI/CD, security, infrastructure, and leadership' },
    ],
  });
};

module.exports = { getCareerAdvice, generateRoadmap };
