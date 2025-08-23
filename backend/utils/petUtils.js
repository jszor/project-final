// Pet decay util

export const applyPetDecay = (pet) => {
  if (!pet || pet.status === "expired") return pet;

  const now = new Date();
  const hoursElapsed = Math.floor((now - pet.lastUpdated) / (1000 * 60 * 60));

  if (hoursElapsed >= 6) { 
    // calculate elapsed cycles for each stat
    let hungerCycles = Math.floor(hoursElapsed / 12);
    
    let happinessCycles = pet.conditions.isPooped
      ? Math.floor(hoursElapsed / 6)
      : Math.floor(hoursElapsed / 12);
    
      let healthCycles = pet.conditions.isSick
      ? Math.floor(hoursElapsed / 6)
      : Math.floor(hoursElapsed / 12);

    // decrease stats by number of elapsed cycles
    pet.hunger = Math.max(0, pet.hunger - hungerCycles);
    pet.happiness = Math.max(0, pet.happiness - happinessCycles);
    pet.health = Math.max(0, pet.health - healthCycles);

    // expire if any stat hits 0
    if (pet.health === 0 || pet.hunger === 0 || pet.happiness === 0) {
      pet.status = "expired";
      pet.expiredAt = now;
    }

    // update lastUpdated to the most recent decay boundary (i.e. carry over leftover hours)
    const cyclesElapsed = Math.floor(hoursElapsed / 6);
    const newLastUpdated = new Date(pet.lastUpdated.getTime() + cyclesElapsed * 6 * 60 * 60 * 1000);
    pet.lastUpdated = newLastUpdated;
  }

  return pet;
}