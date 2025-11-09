import { create } from 'zustand'
import { usePetStore } from './pet'

// Environment variable
const API_URL = import.meta.env.VITE_API_URL || "";

export type StoreItem = {
  _id: string
  name: string
  category: 'food' | 'toy' | 'medicine' | 'powerup' | 'misc'
  effects: { stat: 'hunger' | 'happiness' | 'health' | 'coins'; amount: number }[]
  conditions: { condition: 'isSick' | 'isPooped'; setTo: boolean }[]
  powerup?: { type: 'statFreeze' | 'doubleCoins'; duration: number }
  price: number
  description?: string
}

type StoreState = {
  items: StoreItem[]
  loading: boolean
  error: string | null
  fetchItems: () => Promise<void>
  buyItem: (itemId: string) => Promise<{ success: boolean; message: string }>
}

export const useStoreStore = create<StoreState>((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('authToken')
      const res = await fetch(`${API_URL}/api/store`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
      if (!res.ok) throw new Error(await res.text())
      const data: StoreItem[] = await res.json()
      set({ items: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },
  buyItem: async (itemId: string) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/api/store/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ itemId }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        set({ loading: false });
        return { success: false, message: data.message};
      }
  
      // Update pet in the pet store so inventory reflects purchase
      usePetStore.setState({ pet: data.pet });

      set({ loading: false });
  
      return { success: true, message: data.message };
    } catch (err: any) {
      set({ error: err.message, loading: false });
      return { success: false, message: err.message };
    }
  },
}))