import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js"; 
import Note from "./models/Note.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";



dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cookieParser()); // need to add always before routes 

app.use('/notes',noteRoutes);
app.use('/auth',authRoutes);




connectDB();

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

