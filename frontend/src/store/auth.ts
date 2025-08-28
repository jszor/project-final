import { create } from "zustand";

// Defines the shape of the user returned by the backend
interface User {
  _id: string;
  initials: string;
  email: string;
  classroomCode: string;
}

// Defines the shape of the auth store
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  rehydrate: () => void;
}

// Create Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
      }

      const data = await res.json();

      // Saves token and user to localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data));

      set({
        user: {
          _id: data._id,
          initials: data.initials,
          email: data.email,
          classroomCode: data.classroomCode,
        },
        token: data.token,
        isAuthenticated: true,
      });
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  },

  logout: () => {

    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });

  },
  // Users stay logged in when refreshing the page, and until logout is clicked
  rehydrate: () => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      }
    }
  },
}));