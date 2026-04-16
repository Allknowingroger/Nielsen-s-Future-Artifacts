import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Loader2, Shield, TrendingUp, Anchor, Copy, Check, History, Trash2 } from "lucide-react";
import { getWisePerspective } from "../lib/gemini";

interface WisePerspective {
  promise: string;
  peril: string;
  steeringStrategy: string;
  milestones: { stage: string; action: string }[];
}

export default function WiseOptimism() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [perspective, setPerspective] = useState<WisePerspective | null>(null);
  const [history, setHistory] = useState<{target: string, perspective: WisePerspective}[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wise-optimism-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const saveToHistory = (newTarget: string, newPerspective: WisePerspective) => {
    const updated = [{ target: newTarget, perspective: newPerspective }, ...history.filter(h => h.target !== newTarget)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("wise-optimism-history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("wise-optimism-history");
  };

  const handleSteer = async () => {
    if (!target.trim()) return;
    setLoading(true);
    try {
      const result = await getWisePerspective(target, "A future technology or societal shift.");
      setPerspective(result);
      saveToHistory(target, result);
    } catch (error) {
      console.error("Steering failed", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!perspective) return;
    const text = `Wise Optimism Perspective on ${target}:\n\nPromise: ${perspective.promise}\n\nPeril: ${perspective.peril}\n\nSteering Strategy: ${perspective.steeringStrategy}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-serif font-light text-sophisticated-ink">Wise Optimism</h2>
        <p className="text-sm leading-relaxed text-sophisticated-secondary max-w-2xl">
          The principled and active stance for navigating an uncertain future. Wise Optimism is a commitment to agency—the belief that we can and must steer the development of powerful technologies toward human flourishing.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-sophisticated-border pb-8">
          <div className="flex flex-1 gap-4">
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter a future trend..."
              className="flex-1 border-none bg-transparent py-2 text-sophisticated-ink outline-none placeholder:text-sophisticated-secondary/30"
              onKeyDown={(e) => e.key === "Enter" && handleSteer()}
            />
            <button
              onClick={handleSteer}
              disabled={loading || !target.trim()}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent transition-colors hover:text-sophisticated-ink disabled:opacity-30"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Compass className="h-4 w-4" />}
              Steer
            </button>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${showHistory ? "text-sophisticated-accent" : "text-sophisticated-secondary hover:text-sophisticated-ink"}`}
            >
              <History className="h-4 w-4" />
              History
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showHistory && history.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 border-b border-sophisticated-border pb-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-secondary/40">Recent Perspectives</span>
                <button onClick={clearHistory} className="text-[10px] font-bold uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTarget(h.target);
                      setPerspective(h.perspective);
                      setShowHistory(false);
                    }}
                    className="px-3 py-1 text-[10px] border border-sophisticated-border rounded-full text-sophisticated-secondary hover:text-sophisticated-accent hover:border-sophisticated-accent transition-all"
                  >
                    {h.target}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {perspective && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-16"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-sophisticated-accent">Perspective on {target}</div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sophisticated-secondary hover:text-sophisticated-accent transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="flex flex-col gap-6 border-l border-sophisticated-border pl-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-sophisticated-accent" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">The Promise</h3>
                </div>
                <div className="text-sm leading-relaxed text-sophisticated-secondary">
                  {perspective.promise}
                </div>
              </div>

              <div className="flex flex-col gap-6 border-l border-sophisticated-border pl-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-sophisticated-accent" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">The Peril</h3>
                </div>
                <div className="text-sm leading-relaxed text-sophisticated-secondary">
                  {perspective.peril}
                </div>
              </div>

              <div className="flex flex-col gap-6 border-l border-sophisticated-border pl-6">
                <div className="flex items-center gap-3">
                  <Anchor className="h-4 w-4 text-sophisticated-accent" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">Steering Strategy</h3>
                </div>
                <div className="text-sm leading-relaxed text-sophisticated-secondary">
                  {perspective.steeringStrategy}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sophisticated-accent" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">Steering Roadmap</h3>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {perspective.milestones.map((milestone, i) => (
                  <div key={i} className="relative flex flex-col gap-4 p-6 border border-sophisticated-border bg-black/5">
                    <div className="absolute -top-3 -left-3 h-6 w-6 bg-sophisticated-accent text-sophisticated-bg flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-sophisticated-accent">
                      {milestone.stage}
                    </div>
                    <div className="text-xs leading-relaxed text-sophisticated-secondary">
                      {milestone.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!perspective && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Compass className="h-12 w-12 text-sophisticated-border mb-6" />
          <p className="text-sm italic text-sophisticated-secondary/40 max-w-md font-serif">
            "Wise Optimism is not a naive belief that everything will be fine. It is a principled and active stance for navigating development."
          </p>
        </div>
      )}
    </div>
  );
}
