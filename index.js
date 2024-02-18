const express = require("express");
const app = express();
const PORT = process.env.PORT || 3004;

// Mock post data
let posts = [];

app.use(express.json());

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
app.post("/posts", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update an existing post
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  posts = posts.map((post) =>
    post.id === id ? { ...post, ...updatedPost } : post
  );
  res.json(updatedPost);
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Post service is running on port ${PORT}`);
});
