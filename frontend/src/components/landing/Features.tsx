import { FeatureCard } from "./FeatureCard"
import spriteOne from "../../assets/landing/logo-sprite-card.png"

export const Features = () => {
  return (
    <div>
      {/* Main card */}
      <FeatureCard className="h-[450px] m-4">
        <div className="flex">
          <div className="flex flex-col w-1/2 p-[2rem]">
            <h1 className="text-[2rem] pb-[2rem]">
              Feed your <span className="text-ammo-100">pet.</span><br />
              Feed your <span className="text-ammo-100">brain.</span>
            </h1>
            <p className="text-[1.125rem] leading-[36px]">
              Earn coins by completing daily quests, then spend them on food, toys, and medicine to keep your 8-bit buddy alive and happy.
            </p>
          </div>
          <div className="flex w-1/2 justify-center">
            <img src={spriteOne} alt="Happy pet" className=""/>
          </div>
        </div>
      </FeatureCard>
    </div>
  )
}