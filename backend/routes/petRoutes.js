import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createPet,
  getPet,
  useItem,
  addXP,
  addCoins,
  getInventory,
  addItem,
  removeItem,
  getLeaderboard
} from "../controllers/petController.js";

const router = express.Router();

// Pet lifecycle
router.post("/", authenticateUser, createPet);
router.get("/", authenticateUser, getPet);

// Gameplay
router.patch("/use-item", authenticateUser, useItem);

// Progression
router.patch("/xp", authenticateUser, addXP);
router.patch("/coins", authenticateUser, addCoins);

// Inventory
router.get("/inventory", authenticateUser, getInventory);
router.patch("/inventory/add", authenticateUser, addItem);
router.patch("/inventory/remove", authenticateUser, removeItem);

// Leaderboard
router.get("/leaderboard", authenticateUser, getLeaderboard);

export default router;