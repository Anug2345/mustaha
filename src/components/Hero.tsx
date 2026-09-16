import React, { useState, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  AnimatePresence 
} from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  Calendar, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  GraduationCap,
  Briefcase,
  Sliders
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroMode, setHeroMode] = useState<'portrait' | 'desk'>('portrait');
  const [activeTab, setActiveTab] = useState<'daily' | 'systems' | 'calendar'>('daily');

  // Interactive checkable tasks in Live Desk simulator
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Triage & prioritize executive inbox', tag: 'Inbox Zero', completed: true, time: '08:30 AM' },
    { id: 2, title: 'Reconcile weekly client calendar & buffer slots', tag: 'Scheduling', completed: true, time: '10:00 AM' },
    { id: 3, title: 'Format customer intake records in Google Sheets', tag: 'Data Accuracy', completed: false, time: '11:45 AM' },
    { id: 4, title: 'Prepare synthesized research summary on market trends', tag: 'Research', completed: false, time: '02:00 PM' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  // Parallax scrolling hooks tied to the Hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Parallax transforms for background orbs, image card, floating chips, and inner optics
  const bgOrb1Y = useTransform(smoothProgress, [0, 1], [0, 160]);
  const bgOrb2Y = useTransform(smoothProgress, [0, 1], [0, -140]);
  const textColY = useTransform(smoothProgress, [0, 1], [0, 25]);
  const cardParallaxY = useTransform(smoothProgress, [0, 1], [0, 50]);
  const floatingBadgeTopY = useTransform(smoothProgress, [0, 1], [0, -70]);
  const floatingBadgeBottomY = useTransform(smoothProgress, [0, 1], [0, 60]);
  const portraitImageY = useTransform(smoothProgress, [0, 1], ['-3%', '4%']);
  const portraitImageScale = useTransform(smoothProgress, [0, 1], [1.02, 1.08]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden"
    >
      {/* Parallax Architectural Background Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          style={{ y: bgOrb1Y }}
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-[#E8EDE3]/60 via-[#F4F6F2]/40 to-transparent rounded-full blur-3xl opacity-80" 
        />
        <motion.div 
          style={{ y: bgOrb2Y }}
          className="absolute top-36 right-[-80px] w-96 h-96 bg-[#7C8F6A]/10 rounded-full blur-2xl opacity-70" 
        />
        <motion.div 
          style={{ y: bgOrb1Y }}
          className="absolute -bottom-20 left-[-80px] w-80 h-80 bg-[#D3DCCB]/30 rounded-full blur-2xl opacity-60" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Name, Title, Value Proposition & CTAs with Subtle Parallax Float */}
          <motion.div 
            style={{ y: textColY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* Prominent Name & Professional Credential Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D3DCCB] shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#7C8F6A]" />
                <span className="text-xs font-bold text-[#1F2937] tracking-wider uppercase">
                  MUSTAPHA ZAINAB OLABIMPE
                </span>
              </motion.div>

              <div
                id="hero-availability-badge"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EDE3] border border-[#D3DCCB] shadow-2xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C8F6A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C8F6A]"></span>
                </span>
                <span className="text-xs font-semibold text-[#556447]">
                  Available for Immediate Support
                </span>
              </div>
            </div>

            {/* Professional Sub-title Line */}
            <p className="text-xs sm:text-sm font-semibold text-[#6B7280] tracking-wide mb-2 uppercase">
              Certified Virtual Assistant • Administrative Support • Data Accuracy
            </p>

            {/* Main Headline */}
            <h1
              id="hero-main-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2937] leading-[1.12]"
            >
              Reliable Support Behind{' '}
              <span className="relative inline-block text-[#1F2937]">
                Your Best Work
                <svg
                  className="absolute left-0 -bottom-2 w-full h-2.5 text-[#7C8F6A]/50"
                  viewBox="0 0 250 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6C65 2 185 2 248 6"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            {/* Supporting Description */}
            <p
              id="hero-lead-text"
              className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl"
            >
              I help entrepreneurs, startups, and busy professionals streamline operations, keep schedules synchronized, and maintain clean, organized documentation with unwavering attention to detail.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <motion.button
                id="hero-hire-me-btn"
                onClick={() => onNavigate('contact')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1F2937] text-white hover:bg-[#7C8F6A] font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                id="hero-view-work-btn"
                onClick={() => onNavigate('work')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-[#1F2937] hover:bg-[#F4F6F2] font-semibold text-sm border border-[#E2DFD8] transition-all duration-200 shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Selected Work</span>
              </motion.button>
            </div>

            {/* Credibility Pillars (Checkmarks) */}
            <div className="mt-10 pt-8 border-t border-[#E2DFD8] grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1F2937]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C8F6A] shrink-0" />
                  <span>Proactive</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">Staying two steps ahead</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1F2937]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C8F6A] shrink-0" />
                  <span>Organized</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">Zero chaos, structured systems</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1F2937]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C8F6A] shrink-0" />
                  <span>Linguistic Rigor</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">LASU Linguistics Scholar</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero Visual Showcase (Portrait with Parallax Badges & Interactive Desk) */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              style={{ y: cardParallaxY }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Dual-Mode Selector Tabs */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center p-1 bg-white rounded-xl border border-[#D3DCCB] shadow-2xs">
                  <button
                    onClick={() => setHeroMode('portrait')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroMode === 'portrait'
                        ? 'bg-[#1F2937] text-white shadow-2xs'
                        : 'text-[#4B5563] hover:text-[#1F2937]'
                    }`}
                  >
                    <span>Featured Portrait</span>
                  </button>
                  <button
                    onClick={() => setHeroMode('desk')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroMode === 'desk'
                        ? 'bg-[#1F2937] text-white shadow-2xs'
                        : 'text-[#4B5563] hover:text-[#1F2937]'
                    }`}
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Live Desk</span>
                  </button>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E8EDE3] text-[#556447] text-[11px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  Active Profile
                </div>
              </div>

              {/* Mode 1: Prominent Hero Portrait with Parallax Floating Badges */}
              <AnimatePresence mode="wait">
                {heroMode === 'portrait' ? (
                  <motion.div
                    key="portrait-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-3xl border border-[#E2DFD8] shadow-lg p-5 sm:p-6"
                  >
                    {/* Parallax Floating Top Badge */}
                    <motion.div
                      style={{ y: floatingBadgeTopY }}
                      className="absolute -top-5 -right-3 sm:-right-5 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#D3DCCB] shadow-md flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#E8EDE3] flex items-center justify-center text-[#556447]">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#1F2937]">LASU Linguistics</p>
                        <p className="text-[10px] text-[#6B7280]">Applied Communication</p>
                      </div>
                    </motion.div>

                    {/* Main Portrait Frame with Parallax Optical Depth */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/4.5] sm:aspect-[4/4.8] bg-stone-100 border border-[#D3DCCB] group">
                      <motion.img
                        style={{ y: portraitImageY, scale: portraitImageScale }}
                        src="/main 1.jpg"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/zainab.jpg';
                        }}
                        alt="Mustapha Zainab Olabimpe - Certified Virtual Assistant"
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />

                      {/* Ambient Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />

                      {/* Name & Credentials Card at Bottom of Picture */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-[#7C8F6A] animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-widest text-[#E8EDE3]">
                            Certified Virtual Assistant
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-xs">
                          Mustapha Zainab Olabimpe
                        </h3>
                        <p className="text-xs text-white/80 mt-1 font-medium">
                          Specializing in Executive Organization, Data Accuracy & Operations
                        </p>
                      </div>
                    </div>

                    {/* Parallax Floating Bottom Badge */}
                    <motion.div
                      style={{ y: floatingBadgeBottomY }}
                      className="absolute -bottom-5 -left-3 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-[#D3DCCB] shadow-md flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#1F2937] flex items-center justify-center text-white">
                        <ShieldCheck className="w-4 h-4 text-[#7C8F6A]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#1F2937]">100% Reliability</p>
                        <p className="text-[10px] text-[#556447] font-semibold">Verified Discretion</p>
                      </div>
                    </motion.div>

                    {/* Bottom Quick Switcher Bar */}
                    <div className="mt-4 pt-3 border-t border-[#E2DFD8] flex items-center justify-between text-xs">
                      <span className="text-[#6B7280] font-medium">
                        Lagos, Nigeria • Remote Global
                      </span>
                      <button
                        onClick={() => setHeroMode('desk')}
                        className="text-xs font-bold text-[#556447] hover:text-[#1F2937] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect Desk Simulator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Mode 2: Interactive Virtual Executive Desk */
                  <motion.div
                    key="desk-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    id="hero-workspace-preview-card"
                    className="relative bg-white rounded-3xl border border-[#E2DFD8] shadow-lg p-5 sm:p-6"
                  >
                    {/* Window Header with Portrait */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#E2DFD8]">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src="/main 1.jpg"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/zainab.jpg';
                            }}
                            alt="Mustapha Zainab Olabimpe"
                            className="w-11 h-11 rounded-xl object-cover object-top border border-[#D3DCCB] shadow-2xs"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#7C8F6A] border-2 border-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#1F2937]">
                              Zainab's Executive Desk
                            </span>
                            <ShieldCheck className="w-3.5 h-3.5 text-[#7C8F6A]" />
                          </div>
                          <span className="text-[10px] text-[#6B7280]">
                            Mustapha Zainab • Live Operations
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E8EDE3] text-[#556447] text-[11px] font-semibold">
                        <Sparkles className="w-3 h-3" />
                        Systems Active
                      </span>
                    </div>

                    {/* View Switcher Tabs with Animated Layout Indicator */}
                    <div className="grid grid-cols-3 gap-1.5 mt-4 p-1 bg-[#F8F7F4] rounded-xl border border-[#E2DFD8]/70 relative">
                      {[
                        { id: 'daily', label: 'Tasks Queue' },
                        { id: 'systems', label: 'Workflow Hub' },
                        { id: 'calendar', label: 'Schedule' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as 'daily' | 'systems' | 'calendar')}
                          className={`relative py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer z-10 ${
                            activeTab === tab.id
                              ? 'text-[#1F2937]'
                              : 'text-[#4B5563] hover:text-[#1F2937]'
                          }`}
                        >
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="heroDeskTabIndicator"
                              className="absolute inset-0 bg-white rounded-lg shadow-2xs -z-10"
                              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                          )}
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 min-h-[260px]">
                      {activeTab === 'daily' && (
                        <div className="space-y-2.5 animate-in fade-in duration-200">
                          {/* Live Dynamic Status Bar */}
                          <div className="flex flex-col gap-1.5 px-1 pb-1">
                            <div className="flex items-center justify-between text-xs text-[#4B5563]">
                              <span className="font-semibold text-[#1F2937] flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#7C8F6A]" />
                                Interactive Task Verification
                              </span>
                              <span className="text-xs font-bold text-[#556447] bg-[#E8EDE3] px-2 py-0.5 rounded-full">
                                {completedCount} / {tasks.length} Verified
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-[#E8EDE3] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-[#7C8F6A] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                              />
                            </div>
                            <p className="text-[10px] text-[#6B7280]">
                              Tip: Click any item to simulate completing or delegating tasks in real time!
                            </p>
                          </div>

                          {tasks.map((task) => (
                            <motion.button
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              whileHover={{ x: 4, scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                                task.completed
                                  ? 'bg-[#F4F6F2] border-[#D3DCCB] text-[#1F2937]'
                                  : 'bg-white border-[#E2DFD8] hover:border-[#7C8F6A]/50 shadow-2xs'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <motion.div 
                                  animate={{ scale: task.completed ? [1, 1.25, 1] : 1 }}
                                  className="mt-0.5"
                                >
                                  {task.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#7C8F6A] shrink-0" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-[#D1D5DB] shrink-0 flex items-center justify-center hover:border-[#7C8F6A]" />
                                  )}
                                </motion.div>
                                <div>
                                  <p className={`text-xs font-semibold leading-snug transition-all ${
                                    task.completed ? 'line-through text-[#6B7280]' : 'text-[#1F2937]'
                                  }`}>
                                    {task.title}
                                  </p>
                                  <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded border ${
                                    task.completed 
                                      ? 'bg-white/80 border-[#D3DCCB] text-[#556447]' 
                                      : 'bg-[#F8F7F4] border-[#E2DFD8] text-[#4B5563]'
                                  }`}>
                                    {task.tag}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono text-[#6B7280] shrink-0">
                                {task.time}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      )}

                      {activeTab === 'systems' && (
                        <div className="space-y-2.5 animate-in fade-in duration-200">
                          <div className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#1F2937] flex items-center gap-2">
                                <Layers className="w-4 h-4 text-[#7C8F6A]" />
                                Bimpe's Bakery Trello Board
                              </span>
                              <span className="text-[10px] bg-[#E8EDE3] text-[#556447] px-2 py-0.5 rounded font-medium">
                                Active
                              </span>
                            </div>
                            <p className="text-xs text-[#4B5563] mt-1.5">
                              Kanban columns for incoming customer orders, baking prep, and dispatched deliveries.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#1F2937] flex items-center gap-2">
                                <FileSpreadsheet className="w-4 h-4 text-[#7C8F6A]" />
                                Client Intake & Inquiries
                              </span>
                              <span className="text-[10px] bg-[#E8EDE3] text-[#556447] px-2 py-0.5 rounded font-medium">
                                Google Forms
                              </span>
                            </div>
                            <p className="text-xs text-[#4B5563] mt-1.5">
                              Standardized onboarding questions linked to consolidated records.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#1F2937] flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#7C8F6A]" />
                                Document Repository
                              </span>
                              <span className="text-[10px] bg-[#E8EDE3] text-[#556447] px-2 py-0.5 rounded font-medium">
                                Google Drive
                              </span>
                            </div>
                            <p className="text-xs text-[#4B5563] mt-1.5">
                              Categorized folder hierarchies for business documents & records.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'calendar' && (
                        <div className="space-y-2.5 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between text-xs text-[#4B5563] px-1">
                            <span className="font-medium flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#7C8F6A]" />
                              Structured Time Blocks
                            </span>
                            <span className="text-[11px] font-mono">Mon - Fri</span>
                          </div>

                          <div className="p-3 rounded-xl bg-[#F8F7F4] border-l-4 border-l-[#7C8F6A] border border-[#E2DFD8]/60">
                            <p className="text-xs font-bold text-[#1F2937]">Morning Administrative Triage</p>
                            <p className="text-[11px] text-[#4B5563] mt-0.5">Inbox cleanup, priority flags, daily agenda distribution</p>
                            <span className="text-[10px] font-mono text-[#7C8F6A] font-semibold mt-1 inline-block">
                              08:00 - 10:00 AM
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-[#F8F7F4] border-l-4 border-l-[#4B5563] border border-[#E2DFD8]/60">
                            <p className="text-xs font-bold text-[#1F2937]">Deep Execution: Data & Research</p>
                            <p className="text-[11px] text-[#4B5563] mt-0.5">Spreadsheet audits, data entry, market research briefs</p>
                            <span className="text-[10px] font-mono text-[#4B5563] font-semibold mt-1 inline-block">
                              10:30 - 02:00 PM
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-[#F8F7F4] border-l-4 border-l-[#7C8F6A] border border-[#E2DFD8]/60">
                            <p className="text-xs font-bold text-[#1F2937]">Daily Wrap-Up & Next-Day Prep</p>
                            <p className="text-[11px] text-[#4B5563] mt-0.5">Status summary, client deliverables handoff, schedule review</p>
                            <span className="text-[10px] font-mono text-[#7C8F6A] font-semibold mt-1 inline-block">
                              03:00 - 04:30 PM
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Floating Quick Action Footer */}
                    <div className="mt-4 pt-3 border-t border-[#E2DFD8] flex items-center justify-between text-xs">
                      <span className="text-[#4B5563] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#7C8F6A]" />
                        Reliable • Structured • Confidential
                      </span>
                      <button
                        onClick={() => onNavigate('contact')}
                        className="font-semibold text-[#1F2937] hover:text-[#7C8F6A] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Book Support <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
