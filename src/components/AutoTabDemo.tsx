import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface AgentTab {
  id: number;
  title: string;
  description: string;
  demoSteps: string[];
  color: string;
  icon: string;
}

const AutoTabDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const tabSwitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const agents: AgentTab[] = useMemo(() => [
    {
      id: 1,
      title: "全域数据专员",
      description: "自动抓取亚马逊前台数据、最新差评和Q&A",
      demoSteps: [
        "连接亚马逊API...",
        "抓取产品基础信息...",
        "获取最新差评数据...",
        "收集Q&A问答...",
        "数据抓取完成 ✓"
      ],
      color: "blue",
      icon: "painpoint-lifecycle"
    },
    {
      id: 2,
      title: "AI洞察分析师",
      description: "利用大语言模型，深度分析和归纳差评背后的结构性问题与核心痛点",
      demoSteps: [
        "启动AI分析引擎...",
        "处理差评文本内容...",
        "识别关键问题模式...",
        "归纳核心痛点...",
        "生成洞察报告 ✓"
      ],
      color: "purple",
      icon: "painpoint-analysis"
    },
    {
      id: 3,
      title: "资深风险评估官",
      description: "运行独家风险评估模型，量化\"落单风险\"，输出精准分数",
      demoSteps: [
        "加载风险评估模型...",
        "计算基础风险分数...",
        "分析趋势变化...",
        "综合评估权重...",
        "输出风险分数: 78分 ✓"
      ],
      color: "red",
      icon: "painpoint-review"
    },
    {
      id: 4,
      title: "首席汇报秘书",
      description: "自动生成结构化、可视化的决策报告，并推送到您的微信或邮箱",
      demoSteps: [
        "整合分析结果...",
        "生成可视化图表...",
        "格式化决策报告...",
        "推送至微信/邮箱...",
        "报告发送成功 ✓"
      ],
      color: "green",
      icon: "painpoint-confused"
    }
  ], []);

  // 清理所有定时器
  const clearTimers = useCallback(() => {
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    if (tabSwitchTimeoutRef.current) {
      clearTimeout(tabSwitchTimeoutRef.current);
      tabSwitchTimeoutRef.current = null;
    }
  }, []);

  // 开始演示
  const startDemo = useCallback((tabIndex: number = activeTab) => {
    clearTimers();
    
    if (!isPlaying) return;
    
    setCurrentStep(0);
    
    stepIntervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        const maxSteps = agents[tabIndex].demoSteps.length - 1;
        if (prev < maxSteps) {
          return prev + 1;
        } else {
          // 当前tab演示完成，等待2秒后切换到下一个tab
          if (stepIntervalRef.current) {
            clearInterval(stepIntervalRef.current);
            stepIntervalRef.current = null;
          }
          
          tabSwitchTimeoutRef.current = setTimeout(() => {
            setActiveTab(prevTab => {
              const nextTab = (prevTab + 1) % agents.length;
              // 开始下一个tab的演示
              setTimeout(() => startDemo(nextTab), 100);
              return nextTab;
            });
          }, 2000); // 演示完成后等待2秒再切换
          
          return prev;
        }
      });
    }, 1800); // 每1.8秒执行一步，给更多时间展示内容
  }, [activeTab, isPlaying, agents, clearTimers]);

  // 手动切换tab
  const handleTabClick = useCallback((index: number) => {
    clearTimers();
    setActiveTab(index);
    setCurrentStep(0);
    setIsPlaying(true);
    
    // 延迟开始新的演示，确保状态更新完成
    setTimeout(() => {
      startDemo(index);
    }, 200);
  }, [clearTimers, startDemo]);

  // 控制播放/暂停
  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      clearTimers();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startDemo(activeTab);
    }
  }, [isPlaying, activeTab, clearTimers, startDemo]);

  // 初始化和清理
  useEffect(() => {
    if (isPlaying) {
      // 延迟开始第一个演示
      const initTimer = setTimeout(() => {
        startDemo(0);
      }, 1000);
      
      return () => clearTimeout(initTimer);
    }
  }, [isPlaying, startDemo]); // 依赖 isPlaying 和 startDemo

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-600',
        accent: 'bg-blue-500',
        gradient: 'from-blue-600 to-cyan-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-500',
        text: 'text-purple-600',
        accent: 'bg-purple-500',
        gradient: 'from-purple-600 to-pink-600'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-600',
        accent: 'bg-red-500',
        gradient: 'from-red-600 to-orange-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-600',
        accent: 'bg-green-500',
        gradient: 'from-green-600 to-emerald-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  // Agent 1: 数据抓取演示
  const DataAcquisitionDemo = () => (
    <div className="bg-white rounded-2xl shadow-lg h-[450px] flex flex-col overflow-hidden">
      <div className={`bg-gradient-to-r ${getColorClasses(agents[0].color).gradient} p-4 text-white flex-shrink-0`}>
        <h3 className="text-lg font-bold">数据抓取控制台</h3>
        <p className="text-sm opacity-90">ASIN: B08N5WRWNW</p>
      </div>
      
      <div className="p-4 flex-1 space-y-3 overflow-y-auto">
        {/* 进度步骤 */}
        <div className="space-y-2">
          {agents[0].demoSteps.map((step, index) => (
            <div
              key={`step-${index}`}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                index <= currentStep ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index < currentStep ? 'bg-green-500' : 
                index === currentStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
              }`}></div>
              <span className="text-sm font-medium">{step}</span>
            </div>
          ))}
        </div>

        {/* 数据统计 - 只在步骤2之后显示 */}
        {currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <motion.div 
                className="text-xl font-bold text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                1,247
              </motion.div>
              <div className="text-xs text-gray-600">总评论数</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <motion.div 
                className="text-xl font-bold text-orange-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                89
              </motion.div>
              <div className="text-xs text-gray-600">差评数量</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <motion.div 
                className="text-xl font-bold text-blue-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                23
              </motion.div>
              <div className="text-xs text-gray-600">Q&A数量</div>
            </div>
          </motion.div>
        )}

        {/* API状态 - 只在步骤1之后显示 */}
        {currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900 rounded-lg p-3 text-green-400 font-mono text-xs space-y-1"
          >
            <div>$ Amazon Scraping API Status: ✅ Connected</div>
            <div>$ Rate Limit: 98/100 requests remaining</div>
            <div>$ Response Time: 0.23s</div>
          </motion.div>
        )}
      </div>
    </div>
  );

  // Agent 2: AI分析演示
  const AIAnalysisDemo = () => (
    <div className="bg-white rounded-2xl shadow-lg h-[450px] flex flex-col overflow-hidden">
      <div className={`bg-gradient-to-r ${getColorClasses(agents[1].color).gradient} p-4 text-white flex-shrink-0`}>
        <h3 className="text-lg font-bold">AI洞察分析引擎</h3>
        <p className="text-sm opacity-90">深度学习模型 v2.1</p>
      </div>
      
      <div className="p-4 flex-1 space-y-3 overflow-y-auto">
        {/* 进度步骤 */}
        <div className="space-y-2">
          {agents[1].demoSteps.slice(0, 4).map((step, index) => (
            <div
              key={`ai-step-${index}`}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-500 ${
                index <= currentStep ? 'bg-purple-50' : 'bg-gray-50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < currentStep ? 'bg-green-500' : 
                index === currentStep ? 'bg-purple-500 animate-pulse' : 'bg-gray-300'
              }`}></div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>

        {/* AI处理进度 */}
        {currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-xs text-gray-600">
              <span>AI模型处理进度</span>
              <span>{Math.min((currentStep + 1) * 20, 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((currentStep + 1) * 20, 100)}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        )}

        {/* 关键词云 */}
        {currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <h4 className="text-sm font-semibold mb-3">识别的关键问题</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { word: '电池续航', count: 15, severity: 'high' },
                { word: '接口松动', count: 8, severity: 'medium' },
                { word: '材质廉价', count: 12, severity: 'high' },
                { word: '包装损坏', count: 5, severity: 'low' },
                { word: '说明不清', count: 3, severity: 'low' }
              ].map((item, index) => (
                <motion.span
                  key={item.word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.severity === 'high' ? 'bg-red-100 text-red-700' :
                    item.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.word} ({item.count})
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  // Agent 3: 风险评估演示
  const RiskAssessmentDemo = () => (
    <div className="bg-white rounded-2xl shadow-lg h-[450px] flex flex-col overflow-hidden">
      <div className={`bg-gradient-to-r ${getColorClasses(agents[2].color).gradient} p-4 text-white flex-shrink-0`}>
        <h3 className="text-lg font-bold">风险评估模型</h3>
        <p className="text-sm opacity-90">智能决策引擎</p>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 h-full min-h-0">
          {/* 左侧：风险评分 */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 rounded-full border-8 border-gray-200 flex items-center justify-center mb-3"
                 style={{
                   background: `conic-gradient(from 0deg, #ef4444 0%, #f97316 25%, #eab308 50%, #22c55e 75%, #22c55e 100%)`
                 }}>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <motion.span
                  className="text-2xl font-bold text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: currentStep >= 3 ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                >
                  {currentStep >= 3 ? '78' : '0'}
                </motion.span>
              </div>
            </div>
            
            {currentStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <div className="text-sm font-bold text-gray-900">风险等级</div>
                <div className="text-green-600 font-semibold text-sm">✅ 建议落单</div>
              </motion.div>
            )}
          </div>

          {/* 右侧：评估指标 */}
          <div className="space-y-2">
            {[
              { label: '差评率', value: '7.1%', status: 'good', progress: 85 },
              { label: '退货率', value: '3.2%', status: 'good', progress: 90 },
              { label: '质量问题', value: '中等', status: 'caution', progress: 65 },
              { label: '竞争激烈度', value: '高', status: 'bad', progress: 40 },
              { label: '利润空间', value: '良好', status: 'good', progress: 80 }
            ].map((metric, index) => (
              <div
                key={metric.label}
                className={`bg-gray-50 rounded-lg p-2 transition-all duration-500 ${
                  currentStep >= index + 1 ? 'opacity-100 transform translate-x-0' : 'opacity-50 transform translate-x-2'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">{metric.label}</span>
                  <span className={`text-xs font-bold ${
                    metric.status === 'good' ? 'text-green-600' :
                    metric.status === 'caution' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {metric.value}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-1000 ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'caution' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: currentStep >= index + 1 ? `${metric.progress}%` : '0%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Agent 4: 报告生成演示
  const ReportingDemo = () => (
    <div className="bg-white rounded-2xl shadow-lg h-[450px] flex flex-col overflow-hidden">
      <div className={`bg-gradient-to-r ${getColorClasses(agents[3].color).gradient} p-4 text-white flex-shrink-0`}>
        <h3 className="text-lg font-bold">智能报告生成器</h3>
        <p className="text-sm opacity-90">自动化决策报告</p>
      </div>
      
      <div className="p-4 flex-1 space-y-3 overflow-y-auto">
        {/* 进度步骤 */}
        <div className="space-y-2">
          {agents[3].demoSteps.map((step, index) => (
            <div
              key={`report-step-${index}`}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-500 ${
                index <= currentStep ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < currentStep ? 'bg-green-500' : 
                index === currentStep ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
              }`}></div>
              <span className="text-sm">{step}</span>
              {index < currentStep && (
                <span className="text-green-500 text-xs">✓</span>
              )}
            </div>
          ))}
        </div>

        {/* 报告预览 */}
        {currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">决策报告预览</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>ASIN:</span>
                <span className="font-mono">B08N5WRWNW</span>
              </div>
              <div className="flex justify-between">
                <span>风险评分:</span>
                <span className="font-bold text-green-600">78分</span>
              </div>
              <div className="flex justify-between">
                <span>决策建议:</span>
                <span className="font-bold text-green-600">建议落单</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <span className="text-gray-600">核心问题: 电池续航短, 接口松动</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 发送状态 */}
        {currentStep >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="text-center p-3 bg-green-50 rounded-lg border">
              <div className="text-2xl mb-2">📧</div>
              <div className="text-sm font-medium text-green-600">邮件</div>
              <div className="text-xs text-gray-600">
                {currentStep >= 4 ? '发送成功' : '准备发送'}
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border">
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm font-medium text-green-600">微信</div>
              <div className="text-xs text-gray-600">
                {currentStep >= 4 ? '推送成功' : '准备推送'}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  const getDemoComponent = () => {
    switch (activeTab) {
      case 0: return <DataAcquisitionDemo key="demo-0" />;
      case 1: return <AIAnalysisDemo key="demo-1" />;
      case 2: return <RiskAssessmentDemo key="demo-2" />;
      case 3: return <ReportingDemo key="demo-3" />;
      default: return <DataAcquisitionDemo key="demo-default" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 h-[550px]">
        
        {/* 左侧：Tab列表 */}
        <div className="space-y-4">
          {agents.map((agent, index) => {
            const isActive = activeTab === index;
            const colors = getColorClasses(agent.color);
            
            return (
              <motion.div
                key={agent.id}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-500 ${
                  isActive 
                    ? `${colors.bg} ${colors.border} shadow-lg` 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                animate={{ 
                  scale: isActive ? 1.02 : 1,
                  x: isActive ? 8 : 0 
                }}
                onClick={() => handleTabClick(index)}
              >
                {/* 激活指示器 */}
                <motion.div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r ${colors.accent}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="flex items-start space-x-4">
                  {/* 步骤编号 */}
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                      isActive ? `${colors.accent} text-white` : 'bg-gray-100 text-gray-500'
                    }`}
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      rotate: isActive ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {agent.id}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 transition-colors ${
                      isActive ? colors.text : 'text-gray-700'
                    }`}>
                      {agent.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {agent.description}
                    </p>
                    
                    {/* 进度指示器 */}
                    {isActive && (
                      <motion.div
                        className="mt-3 flex space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {agent.demoSteps.map((_, stepIndex) => (
                          <div
                            key={`progress-${stepIndex}`}
                            className={`h-1 rounded-full transition-all duration-500 ${
                              stepIndex <= currentStep 
                                ? colors.accent 
                                : 'bg-gray-200'
                            }`}
                            style={{ width: `${100 / agent.demoSteps.length}%` }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 右侧：演示区域 */}
        <div className="relative h-full overflow-hidden">
          <div className="h-full flex flex-col">
            {getDemoComponent()}

            {/* 控制按钮 */}
            <div className="flex justify-center mt-4 flex-shrink-0">
              <button
                onClick={togglePlayback}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isPlaying 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isPlaying ? '⏸️ 暂停演示' : '▶️ 继续演示'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoTabDemo; 