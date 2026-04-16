import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Heart, Zap, Search, MessageSquare, ShieldCheck, Scale, Repeat, Lightbulb, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { synthesizeLenses } from "../lib/gemini";

interface SynthesisResult {
  synthesis: string;
  emergentInsight: string;
  nextQuestion: string;
}

const LENSES = [
  {
    id: "scientific",
    name: "Scientific Method",
    icon: Search,
    description: "Focus on empirical evidence, falsifiability, and systematic observation.",
    scaffold: "What are the measurable variables? How could we prove this wrong?"
  },
  {
    id: "kindness",
    name: "Kindness as Technology",
    icon: Heart,
    description: "A 'moral technology' that enables cooperative thinking and psychological safety.",
    scaffold: "How does this foster trust? What is the most charitable interpretation?"
  },
  {
    id: "recursive",
    name: "Recursive Power",
    icon: Zap,
    description: "Using existing tools to build even more powerful tools for thought.",
    scaffold: "What tool could we build to make solving this easier next time?"
  },
  {
    id: "social",
    name: "Productive Disagreement",
    icon: MessageSquare,
    description: "A social technology for surfacing deep truths through structured conflict.",
    scaffold: "What is the strongest possible argument against my current view?"
  },
  {
    id: "ethical",
    name: "Wise Optimism",
    icon: Scale,
    description: "Balancing promise and peril with active agency and steering.",
    scaffold: "What is the best possible outcome, and what specific actions lead there?"
  },
  {
    id: "systems",
    name: "Systems Thinking",
    icon: Repeat,
    description: "Viewing problems as parts of an overall system, rather than reacting to specific parts.",
    scaffold: "What are the feedback loops? How does a change here affect the whole?"
  },
  {
    id: "divergent",
    name: "Divergent Play",
    icon: Lightbulb,
    description: "Expanding the search space through non-linear, playful exploration.",
    scaffold: "If there were no constraints, what is the most absurd solution?"
  }
];

const PROBLEM_EXAMPLES = [
  { title: "Scientific Stagnation", text: "How can we accelerate the rate of fundamental scientific discovery in the 21st century?" },
  { title: "Collective Intelligence", text: "How can we design social systems that surface truth rather than polarizing conflict?" },
  { title: "Climate Complexity", text: "How do we reason about planetary-scale systems with millions of interdependent variables?" },
  { title: "Learning Mastery", text: "How can we make deep, creative mastery accessible to every human being on Earth?" }
];

export default function ToolsForThought() {
  const [problem, setProblem] = useState("");
  const [selectedLensIds, setSelectedLensIds] = useState<string[]>([LENSES[0].id]);
  const [loading, setLoading] = useState(false);
  const [synthesis, setSynthesis] = useState<SynthesisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const activeLens = LENSES.find(l => l.id === selectedLensIds[selectedLensIds.length - 1]) || LENSES[0];

  const toggleLens = (id: string) => {
    if (selectedLensIds.includes(id)) {
      if (selectedLensIds.length > 1) {
        setSelectedLensIds(selectedLensIds.filter(l => l !== id));
      }
    } else {
      setSelectedLensIds([...selectedLensIds, id]);
    }
    setSynthesis(null);
  };

  const handleSynthesize = async () => {
    if (!problem.trim() || selectedLensIds.length < 2) return;
    setLoading(true);
    try {
      const selectedLenses = LENSES.filter(l => selectedLensIds.includes(l.id));
      const result = await synthesizeLenses(problem, selectedLenses);
      setSynthesis(result);
    } catch (error) {
      console.error("Synthesis failed", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!problem) return;
    let text = "";
    if (synthesis) {
      text = `Synthesis of "${problem}" through ${selectedLensIds.length} lenses:\n\n${synthesis.synthesis}\n\nEmergent Insight: ${synthesis.emergentInsight}\n\nRecursive Question: ${synthesis.nextQuestion}`;
    } else {
      text = `Reframing "${problem}" through ${activeLens.name}:\n\nScaffold: ${activeLens.scaffold}\n\nApplication: By focusing on ${activeLens.description.toLowerCase()}, we reframe the exploration through the lens of ${activeLens.scaffold.toLowerCase().replace('?', '')}.`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-serif font-light text-sophisticated-ink">Tools for Thought</h2>
        <p className="text-sm leading-relaxed text-sophisticated-secondary max-w-2xl">
          Technologies and methods that amplify human intellect. A tool for thought is not just a calculator; it is a way of seeing. By changing our lenses, we change the problems we are capable of solving.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-sophisticated-accent">The Problem Space</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Describe a challenge or concept you want to explore..."
          className="h-32 w-full border-b border-sophisticated-border bg-transparent p-0 text-sophisticated-ink outline-none placeholder:text-sophisticated-secondary/30"
        />
        <div className="flex flex-wrap gap-4 mt-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-sophisticated-secondary/30 self-center">Case Studies:</span>
          {PROBLEM_EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => setProblem(ex.text)}
              className="text-[10px] text-sophisticated-secondary hover:text-sophisticated-accent transition-colors border-b border-transparent hover:border-sophisticated-accent pb-0.5"
            >
              {ex.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-sophisticated-accent">Select Cognitive Lenses (Select Multiple to Synthesize)</label>
          {selectedLensIds.length >= 2 && (
            <button
              onClick={handleSynthesize}
              disabled={loading || !problem.trim()}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent hover:text-sophisticated-ink transition-colors disabled:opacity-30"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Synthesize {selectedLensIds.length} Lenses
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LENSES.map((lens) => (
            <button
              key={lens.id}
              onClick={() => toggleLens(lens.id)}
              className={`flex flex-col gap-4 border-l border-sophisticated-border p-4 transition-all ${
                selectedLensIds.includes(lens.id)
                  ? "border-sophisticated-accent bg-black/5"
                  : "border-sophisticated-border hover:border-black/20"
              }`}
            >
              <lens.icon className={`h-5 w-5 ${selectedLensIds.includes(lens.id) ? "text-sophisticated-accent" : "text-sophisticated-secondary"}`} />
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-ink">{lens.name}</div>
                <div className="text-[9px] text-sophisticated-secondary leading-tight mt-1">{lens.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {synthesis ? (
          <motion.div
            key="synthesis"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-12 border-t border-sophisticated-border pt-12"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sophisticated-accent" />
                <h3 className="text-2xl font-serif text-sophisticated-ink">Synthesis: {selectedLensIds.length} Lenses</h3>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sophisticated-secondary hover:text-sophisticated-accent transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent">Integrated Refraction</div>
                <p className="text-sm leading-relaxed text-sophisticated-secondary whitespace-pre-wrap">{synthesis.synthesis}</p>
              </div>
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent">Emergent Insight</div>
                  <div className="p-6 border border-sophisticated-accent/20 bg-sophisticated-accent/5 italic text-sophisticated-ink font-serif">
                    "{synthesis.emergentInsight}"
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent">Recursive Question</div>
                  <p className="text-lg font-serif text-sophisticated-ink">"{synthesis.nextQuestion}"</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeLens.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-8 border-t border-sophisticated-border pt-12"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sophisticated-accent" />
                <h3 className="text-2xl font-serif text-sophisticated-ink">Refraction: {activeLens.name}</h3>
              </div>
              {problem && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sophisticated-secondary hover:text-sophisticated-accent transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent">Cognitive Scaffold</div>
                <p className="text-lg font-serif italic text-sophisticated-ink/90">"{activeLens.scaffold}"</p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-sophisticated-accent">Application</div>
                {problem ? (
                  <p className="text-sm leading-relaxed text-sophisticated-secondary">
                    Applying the <span className="text-sophisticated-ink">{activeLens.name}</span> to your problem: 
                    <span className="block mt-4 text-sophisticated-ink/80">
                      By focusing on {activeLens.description.toLowerCase()}, we can reframe your exploration 
                      through the lens of {activeLens.scaffold.toLowerCase().replace('?', '')}.
                    </span>
                  </p>
                ) : (
                  <p className="text-sm italic text-sophisticated-secondary/30">
                    Enter a problem above to see how this lens refracts it.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
