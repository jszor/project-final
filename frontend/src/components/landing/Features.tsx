import { FeatureCard } from "./FeatureCard"
import spriteOne from "../../assets/landing/logo-sprite-card.png"

export const Features = () => {
  return (
    <div>
      {/* Main card */}
      <FeatureCard className="min-h-[150px] xs:min-h-[350px] sm:min-h-[450px] m-4">
        <div className="flex flex-col items-center xl:items-start xl:flex-row gap-[1rem]">
          <div className="flex flex-col w-full xl:w-1/2 p-[0.125rem] xs:p-[1rem] sm:p-[1.5rem] lg:p-[2rem] items-center xl:items-start text-center xl:text-left">
            <h1 className="text-xl xs:text-2xl sm:text-[2rem] pb-[1rem] xs:pb-[1.5rem] sm:pb-[2rem]">
              Feed your <span className="text-ammo-100">pet.</span><br />
              Feed your <span className="text-ammo-100">brain.</span>
            </h1>
            <p className="text-sm xs:text-base sm:text-[1.125rem] leading-[24px] xs:leading-[28px] sm:leading-[36px] max-w-[100%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-none">
              Earn coins by completing daily quests, then spend them on food, toys, and medicine to keep your 8-bit buddy alive and happy.
            </p>
          </div>
          <div className="flex w-full xl:w-1/2 justify-center">
            <img src={spriteOne} alt="Happy pet" className=""/>
          </div>
        </div>
      </FeatureCard>
    </div>
  )
}