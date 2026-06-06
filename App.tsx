/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeroScene } from './components/QuantumScene';
import { TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { QuantumSimulator } from './components/Simulator';
import {
  ArrowDown, Menu, X, BookOpen, Cpu, Layers, Terminal, Sparkles, Core, 
  HelpCircle, ChevronRight, ShieldCheck, Database, Zap, FileText, Search, Filter, ShieldAlert
} from 'lucide-react';
import { LLMProject } from './types';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group items-center p-8 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ transitionDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3 group-hover:text-nobel-gold transition-colors">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed font-mono">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Landscape database states
  const [searchQuery, setSearchQuery] = useState("");
  const [osOnlyFilter, setOsOnlyFilter] = useState(false);
  const [openSourceFilter, setOpenSourceFilter] = useState<'all' | 'open' | 'proprietary'>('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(0);

  const projectsLandscape: LLMProject[] = [
    {
      name: "AIOS",
      type: "LLM Agent OS",
      focus: "Optimizes agent scheduling, concurrent thread execution, context switching, and privilege boundaries.",
      tech: "LLM as Core Processor Brain / Kernel Scheduler",
      isOpenSource: true,
      description: "AIOS is explicitly engineered as an agent operating system, striving to imbue raw processors 'with soul'. It directly addresses scheduling bottleneck jitter and multi-agent resource contention by virtualizing agent cycles.",
      logoColor: "bg-nobel-gold/15 text-nobel-gold border-nobel-gold/30"
    },
    {
      name: "AltumatimOS",
      type: "LLM + GNN Kernel",
      focus: "Orchestrates intelligent behavior, manages dynamic relational graphs, task schedules, and adaptive contextual routing.",
      tech: "Hybrid LLM + GNN Reasoning engine",
      isOpenSource: false,
      description: "A next-generation enterprise OS integrating Graph Neural Networks with LLMs at the deepest kernel levels. This hybrid structure lets linguistic models parse prompts while GNNs traverse strict system relational indexes safely.",
      logoColor: "bg-stone-800 text-stone-100 border-stone-700"
    },
    {
      name: "MemGPT / Letta",
      type: "Memory Stratum",
      focus: "Implements self-managed two-tier memory hierarchies for unbounded context limits.",
      tech: "PagedAttention & Agentic virtual RAM swapping",
      isOpenSource: true,
      description: "MemGPT treats LLMs directly as operating systems by virtualizing active context memory. It dynamically pages historical logs and vector indexes in and out of the real-time context buffer, mimicking disk paging models.",
      logoColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      name: "ExoCore-Kernel",
      type: "Experimental Kernel",
      focus: "Explores building a secure microkernel entirely from scratch guided by language reasoning.",
      tech: "ChatGPT o3 / o4-mini direct code compiler",
      isOpenSource: true,
      description: "A futuristic exploration proving the capability of advanced reasoning models to write, compile, test, and adapt its own system call boundaries directly over low-level hardware modules.",
      logoColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      name: "Self-Operating Computer",
      type: "GUI Automation",
      focus: "Empowers multimodal models to operate standard computer interfaces by visual perception and actions.",
      tech: "GPT-4o, Claude 3, Qwen VL, visual XY action clicks",
      isOpenSource: true,
      description: "A framework that interacts with standard systems by looking at screenshots and translating language directives into physical mouse drags, pointer clicks, and keystrokes natively.",
      logoColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      name: "UI-TARS Desktop",
      type: "GUI Automation",
      focus: "Leverages dedicated vision-language agents to execute cross-platform UI interactions.",
      tech: "UI-TARS Vision-Language Model with OCR metrics",
      isOpenSource: true,
      description: "An advanced GUI Agent application offering real-time task feedback and precise mouse location control, bypassing manual script installations altogether.",
      logoColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    },
    {
      name: "Windows Copilot",
      type: "Commercial Integration",
      focus: "Integrates direct conversational task automation directly into consumer desktop platforms.",
      tech: "GPT Models + Windows local API hooks",
      isOpenSource: false,
      description: "Microsoft's consumer implementation that positions AI as a centralized natural language interface companion, bridging files, apps, and browser interactions.",
      logoColor: "bg-stone-205 text-stone-800 border-stone-300"
    },
    {
      name: "Google Fuchsia",
      type: "AI-Driven OS",
      focus: "Commercial microkernel platform with adaptive automation built into Fuchsia's Zircon kernel.",
      tech: "Zircon microkernel + on-device adaptive loop learning",
      isOpenSource: false,
      description: "An emerging commercial OS built from the ground up to support AI-intensive workloads. It utilizes adaptive learning algorithms to optimize process scheduling natively in microkernel structures.",
      logoColor: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    },
    {
      name: "Steve",
      type: "Enterprise AI OS",
      focus: "Unifies, automates, and orchestrates workflows across fragmented business lines.",
      tech: "AI-driven shared memory system + API connectors",
      isOpenSource: false,
      description: "Steve serves as a centralized company hub, running continuous multi-agent sessions over shared databases, providing enterprise cognitive coordination across apps.",
      logoColor: "bg-violet-500/10 text-violet-400 border-violet-500/20"
    },
    {
      name: "LangChain",
      type: "Orchestration Library",
      focus: "Provides foundational classes and connectors for indexing, prompting, and chaining LLMs.",
      tech: "Modular agent libraries + custom connectors",
      isOpenSource: true,
      description: "A versatile open-source engine simplifying prompt engineering, memory tracking, and tool execution, laying the early modular foundation for what became the modern AI OS.",
      logoColor: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Filter the landscape database
  const filteredLandscape = projectsLandscape.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.focus.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOSFilter = !osOnlyFilter || p.type.includes("OS") || p.type.includes("Kernel");
    const matchesLicense = openSourceFilter === 'all' || 
                           (openSourceFilter === 'open' && p.isOpenSource) || 
                           (openSourceFilter === 'proprietary' && !p.isOpenSource);
                           
    return matchesSearch && matchesOSFilter && matchesLicense;
  });

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-850 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm border-b border-stone-200/40 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">λ</div>
            <span className={`font-serif font-bold text-base tracking-widest transition-all ${scrolled ? 'opacity-100 ring-nobel-gold/20' : 'opacity-100'}`}>
              LLMOS <span className="font-normal text-stone-500 font-mono text-xs">PARADIGM</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-widest text-stone-605">
            <a href="#abstract" onClick={scrollToSection('abstract')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Abstract</a>
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">I. Introduction</a>
            <a href="#interactive-kernel" onClick={scrollToSection('interactive-kernel')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">II. Sandbox Simulator</a>
            <a href="#architecture" onClick={scrollToSection('architecture')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">III. Architecture</a>
            <a href="#landscape" onClick={scrollToSection('landscape')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">IV. Tech Landscape</a>
            <a href="#challenges" onClick={scrollToSection('challenges')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">V. Challenges</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Authors</a>
          </div>

          <button className="lg:hidden text-stone-90 transition p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in px-6">
            <a href="#abstract" onClick={scrollToSection('abstract')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-stone-800">Abstract</a>
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-stone-800">I. Introduction</a>
            <a href="#interactive-kernel" onClick={scrollToSection('interactive-kernel')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-stone-800">II. Sandbox Simulator</a>
            <a href="#architecture" onClick={scrollToSection('architecture')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-stone-800">III. Architecture</a>
            <a href="#landscape" onClick={scrollToSection('landscape')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-stone-800">IV. Tech Landscape</a>
            <a href="#challenges" onClick={scrollToSection('challenges')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-stone-800">V. Challenges</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase text-stone-800">Authors</a>
        </div>
      )}

      {/* Landing Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Editorial Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.15)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-[10px] tracking-[0.25em] uppercase font-mono rounded-full backdrop-blur-sm bg-white/30 font-bold">
            RESEARCH COMPENDIUM • JULY 3, 2025
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-stone-900 shadow-sm">
            A Transformative Paradigm <br/>
            <span className="italic font-normal text-stone-600 block mt-2 text-2xl sm:text-4xl lg:text-5xl">Large Language Model Operating Systems (LLMOS)</span>
          </h1>
          <div className="w-16 h-0.5 bg-nobel-gold mx-auto mb-8 opacity-60"></div>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-700 font-serif font-light leading-relaxed mb-12">
            Moving beyond physical resource management into a <strong>Cognitive User Interface (CUI)</strong>. An architectural and comparative study of embedding LLM + GNN reasoning kernels into modern operating frameworks.
          </p>
          
          <div className="flex justify-center">
             <a href="#abstract" onClick={scrollToSection('abstract')} className="group flex flex-col items-center gap-2 text-xs font-mono tracking-widest text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>DISCOVER ABSTRACT</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={14} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        
        {/* Abstract callout */}
        <section id="abstract" className="py-24 bg-white border-y border-stone-200/40">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-stone-200/60 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 left-0 w-2 h-full bg-nobel-gold" />
              <div className="flex items-center gap-2 text-nobel-gold text-xs font-mono uppercase tracking-widest font-bold mb-4">
                <BookOpen size={14} /> ABSTRACT OF CO-COGNITION
              </div>
              <p className="font-serif text-lg text-stone-700 leading-relaxed italic">
                "The emergence of Large Language Models (LLMs) is fundamentally reshaping computing, leading to the concept of the Large Language Model Operating System (LLMOS). This paper explores LLMOS as a paradigm shift, where LLMs power core OS functionalities, enabling intuitive natural language interaction and intelligent task management. We detail core characteristics, layered architectural frameworks, dynamic reasoning, and the unique hybrid reasoning engine integrating LLMs with Graph Neural Networks (GNNs), positioning the platform at the apex of the AI Stack."
              </p>
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="text-xs font-mono text-stone-500">
                  SUBJECT RELEVANCY: <span className="text-stone-800 font-bold">LLMOS, PAGEDATTENTION, CORE COGNITION</span>
                </div>
                <div className="text-xs text-stone-500 font-serif">
                  Directed by <span className="font-serif italic text-stone-900 font-bold">V Chaitanya Chowdari</span> et al.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl space-y-16">
            
            {/* Context Heading */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <div className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold mb-1">CHAPTER I</div>
                <h2 className="font-serif text-4xl text-stone-900">The Dawn of LLMOS</h2>
              </div>
              <div className="md:col-span-8 text-neutral-600 font-serif leading-relaxed text-base space-y-6">
                <p>
                  <span className="text-6xl float-left mr-3 mt-[-8px] font-serif text-[#C5A059]">T</span>he pervasive influence of Large Language Models has initiated a reevaluation of fundamental computing paradigms. This transformative shift seek to embed LLM agents directly into the core fabric of operating systems, shifting human interaction from rigid graphic components (GUIs) to conversational dialogue commands.
                </p>
                <p>
                  A compelling analogy is to consider the <strong>LLM as the kernel</strong>. Equipped with a system call interface, agent scheduler, and context manager, this kernel translates user intents directly into low-level execution calls, acting as a direct <strong>"cognitive amplifier"</strong> rather than a mere hardware resource allocator.
                </p>
              </div>
            </div>

            {/* Performance Metric component embedded */}
            <div className="bg-[#FAF9F5] p-2 rounded-2xl border border-stone-200">
              <PerformanceMetricDiagram />
            </div>

            {/* Shift section details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-stone-900 font-bold">1.1 Definining LLM OS</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-serif">
                  At its essence, an LLM OS is a computing layout where primary functionalities—encompassing user interaction, intricate task scheduling, context management, and external API tool integration—are intrinsically managed by a reasoning model. The user focus moves completely from the mechanics of operating the physical machine to the effectiveness of articulating desired outcomes.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-stone-900 font-bold">1.2 Evolution to Intelligent Systems</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-serif">
                  Windows, macOS, and Linux have historically forced humans to master CLI command syntaxes, taxing learning curves. By redefining computer literacy, LLM Operating Systems introduce a centralized cognitive interface that streamlines disjointed applications into modular 'skills' orchestrated concurrently on-demand.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Playable Sandbox Simulator */}
        <section id="interactive-kernel" className="py-24 bg-stone-900 text-stone-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-850 text-nobel-gold text-xs font-mono font-bold tracking-widest uppercase rounded-full border border-stone-800">
                <Terminal size={12} /> CHAPTER II: PLAYGROUND
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">The Cognitive OS Interactive Sandbox</h2>
              <p className="text-stone-400 text-sm leading-relaxed font-serif max-w-xl mx-auto">
                Execute natural language instructions and trace how a Cognitive Kernel parses intents, compiles semantic GNN task graphs, manages virtual memory paging, and activates specialized agents concurrently.
              </p>
            </div>

            {/* Dynamic simulator portal component */}
            <QuantumSimulator />
          </div>
        </section>

        {/* Architectural layering & Stack section */}
        <section id="architecture" className="py-24 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6 max-w-5xl space-y-16">
            
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
              <span className="text-[10px] text-nobel-gold font-mono uppercase tracking-widest font-bold block">CHAPTER III</span>
              <h2 className="font-serif text-4xl text-stone-900 font-bold">Architectural Layering & Hybrid Reasoning</h2>
              <p className="text-stone-600 text-sm font-serif leading-relaxed max-w-xl mx-auto">
                Section 3.1 & 3.2 details the modular layout of an LLM OS. By integrating a hybrid LLM + GNN kernel (as in AltumatimOS), semantic graph traversals are resolved with absolute structure.
              </p>
            </div>

            {/* Embedded Stack Layers Diagram */}
            <TransformerDecoderDiagram />

            {/* Layer details description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="p-8 bg-[#FAF9F5] rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg bg-nobel-gold/10 text-nobel-gold flex items-center justify-center mb-6">
                  <Cpu size={20} />
                </div>
                <h4 className="font-serif text-lg font-bold mb-3 text-stone-900">Hybrid GNN Reasoning</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  While linguistic models show exceptional semantic parsing prowess, they lack relational structures to monitor strict system state trees. A hybrid kernel couples an LLM with a Graph Neural Network to verify operational dependencies without failure.
                </p>
              </div>

              <div className="p-8 bg-[#FAF9F5] rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg bg-nobel-gold/10 text-nobel-gold flex items-center justify-center mb-6">
                  <Database size={20} />
                </div>
                <h4 className="font-serif text-lg font-bold mb-3 text-stone-900">Temporal Memory Paging</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  Finite token context windows serve as the physical RAM bottleneck of an LLMOS. Using hierarchical vector caches (as in MemGPT), the memory manager dynamically pages episodic timelines and file fragments in/out of the immediate window buffer.
                </p>
              </div>

              <div className="p-8 bg-[#FAF9F5] rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg bg-nobel-gold/10 text-nobel-gold flex items-center justify-center mb-6">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-serif text-lg font-bold mb-3 text-stone-900">Policy & Privilege Layers</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  A constant policy monitor applies constraints, ethical boundaries, and sandboxing rules in real time. It monitors super agent system calls and database reads to prevent malicious prompts from compromising host structures.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Tech Landscape Database Section */}
        <section id="landscape" className="py-24 bg-stone-950 text-stone-100 border-t border-stone-900">
          <div className="container mx-auto px-6 max-w-5xl">
            
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 text-nobel-gold text-xs font-mono font-bold tracking-widest uppercase rounded-full border border-stone-800">
                <Search size={12} /> CHAPTER IV: COMPENDIUM
              </div>
              <h2 className="font-serif text-4xl text-white font-bold">The LLM Operating System Landscape</h2>
              <p className="text-stone-400 text-xs leading-relaxed font-serif max-w-xl mx-auto">
                Table 3 and Section 6.1 of the paper outlines pioneering research projects and commercial software implementations. Use the filters below to browse.
              </p>
            </div>

            {/* Filter controls */}
            <div className="bg-stone-900/60 p-6 rounded-2xl border border-stone-850 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query project, compiler or focus..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 pl-11 pr-4 text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-nobel-gold"
                />
                <Search size={13} className="text-stone-600 absolute left-4 top-3.5" />
              </div>

              {/* License type filters */}
              <div className="flex bg-stone-950 p-1.5 rounded-xl border border-stone-800 justify-between">
                {(['all', 'open', 'proprietary'] as const).map((license) => (
                  <button
                    key={license}
                    onClick={() => setOpenSourceFilter(license)}
                    className={`flex-1 py-1.5 text-[10px] font-mono rounded ${openSourceFilter === license ? 'bg-stone-800 text-nobel-gold font-bold' : 'text-stone-500 hover:text-white'}`}
                  >
                    {license.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* OS only checkbox */}
              <button
                onClick={() => setOsOnlyFilter(!osOnlyFilter)}
                className={`py-3 px-4 rounded-xl border text-xs font-mono transition-colors flex items-center justify-center gap-2 ${osOnlyFilter ? 'bg-nobel-gold/15 border-nobel-gold text-nobel-gold' : 'bg-stone-950 border-stone-805 text-stone-500 hover:text-stone-200'}`}
              >
                <Filter size={11} />
                <span>{osOnlyFilter ? "OS & KERNELS ONLY [MEM]" : "ALL FRAMEWORKS & OSs"}</span>
              </button>
            </div>

            {/* Interactive master-detail listing */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-mono">
              {/* Left hand list */}
              <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-2 border-r border-stone-900/50">
                {filteredLandscape.length > 0 ? (
                  filteredLandscape.map((proj, index) => {
                    const isSelected = selectedProject !== null && projectsLandscape.findIndex(p => p.name === proj.name) === selectedProject;
                    const realIndex = projectsLandscape.findIndex(p => p.name === proj.name);
                    return (
                      <button
                        key={proj.name}
                        onClick={() => setSelectedProject(realIndex)}
                        className={`w-full p-4 rounded-xl text-left border flex items-center justify-between transition group ${
                          isSelected 
                            ? 'bg-stone-900 border-nobel-gold/50 text-white shadow-lg' 
                            : 'bg-stone-920 border-stone-850 hover:bg-stone-900 text-stone-450 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${proj.logoColor}`}>
                            {proj.name[0]}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-stone-100 block">{proj.name}</span>
                            <span className="text-[10px] text-stone-500 mt-0.5 block">{proj.type}</span>
                          </div>
                        </div>

                        <span className={`text-[9px] px-2 py-0.5 rounded border transition ${proj.isOpenSource ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                          {proj.isOpenSource ? "OPEN" : "PROP"}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-xs text-stone-600 font-serif italic">
                    No frameworks found matching criteria.
                  </div>
                )}
              </div>

              {/* Right hand details display card */}
              <div className="lg:col-span-7 bg-stone-920 p-8 rounded-2xl border border-stone-850 flex flex-col justify-between shadow-inner">
                {selectedProject !== null && projectsLandscape[selectedProject] ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start border-b border-stone-850 pb-4">
                      <div>
                        <span className="text-[10px] text-[#C5A059] block uppercase tracking-wider font-bold">{projectsLandscape[selectedProject].type}</span>
                        <h4 className="text-2xl text-white font-serif font-medium mt-1">{projectsLandscape[selectedProject].name}</h4>
                      </div>
                      <span className={`text-[10.5px] px-3 py-1 rounded-full font-mono font-bold border ${projectsLandscape[selectedProject].isOpenSource ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400' : 'bg-rose-500/10 border-rose-500/35 text-rose-400'}`}>
                        {projectsLandscape[selectedProject].isOpenSource ? "Open Source System" : "Proprietary Software"}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block tracking-wider">PRIMARY FUNCTION FOCUS:</span>
                        <p className="text-xs text-stone-300 leading-relaxed mt-1">{projectsLandscape[selectedProject].focus}</p>
                      </div>

                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block tracking-wider">UNDERLYING REASONING ARCHITECTURE:</span>
                        <code className="text-[11px] text-[#C5A059] mt-1 block font-mono bg-stone-950 p-2.5 rounded border border-stone-800">{projectsLandscape[selectedProject].tech}</code>
                      </div>

                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block tracking-wider">DETAILED DOCUMENTATION SUMMARY (SECTION 6.1):</span>
                        <p className="text-xs text-stone-400 leading-relaxed font-serif mt-1">{projectsLandscape[selectedProject].description}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-24 text-sm text-stone-600 font-serif italic">
                    Select a core project on left to view detailed layout specifications.
                  </div>
                )}

                <div className="pt-6 border-t border-stone-850 mt-6 flex justify-between text-[10px] text-stone-500">
                  <span>SYSTEM MATRIX CATALOGUE TABLE 3</span>
                  <span>AI SPEC: REV-2026</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Technical Challenges & Constraints chapter */}
        <section id="challenges" className="py-24 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6 max-w-5xl space-y-16">
            
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
              <span className="text-[10px] text-nobel-gold font-mono uppercase tracking-widest font-bold block">CHAPTER V</span>
              <h2 className="font-serif text-4xl text-stone-900 font-bold">Inherent Bottlenecks & Critical Challenges</h2>
              <p className="text-stone-605 text-sm font-serif leading-relaxed max-w-xl mx-auto">
                Section 5 of the research outlines the technical tradeoffs and ethical hurdles in deploying LLM Operating Systems at scale.
              </p>
            </div>

            {/* Structured challenge cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenge 1 */}
              <div className="p-8 bg-[#FAF9F5] border border-stone-200/80 rounded-2xl space-y-3 shadow-inner relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="text-rose-450" size={18} />
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">Technical Bottleneck 5.1</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-bold">1. CPU Scheduling Jitter & Latency</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  LLM inference coordination suffers from massive operating scheduling overhead, creating unpredictable latency spikes known as <strong>"OS Noise"</strong>. General purpose schedulers are not optimized to guarantee sub-second real-time inference deadlines.
                </p>
                <div className="pt-2 text-[10.5px] font-mono text-stone-500">
                  ⚡ SOLUTION: <span className="text-stone-800 font-bold">eBPF custom kernel extensions, continuous batching</span>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="p-8 bg-[#FAF9F5] border border-stone-200/80 rounded-2xl space-y-3 shadow-inner relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="text-rose-450" size={18} />
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">Security Hazard 5.2</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-bold">2. Amplified Physical Attack Surfaces</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  Integrating reasoning models at the kernel level introduces severe vulnerabilities. Suspicion-isolated processes and cross-cutting leaks in GPU memory caches open side-channel vulnerabilities that compromise host security.
                </p>
                <div className="pt-2 text-[10.5px] font-mono text-stone-500">
                  ⚡ SOLUTION: <span className="text-stone-800 font-bold">Trusted Execution Environments, Encrypted VM spaces</span>
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="p-8 bg-[#FAF9F5] border border-stone-200/80 rounded-2xl space-y-3 shadow-inner relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="text-rose-450" size={18} />
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">Linguistic Limit 5.3</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-bold">3. Limited Memory contexts & Hallucinations</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  Strict finite token buffers trigger memory leaks or loss of dialogue coherence over extended sessions. Hallucinated parameters pose high risks when translated directly into active command prompts or bash execution scripts.
                </p>
                <div className="pt-2 text-[10.5px] font-mono text-stone-500">
                  ⚡ SOLUTION: <span className="text-stone-800 font-bold">PagedAttention virtual paging, hierarchical recall</span>
                </div>
              </div>

              {/* Challenge 4 */}
              <div className="p-8 bg-[#FAF9F5] border border-stone-200/80 rounded-2xl space-y-3 shadow-inner relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="text-rose-450" size={18} />
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">Ethical Hazard 5.5</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-bold">4. 'Careless Speech' & Algorithmic Biases</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  AI systems occasionally formulate plausible but incorrect diagnostics. When an LLM serves as the central brain of an OS, biases in training files can lead directly to discriminatory system resource allocation or flawed system scripts.
                </p>
                <div className="pt-2 text-[10.5px] font-mono text-stone-500">
                  ⚡ SOLUTION: <span className="text-stone-800 font-bold">Systematic bias audits, strict human-in-the-loop oversight</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Future vision & Authors credit */}
        <section id="authors" className="py-24 bg-[#FAF9F5] border-t border-stone-200/50">
          <div className="container mx-auto px-6 max-w-5xl space-y-16">
            
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-[10px] text-nobel-gold font-mono uppercase tracking-widest font-bold">CO-COGNITIVE HORIZONS</span>
              <h2 className="font-serif text-4xl text-stone-900 font-bold">The Evolving Human-AI Partnership</h2>
              <p className="text-stone-600 font-serif text-xs leading-relaxed max-w-xl mx-auto pt-2">
                As Operating Systems transform from passive registries into conscious thinking collaborators, they provoke deep dialogues about human agency, critical thinking, and cognitive independence. Our future is defined by co-cognition.
              </p>
            </div>

            {/* Author cards block */}
            <div className="pt-8">
              <div className="text-center text-xs font-mono text-stone-400 uppercase tracking-widest mb-8">Guided Project Research Authors:</div>
              <div className="flex flex-wrap justify-center gap-8">
                <AuthorCard name="V Chaitanya Chowdari" role="Human Director & Core Prompter" delay="0s" />
                <AuthorCard name="Gemini Agent" role="Lead Architect & Reasoner" delay="0.1s" />
                <AuthorCard name="OpenAI Agent" role="Autocode Specialist & Developer" delay="0.2s" />
                <AuthorCard name="Perplexity Agent" role="Grounding & Sourcing Specialist" delay="0.3s" />
              </div>
            </div>

            {/* References listed */}
            <div className="pt-16 border-t border-stone-200/70 space-y-6">
              <h4 className="text-xs font-mono text-stone-400 font-bold uppercase tracking-wider">DOCUMENT CITATIONS & FOOTNOTES</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono text-stone-500">
                <div>[1] Shaik, M. N. (2025). The Potential of LLMs in Automating Software Testing. <i>ResearchGate</i>.</div>
                <div>[2] Yang, Y., et al. (2025). Towards a Unified Framework for Explainable AI in Complex Systems.</div>
                <div>[5] Anonymous. (2025). A Survey on Large Language Model Based Operating Systems. <i>arXiv</i>.</div>
                <div>[7] Luo, K., et al. (23). MemGPT: Towards LLMs as Operating Systems. <i>Hacker News / arXiv</i>.</div>
                <div>[10] eunomia.dev (2025). OS-Level Challenges in LLM Inference and Optimizations.</div>
                <div>[17] Huang, K., et al. (2024). AIOS: LLM Agent Operating System. <i>ResearchGate</i>.</div>
                <div>[26] Altumatim Corp. (2026). AltumatimOS Architecture and relational databases.</div>
                <div>[31] CodeSandbox (2024). self-operating-computer Visual XY Click libraries.</div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Elegant Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-nobel-gold text-white text-xs font-serif font-bold flex items-center justify-center">λ</span>
            <span className="font-serif text-sm text-white font-bold uppercase tracking-wider">LLM Operating System Research Project</span>
          </div>

          <div className="text-[10px] font-mono text-stone-500 text-center sm:text-right space-y-1">
            <div>CUI COGNITIVE PLATFORM FOR TRANSFORMATIVE HCI</div>
            <div>STRIKE-SAFE RECONCILED SANDBOX • © 2026 GENERAL INTELLECT</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
