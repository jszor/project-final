import { create } from 'zustand'

// Environment variable
const API_URL = import.meta.env.VITE_API_URL || "";

export type StoreItem = {
  _id: string
  name: string
  category: 'food' | 'toy' | 'medicine' | 'powerup' | 'misc'
  effects: { stat: 'hunger' | 'happiness' | 'health' | 'coins' | 'xp'; amount: number }[]
  conditions: { condition: 'isSick' | 'isPooped'; setTo: boolean }[]
  powerup?: { type: 'statFreeze' | 'doubleCoins' | 'doubleXP'; duration: number }
  price: number
  description?: string
}

type StoreState = {
  items: StoreItem[]
  loading: boolean
  error: string | null
  fetchItems: () => Promise<void>
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
}))