import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

interface PainPointCardProps {
  iconType: 'painpoint-confused' | 'painpoint-review' | 'painpoint-analysis' | 'painpoint-lifecycle';
  title: string;
  description: string;
  details: string[];
  impact: string;
  color: 'red' | 'orange' | 'yellow' | 'purple';
  index: number;
}

const PainPointCard: React.FC<PainPointCardProps> = ({
  iconType,
  title,
  description,
  details,
  impact,
  color,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorMap = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '#ef4444',
      hover: 'hover:bg-red-100'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-800',
      icon: '#f97316',
      hover: 'hover:bg-orange-100'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '#eab308',
      hover: 'hover:bg-yellow-100'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      icon: '#a855f7',
      hover: 'hover:bg-purple-100'
    }
  };

  const theme = colorMap[color];

  return (
    <motion.div
      className={`relative p-6 rounded-xl border-2 ${theme.bg} ${theme.border} ${theme.hover} transition-all duration-300 cursor-pointer h-full`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 痛点图标 */}
      <motion.div 
        className="mb-4 h-20 flex items-center justify-center"
        animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon 
          type={iconType}
          color={theme.icon}
          size={56}
        />
      </motion.div>

      {/* 痛点标题 */}
      <h3 className={`text-lg font-bold mb-2 ${theme.text}`}>
        {title}
      </h3>

      {/* 痛点描述 */}
      <p className="text-gray-600 mb-3 text-sm">
        {description}
      </p>

      {/* 影响程度 */}
      <div className={`text-xs font-semibold ${theme.text} mb-3`}>
        💔 {impact}
      </div>

      {/* 悬浮详情 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 p-6 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border-2 border-gray-200 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-3">
              <Icon 
                type="pain-indicator"
                color="#ef4444"
                size={20}
              />
              <h4 className="font-bold text-gray-900 ml-2">真实痛点：</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {details.map((detail, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-red-500 mt-1">•</span>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PainPointCard; 