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
  res.json({ message: "Hello from Express!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
