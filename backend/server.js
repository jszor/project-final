import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

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

// Endpoint for registering a user.
// Endpoint for logging in a user.
// Endpoint for retrieving the data of an authenticated user.

app.use("/api/auth", authRoutes);


// Endpoint for fetching inventory.

// Endpoint for fething all exercise modules.

// Endpoint for fetching pet stats.

// Endpoint for fetching user stats. 


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
