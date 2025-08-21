import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register a new user
// POST /api/auth/register
// Public access

export const registerUser = async (req, res) => {
  const { initials, email, password, classroomCode } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      initials,
      email,
      password: hashedPassword,
      classroomCode,
    });

    // Respond with token
    res.status(201).json({
      _id: user._id,
      initials: user.initials,
      email: user.email,
      classroomCode: user.classroomCode,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Log in an existing user
// POST api/auth/login
// Public access

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Respond with token
    res.json({
      _id: user._id,
      initials: user.initials,
      email: user.email,
      classroomCode: user.classroomCode,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile info (minus password)
// GET api/auth/profile
// Private access

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
