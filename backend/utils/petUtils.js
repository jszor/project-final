export function applyPetDecay(pet) {
  if (!pet || pet.status === "expired") return pet;

  const now = new Date();
  const hoursElapsed = Math.floor((now - pet.lastUpdated) / (1000 * 60 * 60));

  if (hoursElapsed >= 12) {
    const cycles = Math.floor(hoursElapsed / 12);

    // decrease stats by cycles
    pet.hunger = Math.max(0, pet.hunger - cycles);
    pet.happiness = Math.max(0, pet.happiness - cycles);
    pet.health = Math.max(0, pet.health - cycles);

    // expire if any stat hits 0
    if (pet.health === 0 || pet.hunger === 0 || pet.happiness === 0) {
      pet.status = "expired";
      pet.expiredAt = now;
    }

    // Carry over leftover hours until the next cycle
    const newLastUpdated = new Date(pet.lastUpdated.getTime() + cycles * 12 * 60 * 60 * 1000);
    pet.lastUpdated = newLastUpdated;
  }

  return pet;
}