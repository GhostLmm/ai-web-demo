import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  className = "",
  duration = 0.3 
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    setPrevValue(displayValue);
    setDisplayValue(value);
  }, [value, displayValue]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayValue}
          initial={{ 
            scale: prevValue !== displayValue ? 1.2 : 1, 
            opacity: prevValue !== displayValue ? 0 : 1 
          }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {displayValue.toString().padStart(2, '0')}
        </motion.div>
      </AnimatePresence>
      {/* 占位元素保持容器大小 */}
      <div className="opacity-0">
        {displayValue.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

// 数字递增动画组件
export const AnimatedNumber: React.FC<{
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}> = ({ from, to, duration = 2, className = "", suffix = "" }) => {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = from;
    const endValue = to;
    const totalDuration = duration * 1000;

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // 使用缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const newValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
      
      setCurrent(newValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    updateValue();
  }, [from, to, duration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {current.toLocaleString()}{suffix}
    </motion.span>
  );
};

// 脉冲动画组件
export const PulseAnimation: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = "", intensity = 1.05 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, intensity, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}; 