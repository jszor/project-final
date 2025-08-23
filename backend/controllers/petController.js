import { Pet } from "../models/pet.js";
import { applyPetDecay } from "../utils/petUtils.js";

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