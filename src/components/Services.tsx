import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  ClipboardCheck, 
  Mail, 
  CalendarCheck2, 
  Table2, 
  SearchCode, 
  Workflow, 
  Check, 
  ArrowRight,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { InteractiveTiltCard } from './InteractiveTiltCard';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const servicesGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'admin' | 'ops' | 'data'>('all');
  const [selectedTasks, setSelectedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskKey: string) => {
    setSelectedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-6 h-6 text-[#556447]" />;
      case 'Mail':
        return <Mail className="w-6 h-6 text-[#556447]" />;
      case 'CalendarCheck2':
        return <CalendarCheck2 className="w-6 h-6 text-[#556447]" />;
      case 'Table2':
        return <Table2 className="w-6 h-6 text-[#556447]" />;
      case 'SearchCode':
        return <SearchCode className="w-6 h-6 text-[#556447]" />;
      case 'Workflow':
      default:
        return <Workflow className="w-6 h-6 text-[#556447]" />;
    }
  };

  const filteredServices = SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'admin') return ['1', '2'].includes(service.id);
    if (activeCategory === 'ops') return ['3', '6'].includes(service.id);
    if (activeCategory === 'data') return ['4', '5'].includes(service.id);
    return true;
  });

  const totalSelectedTasks = Object.values(selectedTasks).filter(Boolean).length;

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F4F6F2]/70 border-t border-[#E2DFD8] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E8EDE3]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D3DCCB]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E8EDE3] text-[#556447] text-xs font-bold tracking-wider uppercase mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              Specialized Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">
              Operational & Administrative Support Tailored for Busy Leaders
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Designed for entrepreneurs, startups, small businesses, and professionals who need reliable hands to manage details, organize systems, and maintain momentum.
            </p>
          </div>

          {/* Interactive Wishlist Counter Pill */}
          <div className="flex flex-col sm:items-end gap-2">
            <div className="text-xs text-[#6B7280] hidden md:block text-right">
              <span>Flexible Engagement Options</span>
              <p className="font-semibold text-[#1F2937] mt-0.5">Project-based • Ongoing Support • Contract</p>
            </div>

            {totalSelectedTasks > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#556447] text-white text-xs font-semibold shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A3B899]" />
                <span>{totalSelectedTasks} custom {totalSelectedTasks === 1 ? 'task' : 'tasks'} selected</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Interactive Category Tabs with Sliding Layout Indicator */}
        <div className="mt-10 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 bg-white border border-[#E2DFD8] rounded-xl shadow-2xs">
            {[
              { id: 'all', label: 'All Services (6)' },
              { id: 'admin', label: 'Executive & Admin' },
              { id: 'ops', label: 'Calendar & Systems' },
              { id: 'data', label: 'Data & Research' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as 'all' | 'admin' | 'ops' | 'data')}
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer z-10 ${
                  activeCategory === tab.id
                    ? 'text-[#1F2937]'
                    : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                {activeCategory === tab.id && (
                  <motion.div
                    layoutId="serviceCategoryPill"
                    className="absolute inset-0 bg-[#E8EDE3] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Dedicated Service Cards with Staggered Spring Motion and Interactive 3D Tilt */}
        <motion.div 
          layout
          variants={servicesGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              // Check how many tasks in this service are selected
              const serviceSelectedCount = service.tasks.filter((_, idx) => selectedTasks[`${service.id}-${idx}`]).length;

              return (
                <InteractiveTiltCard
                  layout
                  key={service.id}
                  id={`service-card-${service.id}`}
                  variants={serviceCardVariants}
                  maxTilt={6}
                  scale={1.025}
                  className="group bg-white rounded-2xl p-7 border border-[#E2DFD8] shadow-2xs hover:shadow-xl hover:border-[#7C8F6A] transition-colors duration-200 flex flex-col justify-between relative overflow-hidden"
                >
                  <div>
                    {/* Card Header with Icon and Tag */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-xl bg-[#E8EDE3] flex items-center justify-center group-hover:bg-[#7C8F6A] group-hover:text-white transition-colors duration-200 shadow-2xs"
                      >
                        <span className="group-hover:brightness-200 transition-all">
                          {getIcon(service.iconName)}
                        </span>
                      </motion.div>
                      <span className="px-2.5 py-1 rounded-md bg-[#F8F7F4] border border-[#E2DFD8] text-[11px] font-semibold text-[#4B5563]">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title and Short Overview */}
                    <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#556447] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Interactive Bulleted Tasks (Clickable Checklist!) */}
                    <div className="mt-6 pt-5 border-t border-[#E2DFD8]/70">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                          Key Deliverables:
                        </h4>
                        <span className="text-[10px] text-[#6B7280] italic">
                          Click to select
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {service.tasks.map((task, idx) => {
                          const taskKey = `${service.id}-${idx}`;
                          const isChecked = !!selectedTasks[taskKey];

                          return (
                            <li key={idx}>
                              <button
                                type="button"
                                onClick={() => toggleTask(taskKey)}
                                className={`w-full text-left flex items-start gap-2.5 p-1.5 rounded-lg transition-all cursor-pointer ${
                                  isChecked 
                                    ? 'bg-[#E8EDE3]/60 text-[#1F2937]' 
                                    : 'hover:bg-[#F8F7F4] text-[#4B5563]'
                                }`}
                              >
                                <motion.span 
                                  animate={{ scale: isChecked ? [1, 1.25, 1] : 1 }}
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                                    isChecked
                                      ? 'bg-[#556447] border-[#556447] text-white'
                                      : 'border-[#D1D5DB] bg-white'
                                  }`}
                                >
                                  {isChecked ? (
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                                  )}
                                </motion.span>
                                <span className={`text-xs leading-relaxed ${isChecked ? 'font-medium text-[#1F2937]' : ''}`}>
                                  {task}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button with Tactile Feedback */}
                  <div className="mt-8 pt-5 border-t border-[#E2DFD8]/60">
                    <motion.button
                      id={`select-service-${service.id}-btn`}
                      onClick={() => onSelectService(service.title)}
                      whileHover={{ scale: 1.02, backgroundColor: '#1F2937', color: '#ffffff', borderColor: '#1F2937' }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8F7F4] text-[#1F2937] border border-[#E2DFD8] text-xs font-semibold transition-all duration-200 cursor-pointer group/btn"
                    >
                      <span>
                        {serviceSelectedCount > 0 
                          ? `Inquire (${serviceSelectedCount} selected)` 
                          : `Inquire for ${service.title}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#7C8F6A] group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
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
