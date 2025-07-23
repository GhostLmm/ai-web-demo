import React from 'react';
import { motion } from 'framer-motion';

const CaseStudyCard: React.FC = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 max-w-5xl mx-auto shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* 案例标题 */}
      <motion.div 
        className="flex items-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-1 h-8 bg-red-500 mr-4"></div>
        <div>
          <h4 className="text-xl font-bold text-red-800 mb-1">💸 真实案例警示</h4>
          <p className="text-red-600 text-sm">深圳某知名电商公司 · 张总（化名）</p>
        </div>
      </motion.div>

      {/* 案例内容网格 */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* 左侧：故事描述 */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h5 className="font-semibold text-gray-900 mb-4">事件回顾：</h5>
            <p className="text-gray-700 leading-relaxed mb-6">
              一款月销<span className="font-bold text-green-600">3000件</span>的爆款产品，
              张总因<span className="font-bold text-red-600">未及时发现材料相关的差评增多</span>，
              在没有深度分析的情况下，盲目追加订单<span className="font-bold text-blue-600">5000件</span>。
              最终导致差评大面积爆发，产品链接被平台限制，
              <span className="font-bold text-red-600">库存价值30万的货物积压</span>，
              资金链几乎断裂...
            </p>
          </motion.div>

          {/* 时间线 */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h5 className="font-semibold text-gray-900 mb-4">事件时间线：</h5>
            <div className="space-y-4">
              {[
                { time: "第1周", event: "产品热销，月销3000件", color: "bg-green-500" },
                { time: "第2周", event: "差评开始增多，但未重视", color: "bg-yellow-500" },
                { time: "第3周", event: "盲目决策，追加5000件订单", color: "bg-orange-500" },
                { time: "第4周", event: "差评爆发，链接被限制", color: "bg-red-500" }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className={`w-3 h-3 rounded-full ${step.color}`}></div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">{step.time}：</span>
                    <span className="text-gray-700">{step.event}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 右侧：数据可视化 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <h5 className="font-semibold text-gray-900 mb-4 text-center">💰 损失统计</h5>
            
            {/* 损失金额展示 */}
            <div className="text-center mb-6">
              <motion.div 
                className="text-4xl font-bold text-red-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ¥30万
              </motion.div>
              <p className="text-sm text-gray-600">库存积压损失</p>
            </div>

            {/* 数据对比 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">月销量</span>
                <span className="font-semibold">3000件 → 0件</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">追加订单</span>
                <span className="font-semibold text-blue-600">+5000件</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">积压库存</span>
                <span className="font-semibold text-red-600">5000件</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">资金占用</span>
                <span className="font-semibold text-red-600">¥30万</span>
              </div>
            </div>

            {/* 风险指标 */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-red-800">风险等级</span>
                <span className="text-lg font-bold text-red-600">危险 ⚠️</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2">
                <motion.div 
                  className="bg-red-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 1 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 底部警示 */}
      <motion.div 
        className="mt-8 p-4 bg-red-100 rounded-lg border border-red-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center">
          <span className="text-2xl mr-3">😱</span>
          <div>
            <p className="font-semibold text-red-800">如果有"决胜单"AI分析...</p>
            <p className="text-red-700 text-sm">
              第2周就能发现差评趋势，及时止损，避免30万损失！
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyCard; 