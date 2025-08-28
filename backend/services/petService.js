import { Pet } from "../models/pet.js";
import { applyPetDecay } from "../utils/petUtils.js";

// Award XP

export const awardXP = async (userId, amount) => {
  let pet = await Pet.findOne({ owner: userId, status: "alive" });
  if (!pet) throw new Error("Pet not found");

  pet = applyPetDecay(pet);
  if (pet.status === "expired") throw new Error("Cannot add XP to expired pet");

  const hasDoubleXP = pet.activePowerups.some(
    (p) => p.type === "doubleXP" && new Date(p.expiresAt).getTime() > Date.now()
  );

  const finalAmount = hasDoubleXP ? amount * 2 : amount;

  pet.experience.current += finalAmount;

  while (pet.experience.current >= pet.experience.required) {
    pet.experience.current -= pet.experience.required;
    pet.level += 1;
    pet.experience.required = Math.floor(pet.experience.required * 1.25);
  }

  await pet.save();

  return { finalAmount, pet };
};

// Award coins

export const awardCoins = async (userId, amount) => {
  let pet = await Pet.findOne({ owner: userId, status: "alive" });
  if (!pet) throw new Error("Pet not found");

  pet = applyPetDecay(pet);
  if (pet.status === "expired") throw new Error("Cannot add coins to expired pet");

  const hasDoubleCoins = pet.activePowerups.some(
    (p) => p.type === "doubleCoins" && new Date(p.expiresAt).getTime() > Date.now()
  );

  const finalAmount = hasDoubleCoins ? amount * 2 : amount;
  pet.coins = Math.min(998, pet.coins + finalAmount);

  await pet.save();

  return { finalAmount, pet };
};