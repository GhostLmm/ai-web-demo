import React from 'react';
import { motion } from 'framer-motion';

const ROIShowcase: React.FC = () => {
  const roiData = [
    {
      metric: "¥50万/年",
      label: "人工成本节省",
      description: "决胜单的运营团队将5人分析团队缩减到1人监督，相较于传统人工分析方式。",
      icon: "💰",
      color: "text-green-600"
    },
    {
      metric: "90%",
      label: "时间节省",
      description: "决胜单的分析师将分析时间从2-3天缩短到3分钟，相较于传统手工分析方法。",
      icon: "⚡",
      color: "text-blue-600"
    },
    {
      metric: "200万+",
      label: "避免损失",
      description: "决胜单用户通过AI预警系统避免了重大库存积压，相较于依赖经验判断的传统方式。",
      icon: "🛡️",
      color: "text-red-600"
    }
  ];

  // 增加更多合作方
  const partners = [
    "深圳电商", "Anker", "广州3C", "东莞跨境", "杭州品牌",
    "小米生态链", "华强北电子", "义乌外贸", "苏州制造",
    "宁波贸易", "佛山家电", "中山灯具", "温州皮具",
    "福建鞋业", "江苏纺织", "上海时尚", "北京科技"
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* ROI标题 */}
      <div className="text-center mb-8">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          您无需在成本、时间和质量之间做出选择
        </motion.h3>
      </div>

      {/* ROI指标卡片 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {roiData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.4 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
          >
            {/* 图标 */}
            <motion.div 
              className="text-3xl mb-3"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
            </motion.div>
            
            {/* 指标数字 */}
            <motion.div 
              className={`text-3xl md:text-4xl font-bold mb-2 ${item.color}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {item.metric.includes('万') ? (
                <>
                  <span className="text-xl">¥</span>
                  {item.metric.replace('¥', '').replace('/年', '')}
                  <span className="text-sm">/年</span>
                </>
              ) : item.metric.includes('%') ? (
                <>
                  <span className="text-2xl">↑</span>
                  {item.metric}
                </>
              ) : (
                <>
                  <span className="text-lg">避损</span>
                  <span className="text-lg">¥</span>
                  {item.metric.replace('万+', '万+')}
                </>
              )}
            </motion.div>
            
            {/* 标签 */}
            <h4 className="text-base font-semibold text-gray-900 mb-2">
              {item.label}
            </h4>
            
            {/* 描述 */}
            <p className="text-xs text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 客户滚动展示 */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-500 mb-4 text-sm text-center">已有500+亚马逊卖家选择决胜单</p>
        
        {/* 滚动容器 */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-4"
            animate={{ x: [-1680, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* 第一组 */}
            {partners.map((company, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-700"
                whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                transition={{ duration: 0.2 }}
              >
                {company}
              </motion.div>
            ))}
            {/* 第二组（重复） */}
            {partners.map((company, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0 px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-700"
                whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                transition={{ duration: 0.2 }}
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ROIShowcase; 