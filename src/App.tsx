import React from 'react';
import { motion } from 'framer-motion';
import DemoReport from './components/DemoReport';
import LiveAnalysisDemo from './components/LiveAnalysisDemo';
import PainPointCard from './components/PainPointCard';
import InteractiveCaseStudy from './components/InteractiveCaseStudy';
import ROIShowcase from './components/ROIShowcase';
import AutoTabDemo from './components/AutoTabDemo';
import EnhancedPricingSection from './components/EnhancedPricingSection';
import FAQSection from './components/FAQSection';
import { AnimatedSection, AnimatedContainer, AnimatedItem } from './components/AnimatedSection';
import { PulseAnimation } from './components/AnimatedCounter';
import { AnimatedButton, AnimatedCard, FloatingActionButton } from './components/AnimatedButton';





function App() {

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
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
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
              <LiveAnalysisDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 区域2：痛点共鸣区 */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            你是否也曾因为一次错误的补货，<br />
            <span className="text-red-600">亏掉数万利润？</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            每一个亚马逊卖家都可能遇到这些痛点，一个错误的决策就可能让几个月的努力付之东流...
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                iconType: "painpoint-confused" as const,
                title: "凭感觉补货",
                description: "心里没底，夜夜难眠",
                details: [
                  "没有数据支撑，全凭经验判断",
                  "担心断货，又怕库存积压", 
                  "每次下单都是一次赌博",
                  "压力巨大，影响决策质量"
                ],
                impact: "决策失误率高达60%",
                color: "red" as const
              },
              {
                iconType: "painpoint-review" as const,
                title: "差评突然增多", 
                description: "不知源头，应对无力",
                details: [
                  "差评出现时已经来不及",
                  "不知道问题的根本原因",
                  "无法预判趋势走向",
                  "被动应对，损失巨大"
                ],
                impact: "销量可能瞬间归零",
                color: "orange" as const
              },
              {
                iconType: "painpoint-analysis" as const,
                title: "团队手动分析",
                description: "耗时耗力，效率低下", 
                details: [
                  "人工分析需要2-3天时间",
                  "员工成本高，准确性低",
                  "无法处理海量数据",
                  "分析结果主观性强"
                ],
                impact: "错过最佳决策时机",
                color: "yellow" as const
              },
              {
                iconType: "painpoint-lifecycle" as const,
                title: "爆款生命周期末期",
                description: "误判形势，库存积压",
                details: [
                  "无法判断产品生命周期",
                  "错误预估市场需求",
                  "库存周转率急剧下降",
                  "资金链面临巨大压力"
                ],
                impact: "库存积压损失惨重",
                color: "purple" as const
              }
            ].map((pain, index) => (
              <PainPointCard
                key={index}
                iconType={pain.iconType}
                title={pain.title}
                description={pain.description}
                details={pain.details}
                impact={pain.impact}
                color={pain.color}
                index={index}
              />
            ))}
          </div>

          {/* 真实案例警示 */}
          <InteractiveCaseStudy />
        </div>
      </AnimatedSection>

      {/* 区域3：解决方案区 */}
      <AnimatedSection className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            是时候改变了！隆重介绍：
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-indigo-600 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            "决胜单"——您的AI采购决策顾问
          </motion.h3>
          
          <ROIShowcase />
        </div>
      </AnimatedSection>

      {/* 区域4：原理揭秘区 */}
      <AnimatedSection className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              四位一体，揭秘"决胜单"如何为您保驾护航
            </h2>
          </motion.div>
          
          <AutoTabDemo />
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
      <EnhancedPricingSection />

      {/* 区域7：价值打包区 */}
      <AnimatedSection className="py-20 bg-white relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* 限时标签 */}
            <motion.div 
              className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="mr-2">⚡</span>
              限时赠送 · 仅此一次
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              今天下单，您将获得总价值超过
            </h2>
            
            {/* 总价值动画显示 */}
            <motion.div 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl md:text-6xl font-bold mb-2">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  ¥15,000
                </motion.span>
              </div>
              <div className="text-lg opacity-90">的超值大礼包！</div>
              
              {/* 节省金额对比 */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm opacity-80">您只需支付</div>
                    <div className="text-2xl font-bold text-yellow-300">¥3,999</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80">立即节省</div>
                    <div className="text-2xl font-bold text-green-300">¥11,001</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <AnimatedContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                title: "决胜单N8N Agent工作流模板", 
                value: "¥12,999", 
                special: false,
                icon: "🤖",
                description: "完整的AI决策工作流，即买即用"
              },
              { 
                title: "超详细部署视频教程", 
                value: "¥999", 
                special: false,
                icon: "📹",
                description: "保姆级教学，零基础也能轻松上手"
              },
              { 
                title: "30天部署问题专属技术支持", 
                value: "¥1,999", 
                special: false,
                icon: "🛠️",
                description: "专业技术团队一对一答疑解惑"
              },
              { 
                title: "专属VIP用户交流群永久席位", 
                value: "无价", 
                special: false,
                icon: "👥",
                description: "与行业大佬深度交流，拓展人脉"
              },
              { 
                title: "【天使合伙人专享】1对1在线部署指导", 
                value: "¥2,999", 
                special: true,
                icon: "⭐",
                description: "创始人亲自指导，手把手教学"
              }
            ].map((benefit, index) => (
              <AnimatedItem key={index}>
                <AnimatedCard 
                  className={`${
                    benefit.special 
                      ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-lg' 
                      : 'bg-white border border-gray-200 hover:border-indigo-300'
                  } rounded-xl p-6 h-full transition-all duration-300 group relative overflow-hidden`}
                  hoverScale={1.03}
                >
                  {/* 特殊标签 */}
                  {benefit.special && (
                    <motion.div 
                      className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      专享
                    </motion.div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    {/* 图标 */}
                    <motion.div 
                      className="text-3xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 className={`font-bold mb-2 ${benefit.special ? 'text-indigo-800' : 'text-gray-900'}`}>
                        {benefit.title}
                      </h4>
                      
                      <p className={`text-sm mb-3 ${benefit.special ? 'text-indigo-600' : 'text-gray-600'}`}>
                        {benefit.description}
                      </p>
                      
                      {/* 价值标签 */}
                      <motion.div 
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                          benefit.special 
                            ? 'bg-indigo-100 text-indigo-700' 
                            : 'bg-green-100 text-green-700'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        价值 {benefit.value}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* hover效果 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </AnimatedCard>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
          
          {/* 底部总结 */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                💰 超值回报，一次投资受益终身！
              </h3>
              <p className="text-gray-600">
                原价 ¥15,000 的完整解决方案，现在只需 ¥3,999，
                <span className="font-bold text-green-600">节省74%</span>，
                这样的机会不会再有第二次！
              </p>
            </div>
          </motion.div>
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
                className="w-32 h-32 rounded-full mx-auto lg:mx-0 mb-6 overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <img 
                  src="/founder-avatar.png" 
                  alt="资深亚马逊运营专家" 
                  className="w-full h-full object-cover"
                />
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
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              风险逆转 & 常见问题解答
            </h2>
          </motion.div>

          {/* 左右布局 */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 左侧：风险逆转和联系方式 */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* 郑重承诺 - 强化版 */}
              <AnimatedCard className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-300 rounded-xl p-6 shadow-lg overflow-hidden">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full opacity-20 -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-200 rounded-full opacity-20 translate-y-8 -translate-x-8"></div>
                
                <div className="relative text-center">
                  {/* 醒目的盾牌图标 */}
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4 shadow-lg"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 4px 20px rgba(34, 197, 94, 0.3)",
                        "0 6px 30px rgba(34, 197, 94, 0.5)",
                        "0 4px 20px rgba(34, 197, 94, 0.3)"
                      ]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  
                  {/* 强化标题 */}
                  <motion.h3 
                    className="text-xl font-bold text-green-800 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    💯 我们郑重承诺
                  </motion.h3>
                  
                  {/* 主要承诺文案 */}
                  <motion.div 
                    className="bg-white/70 backdrop-blur-sm border border-green-200 rounded-lg p-4 mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-green-800 font-semibold leading-relaxed">
                      购买后<span className="text-xl font-bold text-green-600">30天内</span>，
                      若因我们的模板或指导问题导致您无法成功部署，
                    </p>
                    <motion.p 
                      className="text-lg font-bold text-green-700 mt-2"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(34, 197, 94, 0)",
                          "0 0 10px rgba(34, 197, 94, 0.3)",
                          "0 0 0px rgba(34, 197, 94, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🔥 我们将全额退款！
                    </motion.p>
                  </motion.div>
                  
                  {/* 三大保证 */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: "🕒", title: "30天退款", desc: "无条件" },
                      { icon: "👨‍💻", title: "专业支持", desc: "1对1指导" },
                      { icon: "⚡", title: "零风险", desc: "100%保障" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/80 rounded-lg p-3 border border-green-200"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <div className="text-xl mb-1">{item.icon}</div>
                        <div className="text-sm font-bold text-green-800">{item.title}</div>
                        <div className="text-xs text-green-600">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* 信任标志 */}
                  <motion.div 
                    className="mt-4 pt-4 border-t border-green-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex justify-center items-center space-x-4 text-green-700">
                      <div className="flex items-center text-xs">
                        <span className="text-green-600 mr-1">🏆</span>
                        <span>8年信誉保证</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-green-600 mr-1">🔒</span>
                        <span>安全交易</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-green-600 mr-1">⭐</span>
                        <span>五星好评</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatedCard>

              {/* 联系方式 */}
              <AnimatedCard className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">还有其他问题？我们随时为您解答</h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    href="mailto:support@decision-win.com"
                    className="flex flex-col items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div className="font-medium text-sm">邮件咨询</div>
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    className="flex flex-col items-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <div className="font-medium text-sm">微信客服</div>
                  </motion.a>
                </div>
                
                {/* 联系信息 */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center space-y-1">
                    <div className="text-xs text-gray-600">邮箱：support@decision-win.com</div>
                    <div className="text-xs text-gray-600">微信：DecisionWin2024</div>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>

            {/* 右侧：FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <FAQSection variant="decision" defaultOpen="faq-decision-1" compact={true} />
            </motion.div>
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
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
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
