import { Exercise } from "../models/exercise.js";
import { awardXP, awardCoins } from "../services/petService.js";

// POST create a new exercise (teacher only)
export const createExercise = async (req, res) => {
  try {
    const { title, classroomCode, questions, totalCoins, totalXP } = req.body;

    if (!title || !classroomCode || !questions || !totalCoins || !totalXP) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exercise = new Exercise({
      title,
      classroomCode,
      questions,
      totalCoins,
      totalXP,
      createdBy: req.user._id,
    });

    await exercise.save();
    res.status(201).json({ message: "Exercise created", exercise });
  } catch (error) {
    res.status(500).json({ message: "Failed to create exercise", error });
  }
};

// GET exercises for a given classroom
export const getExercisesByClassroom = async (req, res) => {
  try {
    const { classroomCode } = req.params; // classroomCode is passed along in the URL as params

    const exercises = await Exercise.find({ classroomCode }).select(
      "-questions.correctAnswer" // hide correct answers from students
    );

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises", error });
  }
};

// Submit answers and assign coins/xp
export const submitExercise = async (req, res) => {
  try {
    const { exerciseId } = req.params; // exerciseId comes from params (passed along in URL)
    const { answers } = req.body; // answers: [{ questionIndex: 0, answer: 'a' }, ...]

    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    let correctCount = 0;
    exercise.questions.forEach((q, idx) => {
      if (answers[idx]?.answer === q.correctAnswer) correctCount++;
    });

    const coinsPerQuestion = exercise.totalCoins / exercise.questions.length;
    const xpPerQuestion = exercise.totalXP / exercise.questions.length;

    const coinsGained = Math.round(correctCount * coinsPerQuestion);
    const xpGained = Math.round(correctCount * xpPerQuestion);

    const coinResult = await awardCoins(req.user._id, coinsGained);
    const xpResult = await awardXP(req.user._id, xpGained);

    res.status(200).json({
      message: "Exercise submitted",
      correctCount,
      totalQuestions: exercise.questions.length,
      coinsGained: coinResult.finalAmount,
      xpGained: xpResult.finalAmount,
      pet: xpResult.pet, // both return the same pet, so xpResult.pet is enough
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to submit exercise", error });
  }
};