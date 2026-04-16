import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Loader2, Info, AlertTriangle, CheckCircle2, Copy, Check, History, Trash2 } from "lucide-react";
import { generateHyperEntity } from "../lib/gemini";

interface HyperEntity {
  name: string;
  description: string;
  transformation: string;
  risks: string[];
  benefits: string[];
  visualDescription: string;
}

const CASE_STUDIES = [
  { title: "Memory Augmentation", prompt: "A system that makes memory a choice, allowing us to permanently retain anything we learn." },
  { title: "Global Connectome", prompt: "A real-time map of all human neural activity, enabling direct brain-to-brain communication." },
  { title: "Open Discovery", prompt: "A scientific infrastructure where every hypothesis is instantly shared and collaboratively refined." },
  { title: "Polymath Infrastructure", prompt: "A system for massive, real-time collaborative mathematics and scientific problem solving." },
  { title: "Programmable Matter", prompt: "A material world that can be reshaped by thought, blurring software and physical reality." },
  { title: "Emotional Granularity", prompt: "A tool that allows humans to perceive and communicate emotions with the precision of high-resolution data." },
  { title: "Quantum Intuition", prompt: "A cognitive interface that allows humans to intuitively reason about quantum mechanical phenomena." },
  { title: "Biosphere Agency", prompt: "A system that gives the global biosphere a 'voice' and agency in human decision-making processes." },
  { title: "Artificial Superintelligence (ASI)", prompt: "A system with cognitive abilities surpassing the best human minds in all fields." }
];

export default function HyperEntityLab() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [entity, setEntity] = useState<HyperEntity | null>(null);
  const [history, setHistory] = useState<HyperEntity[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hyper-entity-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const saveToHistory = (newEntity: HyperEntity) => {
    const updated = [newEntity, ...history.filter(h => h.name !== newEntity.name)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("hyper-entity-history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("hyper-entity-history");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await generateHyperEntity(prompt);
      setEntity(result);
      saveToHistory(result);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!entity) return;
    const text = `${entity.name}\n\n${entity.description}\n\nTransformation: ${entity.transformation}\n\nVisual Essence: ${entity.visualDescription}\n\nBenefits:\n${entity.benefits.join('\n')}\n\nRisks:\n${entity.risks.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-serif font-light text-sophisticated-ink">Hyper-entity Lab</h2>
        <p className="text-sm leading-relaxed text-sophisticated-secondary max-w-2xl">
          Imagine the radical future artifacts of our imagination. Hyper-entities are not mere gadgets; they are conceptual anchors that pull the future toward us. By defining them, we define the new tools we must build to reach them.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-sophisticated-border pb-8">
          <div className="flex flex-1 gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a seed idea..."
              className="flex-1 border-none bg-transparent py-2 text-sophisticated-ink outline-none placeholder:text-sophisticated-secondary/50"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent transition-colors hover:text-sophisticated-ink disabled:opacity-30"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate
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

        <div className="flex flex-wrap gap-4">
          <span className="text-[9px] font-bold uppercase tracking-widest text-sophisticated-secondary/30 self-center">Seed Ideas:</span>
          {CASE_STUDIES.map((study, i) => (
            <button
              key={i}
              onClick={() => setPrompt(study.prompt)}
              className="text-[10px] text-sophisticated-secondary hover:text-sophisticated-accent transition-colors border-b border-transparent hover:border-sophisticated-accent pb-0.5"
            >
              {study.title}
            </button>
          ))}
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-secondary/40">Recent Artifacts</span>
                <button onClick={clearHistory} className="text-[10px] font-bold uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setEntity(h);
                      setShowHistory(false);
                    }}
                    className="px-3 py-1 text-[10px] border border-sophisticated-border rounded-full text-sophisticated-secondary hover:text-sophisticated-accent hover:border-sophisticated-accent transition-all"
                  >
                    {h.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {entity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-12"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-4xl font-serif text-sophisticated-ink">{entity.name}</h3>
                <p className="max-w-2xl text-lg leading-relaxed text-sophisticated-secondary">{entity.description}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sophisticated-secondary hover:text-sophisticated-accent transition-colors mt-2"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sophisticated-accent">
                  <div className="h-[1px] w-6 bg-sophisticated-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Transformation</span>
                </div>
                <p className="text-sm leading-relaxed text-sophisticated-secondary">{entity.transformation}</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sophisticated-accent">
                  <div className="h-[1px] w-6 bg-sophisticated-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Visual Essence</span>
                </div>
                <p className="text-sm leading-relaxed text-sophisticated-secondary">{entity.visualDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-sophisticated-accent">
                  <div className="h-[1px] w-6 bg-sophisticated-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Potential Benefits</span>
                </div>
                <ul className="flex flex-col gap-4">
                  {entity.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-4 text-xs text-sophisticated-secondary/70">
                      <div className="h-[1px] w-3 bg-sophisticated-accent/30" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-sophisticated-accent">
                  <div className="h-[1px] w-6 bg-sophisticated-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Existential Risks</span>
                </div>
                <ul className="flex flex-col gap-4">
                  {entity.risks.map((risk, i) => (
                    <li key={i} className="flex items-center gap-4 text-xs text-sophisticated-secondary/70">
                      <div className="h-[1px] w-3 bg-sophisticated-accent/30" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
