// seeds/seedExercises.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { Exercise } from "../models/exercise.js";

dotenv.config();

const classroomCode = "ITA-2025";

const exercises = [
  // --- -ARE verbs exercise ---
  {
    title: "Regular Verbs -ARE",
    classroomCode,
    totalCoins: 25,
    totalXP: 25,
    questions: [
      { questionText: "Io ___ (parlare) italiano ogni giorno.", options: ["parlo", "parla", "parliamo", "parlate"], correctAnswer: "a" },
      { questionText: "Tu ___ (mangiare) la pizza stasera?", options: ["mangia", "mangio", "mangi", "mangiamo"], correctAnswer: "c" },
      { questionText: "Lui ___ (cantare) una canzone.", options: ["canto", "canta", "cantiamo", "cantate"], correctAnswer: "b" },
      { questionText: "Noi ___ (giocare) a calcio ogni sabato.", options: ["giocano", "giochiamo", "giocate", "giochi"], correctAnswer: "b" },
      { questionText: "Voi ___ (studiare) per l'esame domani.", options: ["studiate", "studiamo", "studiano", "studio"], correctAnswer: "a" },
    ],
  },
  // --- -ERE verbs exercise ---
  {
    title: "Regular Verbs -ERE",
    classroomCode,
    totalCoins: 25,
    totalXP: 25,
    questions: [
      { questionText: "Io ___ (leggere) molti libri.", options: ["legge", "leggi", "leggo", "leggiamo"], correctAnswer: "c" },
      { questionText: "Tu ___ (prendere) l'autobus ogni giorno?", options: ["prendi", "prende", "prendiamo", "prendo"], correctAnswer: "a" },
      { questionText: "Lei ___ (scrivere) una lettera al professore.", options: ["scrivo", "scrive", "scriviamo", "scrivete"], correctAnswer: "b" },
      { questionText: "Noi ___ (vendere) cani e gatti.", options: ["vendiamo", "vendono", "vendo", "vende"], correctAnswer: "a" },
      { questionText: "Voi ___ (chiedere) scusa sempre?", options: ["chiediamo", "chiedo", "chiedete", "chiedono"], correctAnswer: "c" },
    ],
  },
  // --- -IRE verbs exercise ---
  {
    title: "Regular Verbs -IRE",
    classroomCode,
    totalCoins: 25,
    totalXP: 25,
    questions: [
      { questionText: "Io ___ (dormire) da Lorenzo.", options: ["dormo", "dorme", "dormiamo", "dormite"], correctAnswer: "a" },
      { questionText: "Tu ___ (aprire) la finestra?", options: ["apri", "apre", "apriamo", "aprite"], correctAnswer: "a" },
      { questionText: "Lui ___ (partire) domani mattina.", options: ["partono", "partiamo", "parte", "parto"], correctAnswer: "c" },
      { questionText: "Noi ___ (offrire) il caffè a tutti", options: ["offrono", "offro", "offre", "offriamo"], correctAnswer: "d" },
      { questionText: "Voi ___ (sentire) la musica?", options: ["sentiamo", "sentite", "sento", "sente"], correctAnswer: "b" },
    ],
  },
];

const seedExercises = async () => {
  try {
    await connectDB();

    // Delete existing exercises for this classroom to prevent duplicates
    await Exercise.deleteMany({ classroomCode });
    console.log("Existing exercises deleted");

    // Insert new exercises
    await Exercise.insertMany(exercises);
    console.log("Exercises seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding exercises:", error);
    process.exit(1);
  }
};

seedExercises();