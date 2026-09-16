import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeToggleProps {
  id?: string;
  className?: string;
  variant?: 'segmented' | 'compact';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  id = 'theme-toggle', 
  className = '',
  variant = 'segmented' 
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const options: { mode: ThemeMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { mode: 'light', label: 'Light mode', icon: Sun },
    { mode: 'dark', label: 'Dark mode', icon: Moon },
    { mode: 'system', label: 'System preference', icon: Laptop },
  ];

  if (variant === 'compact') {
    return (
      <motion.button
        id={id}
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative p-2 rounded-xl border border-[#E2DFD8] dark:border-[#2B332C] bg-white/80 dark:bg-[#1B201C]/80 backdrop-blur-sm text-[#1F2937] dark:text-[#F3F5F1] shadow-2xs hover:border-[#7C8F6A] dark:hover:border-[#8EA37A] transition-colors cursor-pointer flex items-center justify-center ${className}`}
        aria-label={`Toggle theme (currently ${theme}, resolved as ${resolvedTheme})`}
        title={`Current: ${theme === 'system' ? `System (${resolvedTheme})` : theme}. Click to toggle.`}
      >
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-4 h-4 text-[#A3B899]" />
          ) : (
            <Sun className="w-4 h-4 text-[#D97706]" />
          )}
        </motion.div>
      </motion.button>
    );
  }

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Color theme selection"
      className={`inline-flex items-center p-1 rounded-xl bg-[#EFECE6]/80 dark:bg-[#161A17] border border-[#E2DFD8] dark:border-[#2B332C] backdrop-blur-xs shadow-2xs ${className}`}
    >
      {options.map((opt) => {
        const isActive = theme === opt.mode;
        const IconComponent = opt.icon;

        return (
          <button
            key={opt.mode}
            id={`${id}-${opt.mode}-btn`}
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(opt.mode)}
            title={opt.label}
            className={`relative px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 flex items-center gap-1.5 cursor-pointer select-none ${
              isActive
                ? 'text-[#1F2937] dark:text-[#F3F5F1]'
                : 'text-[#6B7280] dark:text-[#73806E] hover:text-[#1F2937] dark:hover:text-[#9BA796]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={`${id}-active-pill`}
                className="absolute inset-0 rounded-lg bg-white dark:bg-[#222823] border border-[#E2DFD8]/80 dark:border-[#343D35] shadow-xs"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              <IconComponent 
                className={`w-3.5 h-3.5 transition-colors ${
                  isActive 
                    ? opt.mode === 'dark' 
                      ? 'text-[#A3B899]' 
                      : opt.mode === 'light' 
                        ? 'text-[#D97706]' 
                        : 'text-[#7C8F6A]'
                    : ''
                }`} 
              />
            </span>
            <span className="relative z-10 hidden xl:inline capitalize text-[11px]">
              {opt.mode}
            </span>
          </button>
        );
      })}
    </div>
  );
};
