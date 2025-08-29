import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import spriteOne from "../../assets/app/sprite-frame-one.png";
import spriteTwo from "../../assets/app/sprite-frame-two.png";

export const AnimateSprite = () => {
  const [frame, setFrame] = useState(1);

  // Toggle between the two frames every 500ms
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrame((prev) => (prev === 1 ? 2 : 1));
    }, 600); // Change frame every 500ms

    return () => clearInterval(intervalId); // Clean up the interval when component unmounts
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        className="max-h-[125px]"
        src={frame === 1 ? spriteOne : spriteTwo} // Conditionally show the frame based on the state
        alt={`Frame ${frame}`}
      />
    </motion.div>
  );
};