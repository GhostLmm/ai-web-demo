import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'pulse';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = 'primary',
  disabled = false,
  size = 'md'
}) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    pulse: "bg-indigo-600 text-white hover:bg-indigo-700"
  };

  const buttonVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  if (variant === 'pulse') {
    return (
      <motion.button
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        initial={{ scale: 1 }}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            "0 0 0 10px rgba(79, 70, 229, 0)",
            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      variants={buttonVariants}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? "tap" : "rest"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

// 浮动动作按钮
export const FloatingActionButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      className={`fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 ${className}`}
      whileHover={{ 
        scale: 1.1,
        rotate: 10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
    >
      {children}
    </motion.button>
  );
};

// 卡片悬停动画组件
export const AnimatedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
}> = ({ children, className = "", hoverScale = 1.05 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: hoverScale,
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}; 