import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    initials: {
      type: String,
      required: [true, "First and last name initials are required"],
      minlength: 2,
      maxlength: 6,
      trim: true,
      set: (value) => value.toUpperCase(),
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@osloskolen\.no$/,
        "Email must end with @osloskolen.no",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    classroomCode: {
      type: String,
      required: [true, "Classroom code is required"],
      trim: true,
      set: (value) => value.toUpperCase(),
      match: [
        /^[A-Z]{3}-\d{4}$/,
        "Classroom code must be in format XXX-0000",
      ],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);