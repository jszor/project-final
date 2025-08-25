import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import "./jobs/petCron.js";  

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

// Endpoint for creating a pet.
// Endpoint for fetching pet.
// Endpoint for fetching pet inventory.
// Endpoint for adding item to inventory.
// Endpoint for removing item from inventory. 
// Endpoint for using items on pet.
// Endpoint for adding XP to pet.
// Endpoint for adding coins to pet.
// Endpoint for calculating position on leaderboard.

app.use("/api/pet", petRoutes);

// Endpoint for getting all store items
// Endpoint for getting single store item by id
// Endpoint for buying item from store

app.use("/api/store", storeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
