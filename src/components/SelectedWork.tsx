import React, { useState, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring 
} from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Check, 
  Layers, 
  FileText, 
  FolderArchive, 
  FileSpreadsheet, 
  Info, 
  X, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SELECTED_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface ProjectCaseDetail {
  challenge: string;
  solution: string;
  impact: string;
}

const PROJECT_CASE_DETAILS: Record<string, ProjectCaseDetail> = {
  '1': {
    challenge: 'High volume of custom pastry and celebration orders led to fragmented notes, ingredient delays, and delivery confusion.',
    solution: 'Engineered a multi-phase Kanban board in Trello with labeled order priorities, recipe checklist attachments, and automated stage movement.',
    impact: 'Reduced kitchen status inquiry emails by 65% and achieved 100% on-time fulfillment during peak festive seasons.'
  },
  '2': {
    challenge: 'Clients submitted incomplete project briefs across unstructured DM channels and multiple email threads.',
    solution: 'Built an intuitive Google Form with conditional routing, mandatory project scope parameters, and auto-sync to a master tracking sheet.',
    impact: 'Cut client onboarding turnaround from 3 days to under 4 hours while capturing 100% of required project specifications.'
  },
  '3': {
    challenge: 'Disorganized corporate cloud drive with conflicting duplicate files and loose access permissions compromising confidential documents.',
    solution: 'Architected a tiered folder hierarchy with color-coded taxonomy, semantic date-naming standards (YYYY-MM-DD), and role-based permissions.',
    impact: 'Saved executives and team members over 45 minutes daily spent searching for assets and eliminated version control errors.'
  },
  '4': {
    challenge: 'Key administrative SOPs and brand assets existed only in fragmented messages and memory, slowing onboarding.',
    solution: 'Curated a centralized digital operations manual complete with email scripts, tool guides, and response templates.',
    impact: 'Reduced new virtual assistant onboarding training time by 50% and provided a reliable single source of truth.'
  }
};

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'boards' | 'intake' | 'storage'>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Parallax scrolling hooks bound to the SelectedWork section viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001
  });

  // Layered subtle parallax transformations
  const bgOrb1Y = useTransform(smoothProgress, [0, 1], [-50, 50]);
  const bgOrb2Y = useTransform(smoothProgress, [0, 1], [40, -40]);
  const headerY = useTransform(smoothProgress, [0, 1], [-12, 12]);
  const colEvenY = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const colOddY = useTransform(smoothProgress, [0, 1], [18, -18]);
  const watermarkShift = useTransform(smoothProgress, [0, 1], [-30, 30]);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Project Management') || category.includes('Workflow')) {
      return <Layers className="w-5 h-5 text-[#556447]" />;
    }
    if (category.includes('Form')) {
      return <FileText className="w-5 h-5 text-[#556447]" />;
    }
    if (category.includes('Data') || category.includes('Spreadsheet')) {
      return <FileSpreadsheet className="w-5 h-5 text-[#556447]" />;
    }
    return <FolderArchive className="w-5 h-5 text-[#556447]" />;
  };

  const filteredProjects = SELECTED_PROJECTS.filter(project => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'boards') return project.id === '1';
    if (activeCategory === 'intake') return project.id === '2';
    if (activeCategory === 'storage') return project.id === '3' || project.id === '4';
    return true;
  });

  const handleNextModalProject = () => {
    if (!activeProjectModal) return;
    const currentIndex = SELECTED_PROJECTS.findIndex(p => p.id === activeProjectModal.id);
    const nextIndex = (currentIndex + 1) % SELECTED_PROJECTS.length;
    setActiveProjectModal(SELECTED_PROJECTS[nextIndex]);
  };

  const handlePrevModalProject = () => {
    if (!activeProjectModal) return;
    const currentIndex = SELECTED_PROJECTS.findIndex(p => p.id === activeProjectModal.id);
    const prevIndex = (currentIndex - 1 + SELECTED_PROJECTS.length) % SELECTED_PROJECTS.length;
    setActiveProjectModal(SELECTED_PROJECTS[prevIndex]);
  };

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative py-20 md:py-28 bg-[#F8F7F4] border-t border-[#E2DFD8] overflow-hidden"
    >
      {/* Parallax Subtle Background Accents */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        <motion.div
          style={{ y: bgOrb1Y }}
          className="absolute -top-16 right-[-60px] w-96 h-96 bg-[#E8EDE3]/40 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgOrb2Y }}
          className="absolute -bottom-24 left-[-80px] w-96 h-96 bg-[#7C8F6A]/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: watermarkShift }}
          className="absolute top-1/2 right-10 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-8xl font-black text-[#1F2937] tracking-widest hidden xl:block uppercase"
        >
          ARTIFACTS
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Parallax Float */}
        <motion.div 
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E8EDE3] text-[#556447] text-xs font-bold tracking-wider uppercase mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              Verified Artifacts & Systems
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">
              Selected Work
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Real-world administrative frameworks, workflow boards, client intake pipelines, and structured repositories built to eliminate friction.
            </p>
          </div>

          <div className="text-xs text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E2DFD8] px-3 py-1.5 rounded-lg shadow-2xs">
              <Info className="w-3.5 h-3.5 text-[#7C8F6A]" />
              Authentic work artifacts • Direct access links
            </span>
          </div>
        </motion.div>

        {/* Interactive Filter Tabs */}
        <div className="mt-10 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 bg-white border border-[#E2DFD8] rounded-xl shadow-2xs">
            {[
              { id: 'all', label: 'All Artifacts (4)' },
              { id: 'boards', label: 'Project Boards' },
              { id: 'intake', label: 'Intake Forms' },
              { id: 'storage', label: 'Cloud Repositories' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as 'all' | 'boards' | 'intake' | 'storage')}
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer z-10 ${
                  activeCategory === tab.id ? 'text-[#1F2937]' : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                {activeCategory === tab.id && (
                  <motion.div
                    layoutId="workCategoryPill"
                    className="absolute inset-0 bg-[#E8EDE3] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Work Grid with Layered Parallax Movement & Animated Layout */}
        <motion.div 
          layout
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  layout
                  key={project.id}
                  id={`portfolio-card-${project.id}`}
                  style={{ y: isEven ? colEvenY : colOddY }}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.45, 
                    delay: index * 0.08,
                    layout: { duration: 0.3 }
                  }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="bg-white rounded-2xl border border-[#E2DFD8] p-7 sm:p-8 shadow-2xs hover:shadow-md hover:border-[#7C8F6A] transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Header with Icon and Category Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-11 h-11 rounded-xl bg-[#E8EDE3] flex items-center justify-center group-hover:bg-[#7C8F6A] transition-colors shadow-2xs"
                      >
                        <span className="group-hover:brightness-200 transition-all">
                          {getCategoryIcon(project.category)}
                        </span>
                      </motion.div>
                      <span className="px-3 py-1 rounded-full bg-[#F4F6F2] border border-[#E2DFD8] text-[11px] font-semibold text-[#556447]">
                        {project.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] group-hover:text-[#556447] transition-colors">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Operational Highlights */}
                    <div className="mt-6 pt-5 border-t border-[#E2DFD8]/70">
                      <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#7C8F6A]" />
                        Operational Highlights:
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#4B5563] leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-[#E8EDE3] text-[#556447] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-[#F8F7F4] border border-[#E2DFD8] text-[11px] font-medium text-[#4B5563]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-5 border-t border-[#E2DFD8]/60 flex items-center justify-between gap-3">
                    <a
                      id={`open-project-link-${project.id}`}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F2937] hover:bg-[#7C8F6A] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
                    >
                      <span>Open Artifact</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      id={`preview-details-btn-${project.id}`}
                      onClick={() => setActiveProjectModal(project)}
                      className="px-4 py-2.5 rounded-xl bg-[#F8F7F4] hover:bg-[#E8EDE3] border border-[#E2DFD8] text-xs sm:text-sm font-semibold text-[#1F2937] transition-colors cursor-pointer active:scale-98"
                    >
                      Inspect Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Case Overview Modal with AnimatePresence & Next/Prev Navigation */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div
            id="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
            onClick={() => setActiveProjectModal(null)}
          >
            <motion.div
              id="project-modal-dialog"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#D3DCCB] shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="close-project-modal-btn"
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F4F6F2] hover:bg-[#E8EDE3] text-[#4B5563] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md bg-[#E8EDE3] text-[#556447] text-xs font-bold uppercase tracking-wider">
                  {activeProjectModal.category}
                </span>
                <span className="text-xs text-[#6B7280]">Verified Case Study</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2937] tracking-tight">
                {activeProjectModal.name}
              </h3>

              {(() => {
                const caseDetail = PROJECT_CASE_DETAILS[activeProjectModal.id] || {
                  challenge: activeProjectModal.description,
                  solution: 'Structured custom workflow and standardized operational steps.',
                  impact: 'Measurable efficiency gains and streamlined communication across stakeholders.'
                };
                return (
                  <>
                    <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      {caseDetail.challenge}
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-1">
                          System Architecture & Approach
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                          {caseDetail.solution}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#E8EDE3]/60 border border-[#D3DCCB]">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#556447] mb-1">
                          Direct Business Impact
                        </h4>
                        <p className="text-xs sm:text-sm text-[#1F2937] font-medium leading-relaxed">
                          {caseDetail.impact}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}

              <div className="mt-6 flex flex-wrap gap-2">
                {activeProjectModal.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#F4F6F2] text-[#1F2937] text-xs font-medium border border-[#E2DFD8]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Footer with Prev/Next and External Link */}
              <div className="mt-8 pt-5 border-t border-[#E2DFD8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevModalProject}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F8F7F4] hover:bg-[#E8EDE3] text-xs font-semibold text-[#1F2937] border border-[#E2DFD8] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextModalProject}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F8F7F4] hover:bg-[#E8EDE3] text-xs font-semibold text-[#1F2937] border border-[#E2DFD8] transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B7280] hover:text-[#1F2937] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href={activeProjectModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#556447] hover:bg-[#445038] text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <span>Open Live Artifact</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
