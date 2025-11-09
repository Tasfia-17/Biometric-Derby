import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, className = '', disabled=false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3 text-2xl font-body uppercase transition-colors duration-200 bg-transparent border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#000000' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
    >
      <span>{children}</span>
    </motion.button>
  );
};

export default AnimatedButton;
