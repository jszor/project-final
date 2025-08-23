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

    // Create new pet
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