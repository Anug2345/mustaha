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
          ? 'bg-[#F8F7F4]/90 dark:bg-[#111413]/90 backdrop-blur-md shadow-xs border-b border-[#E2DFD8] dark:border-[#27322A]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Identity */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C8F6A] rounded-lg p-1 min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#D3DCCB] dark:border-[#35433A] shadow-xs group-hover:border-[#7C8F6A] dark:group-hover:border-[#8FA67C] transition-colors duration-200 bg-[#1F2937] shrink-0">
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
            <div className="min-w-0">
              <span className="block text-sm sm:text-base font-bold text-[#1F2937] dark:text-[#F3F6F2] tracking-tight group-hover:text-[#7C8F6A] dark:group-hover:text-[#8FA67C] transition-colors truncate">
                Mustapha Zainab
              </span>
              <span className="block text-[10px] sm:text-xs font-medium text-[#6B7280] dark:text-[#A8B3A7] truncate max-w-[130px] xs:max-w-none">
                Certified Virtual Assistant
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#1F2937] dark:text-[#F3F6F2] bg-[#E8EDE3] dark:bg-[#222C26] font-semibold'
                      : 'text-[#4B5563] dark:text-[#A8B3A7] hover:text-[#1F2937] dark:hover:text-[#F3F6F2] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle variant="switch" idPrefix="nav-desktop-theme" />

            <motion.button
              id="nav-cta-btn"
              onClick={() => handleNavClick('contact')}
              whileHover={{ scale: 1.02, y: -1, backgroundColor: '#6B7D5A', boxShadow: '0 4px 12px rgba(85, 100, 71, 0.25)' }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F2937] dark:bg-[#8FA67C] text-white dark:text-[#111413] text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4 text-[#A3B899] dark:text-[#111413]" />
            </motion.button>
          </div>

          {/* Mobile Right Controls: Compact Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <ThemeToggle variant="compact" idPrefix="nav-mobile-theme-compact" />

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-xl text-[#1F2937] dark:text-[#F3F6F2] hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#7C8F6A] w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#F8F7F4] dark:bg-[#181D1A] border-b border-[#E2DFD8] dark:border-[#27322A] px-4 pt-2 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  activeSection === item.id
                    ? 'bg-[#E8EDE3] dark:bg-[#222C26] text-[#1F2937] dark:text-[#F3F6F2] font-semibold'
                    : 'text-[#4B5563] dark:text-[#A8B3A7] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1F2937] dark:hover:text-[#F3F6F2]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E2DFD8] dark:border-[#27322A] flex flex-col gap-3">
            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-xs font-semibold text-[#6B7280] dark:text-[#A8B3A7] uppercase tracking-wider">
                Dark Mode
              </span>
              <ThemeToggle variant="switch" idPrefix="mobile-menu-theme" />
            </div>

            <button
              id="mobile-cta-btn"
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#1F2937] dark:bg-[#8FA67C] text-white dark:text-[#111413] text-sm sm:text-base font-semibold shadow-xs hover:bg-[#7C8F6A] dark:hover:bg-[#9EBA8B] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4 text-[#A3B899] dark:text-[#111413]" />
            </button>
            <a
              id="mobile-quick-email-btn"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#D3DCCB] dark:border-[#2E3C32] text-[#4B5563] dark:text-[#A8B3A7] text-xs sm:text-sm font-medium bg-white dark:bg-[#141816] min-h-[44px] break-all text-center"
            >
              <Mail className="w-4 h-4 text-[#7C8F6A] dark:text-[#8FA67C] shrink-0" />
              <span className="truncate">{PERSONAL_INFO.email}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

