import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, CheckCircle2, ArrowRight, Sparkles, Clock, FileCheck } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/portfolioData';

interface WorkflowDetails {
  timeline: string;
  deliverable: string;
  tools: string[];
  quote: string;
}

const STEP_DETAILS: Record<string, WorkflowDetails> = {
  '01': {
    timeline: 'Day 1 – 2',
    deliverable: 'Operational Audit & Prioritized Backlog Document',
    tools: ['Google Meet', 'Discovery Questionnaire', 'Notion'],
    quote: 'We clarify communication preferences, access credentials, and urgent pain points to establish alignment immediately.'
  },
  '02': {
    timeline: 'Day 3 – 5',
    deliverable: 'Task Boards, Standard Operating Procedures (SOPs) & Templates',
    tools: ['Trello / Asana', 'Google Drive Taxonomy', 'Calendar Rules'],
    quote: 'Structured boards, folder taxonomies, and clear checklists are built so repeatable tasks execute without friction.'
  },
  '03': {
    timeline: 'Week 1 & Ongoing',
    deliverable: 'Daily Execution Cadence & End-of-Day Briefs',
    tools: ['Slack / Email', 'Google Sheets', 'Calendly'],
    quote: 'Consistent, autonomous task execution with concise end-of-day reports keeping you informed without meeting bloat.'
  },
  '04': {
    timeline: 'Bi-weekly & Monthly',
    deliverable: 'Bottleneck Reviews, Automation Tweaks & Velocity Reports',
    tools: ['Performance Review', 'Template Iterations', 'Efficiency Metrics'],
    quote: 'We continuously identify repetitive friction and streamline administrative procedures as your business expands.'
  }
};

export const WorkflowTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = WORKFLOW_STEPS[activeStepIndex];
  const activeDetail = STEP_DETAILS[activeStep.step];

  return (
    <section id="workflow" className="py-20 md:py-28 bg-[#F8F7F4] border-t border-[#E2DFD8] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#E8EDE3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E8EDE3] text-[#556447] text-xs font-bold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            Working Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">
            How I Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            A reliable 4-step collaboration framework that takes tasks from vague ideas to clear, structured execution. Click any phase to inspect the timeline.
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline (md and up) */}
        <div className="hidden lg:block mt-16 relative">
          {/* Animated Horizontal Line Connector with active progress fill */}
          <div className="absolute top-12 left-12 right-12 h-1 bg-[#E2DFD8] rounded-full -z-0 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#7C8F6A] via-[#556447] to-[#7C8F6A] origin-left"
              animate={{ width: `${((activeStepIndex) / (WORKFLOW_STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = activeStepIndex === index;
              const isPast = activeStepIndex > index;

              return (
                <motion.div
                  key={step.step}
                  id={`workflow-desktop-step-${step.step}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setActiveStepIndex(index)}
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'border-[#7C8F6A] shadow-lg ring-2 ring-[#7C8F6A]/20'
                      : 'border-[#E2DFD8] shadow-2xs hover:border-[#7C8F6A]/50 hover:shadow-md'
                  }`}
                >
                  {/* Top Active Indicator bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeWorkflowStepTop"
                      className="absolute top-0 left-0 right-0 h-1 bg-[#7C8F6A]" 
                    />
                  )}

                  <div>
                    {/* Step Node and Number */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.div 
                        animate={{ 
                          scale: isActive ? [1, 1.15, 1.08] : 1,
                          backgroundColor: isActive ? '#556447' : isPast ? '#7C8F6A' : '#E8EDE3',
                          color: isActive || isPast ? '#FFFFFF' : '#556447'
                        }}
                        className="w-12 h-12 rounded-xl font-mono font-bold text-sm flex items-center justify-center border-2 border-white shadow-xs transition-colors"
                      >
                        {step.step}
                      </motion.div>
                      
                      <span className={`text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#E8EDE3] text-[#556447]' : 'text-[#6B7280]'
                      }`}>
                        Phase 0{index + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className={`text-xl font-bold transition-colors ${
                      isActive ? 'text-[#556447]' : 'text-[#1F2937]'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2DFD8]/60 flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="font-medium text-[#1F2937]">{step.details}</span>
                    {isActive ? (
                      <span className="text-[10px] font-bold text-[#556447] bg-[#E8EDE3] px-2 py-0.5 rounded">Active</span>
                    ) : (
                      <span className="text-[10px] text-[#9CA3AF]">Click</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (below lg) */}
        <div className="lg:hidden mt-12 space-y-6 relative">
          <div className="absolute top-6 bottom-6 left-6 w-1 bg-[#E2DFD8] rounded-full -z-0" />

          {WORKFLOW_STEPS.map((step, index) => {
            const isActive = activeStepIndex === index;

            return (
              <motion.div
                key={step.step}
                id={`workflow-mobile-step-${step.step}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                onClick={() => setActiveStepIndex(index)}
                className="relative pl-16 sm:pl-20 cursor-pointer"
              >
                {/* Node on Vertical Line */}
                <div 
                  className={`absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm border-2 border-white shadow-xs transition-colors ${
                    isActive ? 'bg-[#556447] text-white' : 'bg-[#E8EDE3] text-[#556447]'
                  }`}
                >
                  {step.step}
                </div>

                {/* Card Container */}
                <div className={`bg-white rounded-2xl p-6 border transition-all ${
                  isActive ? 'border-[#7C8F6A] shadow-md ring-2 ring-[#7C8F6A]/20' : 'border-[#E2DFD8] shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                      Phase 0{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#556447]">
                      {step.details}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2937]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive "Behind-the-Scenes Deep Dive" Drawer for Active Step */}
        <motion.div
          layout
          className="mt-10 bg-white rounded-2xl border border-[#D3DCCB] p-6 sm:p-8 shadow-xs"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-[#556447] text-white text-xs font-bold font-mono">
                    Phase {activeStep.step}: {activeStep.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#556447] bg-[#E8EDE3] px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    Timeline: {activeDetail.timeline}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#1F2937] italic font-medium leading-relaxed">
                  "{activeDetail.quote}"
                </p>

                <div className="flex items-start gap-2 pt-1 text-xs text-[#4B5563]">
                  <FileCheck className="w-4 h-4 text-[#7C8F6A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1F2937]">Key Milestone Deliverable: </span>
                    <span>{activeDetail.deliverable}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-[#6B7280]">Tools Deployed:</span>
                  {activeDetail.tools.map((tool, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-[#F8F7F4] border border-[#E2DFD8] text-[#1F2937] font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch">
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1F2937] hover:bg-[#556447] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <span>
                    {activeStepIndex === WORKFLOW_STEPS.length - 1 ? 'Start Over at Phase 01' : 'Next Phase'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-1 text-[11px] text-[#6B7280]">
                  <Sparkles className="w-3 h-3 text-[#7C8F6A]" />
                  <span>Step {activeStepIndex + 1} of 4 in Zainab's Framework</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
