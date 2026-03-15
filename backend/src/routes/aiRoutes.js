import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Note from "../models/Note.js";
import redisClient from "../config/redis.js";

const router = express.Router();

// we slect chunks i think its do better jobs at sending ai notes better way
// solve overhead input problem easily
//helper chunk faster
function chunkText(text, chunkSize = 1000) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
}

router.post("/query-notes", authMiddleware, async (req, res) => {
  try {
    const { question } = req.body;

    //If two users ask same question → different keys.

    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    const cacheKey = `user:${req.user.id}:question:${question}`;

    const cacheAnswer = await redisClient.get(cacheKey);

    if (cacheAnswer) {
      return res.json({
        source: "cache",
        finalAnswer: cacheAnswer,
      });
    }

    // fetch notes for logged-in user
    const notes = await Note.find({ userId: req.user.id });

    if (!notes.length) {
      return res.json({ message: "no note found in this user" });
    }

    // notes convert to plain text from object
    const combineNotes = notes
      .map((note, index) => `Note ${index + 1}:\n${note.content}`)
      .join("\n\n");

    //split into chunks
    const chunks = chunkText(combineNotes, 1000);

    let answers = []; // send each chunk to ollama to summarize

    for (const chunk of chunks) {
      const prompt = `Use ONLY the notes below to answer the user's question.
                            If the answer is not found in the notes, say:
                                "Answer not found in notes."
                      
                      Notes:
                      ${chunk}
                      QUESTION:
                      ${question}`;

      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3",
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Ollama request failed");
      }

      const data = await response.json();

      if (data.response) {
        answers.push(data.response.trim());
      }
    }

    const finalAnswer = answers.filter(Boolean).join("\n\n");

    await redisClient.set(cacheKey, finalAnswer, {
      EX: 3600,
    });

    // send final to ai
    res.json({
      finalAnswer,
    });
  } catch (error) {
    console.error("AI Route error:", error);
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
});

export default router;
