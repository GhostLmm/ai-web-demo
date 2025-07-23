import React from 'react';
import {
  QuestionCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  FallOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TeamOutlined,
  LineChartOutlined,
  FireOutlined,
  DollarCircleOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  BellOutlined,
  LoadingOutlined,
  BarChartOutlined,
  UserOutlined,
  FrownOutlined,
  AlertOutlined,
  RightOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

interface IconProps {
  type: 'confused' | 'warning' | 'manual' | 'decline' | 'painpoint-confused' | 'painpoint-review' | 'painpoint-analysis' | 'painpoint-lifecycle' | 'pain-indicator' | 'case-warning' | 'expand-hint';
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ type, className, style, color, size = 48 }) => {
  const iconMap = {
    confused: QuestionCircleOutlined,
    warning: WarningOutlined,
    manual: ClockCircleOutlined,
    decline: FallOutlined,
    // 痛点专用图标 - 更精准的表达
    'painpoint-confused': ExclamationCircleOutlined,  // 感叹号表达困扰和不确定
    'painpoint-review': BellOutlined,                 // 铃铛表达警报和突发事件
    'painpoint-analysis': TeamOutlined,               // 团队图标表达人工团队分析
    'painpoint-lifecycle': BarChartOutlined,          // 柱状图表达趋势变化
    'pain-indicator': FrownOutlined,                  // 痛苦表情用于悬浮提示
    'case-warning': AlertOutlined,                    // 案例警示图标
    'expand-hint': RightOutlined                      // 展开提示图标
  };

  const IconComponent = iconMap[type];

  const iconStyle = {
    fontSize: `${size}px`,
    color: color || '#6366f1',
    ...style
  };

  return (
    <IconComponent 
      className={className} 
      style={iconStyle}
    />
  );
};

export default Icon; 