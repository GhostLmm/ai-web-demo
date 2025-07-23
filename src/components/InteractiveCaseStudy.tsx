import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard } from './AnimatedButton';
import Icon from './Icon';

const InteractiveCaseStudy: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <AnimatedCard className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 简洁版本 - 默认显示 */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-1 h-12 bg-indigo-600 mr-4"></div>
              <div className="flex items-center">
                <Icon type="case-warning" color="#ef4444" size={24} />
                <div className="ml-3">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">真实案例警示</h4>
                  <p className="text-gray-600 text-sm">深圳某知名电商公司案例</p>
                </div>
              </div>
            </div>
            <motion.div 
              className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              损失¥30万
            </motion.div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              一款月销<span className="font-bold text-indigo-600">3000件</span>的爆款产品，
              因<span className="font-bold text-red-600">未及时发现差评趋势</span>，
              盲目追单<span className="font-bold text-orange-600">5000件</span>，
              最终导致<span className="font-bold text-red-600">¥30万库存积压</span>...
            </p>
          </div>

          {/* 交互提示区域 */}
          <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-3"
              >
                <Icon type="expand-hint" color="#4f46e5" size={18} />
              </motion.div>
              <div>
                <p className="font-semibold text-indigo-800">
                  {isExpanded ? '收起详细故事' : '查看完整故事时间线'}
                </p>
                <p className="text-sm text-indigo-600">
                  {isExpanded ? '简化显示案例概要' : '了解30万损失是如何发生的'}
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? '收起' : '展开'}
            </motion.button>
          </div>
        </div>

        {/* 详细内容 - 展开显示 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 border-t border-gray-100">
                <div className="grid lg:grid-cols-3 gap-8 mt-8">
                  
                  {/* 左侧：详细时间线 */}
                  <div className="lg:col-span-2">
                    <h5 className="font-semibold text-gray-900 mb-6 flex items-center">
                      <Icon type="pain-indicator" color="#4f46e5" size={20} />
                      <span className="ml-2">详细事件时间线</span>
                    </h5>
                    
                    <div className="space-y-6">
                      {[
                        { 
                          week: "第1周", 
                          event: "产品表现优异", 
                          detail: "月销3000件，BSR排名稳定，客户反馈良好",
                          color: "bg-green-500",
                          bgColor: "bg-green-50"
                        },
                        { 
                          week: "第2周", 
                          event: "差评开始出现", 
                          detail: "材料相关差评从2%上升到8%，但被其他好评掩盖",
                          color: "bg-yellow-500",
                          bgColor: "bg-yellow-50"
                        },
                        { 
                          week: "第3周", 
                          event: "盲目决策追单", 
                          detail: "看到销量还在增长，决定追加5000件订单，投入资金30万",
                          color: "bg-orange-500",
                          bgColor: "bg-orange-50"
                        },
                        { 
                          week: "第4周", 
                          event: "危机全面爆发", 
                          detail: "差评率激增至25%，链接被限制，5000件库存全部积压",
                          color: "bg-red-500",
                          bgColor: "bg-red-50"
                        }
                      ].map((step, index) => (
                        <motion.div 
                          key={index}
                          className={`p-4 rounded-lg ${step.bgColor} border border-opacity-20`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-4 h-4 rounded-full ${step.color} mt-1 flex-shrink-0`}></div>
                            <div className="flex-1">
                              <h6 className="font-semibold text-gray-900 mb-1">{step.week}：{step.event}</h6>
                              <p className="text-sm text-gray-700">{step.detail}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* 右侧：数据可视化 */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-center mb-4">
                      <Icon type="painpoint-lifecycle" color="#6b7280" size={20} />
                      <h5 className="font-semibold text-gray-900 ml-2">关键数据</h5>
                    </div>
                    
                    {/* 损失金额 */}
                    <div className="text-center mb-6">
                      <motion.div 
                        className="text-3xl font-bold text-red-600 mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ¥30万
                      </motion.div>
                      <p className="text-sm text-gray-600">总损失金额</p>
                    </div>

                    {/* 数据指标 */}
                    <div className="space-y-4">
                      {[
                        { label: "原月销量", value: "3000件", trend: "up" },
                        { label: "追加订单", value: "+5000件", trend: "neutral" },
                        { label: "积压库存", value: "5000件", trend: "down" },
                        { label: "差评率变化", value: "2% → 25%", trend: "down" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex justify-between items-center p-3 bg-white rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <span className="text-sm text-gray-600">{item.label}</span>
                          <span className={`font-semibold ${
                            item.trend === 'up' ? 'text-green-600' :
                            item.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {item.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* AI对比 */}
                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex items-center mb-2">
                        <Icon type="case-warning" color="#4f46e5" size={16} />
                        <h6 className="font-semibold text-indigo-800 ml-2">如果使用决胜单AI</h6>
                      </div>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• 第2周即可识别差评趋势</li>
                        <li>• 提前预警材料问题</li>
                        <li>• 避免¥30万损失</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedCard>
    </motion.div>
  );
};

export default InteractiveCaseStudy; 