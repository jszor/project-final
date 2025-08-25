import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { getStoreItems, getStoreItemById, buyItem } from "../controllers/storeController.js"

const router = express.Router();

// Store
router.get("/store", authenticateUser, getStoreItems);
router.get("/store/:id", authenticateUser, getStoreItemById);
router.post("/store/buy", authenticateUser, buyItem);

export default router;