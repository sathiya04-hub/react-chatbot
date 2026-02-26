
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/models/google/flan-t5-large",
      { inputs: req.body.message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    res.json({
      reply: response.data[0]?.generated_text || "No response",
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));