import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware.js";
import redisClient from "../config/redis.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    userId: req.user.id,
  });

  const keys = await redisClient.keys(`user:${req.user.id}:question:*`);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  res.json(note);
});

router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const updateNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true },
  );

  const keys = await redisClient.keys(`user:${req.user.id}:question:*`);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  res.json(updateNote);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);

  const keys = await redisClient.keys(`user:${req.user.id}:question:*`);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  res.json({ message: "Note deleted" });
});

export default router;
