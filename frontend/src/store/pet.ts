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
    type: "statFreeze" | "doubleCoins";
    expiresAt: string;
  }[];
  status: "alive" | "expired";
  bornAt: string;
  expiredAt?: string;
};

// Store state
type PetState = {
  pet: Pet | null;
  loading: boolean;
  error: string | null;

  // actions
  fetchPet: () => Promise<void>;
  useItem: (itemName: string) => Promise<{ success: boolean; message: string }>;
  addCoins: (amount: number) => Promise<void>;
  fetchInventory: () => Promise<void>;
  addItem: (item: InventoryItem) => Promise<void>;
  removeItem: (itemName: string, quantity?: number) => Promise<void>;

  // computed selectors
  isAlive: () => boolean;
  foodItems: () => InventoryItem[];
  toyItems: () => InventoryItem[];
  medicineItems: () => InventoryItem[];
  powerupItems: () => InventoryItem[];
};

// Zustand store
export const usePetStore = create<PetState>((set, get) => ({
  pet: null,
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

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to use item." };
      }
    
      set({ pet: data.pet, loading: false });
      return { success: true, message: data.message || `${itemName} used.` };
    } catch (err: any) {
      set({ error: err.message, loading: false });
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
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

  // ----- Selectors -----
  isAlive: () => {
    const pet = get().pet;
    return pet?.status === "alive";
  },

  foodItems: () =>
    get().pet?.inventory.filter((i) => i.category === "food") ?? [],
  toyItems: () =>
    get().pet?.inventory.filter((i) => i.category === "toy") ?? [],
  medicineItems: () =>
    get().pet?.inventory.filter((i) => i.category === "medicine") ?? [],
  powerupItems: () =>
    get().pet?.inventory.filter((i) => i.category === "powerup") ?? [],
}));