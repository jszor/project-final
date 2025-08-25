import { Pet } from "../models/pet.js";
import { Item } from "../models/item.js"

// GET all items from store
export const getStoreItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store items", error });
  }
};

// GET fetch a single item by ID
export const getStoreItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store item", error });
  }
};

// POST buy item from store
export const buyItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user._id; // comes from authenticateUser middleware

    const pet = await Pet.findOne({ owner: userId });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (pet.coins < item.price) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    // Deduct coins
    pet.coins -= item.price;

    // Check if pet already has this item in inventory
    const existingItem = pet.inventory.find(
      (invItem) => invItem.itemName === item.name
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      pet.inventory.push({
        itemName: item.name,
        category: item.category,
        quantity: 1,
      });
    }

    await pet.save();

    res.json({
      message: `Successfully bought ${item.name}`,
      pet,
    });
  } catch (error) {
    res.status(500).json({ message: "Error buying item", error });
  }
};
