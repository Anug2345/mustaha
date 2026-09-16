import React, { useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring 
} from 'motion/react';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Check, 
  Compass, 
  Briefcase, 
  ArrowRight, 
  Languages, 
  CheckCircle 
} from 'lucide-react';
import { CURRENTLY_OPEN_TO, LINGUISTICS_ADVANTAGES, PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  onNavigate: (sectionId: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Parallax shifts
  const portraitShiftY = useTransform(smoothProgress, [0, 1], [-25, 25]);
  const decorativeRotate = useTransform(smoothProgress, [0, 1], [-3, 3]);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-20 md:py-28 bg-[#F4F6F2]/60 dark:bg-[#131614]/60 border-y border-[#E2DFD8] dark:border-[#27322A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8EDE3] dark:bg-[#1F2922] text-[#556447] dark:text-[#AEC89B] text-xs font-bold tracking-wider uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] dark:text-[#F3F6F2] tracking-tight">
            Where Linguistics Rigor Meets Practical Administrative Execution
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
            I am a dedicated Linguistics student at Lagos State University with a passion for bringing clarity, structured workflows, and dependable support to entrepreneurs, startups, and busy professionals.
          </p>
        </motion.div>

        {/* Spotlight Profile Feature with Zainab's Portrait and Parallax Frame */}
        <motion.div
          id="about-spotlight-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-white dark:bg-[#181D1A] rounded-3xl border border-[#E2DFD8] dark:border-[#27322A] p-6 sm:p-8 lg:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Portrait Image Showcase with Parallax */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Decorative architectural background element with Parallax Rotation */}
                <motion.div 
                  style={{ rotate: decorativeRotate }}
                  className="absolute -inset-3 bg-gradient-to-tr from-[#7C8F6A]/20 via-[#E8EDE3]/50 dark:from-[#8FA67C]/15 dark:via-[#202723]/30 to-transparent rounded-3xl -z-10" 
                />
                
                <motion.div 
                  style={{ y: portraitShiftY }}
                  className="relative rounded-2xl overflow-hidden border border-[#D3DCCB] dark:border-[#2E3C32] shadow-md bg-stone-100 dark:bg-[#141816] aspect-[3/4] group"
                >
                  <img
                    src="/bimpe 2.jpg"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/zainab.jpg';
                    }}
                    alt="Mustapha Zainab Olabimpe - Certified Virtual Assistant"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />

                  {/* Identification Pill */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 p-2.5 sm:p-3.5 rounded-xl bg-white/95 dark:bg-[#1E2421]/95 backdrop-blur-md border border-[#E2DFD8] dark:border-[#2E3C32] shadow-xs flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2] truncate">Mustapha Zainab Olabimpe</p>
                      <p className="text-[10px] sm:text-[11px] font-medium text-[#6B7280] dark:text-[#A8B3A7] truncate">Virtual Assistant & Administrative Lead</p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#556447] dark:text-[#AEC89B] bg-[#E8EDE3] dark:bg-[#253228] px-2 py-1 rounded-md shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C8F6A] dark:bg-[#8FA67C]" />
                      Verified
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Profile Intro & Executive Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8EDE3] dark:bg-[#1F2922] text-[#556447] dark:text-[#AEC89B] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Executive Profile
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2937] dark:text-[#F3F6F2] tracking-tight leading-snug">
                "Organization is not an afterthought—it is the foundation of high-value work, trusted partnerships, and operational calm."
              </h3>

              <p className="text-base text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
                As a dedicated Linguistics scholar at Lagos State University and certified Virtual Assistant, I bring methodical precision, deep respect for communication, and high discretion to every business I support.
              </p>

              {/* Core Strengths Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1F2937] dark:text-[#F3F6F2]">
                  <span className="w-5 h-5 rounded-full bg-[#E8EDE3] dark:bg-[#253228] text-[#556447] dark:text-[#AEC89B] flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <span>Linguistic Precision in Copy & Email</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1F2937] dark:text-[#F3F6F2]">
                  <span className="w-5 h-5 rounded-full bg-[#E8EDE3] dark:bg-[#253228] text-[#556447] dark:text-[#AEC89B] flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <span>Executive Calendar & Meeting Buffers</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1F2937] dark:text-[#F3F6F2]">
                  <span className="w-5 h-5 rounded-full bg-[#E8EDE3] dark:bg-[#253228] text-[#556447] dark:text-[#AEC89B] flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <span>Accurate Data Entry & Sheets Cleanup</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1F2937] dark:text-[#F3F6F2]">
                  <span className="w-5 h-5 rounded-full bg-[#E8EDE3] dark:bg-[#253228] text-[#556447] dark:text-[#AEC89B] flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <span>High Confidentiality & Prompt Turnaround</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <motion.button
                  onClick={() => onNavigate('contact')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#1F2937] dark:bg-[#8FA67C] hover:bg-[#7C8F6A] dark:hover:bg-[#9EBA8B] text-white dark:text-[#111413] text-sm font-semibold transition-all shadow-xs cursor-pointer min-h-[44px]"
                >
                  <span>Work With Zainab</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => onNavigate('services')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#F8F7F4] dark:bg-[#202723] hover:bg-[#E8EDE3] dark:hover:bg-[#26302a] border border-[#D3DCCB] dark:border-[#2E3C32] text-[#1F2937] dark:text-[#F3F6F2] text-sm font-semibold transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Explore Services</span>
                </motion.button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 3 Main Narrative Pillars: Who I Am, How I Work, My Background */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Who I Am */}
          <motion.div
            id="about-card-who-i-am"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#181D1A] rounded-2xl p-6 sm:p-8 border border-[#E2DFD8] dark:border-[#27322A] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E8EDE3] dark:bg-[#253228] text-[#556447] dark:text-[#AEC89B] flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F3F6F2]">Who I Am</h3>
              <p className="mt-3 text-sm text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
                I am a disciplined Virtual Assistant and Linguistics scholar at Lagos State University. I care deeply about how language, structure, and communication shape successful business interactions and everyday efficiency.
              </p>
              <p className="mt-3 text-sm text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
                As a fast learner who values collaboration and continuous growth, I take pride in being the reliable backbone clients trust to keep their operations moving seamlessly.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E2DFD8]/70 dark:border-[#27322A] flex items-center gap-2 text-xs font-semibold text-[#556447] dark:text-[#AEC89B]">
              <span className="w-2 h-2 rounded-full bg-[#7C8F6A] dark:bg-[#8FA67C]" />
              Lagos State University • Linguistics
            </div>
          </motion.div>

          {/* Pillar 2: How I Work */}
          <motion.div
            id="about-card-how-i-work"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#181D1A] rounded-2xl p-6 sm:p-8 border border-[#E2DFD8] dark:border-[#27322A] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1F2937] dark:bg-[#253228] text-white dark:text-[#AEC89B] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F3F6F2]">How I Work</h3>
              <p className="mt-3 text-sm text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
                I believe organization is not an afterthought—it is the foundation of high-value work. I specialize in building orderly systems, supporting administrative tasks, researching key information, and turning raw ideas into clear, engaging content.
              </p>
              <p className="mt-3 text-sm text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
                Whether managing an executive inbox, organizing project boards, or standardizing client intake files, I execute with patience, precision, and consistency.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E2DFD8]/70 dark:border-[#27322A] flex items-center gap-2 text-xs font-semibold text-[#1F2937] dark:text-[#F3F6F2]">
              <span className="w-2 h-2 rounded-full bg-[#7C8F6A] dark:bg-[#8FA67C]" />
              Methodical • Proactive • Detail-Driven
            </div>
          </motion.div>

          {/* Pillar 3: My Background */}
          <motion.div
            id="about-card-my-background"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#181D1A] rounded-2xl p-6 sm:p-8 border border-[#E2DFD8] dark:border-[#27322A] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E8EDE3] dark:bg-[#253228] text-[#556447] dark:text-[#AEC89B] flex items-center justify-center mb-6">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F3F6F2]">My Background</h3>
              <p className="mt-3 text-sm text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
                My academic training spans applied linguistics, sociolinguistics, phonetics, language planning, and multilingual education. This rigorous discipline has sharpened my analytical eye and honed my ability to handle complex information.
              </p>
              <p className="mt-3 text-sm text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
                Beyond academics, I actively cultivate practical proficiencies in digital tools, marketing concepts, and administrative software to deliver modern, end-to-end support.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E2DFD8]/70 dark:border-[#27322A] flex items-center gap-2 text-xs font-semibold text-[#556447] dark:text-[#AEC89B]">
              <span className="w-2 h-2 rounded-full bg-[#7C8F6A] dark:bg-[#8FA67C]" />
              Applied Research & Communication
            </div>
          </motion.div>

        </div>

        {/* The Linguistics Differentiator Feature Block */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-white dark:bg-[#181D1A] rounded-2xl border border-[#E2DFD8] dark:border-[#27322A] p-6 sm:p-8 lg:p-10 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2DFD8] dark:border-[#27322A]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C8F6A] dark:text-[#8FA67C] uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                The Linguistics Differentiator
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] dark:text-[#F3F6F2]">
                Why Academic Linguistics Makes a Superior Virtual Assistant
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#A8B3A7] max-w-md">
              Most administrative errors stem from miscommunication and lack of detail. Linguistic training directly solves these challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {LINGUISTICS_ADVANTAGES.map((adv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="p-4 rounded-xl bg-[#F8F7F4] dark:bg-[#141816] border border-[#E2DFD8] dark:border-[#27322A] hover:border-[#7C8F6A] dark:hover:border-[#8FA67C] hover:bg-white dark:hover:bg-[#1C221E] transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between group cursor-default"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E8EDE3] dark:bg-[#202723] group-hover:bg-[#7C8F6A] text-[#556447] dark:text-[#AEC89B] group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F2937] dark:text-[#F3F6F2] group-hover:text-[#556447] dark:group-hover:text-[#AEC89B] transition-colors">
                      {adv.title}
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-[#A8B3A7] mt-1.5 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#E2DFD8]/60 dark:border-[#27322A] flex items-center gap-1 text-[10px] font-semibold text-[#7C8F6A] dark:text-[#8FA67C] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3" />
                  <span>Precision Standard</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently Open To Area */}
        <motion.div
          id="currently-open-to-section"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-[#1F2937] dark:bg-[#181D1A] text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md border border-transparent dark:border-[#27322A]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 dark:bg-white/5 text-[#E8EDE3] text-xs font-semibold uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5 text-[#7C8F6A] dark:text-[#8FA67C]" />
                Opportunities & Collaboration
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Currently Open To
              </h3>
              <p className="mt-2 text-sm text-stone-300 dark:text-[#A8B3A7] leading-relaxed">
                I am actively seeking roles where I can bring order, accuracy, and clear communication to busy teams and visionary entrepreneurs. Click any role to discuss.
              </p>
            </div>

            <motion.button
              id="about-open-to-cta"
              onClick={() => onNavigate('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#7C8F6A] dark:bg-[#8FA67C] hover:bg-[#6B7D5A] dark:hover:bg-[#9EBA8B] text-white dark:text-[#111413] text-sm font-semibold transition-colors shrink-0 shadow-xs cursor-pointer min-h-[44px]"
            >
              <span>Discuss An Opportunity</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 dark:border-[#27322A] flex flex-wrap gap-2.5">
            {CURRENTLY_OPEN_TO.map((item, idx) => (
              <motion.button
                key={idx}
                type="button"
                onClick={() => onNavigate('contact')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-stone-200 dark:text-[#C7D0C5] hover:border-[#7C8F6A] hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5 text-[#7C8F6A] dark:text-[#8FA67C]" />
                <span>{item}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
