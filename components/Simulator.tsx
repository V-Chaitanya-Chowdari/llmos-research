/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, ShieldAlert, Cpu, Layers, Terminal, Database, ShieldCheck, 
  Eye, CornerDownRight, Network, RefreshCw, Sparkles, Send, CheckCircle2, ChevronRight, BookOpen, Clock, Activity, HelpCircle
} from 'lucide-react';
import { SimulatorPreset } from '../types';

export const QuantumSimulator: React.FC = () => {
  const presets: SimulatorPreset[] = [
    {
      label: "Customer Restocking Workflow",
      prompt: "Read incoming customer inquiry sheets, cross-reference missing stock in database, draft personalized email via EmailAgent, and log session trace.",
      expectedFlow: ["Input/Observation", "Perception & Abstraction", "Hybrid Kernel (LLM+GNN)", "Memory Manager", "Super Agent Layer", "Policy & Safety Guardrail"],
      outputType: "Workflow Automator",
      outputContent: "🚀 SUCCESS: Restocking workflow executed.\n- Read client inquiry sheets via DocumentParser.\n- Detected 'Item: QuantumProcessor-H100' lacks stock.\n- Invoked GNN to search dependencies: supplier 'Altumatim Corp'.\n- Created EmailAgent draft: 'Draft restocking notification regarding physical delay'.\n- Safety pass: [CLEAR] No data leakage detected.",
      semanticGraph: {
        nodes: ["Customer Inquiry", "Stock Database", "Altumatim Supplier", "EmailAgent Draft", "Policy Pass", "System Execution"],
        edges: ["Inquiry -> DB Search", "DB Search -> Find Supplier", "Find Supplier -> Draft Mail", "Draft Mail -> Guardrail", "Guardrail -> Deploy Output"]
      }
    },
    {
      label: "System Health Diagnostics & Mitigation",
      prompt: "Check core container CPU temperature metrics, detect anomalous jitter, spin-down idle dev instances, and log audit to temporal filesystem.",
      expectedFlow: ["Input/Observation", "Perception & Abstraction", "Hybrid Kernel (LLM+GNN)", "Memory Manager", "Super Agent Layer", "Policy & Safety Guardrail"],
      outputType: "OS Console Exec",
      outputContent: "⚠️ WARNING: Thread scheduler jitter detected on Node-3B.\n- Input Layer parsed 50 temperature ticks. Max raw: 84°C.\n- LLMOS Kernel scheduled container reduction policy.\n- Memory Manager swapped inactive Letta memory pages to database partition.\n- Super Agent ran bash command: `docker-compose down dev-db-replica`.\n- Safety pass: [CLEAR] Command matches privilege level 1.",
      semanticGraph: {
        nodes: ["Telemetry Sensor", "Scheduler Thread", "Active Container list", "Docker Exec", "Safety Filter", "Audit Logs"],
        edges: ["Tick -> Jitter Analysis", "Analysis -> Query Containers", "Query -> Shell Exec", "Shell Exec -> Privilege Audit", "Privilege Audit -> Log FS"]
      }
    },
    {
      label: "Autonomous Personal Planner",
      prompt: "Synthesize workout schedule, cross-reference my historic nutrition goals from April, email calendar events to me, and make index of ingredients.",
      expectedFlow: ["Input/Observation", "Perception & Abstraction", "Hybrid Kernel (LLM+GNN)", "Memory Manager", "Super Agent Layer", "Policy & Safety Guardrail"],
      outputType: "Agent Productivity Suite",
      outputContent: "📅 SCHEDULE CREATED: 3-Day Hypertrophy Split.\n- Fetched historic files: nutrition_goals_2026.json (MemGPT Paged memory recall).\n- Formulated grocery delivery checklist based on GNN calorie constraints.\n- Invoked Super Agent 'CalSync' calendar integration.\n- Safety pass: [INFO] Validated credentials; calendar modification allowed.",
      semanticGraph: {
        nodes: ["User Input", "Nutrition Files", "GNN Constraints", "Calendar Service", "User Context", "Grocery API"],
        edges: ["Input -> Context Fetch", "Context Fetch -> Constraint Build", "Constraint Build -> Schedule Formulation", "Schedule Formulation -> Sync Calendar", "Sync Calendar -> Connect Grocery API"]
      }
    }
  ];

  // Simulator core state
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [executionMessage, setExecutionMessage] = useState<string>("Enter or select a command above and click 'Run Cognitive Kernel' to execute.");
  const [activeTab, setActiveTab] = useState<'kernel' | 'telemetry' | 'paged-memory'>('kernel');

  // GNN node interaction states
  const [selectedGNNNode, setSelectedGNNNode] = useState<number>(-1);
  const [activeLogs, setActiveLogs] = useState<string[]>([
    "System call listener booted. Port: 3000 mapping standard incoming buffers."
  ]);

  // Memory frames map (Simulating virtual memory frames)
  const [memoryPages, setMemoryPages] = useState<{ id: number; tag: string; active: boolean; cached: boolean }[]>([
    { id: 1, tag: "USER_ENV", active: true, cached: true },
    { id: 2, tag: "NUTRITION_April", active: false, cached: true },
    { id: 3, tag: "CalSync_Creds", active: true, cached: true },
    { id: 4, tag: "GNN_Cache_H1", active: true, cached: false },
    { id: 5, tag: "STOCK_DB_Ref", active: false, cached: true },
    { id: 6, tag: "EMAIL_Agent_V2", active: false, cached: false },
    { id: 7, tag: "Docker_Container_L", active: true, cached: true },
    { id: 8, tag: "Policy_Ruleset_G", active: true, cached: true },
    { id: 9, tag: "Client_Inquiry_Log", active: false, cached: false }
  ]);

  // Terminal logs ref for scrolling auto-down
  const logTerminalRef = useRef<HTMLDivElement>(null);

  // Dynamic telemetry states
  const [cpuUsage, setCpuUsage] = useState<number>(14);
  const [contextTokens, setContextTokens] = useState<number>(18400); 
  const [pageFaults, setPageFaults] = useState<number>(0);
  const [safetyGuardScore, setSafetyGuardScore] = useState<number>(100);

  // Auto ticking data simulations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 25) + 12);
      if (isExecuting) {
        setContextTokens(prev => Math.min(128000, prev + Math.floor(Math.random() * 3800) + 1500));
        setSafetyGuardScore(prev => Math.max(94, Math.min(100, prev + (Math.random() > 0.88 ? -1 : 1))));
      } else {
        setContextTokens(prev => Math.max(9000, prev - Math.floor(Math.random() * 300) + 100));
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isExecuting]);

  // Monitor logs to scroll down automatically
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [activeLogs, executionMessage]);

  const addLog = (message: string) => {
    const timeFormatted = new Date().toLocaleTimeString([], { hour12: false });
    setActiveLogs(prev => [...prev, `[${timeFormatted}] ${message}`]);
  };

  const runSimulator = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setCurrentStep(0);
    setPageFaults(0);
    setSelectedGNNNode(-1);
    
    // Clear and build early logs
    setActiveLogs([
      `[${new Date().toLocaleTimeString()}] Dynamic System Call requested by User context.`
    ]);
    addLog(`Ingesting prompt request: "${presets[selectedPreset].prompt.substring(0, 50)}..."`);
    setExecutionMessage("Sensory Input Layer reading incoming stream prompt...");

    // Shuffle active memory frames to simulate system activity
    setMemoryPages(prev => prev.map(p => ({
      ...p,
      active: Math.random() > 0.5,
      cached: Math.random() > 0.3
    })));

    let stepCounter = 0;
    const currentPresetObj = presets[selectedPreset];

    const timer = setInterval(() => {
      stepCounter++;
      setCurrentStep(stepCounter);

      if (stepCounter === 1) {
        setExecutionMessage("Perception & Abstraction Layer drafting high-dimensional embeddings and creating GNN entities...");
        addLog("Abstraction system compiled 1,200 semantic variables. Organizing entity maps...");
        addLog("GNN structure formed with 6 operational nodes.");
      } else if (stepCounter === 2) {
        setExecutionMessage("Cognitive Kernel (LLM + Graph Neural Network) evaluating deep relational dependencies and scheduling task agents...");
        addLog("Evaluating graph relational routes... Query matches system parameters.");
        addLog("Synchronized memory buffers with GPU host node clusters.");
      } else if (stepCounter === 3) {
        // Trigger simulated memory page fault randomly of MemGPT
        const triggerFault = Math.random() > 0.3;
        if (triggerFault) {
          setPageFaults(prev => prev + 1);
          setExecutionMessage("⚠️ MEMORY PAGE FAULT: Finite context window threshold loaded. Swapping inactive Memory-Pages to secure Vector Store...");
          addLog("⚠️ CONTEXT WINDOW LIMIT CAP REACHED: Triggering PagedAttention dynamic swapping mechanism.");
          addLog("Swapped pages Tag: 'STOCK_DB_Ref' and Tag: 'Client_Inquiry_Log' out of active GPU RAM buffer to disk cache.");
          
          // Visually swap nodes out
          setMemoryPages(prev => prev.map((p, idx) => {
            if (idx === 1 || idx === 4) return { ...p, active: false, cached: true };
            if (idx === 3 || idx === 8) return { ...p, active: true, cached: false };
            return p;
          }));
        } else {
          setExecutionMessage("Memory Manager confirmed active Letta memory pages. Segment retrieved with zero latency.");
          addLog("Memory verified. Active pages are aligned with execution threads.");
        }
      } else if (stepCounter === 4) {
        setExecutionMessage("Super Agent Layer spawning autonomous specialized modules (DocumentParser, ShellExec, APIAgent)...");
        addLog("Spawned thread orchestration. Process ID: daemon_task_404.");
        addLog("Activating downstream agents asynchronously. Waiting on feedback triggers...");
      } else if (stepCounter === 5) {
        setExecutionMessage("Policy & Safety Guardrail conducting static privileges, rate boundaries, and prompt sanitization check...");
        addLog("Applying Policy audit rulesets. Isolation Sandboxing active.");
        addLog("Security status: [PASSED] Privilege matched level-1 secure execution boundaries.");
      } else if (stepCounter === 6) {
        clearInterval(timer);
        setIsExecuting(false);
        setExecutionMessage(currentPresetObj.outputContent);
        addLog("🚀 Orchestrator pipeline successfully returned execution payload. Sandbox state synced.");
      }
    }, 1800);
  };

  const currentPresetData = presets[selectedPreset];

  return (
    <div className="w-full bg-[#1c1c1b] text-neutral-100 rounded-2xl shadow-2xl border border-stone-850 overflow-hidden font-sans border-glow">
      
      {/* Simulation Header */}
      <div className="bg-stone-900 border-b border-stone-850 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-nobel-gold/50 to-transparent" />
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-nobel-gold/15 text-nobel-gold border border-nobel-gold/30 text-[10px] font-mono rounded-full uppercase tracking-widest font-bold">
              Interactive Portal
            </span>
            <span className="text-stone-500 font-mono text-xs flex items-center gap-1.5">
              <Activity size={12} className="text-nobel-gold animate-pulse" /> Section 3.1 & 3.2 Visualizer
            </span>
          </div>
          <h3 className="font-serif text-2xl text-white mt-1.5 font-medium">Cognitive Kernel & Orchestration Sandbox</h3>
        </div>
        
        {/* Navigation Tabs with subtle hover states */}
        <div className="flex bg-stone-950 p-1.5 rounded-xl border border-stone-850 self-stretch md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('kernel')}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${activeTab === 'kernel' ? 'bg-[#C5A059] text-stone-950 shadow-sm font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900/60'}`}
          >
            I. KERNEL TERMINAL
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${activeTab === 'telemetry' ? 'bg-[#C5A059] text-stone-950 shadow-sm font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900/60'}`}
          >
            II. GRAPHICS & SEMANTIC MAPS
          </button>
          <button
            onClick={() => setActiveTab('paged-memory')}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${activeTab === 'paged-memory' ? 'bg-[#C5A059] text-stone-950 shadow-sm font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900/60'}`}
          >
            III. MEMORY STRATUM (MEMGPT)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Control Column */}
        <div className="lg:col-span-5 p-8 border-r border-stone-850 bg-stone-900/40 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] text-nobel-gold font-mono uppercase tracking-widest block mb-1 font-bold">Interactive Console</span>
              <h4 className="font-serif text-xl text-white font-medium">Natural Language Control Center</h4>
              <p className="text-stone-400 text-xs leading-relaxed mt-2 font-serif">
                Traditional computational systems force rigid shell syntaxes. Inside a Cognitive User Interface (CUI), conversational goals are autonomously parsed and routed to multi-agent task structures safely.
              </p>
            </div>

            {/* Presets List */}
            <div className="space-y-2.5">
              <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block">Select Research Simulation Preset:</span>
              <div className="space-y-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    disabled={isExecuting}
                    onClick={() => {
                      setSelectedPreset(index);
                      setCurrentStep(-1);
                      setSelectedGNNNode(-1);
                      setExecutionMessage("Preset switched. Click 'Run Cognitive Kernel' to start the system call pipeline.");
                      setActiveLogs([`[${new Date().toLocaleTimeString()}] Switched simulator context profile to Preset ${index + 1}`]);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-mono transition-all duration-200 ${
                      selectedPreset === index 
                        ? 'bg-[#C5A059]/10 border-[#C5A059] text-nobel-gold shadow-md' 
                        : 'bg-stone-950/40 border-stone-850 text-stone-400 hover:text-white hover:bg-stone-950 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between mb-1">
                      <span>{index + 1}. {preset.label}</span>
                      {selectedPreset === index && <Sparkles size={11} className="text-nobel-gold animate-pulse" />}
                    </div>
                    <p className="text-[11px] leading-relaxed text-stone-450 line-clamp-2 mt-1">{preset.prompt}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Manual Prompt Option */}
            <div className="space-y-2">
              <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block">Or Draft Custom Cognitive Task:</span>
              <div className="relative">
                <input
                  type="text"
                  disabled={isExecuting}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Query client data folders, analyze semantic trends via GPT-4o, and file to sheets..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-stone-600 focus:outline-none focus:border-nobel-gold transition"
                />
                <button
                  onClick={() => {
                    if (customPrompt.trim() === "") return;
                    presets.push({
                      label: "Custom Autonomous Interaction",
                      prompt: customPrompt,
                      expectedFlow: ["Input/Observation", "Perception & Abstraction", "Hybrid Kernel (LLM+GNN)", "Memory Manager", "Super Agent Layer", "Policy & Safety Guardrail"],
                      outputType: "Dynamic Orchestrated Output",
                      outputContent: `📂 COMPLETED: Custom pipeline executed for inquiry.\n- Ingested prompt: '${customPrompt}'\n- Parsed dynamic semantic GNN vertices.\n- Super Agent managed process coordination securely.\n- Log status: Done with zero page leaks.\n- Safe draft compiled.`,
                      semanticGraph: {
                        nodes: ["Custom Prompt", "Semantic Parser", "Dynamic Kernel", "Agent Orchestrator", "Security Filter", "Action Done"],
                        edges: ["Prompt -> Embedding", "Embedding -> Route Kernel", "Route Kernel -> Spawn Agents", "Spawn Agents -> Filter Done", "Filter Done -> Terminal Output"]
                      }
                    });
                    setSelectedPreset(presets.length - 1);
                    setCustomPrompt("");
                    setCurrentStep(-1);
                    setExecutionMessage("Custom workflow created. Click run below!");
                    addLog(`Created new dynamic preset sequence mimicking client request.`);
                  }}
                  className="absolute right-2 top-2 p-1.5 bg-stone-800 hover:bg-nobel-gold hover:text-stone-950 rounded-lg text-stone-400 transition"
                  title="Create custom flow"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Execution Button */}
          <div className="pt-6 border-t border-stone-850 mt-8 space-y-4">
            <button
              onClick={runSimulator}
              disabled={isExecuting}
              className={`w-full py-4 px-4 rounded-xl font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md ${
                isExecuting 
                  ? 'bg-stone-800 text-stone-500 border border-stone-750 cursor-not-allowed'
                  : 'bg-nobel-gold hover:bg-[#A98440] text-stone-950 active:scale-[0.98] cursor-pointer'
              }`}
            >
              {isExecuting ? (
                <>
                  <RefreshCw size={14} className="animate-spin text-nobel-gold" /> Pipeline Running...
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" /> Run Cognitive Kernel Pipeline
                </>
              )}
            </button>
            <div className="flex justify-between items-center text-[10px] font-mono text-stone-500">
              <span className="flex items-center gap-1"><Clock size={11} /> EST. RUNTIME: ~10s</span>
              <span>THREADS SPANNED: x12</span>
            </div>
          </div>
        </div>

        {/* Right Tabbed Dynamic Screen */}
        <div className="lg:col-span-7 bg-stone-950 p-8 flex flex-col justify-between min-h-[500px]">
          
          <AnimatePresence mode="wait">
            {activeTab === 'kernel' && (
              <motion.div
                key="kernel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                {/* Visual Pipeline Sequence Nodes */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-stone-400 font-bold uppercase tracking-wider">Kernel Architecture Steps (Section 3.1)</span>
                    <span className="text-[10px] text-nobel-gold font-mono uppercase bg-nobel-gold/10 border border-nobel-gold/20 px-2 py-0.5 rounded-full">Hierarchy Flow</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {currentPresetData.expectedFlow.map((layerName, idx) => {
                      const isActive = currentStep === idx;
                      const isDone = currentStep > idx;
                      const isPending = currentStep < idx;

                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 relative ${
                            isActive 
                              ? 'bg-[#C5A059]/10 border-[#C5A059] text-white shadow-lg scale-[1.02]' 
                              : isDone
                              ? 'bg-stone-900 border-emerald-500/30 text-emerald-400'
                              : 'bg-stone-900/40 border-stone-850 text-stone-600'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Step #{idx + 1}</span>
                            {isDone && <CheckCircle2 size={11} className="text-emerald-400" />}
                            {isActive && <div className="w-2 h-2 rounded-full bg-nobel-gold animate-ping" />}
                          </div>
                          <span className="text-[11px] font-mono mt-2 leading-tight block">{layerName}</span>
                          
                          {/* Layer connection indicator */}
                          {isActive && (
                            <div className="absolute inset-0 border border-nobel-gold/40 rounded-xl animate-pulse pointer-events-none" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Operating System Shell Stream */}
                <div className="bg-stone-920 border border-stone-850 rounded-xl p-5 font-mono text-xs shadow-inner mt-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between border-b border-stone-850 pb-2 mb-3 text-stone-500 text-[10px] tracking-wider uppercase">
                      <span className="flex items-center gap-1.5"><Terminal size={11} /> COGNITIVE CORE PROCESS LOGGER</span>
                      <span>PRESET RUNTIME #{selectedPreset + 1}</span>
                    </div>

                    <div 
                      ref={logTerminalRef}
                      className="space-y-1.5 overflow-y-auto max-h-[160px] pr-2 text-stone-300 scrollbar-thin text-[11px]"
                    >
                      {activeLogs.map((logLine, idx) => (
                        <div key={idx} className="flex gap-2 items-start transition-opacity">
                          <span className="text-stone-600">❯</span>
                          <span className="text-stone-350">{logLine}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Standard output banner */}
                  <div className="pt-3 border-t border-stone-855 rounded bg-stone-950/50 p-4 border border-stone-850/60 font-serif leading-relaxed text-stone-300">
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-mono font-bold mb-1">Result Payload:</span>
                    {isExecuting ? (
                      <p className="text-[#C5A059] flex items-center gap-1.5 animate-pulse font-mono text-xs">
                        <RefreshCw size={12} className="animate-spin" /> {executionMessage}
                      </p>
                    ) : currentStep === 6 ? (
                      <pre className="text-emerald-450 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">{executionMessage}</pre>
                    ) : (
                      <p className="text-stone-500 italic text-xs leading-relaxed">
                        "Enter or select a command from the left panel and click 'Run Cognitive Kernel Pipeline' to trace execution steps."
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'telemetry' && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-mono text-stone-400 font-bold uppercase tracking-wider mb-2">Hybrid GNN Semantic Graph Mapping</h4>
                  <p className="text-stone-450 text-xs font-serif leading-relaxed">
                    By embedding an LLM + Graph Neural Network reasoning engine, client intent is dynamically modeled into semantic vertices. <strong>Click any node</strong> below to inspect how dependencies are resolved at runtime.
                  </p>
                </div>

                {/* Graph Visualization space */}
                <div className="border border-stone-850 rounded-xl bg-stone-920 h-64 relative overflow-hidden flex items-center justify-center p-6 my-2 shadow-inner">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-6 h-full w-full border border-stone-200">
                      {[...Array(12)].map((_, i) => <div key={i} className="border border-stone-200" />)}
                    </div>
                  </div>

                  <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none">
                    {/* Floating connecting Lines */}
                    <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#C5A059" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
                    <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#C5A059" strokeWidth="1" opacity="0.5" />
                    <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#C5A059" strokeWidth="1" opacity="0.4" />
                    <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#C5A059" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                    <line x1="20%" y1="80%" x2="80%" y2="80%" stroke="#C5A059" strokeWidth="1" opacity="0.3" />
                  </svg>

                  <div className="relative w-full h-full">
                    {/* Visual graph nodes rendering */}
                    {currentPresetData.semanticGraph.nodes.map((nodeName, idx) => {
                      // Custom coordinate mapping
                      const coords = [
                        { left: '15%', top: '15%' },
                        { left: '75%', top: '20%' },
                        { left: '50%', top: '50%' },
                        { left: '18%', top: '75%' },
                        { left: '78%', top: '75%' },
                        { left: '48%', top: '20%' }
                      ];
                      const coord = coords[idx] || { left: '50%', top: '50%' };
                      const isNodeSelected = selectedGNNNode === idx;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedGNNNode(idx);
                            addLog(`Selected semantic GNN node: '${nodeName}' mapping to system registry.`);
                          }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-lg border text-[10px] font-mono text-center flex items-center gap-1.5 transition-all group cursor-pointer ${
                            isNodeSelected 
                              ? 'bg-nobel-gold text-stone-950 border-nobel-gold font-bold scale-[1.08] shadow-lg shadow-nobel-gold/10' 
                              : 'border-stone-800 bg-stone-900 text-stone-300 hover:border-nobel-gold/60'
                          }`}
                          style={{ left: coord.left, top: coord.top }}
                        >
                          <Network size={10} className={isNodeSelected ? 'text-stone-950' : 'text-nobel-gold'} />
                          <span className={isNodeSelected ? 'text-stone-950' : 'text-white font-serif group-hover:text-nobel-gold transition-colors'}>{nodeName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub node info panel */}
                <div className="p-3.5 bg-stone-900 border border-stone-850 rounded-xl text-xs flex justify-between items-center">
                  {selectedGNNNode !== -1 ? (
                    <div>
                      <span className="text-[10px] text-nobel-gold font-mono uppercase tracking-widest font-bold">Node Specification Details</span>
                      <p className="text-stone-300 text-[11px] font-mono mt-1 leading-normal">
                        Vertex parameter: <strong className="text-white">'{currentPresetData.semanticGraph.nodes[selectedGNNNode]}'</strong> maps dynamically via semantic dependency ID: <span className="text-[#C5A059]">0x40B{selectedGNNNode * 3}</span>. GNN traversal latency resolved in <strong className="text-emerald-400">1.2ms</strong>.
                      </p>
                    </div>
                  ) : (
                    <p className="text-stone-500 italic font-serif">
                      💡 Pro-tip: Select any semantic node in the structural mapping viewport to audit its runtime ID parameters.
                    </p>
                  )}
                </div>

                {/* Telemetry performance meters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#3c3c3a]">
                  <div className="p-3 bg-stone-900 border border-stone-850 rounded-xl relative overflow-hidden">
                    <span className="text-[10px] text-stone-500 font-mono tracking-wider block font-bold">COGNITIVE OVERHEAD</span>
                    <span className="text-base font-mono font-bold text-white mt-1 block">{cpuUsage}%</span>
                    <div className="absolute bottom-0 left-0 h-1 bg-nobel-gold" style={{ width: `${cpuUsage}%` }}></div>
                  </div>

                  <div className="p-3 bg-stone-900 border border-stone-850 rounded-xl relative overflow-hidden">
                    <span className="text-[10px] text-stone-500 font-mono tracking-wider block font-bold">DYNAMIC CONTEXT</span>
                    <span className="text-base font-mono font-bold text-white mt-1 block">{(contextTokens / 1000).toFixed(1)}k tokens</span>
                    <div className="absolute bottom-0 left-0 h-1 bg-cyan-400" style={{ width: `${(contextTokens / 128000) * 100}%` }}></div>
                  </div>

                  <div className="p-3 bg-stone-900 border border-stone-850 rounded-xl">
                    <span className="text-[10px] text-stone-500 font-mono tracking-wider block font-bold">PAGED SWAP FAULTS</span>
                    <span className={`text-base font-mono font-bold mt-1 block ${pageFaults > 0 ? 'text-rose-400' : 'text-stone-300'}`}>{pageFaults}</span>
                  </div>

                  <div className="p-3 bg-stone-900 border border-stone-850 rounded-xl relative overflow-hidden">
                    <span className="text-[10px] text-stone-500 font-mono tracking-wider block font-bold">SAFETY INTEG.</span>
                    <span className="text-base font-mono font-bold text-emerald-400 mt-1 block">{safetyGuardScore}%</span>
                    <div className="absolute bottom-0 left-0 h-1 bg-emerald-400" style={{ width: `${safetyGuardScore}%` }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'paged-memory' && (
              <motion.div
                key="paged-memory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-mono text-stone-400 font-bold uppercase tracking-wider mb-2">Memory Window Virtualization (MemGPT & Letta Models)</h4>
                  <p className="text-stone-450 text-xs font-serif leading-relaxed">
                    By implementing an active 2-Tier memory paging system, LLMOS bypasses physical context window memory constraints. Audit the virtual memory pages map below.
                  </p>
                </div>

                {/* Representation of the Virtual Memory Map */}
                <div className="border border-stone-850 rounded-xl bg-stone-920 p-5 font-mono text-xs space-y-4 my-2 shadow-inner">
                  <div className="flex justify-between items-center border-b border-stone-850 pb-2 mb-2 text-stone-405 text-[10px] tracking-wider uppercase">
                    <span>Virtual Memory Page Tables map</span>
                    <span className="text-[#C5A059] flex items-center gap-1.5"><Database size={11} /> 2-Tier Hierarchy</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Tier 1 Box: Core Token Context Window (Active memory) */}
                    <div className="md:col-span-12 lg:col-span-6 bg-stone-900 border border-stone-800 p-4 rounded-lg space-y-3">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">Active Context Pages (Tier-1)</span>
                      
                      {/* Interactive grid of memory map files */}
                      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                        {memoryPages.map((page) => (
                          <div 
                            key={page.id} 
                            className={`p-1.5 rounded border text-center transition-all ${
                              page.active 
                                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 animate-pulse' 
                                : 'bg-stone-950/40 border-stone-850 text-stone-600'
                            }`}
                          >
                            <span>#{page.id}</span>
                            <span className="block text-[8px] text-stone-400 font-serif truncate mt-0.5">{page.tag}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-1 select-none">
                        <div className="flex justify-between items-center text-[9px] text-stone-500 font-mono mb-1">
                          <span>OCCUPANCY RATE:</span>
                          <span>{((contextTokens / 128000) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-400 h-full transition-all duration-500" style={{ width: `${(contextTokens / 128000) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Tier 2 Box: Persistent Historical Database */}
                    <div className="md:col-span-12 lg:col-span-6 bg-stone-900 border border-stone-800 p-4 rounded-lg space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-nobel-gold uppercase tracking-widest block">Persistent Swap space (Tier-2)</span>
                        <p className="text-[11px] text-stone-400 leading-normal font-serif mt-1">
                          Infinite cache vector partition. Dynamic database pages are fetched via semantic consensus search when active limits fault.
                        </p>
                      </div>

                      <div className="bg-stone-950 border border-stone-850 p-2.5 rounded text-[10px] text-stone-500 space-y-1 select-none">
                        <div className="flex justify-between"><span>Vector index paging blocks:</span> <span className="text-white">1,500</span></div>
                        <div className="flex justify-between"><span>Active consensus loops:</span> <span className="text-nobel-gold">True</span></div>
                        <div className="flex justify-between"><span>Page swap latency:</span> <span className="text-emerald-400">~60ms</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtext info */}
                <p className="text-xs text-stone-450 text-center font-serif leading-relaxed px-4">
                  🌀 <strong>PagedAttention Mechanism:</strong> When tasks overflow GPU RAM, pointers are mapped to the offline store dynamically, preventing context leakage while keeping latency within human millisecond boundaries.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core telemetrics overlay bar */}
          <div className="pt-6 border-t border-stone-850 mt-6 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="p-2.5 bg-stone-900 border border-stone-800 rounded-xl flex items-center justify-center shadow">
                {isExecuting ? (
                  <Sparkles size={20} className="text-nobel-gold animate-spin" />
                ) : (
                  <ShieldCheck size={20} className="text-emerald-400" />
                )}
              </div>
              <div className="font-mono text-xs leading-none">
                <div className="text-stone-100 font-bold uppercase tracking-wider text-[11px]">System Call Pipeline status</div>
                <div className="text-stone-400 font-serif text-[11.5px] mt-1.5">
                  {isExecuting ? 'Tracing dependency routing maps...' : 'Cognitive kernel active & listening...'}
                </div>
              </div>
            </div>

            <div className="text-right text-[9px] font-mono text-stone-550 hidden sm:block">
              <div>HOST PORT: SECURE SANDBOX</div>
              <div className="mt-1">PROJECT PATH: COGNITIVE_RAW_V2</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
