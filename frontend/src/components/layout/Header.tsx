import { NavBar } from "./NavBar"
import { Link } from "@tanstack/react-router"
import logoSprite from "../../assets/landing/logo-sprite.png"

export const Header = () => {
  return (
    <header className="flex text-ammo-100 text-sm xs:text-base sm:text-xl justify-between">
      <Link to="/" className="flex items-center p-1 xs:p-2 sm:p-4 focus:outline-none focus:ring-0">
        <img className="w-[30px] xs:w-[40px] sm:w-[55px] h-auto max-w-full" src={logoSprite} alt="BrainPet logo" />
        <p className="pt-[8px]">BrainPet</p>
      </Link>
      <NavBar />
    </header>
  )
}