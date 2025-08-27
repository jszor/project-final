import { NavBar } from "./NavBar"
import logoSprite from "../../assets/landing/logo-sprite.png"

export const Header = () => {
  return (
    <header className="flex text-ammo-100 text-xl">
      <div className="w-1/2 flex items-center p-4">
        <img className="w-[55px] h-auto max-w-full" src={logoSprite} alt="BrainPet logo" />
        <p className="pt-[8px]">BrainPet</p>
      </div>
      <NavBar />
    </header>
  )
}