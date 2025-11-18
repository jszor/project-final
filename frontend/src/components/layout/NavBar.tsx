import { Link } from "@tanstack/react-router"

export const NavBar = () => {
  return (
    <div className="flex items-center px-1 xs:px-2 sm:px-4 pt-[8px]">
        {/* <Link to="/" className="focus:underline focus:outline-none focus:ring-0">
          About
        </Link> */}
        <Link to="/login" className="outline-2 outline-ammo-100 focus:underline rounded-[30px] px-[12px] xs:px-[20px] sm:px-[34px] py-[8px] xs:py-[10px] sm:py-[14px] text-xs xs:text-sm sm:text-base">
          Log In
        </Link>
      </div>
  )
}