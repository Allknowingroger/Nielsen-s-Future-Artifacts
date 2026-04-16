/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Brain, Compass, Github, Info, X, Menu, Zap } from "lucide-react";
import AtmosphericBackground from "./components/AtmosphericBackground";
import HyperEntityLab from "./components/HyperEntityLab";
import ToolsForThought from "./components/ToolsForThought";
import WiseOptimism from "./components/WiseOptimism";
import RecursiveLoop from "./components/RecursiveLoop";

type Tab = "hyper-entities" | "tools-for-thought" | "wise-optimism" | "framework";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("hyper-entities");
  const [showOverview, setShowOverview] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const tabs = [
    { id: "hyper-entities", label: "Hyper-entities", icon: Sparkles, description: "Future Artifacts" },
    { id: "tools-for-thought", label: "Tools for Thought", icon: Brain, description: "Cognitive Scaffolding" },
    { id: "wise-optimism", label: "Wise Optimism", icon: Compass, description: "Active Steering" },
    { id: "framework", label: "The Loop", icon: Sparkles, description: "Recursive Framework" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-sophisticated-bg text-sophisticated-ink selection:bg-sophisticated-accent/20 font-sans">
      <AtmosphericBackground />

      {/* Navigation Header */}
      <header className="border-b border-sophisticated-border bg-sophisticated-bg/80 backdrop-blur-xl px-6 md:px-20 py-8 md:py-14 sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center justify-between md:block">
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="text-[9px] md:text-[11px] font-serif uppercase tracking-[0.5em] text-sophisticated-secondary/60">
                Thinking with Michael Nielsen
              </div>
              <h1 className="text-3xl font-light tracking-tight text-sophisticated-ink md:text-5xl font-serif">
                The Recursive Framework
              </h1>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-sophisticated-secondary p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <nav className={`${mobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center gap-4 md:gap-2 border-t border-sophisticated-border pt-6 md:border-t-0 md:pt-0`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Tab);
                  setMobileMenuOpen(false);
                }}
                className={`relative flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? "text-sophisticated-accent" : "text-sophisticated-secondary hover:text-sophisticated-ink"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-sophisticated-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className="h-3 w-3" />
                <span>{tab.label}</span>
              </button>
            ))}
            <button 
              onClick={() => setShowOverview(true)}
              className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sophisticated-secondary hover:text-sophisticated-accent transition-colors border border-sophisticated-border rounded-full ml-0 md:ml-4"
            >
              <Info className="h-3 w-3" />
              About
            </button>
            <button 
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors border border-sophisticated-border rounded-full ml-0 md:ml-2 ${focusMode ? "bg-sophisticated-accent text-sophisticated-bg border-sophisticated-accent" : "text-sophisticated-secondary hover:text-sophisticated-accent"}`}
            >
              <Zap className="h-3 w-3" />
              {focusMode ? "Focus On" : "Focus Off"}
            </button>
          </nav>
        </div>
      </header>

      <main className={`mx-auto max-w-7xl px-6 md:px-20 py-12 md:py-24 transition-all duration-700 ${focusMode ? "opacity-100" : "opacity-100"}`}>
        {/* Interactive Content */}
        <section className="relative min-h-[600px]">
          <div className={`grid grid-cols-1 gap-16 ${focusMode ? "lg:grid-cols-1" : "lg:grid-cols-[300px_1fr]"}`}>
            {/* Sidebar Stats/Info */}
            {!focusMode && (
              <aside className="flex flex-col gap-12 border-r border-sophisticated-border pr-12 hidden lg:flex">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif italic text-2xl text-sophisticated-accent">01.</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-sophisticated-accent border-b border-sophisticated-border pb-2 self-start">
                      The Vision / What
                    </h3>
                    <h2 className="text-xl font-serif text-sophisticated-ink mt-2">Hyper-entities</h2>
                    <p className="text-sm leading-relaxed text-sophisticated-secondary">
                      Radical future goals that serve as an orienting vision. These are not just products, but fundamental shifts in human capability—artifacts that, if realized, would change the very language we use to describe reality.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-serif italic text-2xl text-sophisticated-accent">02.</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-sophisticated-accent border-b border-sophisticated-border pb-2 self-start">
                      The Means / How
                    </h3>
                    <h2 className="text-xl font-serif text-sophisticated-ink mt-2">Tools for Thought</h2>
                    <p className="text-sm leading-relaxed text-sophisticated-secondary">
                      Technologies, systems, and conceptual methods that amplify human intellect. They are the scaffolding upon which we build new understanding, allowing us to solve problems that were previously unthinkable.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-serif italic text-2xl text-sophisticated-accent">03.</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-sophisticated-accent border-b border-sophisticated-border pb-2 self-start">
                      The Ethos / Stance
                    </h3>
                    <h2 className="text-xl font-serif text-sophisticated-ink mt-2">Wise Optimism</h2>
                    <p className="text-sm leading-relaxed text-sophisticated-secondary">
                      A principled and active attitude for navigating development with heartfelt agency. It acknowledges existential risks while maintaining the courage to steer toward immense benefits.
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-12 border-t border-sophisticated-border flex flex-col gap-6">
                  <p className="text-[10px] italic leading-relaxed text-sophisticated-secondary/40 uppercase tracking-widest">
                    "Deep truths about the universe almost always bring both immense benefits and significant risks."
                  </p>
                  <p className="text-[10px] italic leading-relaxed text-sophisticated-secondary/40 uppercase tracking-widest">
                    "We are the architects of the future, not its victims. Our tools define our reach."
                  </p>
                </div>
              </aside>
            )}

            {/* Main Module Area */}
            <div className="relative">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {activeTab === "hyper-entities" && <HyperEntityLab />}
                {activeTab === "tools-for-thought" && <ToolsForThought />}
                {activeTab === "wise-optimism" && <WiseOptimism />}
                {activeTab === "framework" && <RecursiveLoop />}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showOverview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOverview(false)}
              className="absolute inset-0 bg-sophisticated-bg/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-2xl border border-sophisticated-border bg-sophisticated-bg p-8 md:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setShowOverview(false)}
                className="absolute right-6 top-6 text-sophisticated-secondary hover:text-sophisticated-ink transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sophisticated-accent">The Framework</span>
                  <h2 className="text-3xl font-serif text-sophisticated-ink">Hyper-entities, Tools for Thought, and Wise Optimism</h2>
                </div>

                <div className="flex flex-col gap-6 text-sm leading-relaxed text-sophisticated-secondary">
                  <p>
                    Michael Nielsen's recursive framework addresses how we can think and act in the face of profound technological changes. It is a philosophy of agency in an age of exponential growth.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <span className="font-serif italic text-xl text-sophisticated-accent">01.</span>
                      <h4 className="font-bold text-sophisticated-ink uppercase text-[10px] tracking-widest">Hyper-entities</h4>
                      <p className="text-[11px]">The radical future goals we imagine. Artifacts that reshape human capability and the language of reality.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-serif italic text-xl text-sophisticated-accent">02.</span>
                      <h4 className="font-bold text-sophisticated-ink uppercase text-[10px] tracking-widest">Tools for Thought</h4>
                      <p className="text-[11px]">The means to enhance our thinking. Cognitive scaffolding that amplifies human intellect and cooperative power.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-serif italic text-xl text-sophisticated-accent">03.</span>
                      <h4 className="font-bold text-sophisticated-ink uppercase text-[10px] tracking-widest">Wise Optimism</h4>
                      <p className="text-[11px]">The ethical stance required to navigate development with agency, balancing immense promise with existential peril.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-y border-sophisticated-border py-6 my-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">The Recursive Loop</h4>
                    <p className="text-[11px]">
                      The process is not linear. We use our current <strong>Tools for Thought</strong> to imagine <strong>Hyper-entities</strong>. Realizing these entities requires even more advanced tools, which in turn allow us to imagine even more radical futures. This loop is steered by <strong>Wise Optimism</strong>—a commitment to steering toward the best possible human outcomes.
                    </p>
                  </div>

                  <p className="italic border-l border-sophisticated-accent pl-4">
                    "The goal is to create a future where human beings are more capable, more thoughtful, and more wise than we are today."
                  </p>
                </div>

                <button 
                  onClick={() => setShowOverview(false)}
                  className="mt-4 self-start border border-sophisticated-accent px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent hover:bg-sophisticated-accent hover:text-sophisticated-bg transition-all"
                >
                  Enter the Lab
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="border-t border-sophisticated-border bg-sophisticated-bg px-6 md:px-20 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] uppercase tracking-[0.2em] text-sophisticated-secondary/50">
          <div>Toward a <span className="text-sophisticated-accent">better human future</span></div>
          <div className="flex items-center gap-4">
            <Github className="h-4 w-4" />
            <span>Ref. Nielsen.2024.Draft</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
