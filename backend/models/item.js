import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    enum: ["food", "toy", "medicine", "powerup", "misc"],
    required: true,
  },
  effects: {
    type: [
      {
        stat: {
          type: String,
          enum: ["hunger", "happiness", "health", "coins", "xp"],
        },
        amount: Number,
      },
    ],
    default: [],
  },
  conditions: {
    type: [
      {
        condition: {
          type: String,
          enum: ["isSick", "isPooped"], // add more conditions later if need be
          required: true,
        },
        setTo: {
          type: Boolean,
          required: true,
        },
      },
    ],
    default: [],
  },
  powerup: {
    type: {
      type: String,
      enum: ["statFreeze", "doubleCoins", "doubleXP"], // add more later if need be
    },
    duration: Number, // in ms, e.g. 30 * 60 * 1000 (that equals 30 mins)
    default: null // items that aren't powerups don't need a powerup field
  },
  price: {
    type: Number,
    default: 0, // price in coins
  },
  description: {
    type: String,
  }
}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);