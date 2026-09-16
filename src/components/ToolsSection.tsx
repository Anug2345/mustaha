import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  FileSpreadsheet, 
  Palette, 
  Kanban, 
  CalendarDays, 
  CheckCircle,
  Laptop,
  Sparkles,
  Check,
  ChevronDown
} from 'lucide-react';
import { TOOLS } from '../data/portfolioData';
import { InteractiveTiltCard } from './InteractiveTiltCard';

interface ToolProTip {
  percentage: number;
  tip: string;
  category: 'productivity' | 'pm' | 'scheduling';
}

const toolsGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const toolCardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 20,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

const TOOL_EXTRAS: Record<string, ToolProTip> = {
  'Google Workspace': {
    percentage: 98,
    tip: 'Utilizes standardized shared drive permissions, colored label rules in Gmail, and automated Google Form-to-Sheets intakes.',
    category: 'productivity'
  },
  'Microsoft Excel & Sheets': {
    percentage: 95,
    tip: 'Builds VLOOKUP/XLOOKUP queries, pivot summaries, and conditional formatting to instantly spot data anomalies.',
    category: 'productivity'
  },
  'Canva': {
    percentage: 90,
    tip: 'Creates branded presentation decks, social announcement templates, and clean PDF invoices adhering strictly to brand style guides.',
    category: 'scheduling'
  },
  'Asana': {
    percentage: 94,
    tip: 'Structures multi-phase milestone roadmaps, automated task assignments, and priority tags to keep deadlines transparent.',
    category: 'pm'
  },
  'Trello': {
    percentage: 96,
    tip: 'Designs visual Kanban pipelines with custom checklists and label conventions for rapid order/ticket throughput.',
    category: 'pm'
  },
  'Calendly': {
    percentage: 95,
    tip: 'Configures custom buffer windows, multi-timezone booking links, and pre-meeting questionnaires to protect executive focus.',
    category: 'scheduling'
  }
};

export const ToolsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'productivity' | 'pm' | 'scheduling'>('all');
  const [selectedMyStack, setSelectedMyStack] = useState<Record<string, boolean>>({
    'Google Workspace': true,
    'Calendly': true
  });
  const [expandedTipTool, setExpandedTipTool] = useState<string | null>(null);

  const toggleStackItem = (toolName: string) => {
    setSelectedMyStack(prev => ({
      ...prev,
      [toolName]: !prev[toolName]
    }));
  };

  const getToolIcon = (iconType: string) => {
    switch (iconType) {
      case 'google':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center font-bold text-base shadow-2xs">
            G
          </div>
        );
      case 'excel':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#107C41]/10 text-[#107C41] flex items-center justify-center font-bold text-base shadow-2xs">
            <FileSpreadsheet className="w-5 h-5 text-[#107C41]" />
          </div>
        );
      case 'canva':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#00C4CC]/10 text-[#00C4CC] flex items-center justify-center font-bold text-base shadow-2xs">
            <Palette className="w-5 h-5 text-[#00C4CC]" />
          </div>
        );
      case 'asana':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#F06A6A]/10 text-[#F06A6A] flex items-center justify-center font-bold text-base shadow-2xs">
            <CheckCircle className="w-5 h-5 text-[#F06A6A]" />
          </div>
        );
      case 'trello':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#0079BF]/10 text-[#0079BF] flex items-center justify-center font-bold text-base shadow-2xs">
            <Kanban className="w-5 h-5 text-[#0079BF]" />
          </div>
        );
      case 'calendly':
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#006BFF]/10 text-[#006BFF] flex items-center justify-center font-bold text-base shadow-2xs">
            <CalendarDays className="w-5 h-5 text-[#006BFF]" />
          </div>
        );
    }
  };

  const filteredTools = TOOLS.filter(tool => {
    const extra = TOOL_EXTRAS[tool.name];
    if (activeCategory === 'all') return true;
    return extra?.category === activeCategory;
  });

  const matchedCount = Object.values(selectedMyStack).filter(Boolean).length;

  return (
    <section id="tools" className="py-20 md:py-28 bg-[#F4F6F2]/70 dark:bg-[#151916]/80 border-t border-[#E2DFD8] dark:border-[#2B332C] relative overflow-hidden transition-colors">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#E8EDE3]/30 dark:bg-[#7C8F6A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E8EDE3] dark:bg-[#222823] text-[#556447] dark:text-[#A3B899] text-xs font-bold tracking-wider uppercase mb-3 border border-transparent dark:border-[#2B332C]">
            <Laptop className="w-3.5 h-3.5" />
            Stack & Systems
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] dark:text-[#F3F5F1] tracking-tight">
            Tools & Software
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] dark:text-[#9BA796] leading-relaxed">
            Proficient across industry-standard productivity, scheduling, project tracking, and spreadsheet software to integrate seamlessly into your current workflow.
          </p>

          {/* Interactive "Check Stack Match" Badge */}
          <div className="mt-6 inline-flex items-center gap-2 p-2 px-4 rounded-xl bg-white dark:bg-[#1B201C] border border-[#E2DFD8] dark:border-[#2B332C] shadow-2xs text-xs">
            <span className="font-semibold text-[#1F2937] dark:text-[#F3F5F1]">Your Stack Match:</span>
            <span className="font-bold text-[#556447] dark:text-[#A3B899] bg-[#E8EDE3] dark:bg-[#222823] px-2 py-0.5 rounded-md flex items-center gap-1 border border-transparent dark:border-[#2B332C]">
              <Check className="w-3 h-3 stroke-[3]" />
              {matchedCount} of {TOOLS.length} Ready
            </span>
            <span className="text-[#6B7280] dark:text-[#9BA796] hidden sm:inline">• Click the badge on any tool to match your tools!</span>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex p-1 bg-white dark:bg-[#1B201C] border border-[#E2DFD8] dark:border-[#2B332C] rounded-xl shadow-2xs">
            {[
              { id: 'all', label: 'All Tools (6)' },
              { id: 'productivity', label: 'Docs & Spreadsheets' },
              { id: 'pm', label: 'Project Boards' },
              { id: 'scheduling', label: 'Design & Calendar' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as 'all' | 'productivity' | 'pm' | 'scheduling')}
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer z-10 ${
                  activeCategory === tab.id ? 'text-[#1F2937] dark:text-[#F3F5F1]' : 'text-[#6B7280] dark:text-[#9BA796] hover:text-[#1F2937] dark:hover:text-[#F3F5F1]'
                }`}
              >
                {activeCategory === tab.id && (
                  <motion.div
                    layoutId="toolsFilterPill"
                    className="absolute inset-0 bg-[#E8EDE3] dark:bg-[#2A342B] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cohesive Tools Grid with Staggered Spring Entry and Interactive 3D Tilt */}
        <motion.div 
          layout
          variants={toolsGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => {
              const extra = TOOL_EXTRAS[tool.name] || { percentage: 92, tip: '', category: 'productivity' };
              const isInMyStack = !!selectedMyStack[tool.name];
              const isTipOpen = expandedTipTool === tool.name;

              return (
                <InteractiveTiltCard
                  layout
                  key={tool.name}
                  id={`tool-card-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                  variants={toolCardVariants}
                  maxTilt={7}
                  scale={1.03}
                  className={`bg-white dark:bg-[#1B201C] rounded-2xl p-6 border transition-colors duration-200 flex flex-col justify-between relative overflow-hidden ${
                    isInMyStack 
                      ? 'border-[#7C8F6A] shadow-md ring-1 ring-[#7C8F6A]/30' 
                      : 'border-[#E2DFD8] dark:border-[#2B332C] shadow-2xs hover:shadow-xl hover:border-[#7C8F6A]/50 dark:hover:border-[#7C8F6A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {getToolIcon(tool.iconType)}
                      
                      {/* Interactive "I Use This" tactile button */}
                      <motion.button
                        type="button"
                        onClick={() => toggleStackItem(tool.name)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                          isInMyStack
                            ? 'bg-[#556447] dark:bg-[#637752] border-[#556447] dark:border-[#637752] text-white shadow-2xs'
                            : 'bg-[#F8F7F4] dark:bg-[#161A17] border-[#E2DFD8] dark:border-[#2B332C] text-[#4B5563] dark:text-[#9BA796] hover:border-[#7C8F6A]'
                        }`}
                      >
                        {isInMyStack ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>In My Stack</span>
                          </>
                        ) : (
                          <span>+ Match Tool</span>
                        )}
                      </motion.button>
                    </div>

                    <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#F3F5F1]">
                      {tool.name}
                    </h3>
                    <span className="inline-block text-xs font-medium text-[#6B7280] dark:text-[#9BA796] mb-2">
                      {tool.category}
                    </span>

                    <p className="text-xs text-[#4B5563] dark:text-[#9BA796] leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Animated Proficiency Fill Meter */}
                    <div className="mt-4 pt-3 border-t border-[#E2DFD8]/60 dark:border-[#2B332C]">
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-semibold text-[#1F2937] dark:text-[#F3F5F1]">Proficiency Rating</span>
                        <span className="font-mono font-bold text-[#556447] dark:text-[#A3B899]">{extra.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E8EDE3] dark:bg-[#262F27] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#7C8F6A] to-[#556447] dark:from-[#6A7E5B] dark:to-[#8EA37A] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${extra.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Expandable Pro Tip */}
                    <AnimatePresence>
                      {isTipOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-3 p-3 bg-[#F4F6F2] dark:bg-[#151916] rounded-xl border border-[#D3DCCB]/60 dark:border-[#2B332C] text-xs"
                        >
                          <p className="font-bold text-[#1F2937] dark:text-[#F3F5F1] flex items-center gap-1 mb-1">
                            <Sparkles className="w-3 h-3 text-[#7C8F6A]" />
                            Zainab's Practical Implementation:
                          </p>
                          <p className="text-[#4B5563] dark:text-[#9BA796] leading-relaxed text-[11px]">
                            {extra.tip}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Footer with Pro-Tip toggle */}
                  <div className="mt-5 pt-3 border-t border-[#E2DFD8]/60 dark:border-[#2B332C] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#556447] dark:text-[#A3B899] bg-[#E8EDE3] dark:bg-[#222823] px-2 py-0.5 rounded border border-transparent dark:border-[#2B332C]">
                      {tool.proficiency}
                    </span>

                    <motion.button
                      type="button"
                      onClick={() => setExpandedTipTool(isTipOpen ? null : tool.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#556447] dark:text-[#A3B899] hover:text-[#1F2937] dark:hover:text-[#F3F5F1] p-1 rounded transition-colors cursor-pointer"
                    >
                      <span>{isTipOpen ? 'Close Tip' : 'Workflow Tip'}</span>
                      <motion.span animate={{ rotate: isTipOpen ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                        <ChevronDown className="w-3 h-3" />
                      </motion.span>
                    </motion.button>
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
