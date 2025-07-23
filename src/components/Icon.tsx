import React from 'react';
import {
  QuestionCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  FallOutlined
} from '@ant-design/icons';

interface IconProps {
  type: 'confused' | 'warning' | 'manual' | 'decline';
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ type, className, style }) => {
  const iconMap = {
    confused: QuestionCircleOutlined,
    warning: WarningOutlined,
    manual: ClockCircleOutlined,
    decline: FallOutlined
  };

  const IconComponent = iconMap[type];

  return (
    <IconComponent 
      className={className} 
      style={{ fontSize: '48px', color: '#6366f1', ...style }} 
    />
  );
};

export default Icon; 