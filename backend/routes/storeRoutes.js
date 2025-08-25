import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { getStoreItems, getStoreItemById, buyItem } from "../controllers/storeController.js"

const router = express.Router();

// Store
router.get("/", authenticateUser, getStoreItems);
router.get("/:id", authenticateUser, getStoreItemById);
router.post("/buy", authenticateUser, buyItem);

export default router;