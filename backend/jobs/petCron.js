// jobs/petCron.js

import cron from "node-cron";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { Pet } from "../models/pet.js";
import { applyPetDecay } from "../utils/petUtils.js";

dotenv.config();

// Connect to DB
connectDB();

// Schedule cron job to run every hour at minute 0
cron.schedule("0 * * * *", async () => {
  console.log(`[${new Date().toISOString()}] Running pet hourly update...`);

  try {
    const pets = await Pet.find({ status: "alive" });

    for (let pet of pets) {
      const updatedPet = applyPetDecay(pet);
      await updatedPet.save();
    }

    console.log(`[${new Date().toISOString()}] Pet updates complete.`);

  } catch (err) {
    console.error("Error running pet hourly update:", err);
  }
});