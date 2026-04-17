/**
Name:
Date:
Description:
Bugs:
Reflection (including LLM use):
*/

import express from "express";

const app = express();
const port = process.env.PORT || 3000; // Use Codespaces port

app.get("/", (req, res) => {
  res.send('Specify /add?x=val1&y=val2, /subtract?x=val1&y=val2, etc.');
});

app.get("/add", (req, res) => {
  let sum = parseFloat(req.query.x) + parseFloat(req.query.y);
  res.json({sum: sum, x: req.query.x, y: req.query.y});
});

app.get("/pow", (req, res) => {
  let pow = req.query.x ** req.query.y;
  res.json({pow: pow, x: req.query.x, y: req.query.y});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
