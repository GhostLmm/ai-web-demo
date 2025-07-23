import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton, AnimatedCard } from './AnimatedButton';
import { AnimatedCounter, AnimatedNumber } from './AnimatedCounter';

// 倒计时hook
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUrgent: false
  });

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // 最后24小时标记为紧急
      const totalHoursLeft = days * 24 + hours;
      
      return {
        days,
        hours,
        minutes,
        seconds,
        isUrgent: totalHoursLeft <= 24
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isUrgent: true };
    }
  }, [targetDate]);

  useEffect(() => {
    // 立即执行一次计算
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};

// 支付弹窗组件
const PaymentModal = ({ isOpen, onClose, selectedPlan }: { 
  isOpen: boolean; 
  onClose: () => void; 
  selectedPlan: any;
}) => {
  const [copied, setCopied] = useState(false);
  
  const copyWechatId = () => {
    navigator.clipboard.writeText('DecisionAI2024');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
                  <motion.div
          className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl"
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头部 */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">微信扫码支付</h3>
              <p className="text-sm text-gray-600">
                ¥{selectedPlan?.price?.toLocaleString()}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 二维码 */}
          <div className="text-center mb-4">
            <motion.div
              className="bg-gray-50 rounded-lg p-4 mb-3"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <img
                src="/q.webp"
                alt="支付二维码"
                className="w-40 h-40 mx-auto rounded-lg"
              />
            </motion.div>
          </div>

          {/* 客服微信 */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">支付后添加客服微信</p>
                <p className="font-bold">DecisionAI2024</p>
              </div>
              <motion.button
                onClick={copyWechatId}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  copied 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? '已复制!' : '复制'}
              </motion.button>
            </div>
          </div>

          {/* 底部按钮 */}
          <motion.button
            className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              alert('请完成支付后联系客服！');
              onClose();
            }}
          >
            已完成支付
          </motion.button>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 实时购买提示组件
const PurchaseAlert = ({ show, purchaser }: { show: boolean; purchaser: string }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-40 max-w-sm"
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="flex items-center">
            <span className="text-green-600 mr-2">🎉</span>
            <div>
              <p className="text-sm font-medium">
                {purchaser} 刚刚抢购成功！
              </p>
              <p className="text-xs text-green-600">名额所剩无几</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EnhancedPricingSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);
  const [currentPurchaser, setCurrentPurchaser] = useState('');

  // 动态名额管理
  const [seats, setSeats] = useState({
    angel: 50,
    early: 0, // 不显示数量，显示预约中
    standard: 0 // 不显示数量，显示预约中
  });

  // 闪烁状态
  const [flashingTier, setFlashingTier] = useState<string | null>(null);

  // 设置倒计时目标时间（72小时后），并确保它只被计算一次
  const [targetDate] = useState(() => new Date(Date.now() + 72 * 60 * 60 * 1000));
  const timeLeft = useCountdown(targetDate);

  // 购买者名单
  const purchasers = [
    '深圳张总', '杭州李总', '广州王总', '北京刘总', '上海陈总',
    '苏州赵总', '宁波周总', '青岛吴总', '成都郑总', '武汉钱总'
  ];

  // 模拟名额减少和购买提示
  useEffect(() => {
    let reductionCount = 0;
    const maxReductions = 48; // 从50减到2，需要减48次
    
    const reduceSeats = () => {
      if (reductionCount >= maxReductions) return;
      
      setSeats(prev => {
        if (prev.angel <= 2) return prev; // 停留在2
        
        const newSeats = { ...prev };
        newSeats.angel = prev.angel - 1;
        
        // 触发闪烁效果
        setFlashingTier('angel');
        setTimeout(() => setFlashingTier(null), 800);
        
        // 显示购买提示
        const randomPurchaser = purchasers[Math.floor(Math.random() * purchasers.length)];
        setCurrentPurchaser(randomPurchaser);
        setShowPurchaseAlert(true);
        setTimeout(() => setShowPurchaseAlert(false), 3500);
        
        reductionCount++;
        return newSeats;
      });
      
      // 动态间隔：开始快，后面慢
      const progress = reductionCount / maxReductions;
      let nextInterval;
      
      if (progress < 0.3) {
        // 前30%：快速减少 (2-5秒)
        nextInterval = 2000 + Math.random() * 3000;
      } else if (progress < 0.7) {
        // 中间40%：中等速度 (5-12秒)
        nextInterval = 5000 + Math.random() * 7000;
      } else {
        // 后30%：慢速减少 (12-25秒)
        nextInterval = 12000 + Math.random() * 13000;
      }
      
      if (reductionCount < maxReductions) {
        setTimeout(reduceSeats, nextInterval);
      }
    };
    
    // 延迟3秒开始第一次减少
    const initialTimer = setTimeout(reduceSeats, 3000);
    
    return () => clearTimeout(initialTimer);
  }, []);

  const handlePurchase = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const pricingPlans = [
    {
      id: 'angel',
      title: '天使合伙人',
      price: 3999,
      originalPrice: 12999,
      discount: '6.9折',
      savings: 9000,
      seats: seats.angel,
      isPopular: true,
      showSeats: true,
      features: [
        '决胜单完整工作流',
        '1对1部署指导',
        '专属VIP群',
        '优先技术支持',
        '终身免费更新'
      ],
      available: seats.angel > 2
    },
    {
      id: 'early',
      title: '早鸟先锋',
      price: 5999,
      originalPrice: 12999,
      discount: '7.7折',
      savings: 7000,
      seats: seats.early,
      showSeats: false,
      features: [
        '决胜单完整工作流',
        '视频部署教程',
        'VIP用户群',
        '30天技术支持'
      ],
      available: false
    },
    {
      id: 'standard',
      title: '标准团购',
      price: 7999,
      originalPrice: 12999,
      discount: '8.3折',
      savings: 5000,
      seats: seats.standard,
      showSeats: false,
      features: [
        '决胜单完整工作流',
        '文档部署指南',
        '用户交流群',
        '基础技术支持'
      ],
      available: false
    }
  ];

  return (
    <section id="pricing" className="py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 标题区域 */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            加入我们，成为第一批用AI优化库存的聪明卖家
          </motion.h2>
          <motion.p 
            className="text-lg text-indigo-200 mb-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            仅限本微信群
          </motion.p>
          <motion.p 
            className="text-base text-indigo-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            阶梯团购，越早越优惠，名额售罄价格立即上涨！
          </motion.p>
          
          {/* 紧急提示 */}
          <motion.div
            className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="mr-2">⚠️</span>
            已有 {450 + (50 - seats.angel)} 人抢购，名额告急！
          </motion.div>
        </motion.div>

        {/* 倒计时器 */}
        <motion.div 
          className={`text-center mb-6 ${timeLeft.isUrgent ? 'animate-pulse' : ''}`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className={`inline-block rounded-xl p-4 ${
            timeLeft.isUrgent 
              ? 'bg-red-600 shadow-xl shadow-red-500/50' 
              : 'bg-gradient-to-r from-indigo-800 to-purple-800'
          } backdrop-blur-sm`}>
            <div className="text-base font-semibold mb-3">
              {timeLeft.isUrgent ? '🔥 最后冲刺！距结束仅剩：' : '距早鸟价结束仅剩：'}
            </div>
            <div className="flex space-x-3 text-center">
              {[
                { value: timeLeft.days, label: "天" },
                { value: timeLeft.hours, label: "时" },
                { value: timeLeft.minutes, label: "分" },
                { value: timeLeft.seconds, label: "秒" }
              ].map((time, index) => (
                <motion.div 
                  key={index} 
                  className={`min-w-[70px] ${
                    timeLeft.isUrgent ? 'bg-white text-red-600' : 'bg-white text-indigo-900'
                  } rounded-lg p-3 shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-2xl font-bold mb-1"
                    key={time.value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(time.value).padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs font-medium">{time.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 价格方案 */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative ${
                flashingTier === plan.id ? 'animate-pulse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {/* 热门标签 */}
              {plan.isPopular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🔥 最受欢迎
                  </div>
                </motion.div>
              )}

              {/* 稀缺提示 */}
              {plan.seats <= 5 && plan.seats > 0 && (
                <motion.div
                  className="absolute -top-3 right-4 z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    仅剩 {plan.seats} 席！
                  </div>
                </motion.div>
              )}

              <AnimatedCard
                className={`h-full bg-white text-gray-900 rounded-2xl p-8 relative overflow-hidden flex flex-col ${
                  plan.isPopular ? 'ring-4 ring-yellow-400 shadow-2xl' : 'shadow-xl'
                } ${flashingTier === plan.id ? 'ring-4 ring-red-500' : ''}`}
                hoverScale={1.02}
              >
                {/* 背景装饰 */}
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 ${
                  plan.isPopular ? 'bg-yellow-400' : 'bg-indigo-400'
                } rounded-full -mr-16 -mt-16`}></div>

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* 方案标题 */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        plan.isPopular 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {plan.discount}
                      </span>
                      <span className="text-green-600 font-bold text-sm">
                        立省 ¥{plan.savings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 价格 */}
                  <div className="text-center mb-4">
                    <div className="flex items-baseline justify-center mb-1">
                      <span className="text-sm text-gray-500 mr-1">¥</span>
                      <motion.span 
                        className="text-4xl font-bold text-indigo-600"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      >
                        {plan.price.toLocaleString()}
                      </motion.span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      原价 <span className="line-through">¥{plan.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 剩余名额 */}
                  <div className="text-center mb-4 h-8 flex items-center justify-center">
                    {plan.showSeats ? (
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        plan.seats <= 5 
                          ? 'bg-red-100 text-red-800' 
                          : plan.seats <= 10 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        剩余 
                        <AnimatedNumber 
                          from={plan.seats + 3} 
                          to={plan.seats} 
                          duration={1}
                          className="mx-1 font-bold"
                        />
                        席
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                        ⏳ 排队预定中
                      </div>
                    )}
                  </div>

                  {/* 功能列表 */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      >
                        <span className="text-green-500 mr-3 mt-0.5 flex-shrink-0">✓</span>
                        <span className="flex-1">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* 购买按钮 */}
                  <div className="mt-auto">
                    <AnimatedButton
                      onClick={() => handlePurchase(plan)}
                      disabled={!plan.available}
                      className={`w-full py-4 px-6 text-base font-bold rounded-xl transition-all duration-300 ${
                        plan.available
                          ? plan.isPopular
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      } flex items-center justify-center text-center`}
                    >
                      {plan.seats === 0 ? (
                        '🔒 已抢完'
                      ) : plan.available ? (
                        plan.isPopular ? '🚀 立即抢占' : '📦 立即购买'
                      ) : (
                        '⏳ 排队预定'
                      )}
                    </AnimatedButton>
                    
                    {!plan.available && !plan.showSeats && (
                      <p className="text-xs text-center text-gray-500 mt-2">
                        等待前序方案售罄后开放
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>

        {/* 底部说明 */}
        <motion.div 
          className="text-center mt-6 space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <h4 className="font-bold mb-2">💡 购买说明</h4>
            <div className="text-sm text-indigo-200 space-y-1">
              <p>• 支付后添加客服微信：<span className="font-bold text-white">DecisionAI2024</span></p>
              <p>• 客服拉您进入专属群并安排部署</p>
              <p>• 30天内无条件退款保障</p>
            </div>
          </div>
          
          <motion.p 
            className="text-indigo-300 text-xs"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🔒 SSL加密支付 • 💳 支持微信/支付宝 • 📱 24小时客服响应
          </motion.p>
        </motion.div>
      </div>

      {/* 支付弹窗 */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />

      {/* 购买提示 */}
      <PurchaseAlert 
        show={showPurchaseAlert}
        purchaser={currentPurchaser}
      />
    </section>
  );
};

export default EnhancedPricingSection; 