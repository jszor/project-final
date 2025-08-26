import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { createExercise, getExercisesByClassroom, submitExercise } from "../controllers/exerciseController.js";

const router = express.Router();

// Create exercise (admin/teacher only)
router.post("/", authenticateUser, createExercise);

// Fetch exercises by class code
router.get("/:classroomCode", authenticateUser, getExercisesByClassroom);

// Submit exercise
router.post("/:exerciseId/submit", authenticateUser, submitExercise);

export default router;