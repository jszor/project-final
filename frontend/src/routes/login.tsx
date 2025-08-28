import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "../store/auth"

export const Login = () => {

  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate({ to: "/app" });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[500px] items-center justify-center bg-ammo-800">
      <div className="w-full max-w-[450px] rounded-[25px] bg-ammo-700 p-[3rem]">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-ammo-100 mb-[0.5rem]"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 mt-1 w-full rounded-[25px] border-4 border-ammo-600 bg-ammo-200 text-ammo-800 focus:outline-none focus:ring-0 focus:border-ammo-300 placeholder-customs-400"
              placeholder="user@osloskolen.no"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-ammo-100 mb-[0.5rem]"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 mt-1 w-full rounded-[25px] border-4 border-ammo-600 bg-ammo-200 text-ammo-800 focus:outline-none focus:ring-0 focus:border-ammo-300 placeholder-customs-400"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-ammo-100 mt-[1.75rem] text-[11px] font-pstp">Error: {error}</p>
          )}

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="mt-[1rem] rounded-[25px] cursor-pointer bg-ammo-700 px-8 py-3 text-ammo-100 outline-2 outline-ammo-100 focus:underline disabled:opacity-50"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="mt-[2rem] text-center text-[0.75rem] font-pstp text-ammo-100">
          Don’t have an account?<br />
          <a href="/" className="text-ammo-100 hover:underline">
            Sign up here!
          </a>
        </p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  component: Login,
})