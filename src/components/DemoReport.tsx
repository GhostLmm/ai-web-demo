import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from './AnimatedCounter';

const DemoReport = () => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 报告头部 */}
      <motion.div 
        className="border-b-2 border-gray-100 pb-6 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <motion.h3 
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            AI决策分析报告
          </motion.h3>
          <motion.div 
            className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            风险分数: <AnimatedNumber from={0} to={78} duration={2} />分
          </motion.div>
        </div>
        <motion.div 
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          产品ASIN: B08X9QYN7K • 分析时间: 2024-01-15 14:30
        </motion.div>
      </motion.div>

      {/* 风险评估 */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <motion.span 
            className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm mr-3"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            1
          </motion.span>
          风险评估
        </h4>
        <motion.div 
          className="bg-green-50 border border-green-200 rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">整体风险等级</span>
            <motion.span 
              className="bg-green-500 text-white px-3 py-1 rounded-full text-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              可控
            </motion.span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="bg-green-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <motion.div 
            className="text-sm text-gray-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            建议: 可以下单，但需注意产品质量控制
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 差评分析 */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <motion.span 
            className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm mr-3"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            2
          </motion.span>
          差评关键词分析
        </h4>
        <div className="space-y-3">
          <motion.div 
            className="flex flex-wrap gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1.0
                }
              }
            }}
          >
            {[
              { text: "zipper breaks (15次)", color: "red" },
              { text: "color fading (8次)", color: "yellow" },
              { text: "size issue (5次)", color: "orange" },
              { text: "poor quality (12次)", color: "blue" }
            ].map((tag, index) => (
              <motion.span
                key={index}
                className={`bg-${tag.color}-100 text-${tag.color}-800 px-3 py-2 rounded-lg text-sm font-medium`}
                variants={{
                  hidden: { opacity: 0, scale: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 200 }
                  }
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tag.text}
              </motion.span>
            ))}
          </motion.div>
          <motion.div 
            className="text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            主要问题集中在拉链质量上，建议联系供应商改进材料
          </motion.div>
        </div>
      </motion.div>

      {/* 趋势分析 */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <motion.span 
            className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm mr-3"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            3
          </motion.span>
          销售趋势
        </h4>
        <motion.div 
          className="grid grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 1.2
              }
            }
          }}
        >
          {[
            { value: "↗ +", number: 15, suffix: "%", label: "月销量增长", color: "green" },
            { value: "", number: 4.2, suffix: "★", label: "平均评分", color: "blue" },
            { value: "", number: 3.2, suffix: "%", label: "差评率", color: "orange" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div className={`text-2xl font-bold text-${stat.color}-600`}>
                {stat.value}
                <AnimatedNumber 
                  from={0} 
                  to={stat.number} 
                  duration={2} 
                  suffix={stat.suffix}
                />
              </motion.div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 最终建议 */}
      <motion.div 
        className="bg-indigo-50 border border-indigo-200 rounded-lg p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.h4 
          className="text-lg font-semibold mb-3 flex items-center text-indigo-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <motion.i 
            className="fas fa-lightbulb mr-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ delay: 2, duration: 0.5 }}
          />
          AI决策建议
        </motion.h4>
        <motion.div 
          className="space-y-2 text-sm"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 1.8
              }
            }
          }}
        >
          {[
            { icon: "✓", color: "green", text: "建议下单，该产品销售趋势良好" },
            { icon: "⚠", color: "yellow", text: "重点关注拉链质量，建议与供应商讨论升级方案" },
            { icon: "💡", color: "blue", text: "可考虑适度增加库存，预期需求会继续增长" }
          ].map((suggestion, index) => (
            <motion.div 
              key={index}
              className="flex items-start"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.5 }
                }
              }}
              whileHover={{ x: 5 }}
            >
              <span className={`text-${suggestion.color}-500 mr-2`}>{suggestion.icon}</span>
              <span>{suggestion.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DemoReport; 