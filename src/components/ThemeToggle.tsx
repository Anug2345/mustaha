import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'switch' | 'compact';
  showLabel?: boolean;
  className?: string;
  idPrefix?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'switch',
  showLabel = false,
  className = '',
  idPrefix = 'theme-toggle'
}) => {
  const { isDark, toggleTheme } = useTheme();

  // Compact circular/pill icon button for mobile top bar
  if (variant === 'compact') {
    return (
      <motion.button
        id={`${idPrefix}-btn`}
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className={`relative inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-[#D3DCCB] dark:border-[#2E3C32] bg-white/85 dark:bg-[#181D1A]/95 backdrop-blur-xs text-[#1F2937] dark:text-[#F3F6F2] hover:bg-[#E8EDE3] dark:hover:bg-[#222C26] transition-colors shadow-2xs cursor-pointer ${className}`}
        aria-label={isDark ? 'Dark mode is ON. Click to turn OFF.' : 'Dark mode is OFF. Click to turn ON.'}
        title={isDark ? 'Dark mode: ON (Tap to turn OFF)' : 'Dark mode: OFF (Tap to turn ON)'}
      >
        <span className="sr-only">Toggle dark mode</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 45, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-[#8FA67C]" />
            ) : (
              <Sun className="w-4 h-4 text-[#7C8F6A]" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  // Single-tap toggle switch (Off and On)
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {showLabel && (
        <span className="text-xs font-semibold text-[#4B5563] dark:text-[#A8B3A7] select-none">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
      <button
        id={`${idPrefix}-switch-btn`}
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={`group relative inline-flex h-8 w-15 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C8F6A] focus-visible:ring-offset-2 ${
          isDark
            ? 'bg-[#253228] border border-[#3E5042]'
            : 'bg-[#E5EBE0] border border-[#CBD5C4]'
        }`}
        aria-label={isDark ? 'Dark mode is ON. Click to turn OFF.' : 'Dark mode is OFF. Click to turn ON.'}
        title={isDark ? 'Dark mode: ON (Tap to turn OFF)' : 'Dark mode: OFF (Tap to turn ON)'}
      >
        {/* Track icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none select-none">
          <Sun className={`w-3.5 h-3.5 transition-opacity duration-200 ${isDark ? 'opacity-35 text-[#8FA67C]' : 'opacity-0'}`} />
          <Moon className={`w-3.5 h-3.5 transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-35 text-[#6B7280]'}`} />
        </div>

        {/* Sliding thumb knob with spring animation */}
        <motion.div
          animate={{
            x: isDark ? 28 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 32,
          }}
          className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-[#151917] shadow-sm border border-black/5 dark:border-white/10"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ rotate: -35, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 35, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-[#8FA67C] stroke-[2.2]" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-[#7C8F6A] stroke-[2.2]" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  );
};
