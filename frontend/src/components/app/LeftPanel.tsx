import console from "../../assets/app/console.svg"
import stats from "../../assets/app/full-stat-5.png"
import hunger from "../../assets/app/hunger.png"
import happiness from "../../assets/app/happiness.png"
import health from "../../assets/app/health.png"
import { AnimateSprite } from "./AnimateSprite"

export const LeftPanel = () => {
  return (
    <div className="flex h-full justify-center items-center relative">
      <img src={console} alt="Pet console" />
      <img src={hunger} alt="Hunger Stat" className="w-[50px] absolute inset-0 left-[27%] top-[105px]" />
      <img src={stats} alt="Full Stats" className="w-[100px] absolute inset-0 left-[33%] top-[12%]" />
      <img src={happiness} alt="Happiness Stat" className="w-[50px] absolute inset-0 left-[51%] top-[105px]" />
      <img src={stats} alt="Full Stats" className="w-[100px] absolute inset-0 left-[57%] top-[12%]" />
      <img src={health} alt="Health Stat" className="w-[50px] absolute inset-0 left-[27%] top-[152px]" />
      <img src={stats} alt="Full Stats" className="w-[100px] absolute inset-0 left-[33%] top-[125px]" />
      <div className="absolute inset-0 left-[41%] top-[32%]">
        <AnimateSprite />
      </div>
    </div>
  )
}