/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Layers, AppWindow, ShieldAlert, Sparkles, Server, Zap, ArrowRight, Table } from 'lucide-react';

// --- AI STACK LAYER DIAGRAM (SECTION 3.3) ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(3); // Default to top AI OS layer

  const stackLayers = [
    {
      level: 4,
      name: "AI OS (Centralized Control Hub)",
      desc: "Situated at the apex of the AI Stack. Unifies, manages and schedules multi-agent interactions, translating natural user intent into system actions.",
      projects: "Steve, AltumatimOS, AIOS, Google Fuchsia",
      valueCapture: "High (Central point of user session interaction)",
      techSpec: "GNN Knowledge graph reasoning + LLM cognitive core",
      icon: <Cpu className="text-nobel-gold" size={16} />
    },
    {
      level: 3,
      name: "Applications Layer",
      desc: "Specialized tools and automated systems addressing specific domains. Transitioning from monolithic graphical software into modular API skillsets.",
      projects: "Health Assistants, Code Copilots, Document Summarizers",
      valueCapture: "Moderate (Becomes outsourced agents managed by the OS)",
      techSpec: "Specialized APIs, task-specific prompts, fine-tuned adapters",
      icon: <AppWindow className="text-stone-400" size={16} />
    },
    {
      level: 2,
      name: "Foundation Models Layer",
      desc: "The core intelligence engines powering linguistic and cognitive reasoning processes. Serves as the cognitive CPU/GPU.",
      projects: "Gemini 2.5, GPT-4o, Claude 3.5, Llama 3",
      valueCapture: "Significant (Commoditizing standard text/image inference pools)",
      techSpec: "Autoregressive Transformers, dense parametric weights",
      icon: <Layers className="text-stone-400" size={16} />
    },
    {
      level: 1,
      name: "Cloud Infrastructure & Silicon",
      desc: "Physical compute cluster foundation. Houses high-performance chips and host node arrays hosting tensor mathematics.",
      projects: "NVIDIA H100/B200, AMD Instinct, AWS TPU Clusters, Google Cloud",
      valueCapture: "High (Substantial hardware capital Moat)",
      techSpec: "Parallel matrix calculations, high-bandwidth memory (HBM)",
      icon: <Server className="text-stone-500" size={16} />
    }
  ];

  const currentLayer = stackLayers.find(l => l.level === selectedLayer) || stackLayers[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch p-8 bg-[#FAF9F5] rounded-xl border border-stone-200 shadow-sm my-8">
      {/* Visual Stack Layers */}
      <div className="flex-1 flex flex-col justify-between gap-3 min-w-[280px]">
        <div>
          <span className="text-[10px] text-nobel-gold font-mono uppercase tracking-widest font-bold">The AI Hierarchy Matrix</span>
          <h3 className="font-serif text-2xl text-stone-900 mt-1 mb-2">Interactive AI Stack Core</h3>
          <p className="text-xs text-stone-550 leading-relaxed font-serif mb-6">
            Click on any layer of the vertical conceptual stack diagram to dissect its core design, prominent projects, and market value dynamics.
          </p>
        </div>

        <div className="space-y-2.5 flex-1 flex flex-col justify-center">
          {stackLayers.map((layer) => {
            const isSelected = selectedLayer === layer.level;
            return (
              <button
                key={layer.level}
                onClick={() => setSelectedLayer(layer.level)}
                className={`w-full p-4 rounded-xl text-left border transition-all duration-300 relative overflow-hidden flex items-center justify-between group ${
                  isSelected 
                    ? 'bg-stone-950 border-stone-950 text-white shadow-md scale-[1.01]' 
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                {/* Visual level label */}
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-nobel-gold/15 border-nobel-gold text-nobel-gold' : 'bg-stone-100 border-stone-200 text-stone-500'}`}>
                    L{layer.level}
                  </span>
                  <div>
                    <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>{layer.name}</h4>
                    <span className="text-[10px] text-stone-500 font-serif leading-none mt-1 block">Value Focus: {layer.valueCapture.split('(')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {layer.icon}
                  <ArrowRight size={13} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'text-nobel-gold' : 'text-stone-400'}`} />
                </div>

                {/* Highlight selection side bar */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-nobel-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Detail Diagnostic Card */}
      <div className="w-full lg:w-96 bg-stone-900 text-stone-100 p-6 rounded-xl border border-stone-850 flex flex-col justify-between shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLayer}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-[10px] text-nobel-gold font-mono uppercase tracking-widest font-bold">Deep Dive Analysis</span>
                <span className="text-[10px] text-stone-500 font-mono">LAYER LEVEL: {currentLayer.level} / 4</span>
              </div>
              <h4 className="font-serif text-xl font-medium mt-3 text-white">{currentLayer.name}</h4>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-serif">
              {currentLayer.desc}
            </p>

            {/* Structured specifications */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-mono">
                <span className="text-stone-500 uppercase block">Prominent Projects:</span>
                <span className="text-stone-200 mt-1 block">{currentLayer.projects}</span>
              </div>

              <div className="text-[11px] font-mono">
                <span className="text-stone-500 uppercase block">Underlying Tech Spec:</span>
                <span className="text-stone-200 mt-1 block">{currentLayer.techSpec}</span>
              </div>

              <div className="text-[11px] font-mono">
                <span className="text-stone-500 uppercase block">Value Capture Dynamics:</span>
                <span className="text-nobel-gold mt-1 block">{currentLayer.valueCapture}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 pt-4 border-t border-stone-800 flex items-center justify-between text-[10px] font-mono text-stone-500">
          <span>COGNITIVE PLATFORM RESEARCH</span>
          <span>© 2026 CO-COGNITION OS</span>
        </div>
      </div>
    </div>
  );
};

// --- PERFORMANCE METRICS & METERS comparison (TRADITIONAL vs LLMOS) ---
export const PerformanceMetricDiagram: React.FC = () => {
  const [operationalDomain, setOperationalDomain] = useState<'automation' | 'compatibility' | 'overhead'>('automation');

  const domainData = {
    automation: {
      headline: "Multi-Task Process Automation",
      subtitle: "Complexity of scheduling complex multi-step workflows like parsing inquiries, looking up items, and drafting supplier mails.",
      metrics: [
        { label: "Intention Detection Accuracy", traditional: 15, llmos: 94 },
        { label: "Execution Speed per Task Node", traditional: 92, llmos: 60 },
        { label: "Contextual Personalization", traditional: 5, llmos: 885 }, // multiplied weight for score rendering
        { label: "Action Autonomy Score", traditional: 10, llmos: 85 }
      ],
      commentary: "LLM OS provides exceptionally high intention comprehension, orchestrating modular sub-agents natively. Traditional OS forces user to execute each command manually in compartmentalized layouts."
    },
    compatibility: {
      headline: "Legacy Interoperability & Adaptability",
      subtitle: "Ability to integrate with multi-tenant custom containers, legacy APIs, and read irregular spatial structured formats.",
      metrics: [
        { label: "Zero-Shot API Adaptation", traditional: 2, llmos: 78 },
        { label: "Visual Screen-to-Action OCR Mapping", traditional: 0, llmos: 84 },
        { label: "Cognitive Memory Access Cache", traditional: 15, llmos: 90 },
        { label: "API Structural Fragility Factor", traditional: 88, llmos: 15 } // lower is better
      ],
      commentary: "By integrating dynamic reasoning (Section 3.2), LLMOS easily navigates legacy CLI inputs and handles unexpected API state drops safely, while traditional systems error out immediately on syntax drift."
    },
    overhead: {
      headline: "Resource Overhead & Scheduling Jitter",
      subtitle: "Core CPU scheduling latency, RAM paging fault occurrences, and hardware latency when running massive models on physical nodes.",
      metrics: [
        { label: "Thread Scheduler Memory footprint", traditional: 4, llmos: 78 }, // lower is better
        { label: "CPU Compute Jitter in micro-seconds", traditional: 12, llmos: 84 }, // lower is better
        { label: "Hardware Cold-Start Latency (seconds)", traditional: 1, llmos: 18 }, // lower is better
        { label: "Paging Speed over external I/O channels", traditional: 95, llmos: 50 }
      ],
      commentary: "Traditional OSs drastically outperform LLM OSs in resource footprints, fast initialization, and absolute execution latencies. This massive penalty is the primary engineering design bottleneck for LLMOS."
    }
  };

  const activeData = domainData[operationalDomain];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-stretch p-8 bg-stone-900 border border-stone-850 rounded-2xl text-stone-100 my-8 shadow-2xl relative overflow-hidden">
      
      {/* Visual background ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-nobel-gold/5 blur-[80px]" />
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-nobel-gold inline-block" />
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest font-bold">Section 1.2 & 5.1 Metrics</span>
          </div>
          <h3 className="font-serif text-2xl text-white">Traditional OS vs. LLM OS Paradigms</h3>
          <p className="text-xs text-stone-400 font-serif leading-relaxed mt-2">
            While LLM Operating Systems yield unprecedented intelligence advantages, they pay a severe performance toll in latency and footprint. 
          </p>

          <div className="flex gap-2.5 mt-6 flex-wrap">
            {(['automation', 'compatibility', 'overhead'] as const).map((domain) => (
              <button
                key={domain}
                onClick={() => setOperationalDomain(domain)}
                className={`px-3 py-2 rounded-lg text-xs font-mono transition-all border duration-200 uppercase tracking-wider ${
                  operationalDomain === domain
                    ? 'bg-nobel-gold text-stone-950 font-bold border-nobel-gold shadow-md'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-600 hover:text-stone-200'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-stone-950/80 border border-stone-850 p-4 rounded-xl mt-6">
          <h4 className="text-xs font-serif text-white font-medium mb-1.5">{activeData.headline}</h4>
          <p className="text-[11px] text-stone-450 leading-relaxed font-serif">
            {activeData.subtitle}
          </p>
        </div>
      </div>

      <div className="w-full md:w-96 p-6 rounded-xl bg-stone-950 border border-stone-805 space-y-5 flex flex-col justify-between">
        <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest font-bold pb-2 border-b border-stone-850">Performance Meters</h4>
        
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {activeData.metrics.map((metric, idx) => {
            // Find max of the pair to render percentages proportionately
            const maxVal = Math.max(metric.traditional, metric.llmos, 1);
            const tradPercent = (metric.traditional / maxVal) * 100;
            const llmosPercent = (metric.llmos / maxVal) * 100;

            return (
              <div key={idx} className="space-y-1.5">
                <span className="text-[11px] text-stone-300 font-serif block">{metric.label}</span>
                
                {/* Traditional OS meter */}
                <div className="space-y-0.5">
                  <div className="flex justify-between items-center text-[9px] font-mono text-stone-500">
                    <span>Traditional kernel</span>
                    <span>{metric.traditional}%</span>
                  </div>
                  <div className="w-full bg-stone-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-stone-500 h-full transition-all duration-500" style={{ width: `${tradPercent}%` }} />
                  </div>
                </div>

                {/* LLMOS meter */}
                <div className="space-y-0.5">
                  <div className="flex justify-between items-center text-[9px] font-mono text-[#C5A059]">
                    <span>LLM dynamic OS</span>
                    <span>{metric.llmos > 100 ? (metric.llmos / 10).toFixed(0) : metric.llmos}%</span>
                  </div>
                  <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-nobel-gold h-full transition-all duration-500 shadow-[0_0_8px_rgba(197,160,89,0.3)]" style={{ width: `${llmosPercent}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-stone-500 leading-normal italic font-serif pt-2 border-t border-stone-850/50">
          💡 {activeData.commentary}
        </p>
      </div>

    </div>
  );
};
