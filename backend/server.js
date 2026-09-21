const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;
const APP_NAME = process.env.APP_NAME || "Docker Deployment App";

app.get("/", (req, res) => {
  res.send(`
    <h1>${APP_NAME}</h1>
    <p>Docker deployment is working!</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
