import { Pet } from "../models/pet.js";
import { applyPetDecay } from "../utils/petUtils.js";

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