import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // TODO: hook this up to auth store (Zustand)
  }

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

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-[1rem] rounded-[25px] cursor-pointer bg-ammo-700 px-8 py-3 text-ammo-100 outline-2 outline-ammo-100 focus:underline"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  component: Login,
})