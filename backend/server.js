import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// List all API endpoints for documentation

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to the BrainPet API!",
    endpoints: endpoints,
  });
});

// Set up endpoints



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
