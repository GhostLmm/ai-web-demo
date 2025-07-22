import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  id?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up',
  id
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 50 };
      case 'down': return { opacity: 0, y: -50 };
      case 'left': return { opacity: 0, x: 50 };
      case 'right': return { opacity: 0, x: -50 };
      default: return { opacity: 0, y: 50 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up': return { opacity: 1, y: 0 };
      case 'down': return { opacity: 1, y: 0 };
      case 'left': return { opacity: 1, x: 0 };
      case 'right': return { opacity: 1, x: 0 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      id={id}
      initial={getInitialPosition()}
      animate={inView ? getAnimatePosition() : getInitialPosition()}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

// 容器动画组件
export const AnimatedContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
}> = ({ children, className = "", staggerChildren = 0.1 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// 子元素动画组件
export const AnimatedItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      }}
    >
      {children}
    </motion.div>
  );
}; 