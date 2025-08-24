// Pet decay util

export const applyPetDecay = (pet) => {
  if (!pet || pet.status === "expired") return pet;

  const now = new Date();

  // Remove expired power-ups (lazy evaluation)
  if (pet.activePowerups && pet.activePowerups.length > 0) {
    pet.activePowerups = pet.activePowerups.filter(
      (p) => p.expiresAt > now
    );
  } 

  // StatFreeze: skip decay and update time
  const statFreeze = pet.activePowerups?.find(
    (p) => p.type === "statFreeze" && p.expiresAt > now
  );

  if (statFreeze) {
    // While frozen, prevent any decay from accumulating
    pet.lastUpdated = now;
    return pet;
  }

  // calculate hours elapsed since last update
  const hoursElapsed = Math.floor((now - pet.lastUpdated) / (1000 * 60 * 60));

  if (hoursElapsed < 6) {
    // Not enough time has passed to trigger any decay
    return pet;
  }

  // Figure out how many full decay cycles have passed
  const hungerCycles = Math.floor(hoursElapsed / 12);

  const happinessCycles = pet.conditions.isPooped
    ? Math.floor(hoursElapsed / 6)
    : Math.floor(hoursElapsed / 12);

  const healthCycles = pet.conditions.isSick
    ? Math.floor(hoursElapsed / 6)
    : Math.floor(hoursElapsed / 12);

  // If no cycles completed, do nothing (i.e. carry leftover hours forward)
  if (hungerCycles === 0 && happinessCycles === 0 && healthCycles === 0) {
    return pet;
  }

  // Apply any decay
  pet.hunger = Math.max(0, pet.hunger - hungerCycles);
  pet.happiness = Math.max(0, pet.happiness - happinessCycles);
  pet.health = Math.max(0, pet.health - healthCycles);

  // expire pet if any stat hits 0
  if (pet.health === 0 || pet.hunger === 0 || pet.happiness === 0) {
    pet.status = "expired";
    pet.expiredAt = now;
  }

  // update lastUpdated to the most recent decay boundary (i.e. carry over leftover hours)
  const cyclesElapsed = Math.floor(hoursElapsed / 6);
  const newLastUpdated = new Date(pet.lastUpdated.getTime() + cyclesElapsed * 6 * 60 * 60 * 1000);
  pet.lastUpdated = newLastUpdated;

  return pet;

};

