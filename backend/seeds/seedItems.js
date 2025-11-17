// seeds/seedItems.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { Item } from "../models/item.js";

dotenv.config();

const items = [
  {
    name: "Peanuts",
    category: "food",
    effects: [{ stat: "hunger", amount: 1 }],
    price: 10,
    description: "A handful of peanuts. Yum!"
  },
  {
    name: "Blueberries",
    category: "food",
    effects: [
      { stat: "hunger", amount: 1 },
      { stat: "health", amount: 1 },
    ],
    price: 18,
    description: "Your pet's favorite healthy snack!"
  },
  {
    name: "Sushi",
    category: "food",
    effects: [{ stat: "hunger", amount: 2 }],
    price: 20,
    description: "A filling portion of freshly made maki. Heavenly!"
  },
  {
    name: "Burrito",
    category: "food",
    effects: [
      { stat: "hunger", amount: 2 },
      { stat: "happiness", amount: 1 },
    ],
    price: 35,
    description: "A juicy burrito for your pet. How nice!"
  },
  {
    name: "Yo-yo",
    category: "toy",
    effects: [{ stat: "happiness", amount: 1 }],
    price: 10,
    description: "A cool yo-yo to keep your pet busy. Neat!"
  },
  {
    name: "Ball",
    category: "toy",
    effects: [{ stat: "happiness", amount: 2 }],
    price: 18,
    description: "A bouncy ball to cheer up your pet. Hooray!"
  },
  {
    name: "Bandage",
    category: "medicine",
    effects: [{ stat: "health", amount: 1 }],
    price: 10,
    description: "A sturdy bandage to heal your pet's wounds. How nifty!"
  },
  {
    name: "Soap",
    category: "medicine",
    conditions: [
      { condition: "isPooped", setTo: false }
    ],
    price: 3,
    description: "A bar of soap to clean up after your pet. Mess be gone!"
  },
  {
    name: "Mugwort",
    category: "medicine",
    effects: [{ stat: "health", amount: 2 }],
    price: 18,
    description: "A bitter herb to boost pet health. Open sesame!"
  },
  {
    name: "Medicine",
    category: "medicine",
    conditions: [
      { condition: "isSick", setTo: false }
    ],
    price: 40,
    description: "A medicinal powder that cures disease. Hallelujah! "
  },
  {
    name: "Double Coins",
    category: "powerup",
    powerup: { type: "doubleCoins", duration: 30 * 60 * 1000 }, // 30 min
    price: 200,
    description: "Earn double coins for 30 minutes."
  },
  {
    name: "Stat Freeze",
    category: "powerup",
    powerup: { type: "statFreeze", duration: 24 * 60 * 60 * 1000 }, // 24 hrs
    price: 75,
    description: "Freeze all pet stats for 24 hours."
  },
];

// Seeding function
const seedItems = async () => {
  try {
    await connectDB();

    // Clear out old items before seeding
    await Item.deleteMany({});
    console.log("Existing items deleted");

    // Insert new items
    await Item.insertMany(items);
    console.log("Items seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding items:", error);
    process.exit(1);
  }
};

seedItems();
