import { useAuthStore } from "../../store/auth";
import { useNavigate } from "@tanstack/react-router";

export const AppHeader = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const greetingName = user?.initials || "there";

  return (
    <header className="flex items-center justify-between bg-ammo-800 text-ammo-100 px-[0.25rem] sm:px-[1rem] lg:px-[3rem] py-[1rem] text-[8px] xs:text-[12px] sm:text-[14px]">
      <p>
        Hi, {greetingName}!
      </p>
      <p className="hidden sm:block">
        BrainPet v1.0
      </p>
      <button onClick={() => { logout(); navigate({ to: "/login" }); }} className="bg-ammo-700 hover:bg-ammo-600 text-ammo-100 px-6 py-3 border-2 border-ammo-600 rounded-[25px] cursor-pointer">
        Log Out
      </button>
    </header>
  )
}