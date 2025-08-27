type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const FeatureCard = ({ children, className=''}: CardProps) => {
  return (
    <div className={`bg-ammo-700 rounded-[25px] p-[2rem] ${className}`}>
      {children}
    </div>
  )
}