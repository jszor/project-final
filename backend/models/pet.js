import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      default: "Pomodoro",
    },
    health: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    happiness: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    hunger: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    coins: {
      type: Number,
      default: 0,
    },
    experience: {
      current: {
        type: Number,
        default: 0,
      },
      required: {
        type: Number,
        default: 100,
      },
    },
    level: {
      type: Number,
      default: 1,
    },
    inventory: [
      {
        itemName: String,
        category: {
          type: String,
          enum: ["food", "toy", "medicine", "powerup", "misc"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["alive", "expired"],
      default: "alive",
    },
    bornAt: {
      type: Date,
      default: Date.now,
    },
    expiredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Pet = mongoose.model("Pet", petSchema);