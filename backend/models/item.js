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
  stat: {
    type: String,
    enum: ["hunger", "happiness", "health", "coins", "xp", null],
    required: false, // not all items will necessarily affect stats
  },
  effect: {
    type: Number,
    default: 1, // how much it changes the stat
  },
  price: {
    type: Number,
    default: 0, // store cost (in coins)
  },
  description: {
    type: String,
  }
}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);