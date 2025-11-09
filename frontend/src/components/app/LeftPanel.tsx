import console from "../../assets/app/console.svg"
import { AnimateSprite } from "./AnimateSprite"

export const LeftPanel = () => {
  return (
    <div className="flex h-full justify-center items-center relative px-[2rem]">
      <img src={console} alt="Pet console" />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative scale-[0.4] xs:scale-[0.6] sm:scale-100" style={{ top: '-16%' }}>
          <AnimateSprite />
        </div>
      </div>
    </div>
  )
}