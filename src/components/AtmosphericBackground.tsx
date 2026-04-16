import { motion } from "motion/react";

export default function AtmosphericBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F9F9F7]">
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#AF8B45_0%,transparent_70%)] opacity-20 blur-[150px]"
      />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] invert" />
    </div>
  );
}
