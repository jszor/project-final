import { Link } from "@tanstack/react-router"

export const NavBar = () => {
  return (
    <div className="w-1/2 flex items-center justify-between px-4 pt-[8px]">
        <Link to="/" className="focus:underline focus:outline-none focus:ring-0">
          Home
        </Link>
        <Link to="/about" className="focus:underline focus:outline-none focus:ring-0">
          About
        </Link>
        <Link to="/login" className="outline-2 outline-ammo-100 focus:underline rounded-[30px] px-[34px] py-[14px]">
          Log In
        </Link>
      </div>
  )
}