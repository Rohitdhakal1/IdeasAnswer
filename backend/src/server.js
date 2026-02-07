const express = require("express");

const app = express();

app.use(express.json()); 


app.get("/", (req, res) => {
  res.send("Hello, IdeasAnswer backend is running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

