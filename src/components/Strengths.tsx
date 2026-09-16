import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderTree, 
  Eye, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  Award,
  Sparkles,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { STRENGTHS } from '../data/portfolioData';

interface ScenarioInfo {
  scenario: string;
  metric: string;
}

const STRENGTH_SCENARIOS: Record<string, ScenarioInfo> = {
  '1': {
    scenario: 'Built standardized client intake pipelines and folder taxonomies in Google Drive, cutting retrieval time to under 30 seconds.',
    metric: '100% Zero lost documents'
  },
  '2': {
    scenario: 'Meticulously audited 18 multi-timezone executive meetings and cross-verified spreadsheet formulas to prevent billing discrepancies.',
    metric: 'Flawless verification'
  },
  '3': {
    scenario: 'Delivers high-clarity 5-bullet daily Slack/email briefs so founders always know project status without needing to ask.',
    metric: '< 15-min response cadence'
  },
  '4': {
    scenario: 'Adopted unfamiliar client CRM workflows and project management platforms within 48 hours without slowing delivery.',
    metric: 'Rapid tool adaptation'
  },
  '5': {
    scenario: 'Safeguards sensitive executive credentials, financial ledgers, and privileged correspondence with strict discretion.',
    metric: 'Strict NDA compliance'
  }
};

export const Strengths: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'execution' | 'trust'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FolderTree':
        return <FolderTree className="w-5 h-5 text-[#556447]" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-[#556447]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-[#556447]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#556447]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-[#556447]" />;
    }
  };

  const filteredStrengths = STRENGTHS.filter(s => {
    if (activeTabFilter === 'all') return true;
    if (activeTabFilter === 'execution') return ['1', '2', '4'].includes(s.id);
    if (activeTabFilter === 'trust') return ['3', '5'].includes(s.id);
    return true;
  });

  return (
    <section id="strengths" className="py-20 md:py-28 bg-[#F8F7F4] dark:bg-[#121613] relative overflow-hidden transition-colors">
      {/* Decorative ambient background wave */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E8EDE3]/40 dark:bg-[#7C8F6A]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D3DCCB]/30 dark:bg-[#343D35]/20 rounded-full blur-3xl pointer-events-none -z-0" />

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
            <Award className="w-3.5 h-3.5" />
            Core Attributes
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] dark:text-[#F3F5F1] tracking-tight">
            Why Work With Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] dark:text-[#9BA796] leading-relaxed">
            Professional qualities grounded in discipline, attention to detail, and a commitment to keeping everyday business operations orderly and reliable.
          </p>

          {/* Interactive filter toggle pills */}
          <div className="mt-8 inline-flex p-1 bg-white dark:bg-[#1B201C] border border-[#E2DFD8] dark:border-[#2B332C] rounded-xl shadow-2xs">
            {[
              { id: 'all', label: 'All Attributes' },
              { id: 'execution', label: 'Operational Precision' },
              { id: 'trust', label: 'Communication & Discretion' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabFilter(tab.id as 'all' | 'execution' | 'trust')}
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTabFilter === tab.id
                    ? 'text-[#1F2937] dark:text-[#F3F5F1]'
                    : 'text-[#6B7280] dark:text-[#9BA796] hover:text-[#1F2937] dark:hover:text-[#F3F5F1]'
                }`}
              >
                {activeTabFilter === tab.id && (
                  <motion.div
                    layoutId="strengthsFilterPill"
                    className="absolute inset-0 bg-[#E8EDE3] dark:bg-[#2A342B] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 5 Strengths Cards Grid with Staggered Motion & 3D Tilt */}
        <motion.div 
          layout
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredStrengths.map((strength, index) => {
              const isWide = filteredStrengths.length === 5 && index === 4;
              const isExpanded = expandedCard === strength.id;
              const scenario = STRENGTH_SCENARIOS[strength.id];

              return (
                <motion.div
                  layout
                  key={strength.id}
                  id={`strength-card-${strength.id}`}
                  initial={{ opacity: 0, scale: 0.95, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.45, 
                    delay: index * 0.08,
                    layout: { duration: 0.3 }
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`group relative bg-white dark:bg-[#1B201C] rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default ${
                    isExpanded 
                      ? 'border-[#7C8F6A] shadow-lg ring-2 ring-[#7C8F6A]/20' 
                      : 'border-[#E2DFD8] dark:border-[#2B332C] shadow-2xs hover:shadow-md hover:border-[#7C8F6A]/60 dark:hover:border-[#7C8F6A]'
                  } ${isWide ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  {/* Subtle hover gradient illumination */}
                  <div className="absolute -inset-px bg-gradient-to-br from-[#7C8F6A]/0 via-transparent to-[#7C8F6A]/5 dark:to-[#7C8F6A]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <motion.div 
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-12 h-12 rounded-xl bg-[#F4F6F2] dark:bg-[#151916] group-hover:bg-[#E8EDE3] dark:group-hover:bg-[#222823] flex items-center justify-center transition-colors shadow-2xs"
                      >
                        {getIcon(strength.iconName)}
                      </motion.div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#9CA3AF] dark:text-[#73806E] group-hover:text-[#556447] dark:group-hover:text-[#A3B899] transition-colors">
                          0{strength.id}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F3F5F1] group-hover:text-[#556447] dark:group-hover:text-[#A3B899] transition-colors">
                      {strength.title}
                    </h3>

                    <p className="mt-3 text-sm text-[#4B5563] dark:text-[#9BA796] leading-relaxed">
                      {strength.description}
                    </p>

                    {/* Interactive Scenario Reveal on demand */}
                    <AnimatePresence>
                      {isExpanded && scenario && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden mt-4 pt-3 border-t border-[#E8EDE3] dark:border-[#2B332C]"
                        >
                          <div className="p-3 bg-[#F4F6F2] dark:bg-[#151916] rounded-xl border border-[#D3DCCB]/60 dark:border-[#2B332C] text-xs">
                            <p className="font-bold text-[#1F2937] dark:text-[#F3F5F1] flex items-center gap-1.5 mb-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#7C8F6A]" />
                              Real Operational Scenario:
                            </p>
                            <p className="text-[#4B5563] dark:text-[#9BA796] leading-relaxed">
                              {scenario.scenario}
                            </p>
                            <div className="mt-2 text-[10px] font-bold text-[#556447] dark:text-[#A3B899] uppercase tracking-wider">
                              Verified Metric: {scenario.metric}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-[#E2DFD8]/60 dark:border-[#2B332C] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#9BA796]">
                      <Sparkles className="w-3.5 h-3.5 text-[#7C8F6A]" />
                      <span>Daily Standard</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedCard(isExpanded ? null : strength.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#556447] dark:text-[#A3B899] hover:text-[#1F2937] dark:hover:text-[#F3F5F1] p-1 rounded-md hover:bg-[#E8EDE3]/60 dark:hover:bg-[#222823] transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Less' : 'Scenario'}</span>
                      <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
