import { create } from "zustand";

// Environment variable
const API_URL = import.meta.env.VITE_API_URL || "";

// Types
export type InventoryItem = {
  itemName: string;
  category: "food" | "toy" | "medicine" | "powerup" | "misc";
  quantity: number;
};

export type Pet = {
  _id: string;
  owner: string;
  name: string;
  health: number;
  happiness: number;
  hunger: number;
  coins: number;
  experience: {
    current: number;
    required: number;
  };
  level: number;
  inventory: InventoryItem[];
  lastUpdated: string;
  statTimers: {
    hungerLastUpdated: string;
    happinessLastUpdated: string;
    healthLastUpdated: string;
  };
  conditions: {
    isPooped: boolean;
    isSick: boolean;
    nextPoopTime: string;
    nextSicknessTime: string;
  };
  activePowerups: {
    type: "statFreeze" | "doubleCoins" | "doubleXP";
    expiresAt: string;
  }[];
  status: "alive" | "expired";
  bornAt: string;
  expiredAt?: string;
};

export type LeaderboardEntry = Pet & {
  rank: number;
};

// Store state
type PetState = {
  pet: Pet | null;
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;

  // actions
  fetchPet: () => Promise<void>;
  useItem: (itemName: string) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
  fetchInventory: () => Promise<void>;
  addItem: (item: InventoryItem) => Promise<void>;
  removeItem: (itemName: string, quantity?: number) => Promise<void>;
  fetchLeaderboard: () => Promise<void>;

  // computed selectors
  isAlive: () => boolean;
  progressPercent: () => number;
  foodItems: () => InventoryItem[];
  toyItems: () => InventoryItem[];
  medicineItems: () => InventoryItem[];
  powerupItems: () => InventoryItem[];
  playerRank: () => number | null;
};

// Zustand store
export const usePetStore = create<PetState>((set, get) => ({
  pet: null,
  leaderboard: [],
  loading: false,
  error: null,

  // ----- Actions -----
  fetchPet: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error(await res.text());
      const data: Pet = await res.json();
      set({ pet: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  useItem: async (itemName: string) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet/use-item`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ itemName }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: { pet: Pet } = await res.json();
      set({ pet: data.pet, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addXP: async (amount: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet/xp`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: Pet = await res.json();
      set({ pet: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  addCoins: async (amount: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet/coins`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: Pet = await res.json();
      set({ pet: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchInventory: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet/inventory`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error(await res.text());
      const data: InventoryItem[] = await res.json();
      set((state) =>
        state.pet ? { pet: { ...state.pet, inventory: data } } : {}
      );
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  addItem: async (item: InventoryItem) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet/inventory/add`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          itemName: item.itemName,
          category: item.category,
          quantity: item.quantity,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: InventoryItem[] = await res.json();
      set((state) =>
        state.pet ? { pet: { ...state.pet, inventory: data } } : {}
      );
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  removeItem: async (itemName: string, quantity?: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet/inventory/remove`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ itemName, quantity }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: InventoryItem[] = await res.json();
      set((state) =>
        state.pet ? { pet: { ...state.pet, inventory: data } } : {}
      );
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchLeaderboard: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/pet/leaderboard`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      set({ leaderboard: data.leaderboard });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  // ----- Selectors -----
  isAlive: () => {
    const pet = get().pet;
    return pet?.status === "alive";
  },

  progressPercent: () => {
    const pet = get().pet;
    if (!pet) return 0;
    return (pet.experience.current / pet.experience.required) * 100;
  },

  foodItems: () =>
    get().pet?.inventory.filter((i) => i.category === "food") ?? [],
  toyItems: () =>
    get().pet?.inventory.filter((i) => i.category === "toy") ?? [],
  medicineItems: () =>
    get().pet?.inventory.filter((i) => i.category === "medicine") ?? [],
  powerupItems: () =>
    get().pet?.inventory.filter((i) => i.category === "powerup") ?? [],

  playerRank: () => {
    const { leaderboard, pet } = get();
    if (!pet) return null;
    const entry = leaderboard.find((e) => e._id === pet._id);
    return entry?.rank ?? null;
  },
}));