import { Pet } from "../models/pet.js";
import { Item } from "../models/item.js"
import { User } from "../models/user.js"
import { applyPetDecay } from "../utils/petUtils.js";
import { awardXP, awardCoins } from "../services/petService.js";

// ================= PET =====================

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
    // Find pet by user with status "alive"
    let pet = await Pet.findOne({ owner: req.user._id, status: "alive" });

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
    const pet = await Pet.findOne({ owner: req.user._id, status: "alive" });
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

    const pet = await Pet.findOne({ owner: req.user._id, status: "alive" });
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
    const { itemName, quantity } = req.body;

    if (!itemName) {
      return res.status(400).json({ message: "Item name required" });
    }

    const pet = await Pet.findOne({ owner: req.user._id, status: "alive" });
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

// ================ GAMPEPLAY ====================

// PATCH /api/pet/use-item
export const useItem = async (req, res) => {
  try {
    const { itemName } = req.body;

    if (!itemName) {
      return res.status(400).json({ message: "Item name required" });
    }

    let pet = await Pet.findOne({ owner: req.user._id, status: "alive" });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Apply decay before any changes
    pet = applyPetDecay(pet);

    if (pet.status === "expired") {
      return res.status(400).json({ message: "Cannot use item on an expired pet" });
    }

    // Find item in inventory
    const inventoryItem = pet.inventory.find(
      (item) => item.itemName === itemName && item.quantity > 0
    );
    if (!inventoryItem) {
      return res.status(404).json({ message: "Item not found in inventory" });
    }

    // Fetch item details from Item collection in DB
    const storeItem = await Item.findOne({ name: itemName });
    if (!storeItem) {
      return res.status(404).json({ message: "Item definition not found" });
    }

     // Apply all stat effects
     let effectApplied = false;

     storeItem.effects?.forEach(({ stat, amount }) => {
      if (["hunger", "happiness", "health"].includes(stat)) {
        const before = pet[stat];
        pet[stat] = Math.min(5, Math.max(0, pet[stat] + amount)); // cap 0-5
        if (pet[stat] !== before) effectApplied = true;
      } else if (["coins", "xp"].includes(stat)) {
        const before = pet[stat];
        pet[stat] = Math.max(0, pet[stat] + amount); // no cap, but no negative values
        if (pet[stat] !== before) effectApplied = true;
      }
    });

    // Apply all condition effects
    let conditionApplied = false;

    storeItem.conditions?.forEach(({ condition, setTo }) => {
      if (pet.conditions && condition in pet.conditions) {
        const before = pet.conditions[condition];
        pet.conditions[condition] = setTo;
        if (before !== setTo) conditionApplied = true;
      }
    });

    // Apply power-up
    let powerupApplied = false;

    if (storeItem.powerup?.type && storeItem.powerup?.duration) {

      // check if powerup is already active
      const alreadyActive = pet.activePowerups.find(
        (p) => 
          p.type === storeItem.powerup.type && 
          new Date(p.expiresAt).getTime() > Date.now()
      );

      if (!alreadyActive) {
        pet.activePowerups.push({
          type: storeItem.powerup.type,
          expiresAt: new Date(Date.now() + storeItem.powerup.duration),
        });
        powerupApplied = true;
      } else {
        return res.status(400).json(
          { message: `${storeItem.powerup.type} is already active.` }
        );
      }
    }

    // Only decrement inventory if something happened
    if (effectApplied || conditionApplied || powerupApplied) {
      inventoryItem.quantity -= 1;
      if (inventoryItem.quantity <= 0) {
        pet.inventory = pet.inventory.filter((i) => i.itemName !== itemName);
      }
    } else {
      return res.status(400).json({ message: `${itemName} had no effect.` });
    }

    await pet.save();

    res.json({
      message: `${itemName} used on pet`,
      pet,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to use item", error });
  }
};

// ================ PROGRESSION ======================

// PATCH /api/pet/xp
export const addXP = async (req, res) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "XP amount must be a positive integer" });
    }

    const result = await awardXP(req.user._id, amount);

    res.json({
      message: `Added ${result.finalAmount} XP`,
      pet: result.pet,
    });
  } catch (error) {
    if (error.message === "Pet not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("expired")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to add XP", error });
  }
};

// PATCH /api/pet/coins
export const addCoins = async (req, res) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Coin amount must be a positive integer" });
    }

    const result = await awardCoins(req.user._id, amount);

    res.json({
      message: `Added ${result.finalAmount} coins`,
      pet: result.pet,
    });
  } catch (error) {
    if (error.message === "Pet not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("expired")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to add coins", error });
  }
};

// ==================== LEADERBOARD =======================

// GET /api/pet/leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    // Fetch the current user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all user IDs in the same class
    const classUserIds = await User.find({ classroomCode: user.classroomCode }).distinct("_id");

    // Fetch pets only from those users
    let pets = await Pet.find({ status: "alive", owner: { $in: classUserIds } })
      .populate({
        path: "owner",
        select: "initials classroomCode",
      })
      .sort({ level: -1, "experience.current": -1, coins: -1 }) // ranking order priority: first by lvl, then xp, then coins
      .limit(20);

    // Add rank to each pet
    pets = pets.map((pet, index) => ({
      rank: index + 1,
      ...pet.toObject(),
    }));

    res.json({
      message: "Leaderboard retrieved",
      classroomCode: user.classroomCode,
      leaderboard: pets,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error });
  }
};