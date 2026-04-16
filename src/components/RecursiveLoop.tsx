import { motion } from "motion/react";
import { Sparkles, Brain, Compass, ArrowRight } from "lucide-react";

export default function RecursiveLoop() {
  return (
    <div className="flex flex-col gap-8 p-8 border border-sophisticated-border bg-sophisticated-bg/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-12 bg-sophisticated-accent" />
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">The Recursive Loop</h3>
      </div>
      
      <div className="relative flex flex-col items-center justify-center gap-12 py-12">
        {/* The Loop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-4 p-6 border border-sophisticated-border bg-white/5 text-center"
          >
            <Sparkles className="h-6 w-6 text-sophisticated-accent" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">Hyper-entities</div>
            <div className="text-[9px] text-sophisticated-secondary">The Vision</div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-4 p-6 border border-sophisticated-border bg-white/5 text-center"
          >
            <Brain className="h-6 w-6 text-sophisticated-accent" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">Tools for Thought</div>
            <div className="text-[9px] text-sophisticated-secondary">The Means</div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-4 p-6 border border-sophisticated-border bg-white/5 text-center"
          >
            <Compass className="h-6 w-6 text-sophisticated-accent" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">Wise Optimism</div>
            <div className="text-[9px] text-sophisticated-secondary">The Stance</div>
          </motion.div>
        </div>

        {/* Connecting Lines */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 200">
            <motion.path
              d="M 250 100 L 300 100"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-sophisticated-accent/30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M 500 100 L 550 100"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-sophisticated-accent/30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </svg>
        </div>

        <div className="text-center max-w-xl">
          <p className="text-xs leading-relaxed text-sophisticated-secondary italic">
            "We use our current tools to imagine radical futures. Realizing them requires new tools, which in turn expand our imagination. This loop is steered by a commitment to human flourishing."
          </p>
        </div>
      </div>
    </div>
  );
}
