// Pet decay util

export const applyPetDecay = (pet) => {
  if (!pet || pet.status === "expired") return pet;

  const now = new Date();
  const MS_PER_HOUR = 1000 * 60 * 60;

  // Poop logic
  const POOP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
  const MIN_TIME_AFTER_LAST_POOP = 8 * 60 * 60 * 1000; // 8 hours

  if (!pet.conditions.isPooped && pet.conditions.nextPoopTime <= now) {
    pet.conditions.isPooped = true;
  
    // Schedule next poop
    pet.conditions.nextPoopTime = new Date(
      now.getTime() + MIN_TIME_AFTER_LAST_POOP + Math.random() * (POOP_INTERVAL - MIN_TIME_AFTER_LAST_POOP)
    );
  }

  // Sickness logic
  const SICKNESS_INTERVAL = 14 * 24 * 60 * 60 * 1000; // 14 days
  const MIN_TIME_AFTER_LAST_SICKNESS = 2 * 24 * 60 * 60 * 1000; // 2 days

  if (!pet.conditions.isSick && pet.conditions.nextSicknessTime <= now) {
    pet.conditions.isSick = true;
  
    // Schedule next sickness
    pet.conditions.nextSicknessTime = new Date(
      now.getTime() + MIN_TIME_AFTER_LAST_SICKNESS + Math.random() * (SICKNESS_INTERVAL - MIN_TIME_AFTER_LAST_SICKNESS)
    );
  }

  // Remove expired power-ups (lazy evaluation)
  if (pet.activePowerups?.length) {
    pet.activePowerups = pet.activePowerups.filter(
      (p) => new Date(p.expiresAt).getTime() > now
    );
  }

  // If statFreeze is active, reset all stat timers to now and skip decay
  const statFreeze = pet.activePowerups?.find(
    (p) => p.type === "statFreeze" && new Date(p.expiresAt).getTime() > now
  );

  if (statFreeze) {
    Object.keys(pet.statTimers).forEach((key) => {
      pet.statTimers[key] = now;
    });

    pet.lastUpdated = now;

    return pet;
  }

  // Retrieve the last updated time for a stat
  const getTimer = (key) => {
    return pet.statTimers?.[key] ? new Date(pet.statTimers[key]) : now;
  }

  // Intervals in hours for each stat
  const hungerInterval = 12;
  const happinessInterval = pet.conditions.isPooped ? 6 : 12;
  const healthInterval = pet.conditions.isSick ? 6 : 12;

  // Calculate cycles for each stat using its own timer
  const hungerLastUpdated = getTimer("hungerLastUpdated");
  const happinessLastUpdated = getTimer("happinessLastUpdated");
  const healthLastUpdated = getTimer("healthLastUpdated");

  const hungerHours = Math.floor((now - hungerLastUpdated) / MS_PER_HOUR);
  const happinessHours = Math.floor((now - happinessLastUpdated) / MS_PER_HOUR);
  const healthHours = Math.floor((now - healthLastUpdated) / MS_PER_HOUR);

  const hungerCycles = Math.floor(hungerHours / hungerInterval);
  const happinessCycles = Math.floor(happinessHours / happinessInterval);
  const healthCycles = Math.floor(healthHours / healthInterval);

  // Return if there are no stats to update
  if (hungerCycles === 0 && happinessCycles === 0 && healthCycles === 0) {
    return pet;
  }

  // Apply any decay
  pet.hunger = Math.max(0, pet.hunger - hungerCycles);
  pet.happiness = Math.max(0, pet.happiness - happinessCycles);
  pet.health = Math.max(0, pet.health - healthCycles);

  // Update each stat timer by the amount consumed for that stat, leftover hours carried over to next check
  pet.statTimers.hungerLastUpdated = new Date(hungerLastUpdated.getTime() + hungerCycles * hungerInterval * MS_PER_HOUR);
  pet.statTimers.happinessLastUpdated = new Date(happinessLastUpdated.getTime() + happinessCycles * happinessInterval * MS_PER_HOUR);
  pet.statTimers.healthLastUpdated = new Date(healthLastUpdated.getTime() + healthCycles * healthInterval * MS_PER_HOUR);

  // Expire pet if any stat hits 0
  if (pet.health === 0 || pet.hunger === 0 || pet.happiness === 0) {
    pet.status = "expired";
    pet.expiredAt = now;
  }

  // Update lastUpdated (leave in for now)
  pet.lastUpdated = now;

  return pet;

};

