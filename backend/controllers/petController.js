import { Pet } from "../models/pet.js";
import { applyPetDecay } from "../utils/petUtils.js";

// POST create new pet
export const createPet = async (req, res) => {

  try {

    const { name } = req.body;

    // Find user's current pet
    let existingPet = await Pet.findOne({ owner: req.user._id }).sort({ createdAt: -1 });

    if (existingPet) {
      existingPet = applyPetDecay(existingPet);

      if (existingPet.status === "alive") {
        return res.status(400).json({ message: "You already have a living pet!" });
      }
    }

    // Create pet
    const newPet = await Pet.create({
      owner: req.user._id,
      name: name || "Pomodoro",
    });

    res.status(201).json(newPet);

  } catch (error) {

    console.error("Error creating pet:", error);

    res.status(500).json({ message: "Server error" });

  }
};

// GET current pet
export const getPet = async (req, res) => {
  
  try {
    // Find pet by user
    let pet = await Pet.findOne({ owner: req.user._id });

    if (!pet) {
      return res.status(404).json({ message: "No active pet found" });
    }

    // Apply natural decay for hunger, happiness, health
    pet = applyPetDecay(pet);

    // Save changes with updated stats
    await pet.save();

    res.json(pet);

  } catch (error) {

    console.error("Error fetching pet:", error);
    
    res.status(500).json({ message: "Server error" });

  }
};

// ================ PET INVENTORY ==================

// GET inventory
export const getInventory = async (req, res) => {
  try {
    const pet = await Pet.findOne({ owner: req.user._id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Apply decay to make sure stats are up to date
    applyPetDecay(pet);
    await pet.save();

    res.json(pet.inventory);

  } catch (error) {
    
    res.status(500).json({ message: "Failed to fetch inventory", error });
  }
};

// PATCH add item
export const addItem = async (req, res) => {
  try {
    const { itemName, category, quantity } = req.body;

    if (!itemName || !category || !quantity) {
      return res.status(400).json({ message: "Item name, category and quantity required" });
    }

    const pet = await Pet.findOne({ owner: req.user._id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Check if item already exists
    const existingItem = pet.inventory.find((item) => item.itemName === itemName);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      pet.inventory.push({ itemName, category, quantity });
    }

    await pet.save();
    res.json({ message: "Item(s) added", inventory: pet.inventory });
  } catch (error) {
    res.status(500).json({ message: "Failed to add item", error });
  }
};

// PATCH remove item
export const removeItem = async (req, res) => {
  try {
    const { itemName, quantity = 1 } = req.body;

    if (!itemName) {
      return res.status(400).json({ message: "Item name required" });
    }

    const pet = await Pet.findOne({ owner: req.user._id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const item = pet.inventory.find((item) => item.itemName === itemName);
    if (!item) {
      return res.status(404).json({ message: "Item not found in inventory" });
    }

    item.quantity -= quantity;

    // If quantity <= 0, remove item entirely
    if (item.quantity <= 0) {
      pet.inventory = pet.inventory.filter((i) => i.itemName !== itemName);
    }

    await pet.save();
    res.json({ message: "Item removed", inventory: pet.inventory });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error });
  }
};