import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Optional: serve frontend

// Replace YOUR_API_KEY_HERE with your OpenAI API key
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      })
    });

    const data = await response.json();
    res.send(data.choices[0].message.content);
  } catch(err) {
    res.status(500).send("Error calling OpenAI API");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
