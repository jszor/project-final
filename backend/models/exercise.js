import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { 
    type: String, 
    required: true, 
  },
  options: {
    type: [String], // array of 4 options (a, b, c, d)
    validate: [arr => arr.length === 4, "Must provide exactly 4 options"],
    required: true,
  },
  correctAnswer: {
    type: String,
    enum: ["a", "b", "c", "d"],
    required: true,
  },
});

const exerciseSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
    },
    classroomCode: {
      type: String,
      required: true,
      match: /^[A-Z]{3}-\d{4}$/,
    },
    questions: {
      type: [questionSchema],
      required: true,
      validate: [arr => arr.length > 0, "Must have at least one question"],
    },
    totalCoins: { 
      type: Number, 
      default: 0 
    },
    totalXP: { 
      type: Number, 
      default: 0 
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

export const Exercise = mongoose.model("Exercise", exerciseSchema);