import { Link } from "@tanstack/react-router"
import logoSprite from "../../assets/landing/logo-sprite.png"

export const Footer = () => {
  return (
    <div className="flex items-center justify-between px-[4.5rem] pb-[2rem] pt-[1.5rem] text-ammo-100 text-xs">
      <Link to="/" className="underline pt-[6px]">
        Home
      </Link>
      <Link to="/about" className="underline pt-[6px]">
        About
      </Link>
      <Link to="/privpolicy" className="underline pt-[6px]">
        Privacy Policy
      </Link>
      <Link to="/tos" className="underline pt-[6px]">
        Terms of Service
      </Link>
      <div className="flex items-center gap-1">
        <img src={logoSprite} alt="BrainPet logo" className="w-[30px] h-auto max-w-full"/>
        <p className="pt-[6px]">BrainPet © 2025</p>
      </div>
    </div>
  )
}