import React from 'react';
import { ArrowUp, Linkedin, Instagram, Facebook, Mail, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1F2937] dark:bg-[#121613] text-white border-t border-white/10 dark:border-[#2B332C] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Identity & Value */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C8F6A] text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-xs">
                MZ
              </div>
              <div>
                <span className="block text-lg font-bold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="block text-xs font-medium text-stone-300 dark:text-[#9BA796]">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 dark:text-[#9BA796] leading-relaxed max-w-sm">
              Providing dependable administrative support, structured data organization, calendar management, and clear communication to help businesses maintain momentum.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-300 dark:text-[#9BA796]">
              <ShieldCheck className="w-4 h-4 text-[#7C8F6A]" />
              <span>Linguistics Student, Lagos State University (LASU)</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-stone-300 dark:text-[#9BA796] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-stone-300 dark:text-[#9BA796]">
              {['home', 'about', 'services', 'work', 'tools', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item)}
                    className="hover:text-white dark:hover:text-[#F3F5F1] capitalize transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Direct Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-stone-300 dark:text-[#9BA796] uppercase tracking-wider">
              Connect Directly
            </h4>
            <p className="text-xs text-stone-300 dark:text-[#9BA796]">
              Open to internships, entry-level opportunities, and freelance projects.
            </p>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#E8EDE3] hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#7C8F6A]" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg bg-white/5 dark:bg-[#1B201C] hover:bg-[#7C8F6A] text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-transparent dark:border-[#2B332C]"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-lg bg-white/5 dark:bg-[#1B201C] hover:bg-[#7C8F6A] text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-transparent dark:border-[#2B332C]"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="w-9 h-9 rounded-lg bg-white/5 dark:bg-[#1B201C] hover:bg-[#7C8F6A] text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-transparent dark:border-[#2B332C]"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 dark:border-[#2B332C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 dark:text-[#9BA796]">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span>Lagos, Nigeria • Remote Globally</span>
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 dark:bg-[#1B201C] hover:bg-white/10 dark:hover:bg-[#252C26] text-stone-300 dark:text-[#9BA796] hover:text-white dark:hover:text-[#F3F5F1] transition-colors cursor-pointer border border-transparent dark:border-[#2B332C]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
