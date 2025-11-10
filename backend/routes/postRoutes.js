import express from "express";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const auth = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const post = await Post.create({ user: req.user, text: req.body.text });
    const populated = await post.populate("user", "name");
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Could not create post" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
