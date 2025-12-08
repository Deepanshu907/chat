import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

export const handleChat = async (req, res) => {
  const userMessage = req.body.message;
  console.log("📥 Received message from frontend:", userMessage);

  try {
    // Use the exact model your key supports
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(userMessage);
    const response = result.response.text().trim();

    console.log("🤖 Gemini Response:", response);

    res.json({ reply: response });
  } catch (err) {
    console.error("❌ Gemini error:", err);
    return res.status(500).json({ error: "Error communicating with Gemini API" });
  }
};
