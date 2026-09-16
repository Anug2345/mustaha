import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Mail, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'tools', label: 'Tools' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F7F4]/90 dark:bg-[#121513]/90 backdrop-blur-md shadow-xs border-b border-[#E2DFD8] dark:border-[#2B332C]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C8F6A] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D3DCCB] dark:border-[#343D35] shadow-xs group-hover:border-[#7C8F6A] dark:group-hover:border-[#8EA37A] transition-colors duration-200 bg-[#1F2937]">
              <img
                src="/main 1.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/zainab.jpg';
                }}
                alt="Mustapha Zainab Olabimpe"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-base font-bold text-[#1F2937] dark:text-[#F3F5F1] tracking-tight group-hover:text-[#7C8F6A] dark:group-hover:text-[#8EA37A] transition-colors">
                Mustapha Zainab
              </span>
              <span className="block text-xs font-medium text-[#6B7280] dark:text-[#9BA796]">
                Certified Virtual Assistant
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#1F2937] dark:text-[#F3F5F1] bg-[#E8EDE3] dark:bg-[#222823] font-semibold border border-transparent dark:border-[#343D35]'
                      : 'text-[#4B5563] dark:text-[#9BA796] hover:text-[#1F2937] dark:hover:text-[#F3F5F1] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action: Theme Toggle + Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle id="desktop-theme-toggle" />

            <motion.button
              id="nav-cta-btn"
              onClick={() => handleNavClick('contact')}
              whileHover={{ scale: 1.02, y: -1, backgroundColor: '#6B7D5A', boxShadow: '0 4px 12px rgba(85, 100, 71, 0.25)' }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F2937] dark:bg-[#222823] text-white text-sm font-semibold shadow-xs border border-transparent dark:border-[#343D35] hover:bg-[#6B7D5A] dark:hover:bg-[#556447] transition-colors cursor-pointer"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4 text-[#A3B899]" />
            </motion.button>
          </div>

          {/* Mobile Menu & Quick Theme Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle id="mobile-header-theme-toggle" variant="compact" />

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="p-2.5 rounded-xl text-[#1F2937] dark:text-[#F3F5F1] hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#7C8F6A] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#F8F7F4] dark:bg-[#161A17] border-b border-[#E2DFD8] dark:border-[#2B332C] px-4 pt-2 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#E8EDE3] dark:bg-[#222823] text-[#1F2937] dark:text-[#F3F5F1] font-semibold border border-transparent dark:border-[#343D35]'
                    : 'text-[#4B5563] dark:text-[#9BA796] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1F2937] dark:hover:text-[#F3F5F1]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E2DFD8] dark:border-[#2B332C] flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-[#6B7280] dark:text-[#9BA796] uppercase tracking-wider">
                Theme
              </span>
              <ThemeToggle id="mobile-drawer-theme-toggle" variant="segmented" />
            </div>

            <button
              id="mobile-cta-btn"
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1F2937] dark:bg-[#222823] text-white text-base font-semibold shadow-xs hover:bg-[#7C8F6A] dark:hover:bg-[#556447] border border-transparent dark:border-[#343D35] transition-colors"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4 text-[#A3B899]" />
            </button>
            <a
              id="mobile-quick-email-btn"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#D3DCCB] dark:border-[#2B332C] text-[#4B5563] dark:text-[#9BA796] text-sm font-medium bg-white dark:bg-[#1B201C]"
            >
              <Mail className="w-4 h-4 text-[#7C8F6A]" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
