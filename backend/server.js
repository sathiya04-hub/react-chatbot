const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // ✅ Demo-friendly, lower quota
      messages: [
        { role: "system", content: "You are a helpful multilingual assistant." },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));