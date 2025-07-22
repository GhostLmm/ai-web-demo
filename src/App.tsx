import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DemoReport from './components/DemoReport';
import { AnimatedSection, AnimatedContainer, AnimatedItem } from './components/AnimatedSection';
import { AnimatedCounter, AnimatedNumber, PulseAnimation } from './components/AnimatedCounter';
import { AnimatedButton, AnimatedCard, FloatingActionButton } from './components/AnimatedButton';

// 倒计时hook
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// 增强的模态框组件
const PaymentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h3 
                className="text-xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                完成支付
              </motion.h3>
              <motion.button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="bg-gray-100 p-8 rounded-lg mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-48 h-48 bg-gray-300 mx-auto flex items-center justify-center rounded">
                  <span className="text-gray-600">微信支付二维码</span>
                </div>
              </motion.div>
              <p className="text-sm text-gray-600 mb-4">
                请使用微信扫描上方二维码完成支付
              </p>
              <p className="text-xs text-gray-500">
                支付后请截图，并添加客服微信：<span className="font-bold">ai-sales-001</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingSeats, setRemainingSeats] = useState({
    angel: 3,
    early: 11,
    standard: 15
  });

  // 设置倒计时目标时间（72小时后）
  const targetDate = new Date(Date.now() + 72 * 60 * 60 * 1000);
  const timeLeft = useCountdown(targetDate);

  // 模拟剩余名额减少
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeats(prev => ({
        ...prev,
        angel: Math.max(0, prev.angel - Math.floor(Math.random() * 2)),
        early: Math.max(0, prev.early - Math.floor(Math.random() * 3)),
        standard: Math.max(0, prev.standard - Math.floor(Math.random() * 2))
      }));
    }, 30000); // 30秒更新一次

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <motion.nav 
        className="bg-white shadow-sm sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl font-bold text-indigo-600">决胜单</div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600">定价</a>
              <a href="#demo" className="text-gray-700 hover:text-indigo-600">演示</a>
              <AnimatedButton 
                onClick={() => setIsModalOpen(true)}
                variant="pulse"
                size="sm"
              >
                立即购买
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* 区域1：英雄首屏区 */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                #1 AI决策平台
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                告别采购赌博，<br />
                <span className="text-indigo-600">你的亚马逊专属</span><br />
                AI决策大脑
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                在下一次补货前，让"决胜单"Agent分析所有风险，用数据告诉你这批货到底该不该下单。
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <PulseAnimation>
                  <AnimatedButton 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="primary"
                    size="lg"
                  >
                    立即查看「限时团购」方案 →
                  </AnimatedButton>
                </PulseAnimation>
                <motion.div 
                  className="flex items-center text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <span className="mr-2">⭐</span>
                  <span>无需信用卡 • G2评分4.7/5</span>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AnimatedCard className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-4xl mb-4">📊</div>
                    <div className="text-gray-600">AI决策报告演示</div>
                  </motion.div>
                </div>
              </AnimatedCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 区域2：痛点共鸣区 */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            你是否也曾因为一次错误的补货，<br />亏掉数万利润？
          </motion.h2>
          
          <AnimatedContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { emoji: "😰", title: "凭感觉补货", desc: "心里没底，夜夜难眠" },
              { emoji: "😵", title: "差评突然增多", desc: "不知源头，应对无力" },
              { emoji: "⏰", title: "团队手动分析", desc: "耗时耗力，效率低下" },
              { emoji: "📉", title: "误判形势", desc: "库存积压，资金占用" }
            ].map((pain, index) => (
              <AnimatedItem key={index} className="p-6">
                <AnimatedCard className="h-full">
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {pain.emoji}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{pain.title}</h3>
                  <p className="text-gray-600">{pain.desc}</p>
                </AnimatedCard>
              </AnimatedItem>
            ))}
          </AnimatedContainer>

          <motion.div 
            className="bg-red-50 border-l-4 border-red-500 p-6 max-w-4xl mx-auto text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-bold text-red-800 mb-2">深圳卖家张总的教训：</h4>
            <p className="text-red-700">
              一款月销3000件的爆款，因未及时发现材料相关的差评增多，盲目追单5000件，
              最终导致差评爆发，链接被限制，库存价值30万的货砸在手里...
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 区域3：解决方案区 */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            是时候改变了！隆重介绍：
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-indigo-600 mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            "决胜单"——您的AI采购决策顾问
          </motion.h3>
          
          <AnimatedContainer className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "📊", title: "100%数据驱动", desc: "告别直觉，让每一个采购决策都有据可依" },
              { emoji: "🚨", title: "24/7风险预警", desc: "自动监控差评和痛点，在问题爆发前发出警报" },
              { emoji: "⚡", title: "90%效率提升", desc: "从数小时的人工分析，到3分钟的自动化报告" }
            ].map((feature, index) => (
              <AnimatedItem key={index}>
                <AnimatedCard className="bg-white rounded-xl p-8 shadow-lg h-full">
                  <motion.div 
                    className="text-5xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.emoji}
                  </motion.div>
                  <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </AnimatedCard>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </AnimatedSection>

      {/* 区域4：原理揭秘区 */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              四位一体，揭秘"决胜单"如何为您保驾护航
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedContainer className="space-y-8">
              {[
                { num: 1, title: "全域数据专员", desc: "自动抓取亚马逊前台数据、最新差评和Q&A" },
                { num: 2, title: "AI洞察分析师", desc: "利用大语言模型，深度分析和归纳差评背后的结构性问题与核心痛点" },
                { num: 3, title: "资深风险评估官", desc: "运行独家风险评估模型，量化\"落单风险\"，输出精准分数" },
                { num: 4, title: "首席汇报秘书", desc: "自动生成结构化、可视化的决策报告，并推送到您的微信或邮箱" }
              ].map((step, index) => (
                <AnimatedItem key={index} className="flex items-start space-x-4">
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span 
                      className="text-indigo-600 font-bold"
                      whileHover={{ color: "#ffffff" }}
                    >
                      {step.num}
                    </motion.span>
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
            
            <motion.div 
              className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="text-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-6xl mb-4">🤖</div>
                <div className="text-gray-600">AI工作流演示图</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* 区域5：案例展示区 */}
      <AnimatedSection id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              眼见为实：一份真实的"决胜单"分析报告
            </h2>
          </motion.div>
          
          <DemoReport />
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              报告解读说明
            </h3>
                         <AnimatedContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
               {[
                 { title: "风险分数", desc: "\"78分，风险可控，建议落单\"" },
                 { title: "差评关键词云", desc: "核心差评点：\"zipper breaks\"（拉链易坏）" },
                 { title: "决策建议", desc: "\"可下单，但建议与供应商沟通，升级拉链配件\"" }
               ].map((item, index) => (
                <AnimatedItem key={index} className="flex flex-col items-center">
                  <motion.div 
                    className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {index + 1}
                  </motion.div>
                  <div>
                    <div className="font-semibold mb-2">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 区域6：核心转化区 */}
      <section id="pricing" className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              加入我们，成为第一批用AI优化库存的聪明卖家
            </h2>
            <p className="text-xl text-indigo-200 mb-8">仅限本微信群</p>
            <p className="text-lg text-indigo-300 mb-8">阶梯团购，越早越优惠，名额售罄价格立即上涨！</p>
            
            {/* 倒计时器 */}
            <motion.div 
              className="bg-indigo-800 rounded-lg p-6 inline-block mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-lg font-semibold mb-4">距早鸟价结束仅剩：</div>
              <div className="flex space-x-4 text-center">
                {[
                  { value: timeLeft.days, label: "天" },
                  { value: timeLeft.hours, label: "时" },
                  { value: timeLeft.minutes, label: "分" },
                  { value: timeLeft.seconds, label: "秒" }
                ].map((time, index) => (
                  <div key={index} className="bg-white text-indigo-900 rounded-lg p-3 min-w-[80px]">
                    <AnimatedCounter 
                      value={time.value} 
                      className="text-2xl font-bold"
                    />
                    <div className="text-sm">{time.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* 价格方案 */}
          <AnimatedContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                title: "天使合伙人", 
                price: 3999, 
                original: 12999, 
                seats: remainingSeats.angel,
                available: remainingSeats.angel > 0 
              },
              { 
                title: "早鸟先锋", 
                price: 5999, 
                original: 12999, 
                seats: remainingSeats.early,
                available: remainingSeats.angel === 0 
              },
              { 
                title: "标准团购", 
                price: 7999, 
                original: 12999, 
                seats: remainingSeats.standard,
                available: false 
              }
            ].map((plan, index) => (
              <AnimatedItem key={index}>
                <AnimatedCard 
                  className="bg-white text-gray-900 rounded-2xl p-8 relative h-full"
                  hoverScale={1.05}
                >
                  {plan.seats <= 5 && plan.seats > 0 && (
                    <motion.div 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      仅剩{plan.seats}席
                    </motion.div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                    <div className="mb-4">
                      <motion.span 
                        className="text-4xl font-bold text-indigo-600"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        ¥{plan.price.toLocaleString()}
                      </motion.span>
                      <div className="text-sm text-gray-500">
                        原价 <span className="line-through">¥{plan.original.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-sm text-red-600 font-semibold mb-6">
                      剩余 <AnimatedNumber from={plan.seats + 5} to={plan.seats} duration={2} /> 席
                    </div>
                    <AnimatedButton
                      onClick={() => setIsModalOpen(true)}
                      disabled={!plan.available}
                      variant={plan.available ? "primary" : "secondary"}
                      className="w-full"
                    >
                      {plan.available ? "立即抢占" : plan.seats === 0 ? "已售罄" : "排队预定"}
                    </AnimatedButton>
                  </div>
                </AnimatedCard>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
          
          <motion.div 
            className="text-center mt-8 text-indigo-200 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            支付后请截图，并添加客服微信：<span className="font-bold text-white">ai-sales-001</span>
          </motion.div>
        </div>
      </section>

      {/* 区域7：价值打包区 */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              今天下单，您将获得总价值超过 <span className="text-indigo-600">¥15,000</span> 的大礼包！
            </h2>
          </motion.div>
          
          <AnimatedContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "决胜单N8N Agent工作流模板", value: "¥12,999", special: false },
              { title: "超详细部署视频教程", value: "¥999", special: false },
              { title: "30天部署问题专属技术支持", value: "¥1,999", special: false },
              { title: "专属VIP用户交流群永久席位", value: "无价", special: false },
              { title: "【天使合伙人专享】1对1在线部署指导", value: "¥2,999", special: true }
            ].map((benefit, index) => (
              <AnimatedItem key={index}>
                <AnimatedCard 
                  className={`${benefit.special ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-gray-50'} rounded-lg p-6 flex items-start space-x-4 h-full`}
                  hoverScale={1.02}
                >
                  <motion.div 
                    className={`${benefit.special ? 'text-indigo-500' : 'text-green-500'} text-xl`}
                    whileHover={{ scale: 1.2 }}
                  >
                    ✓
                  </motion.div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${benefit.special ? 'text-indigo-800' : ''}`}>
                      {benefit.title}
                    </h4>
                    <p className={`text-sm ${benefit.special ? 'text-indigo-600' : 'text-gray-600'}`}>
                      价值 {benefit.value}
                    </p>
                  </div>
                </AnimatedCard>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </AnimatedSection>

      {/* 区域8：信任背书区 */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              我是谁？为什么你可以信任我？
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-32 h-32 bg-gray-300 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <span className="text-2xl">👨‍💻</span>
              </motion.div>
              <h3 className="text-xl font-bold mb-4">资深亚马逊运营专家</h3>
              <p className="text-gray-600 mb-6">
                我是一个在深圳奋斗了8年的亚马逊老兵。我踩过你踩过的所有坑，
                从月销几万到月销千万，从一个人单打独斗到带领50人团队，
                也因此萌生了开发这款工具的想法...
              </p>
              
              <AnimatedContainer className="space-y-4">
                {[
                  "8年亚马逊实战经验",
                  "服务过500+亚马逊卖家", 
                  "累计为客户节省成本超过1000万"
                ].map((achievement, index) => (
                  <AnimatedItem key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                    <motion.span 
                      className="text-indigo-600"
                      whileHover={{ scale: 1.2 }}
                    >
                      ✓
                    </motion.span>
                    <span>{achievement}</span>
                  </AnimatedItem>
                ))}
              </AnimatedContainer>
            </motion.div>
            
            <AnimatedContainer className="space-y-6">
              {[
                {
                  avatar: "A",
                  color: "blue",
                  text: "这个工具太棒了，简直是我们采购部门的福音！一个月就为我们避免了一次20万的错误补货。",
                  author: "深圳某头部卖家 产品经理"
                },
                {
                  avatar: "B", 
                  color: "green",
                  text: "从手动分析到AI自动化，效率提升了10倍不止，现在团队可以专注于更重要的战略决策。",
                  author: "杭州某跨境电商 运营总监"
                }
              ].map((testimonial, index) => (
                <AnimatedItem key={index}>
                  <AnimatedCard className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className={`w-12 h-12 bg-${testimonial.color}-100 rounded-full flex items-center justify-center`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className={`text-${testimonial.color}-600 font-bold`}>
                          {testimonial.avatar}
                        </span>
                      </motion.div>
                      <div>
                        <p className="text-gray-700 mb-2">{testimonial.text}</p>
                        <div className="text-sm text-gray-500">— {testimonial.author}</div>
                      </div>
                    </div>
                  </AnimatedCard>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* 区域9：风险逆转区 & FAQ */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 零风险承诺 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatedCard className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <motion.div 
                className="text-green-600 text-4xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🛡️
              </motion.div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">我们郑重承诺</h3>
              <p className="text-green-700 text-lg">
                购买后30天内，若因我们的模板或指导问题导致您无法成功部署，我们将全额退款！
              </p>
            </AnimatedCard>
          </motion.div>
          
          {/* FAQ */}
          <div className="max-w-4xl mx-auto">
            <motion.h3 
              className="text-2xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              常见问题解答
            </motion.h3>
            
            <AnimatedContainer className="space-y-6">
              {[
                {
                  q: "我是技术小白，能用吗？",
                  a: "当然！我们的视频教程是保姆级的，并且提供30天支持，保证您能用上。"
                },
                {
                  q: "购买后还有其他费用吗？",
                  a: "本工具是一次性付费。但您需要自备N8N环境、OpenAI API Key等，这些第三方服务的费用需要您自行承担。"
                },
                {
                  q: "我的数据安全吗？",
                  a: "绝对安全。整个工具部署在您自己的N8N服务器上，所有数据都在您本地处理，我们不触碰您的任何业务数据。"
                },
                {
                  q: "支持哪些电商平台？",
                  a: "目前主要支持亚马逊美国站，后续会逐步支持其他站点和平台。"
                }
              ].map((faq, index) => (
                <AnimatedItem key={index}>
                  <AnimatedCard className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold mb-2">Q: {faq.q}</h4>
                    <p className="text-gray-600">A: {faq.a}</p>
                  </AnimatedCard>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* 区域10：最终号召区 */}
      <AnimatedSection className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            最后的机会
          </motion.h2>
          <motion.p 
            className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            一次错误的补货决策，损失的可能就是几万甚至几十万。而今天，只需一笔小小的投资，
            就能拥有一个永不疲倦的AI决策大脑。
          </motion.p>
          <motion.p 
            className="text-lg text-indigo-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            天使合伙人席位即将售罄，价格马上上涨。立即行动，锁定骨折优惠！
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <PulseAnimation intensity={1.1}>
              <AnimatedButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                size="lg"
                className="bg-white text-indigo-900 hover:bg-gray-100"
              >
                立即抢占最后席位，告别采购赌博！
              </AnimatedButton>
            </PulseAnimation>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-2xl font-bold text-indigo-400 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            决胜单
          </motion.div>
          <p className="text-gray-400 mb-4">
            让AI为您的每一个采购决策保驾护航
          </p>
          <p className="text-sm text-gray-500">
            © 2024 决胜单AI. 保留所有权利
          </p>
        </motion.div>
      </footer>

      {/* 支付模态框 */}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 浮动按钮 */}
      <FloatingActionButton 
        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
      >
        💰
      </FloatingActionButton>
    </div>
  );
}

export default App;
