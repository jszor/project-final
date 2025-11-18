import { Link } from "@tanstack/react-router"
import logoSprite from "../../assets/landing/logo-sprite.png"

export const Footer = () => {
  return (
    <div className="flex items-center justify-center lg:justify-between px-[1rem] sm:px-[2rem] lg:px-[4.5rem] pb-[1rem] sm:pb-[2rem] pt-[0.75rem] sm:pt-[1.5rem] text-ammo-100 text-[10px] sm:text-xs">
      <Link to="/" className="underline pt-[6px] hidden lg:block">
        Home
      </Link>
      <Link to="/" className="underline pt-[6px] hidden lg:block">
        About
      </Link>
      <Link to="/" className="underline pt-[6px] hidden lg:block">
        Privacy Policy
      </Link>
      <Link to="/" className="underline pt-[6px] hidden lg:block">
        Terms of Service
      </Link>
      <div className="flex items-center gap-1">
        <img src={logoSprite} alt="BrainPet logo" className="w-[20px] sm:w-[30px] h-auto max-w-full"/>
        <p className="pt-[6px]">BrainPet © 2025</p>
      </div>
    </div>
  )
}