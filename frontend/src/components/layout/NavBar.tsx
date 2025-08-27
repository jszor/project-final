import { Link } from "@tanstack/react-router"

export const NavBar = () => {
  return (
    <div className="w-1/2 flex items-center justify-between px-4 pt-[8px]">
        <Link to="/">
          Home
        </Link>
        <Link to="/about">
          About
        </Link>
        <Link to="/login" className="outline-2 outline-ammo-100 rounded-[30px] px-[34px] py-[14px]">
          Log In
        </Link>
      </div>
  )
}