import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisData {
  asin: string;
  riskScore: number;
  recommendation: 'proceed' | 'caution' | 'stop';
  keyIssues: string[];
  analysisSteps: string[];
}

const LiveAnalysisDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    asin: 'B08N5WRWNW',
    riskScore: 0,
    recommendation: 'proceed',
    keyIssues: [],
    analysisSteps: [
      '抓取产品数据...',
      '分析差评内容...',
      '计算风险评分...',
      '生成决策建议...'
    ]
  });

  const finalData = {
    riskScore: 78,
    recommendation: 'proceed' as const,
    keyIssues: ['电池续航短', '接口松动'],
    keywordCloud: [
      { word: '电池', weight: 5 },
      { word: '续航短', weight: 4 },
      { word: '接口松动', weight: 3 },
    ]
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    setAnalysisData(prev => ({ ...prev, riskScore: 0, keyIssues: [] }));
    
    // 模拟分析步骤
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisData.analysisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          // 分析完成，显示最终结果
          setTimeout(() => {
            setAnalysisData(prev => ({
              ...prev,
              riskScore: finalData.riskScore,
              recommendation: finalData.recommendation,
              keyIssues: finalData.keyIssues
            }));
            setIsAnalyzing(false);
          }, 800);
          return prev;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    // 自动开始演示
    const timer = setTimeout(startAnalysis, 1000);
    
    // 循环演示
    const loopTimer = setInterval(startAnalysis, 12000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(loopTimer);
    };
  }, []);

  const getRiskColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBg = (score: number) => {
    if (score >= 75) return 'bg-green-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[480px] flex flex-col" // 固定高度
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 报告头部 - 压缩高度 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">AI决策报告</h3>
            <motion.div
              className="flex items-center space-x-2"
              animate={isAnalyzing ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">实时分析</span>
            </motion.div>
          </div>
          <p className="text-indigo-100 mt-1 text-sm">ASIN: {analysisData.asin}</p>
        </div>

        <div className="p-4 flex-1 flex flex-col space-y-4 min-h-0">
          {/* 分析进度 - 仅在分析时显示，压缩空间 */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {analysisData.analysisSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                      index <= currentStep ? 'bg-blue-50' : 'bg-gray-50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: index <= currentStep ? 1 : 0.5,
                      x: 0
                    }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      index < currentStep ? 'bg-green-500' : 
                      index === currentStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                    }`}></div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 主要内容区域 - 使用固定布局 */}
          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
            {/* 左列：风险评分 */}
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className={`flex items-center justify-center w-24 h-24 rounded-full ${getRiskBg(analysisData.riskScore)} border-3 border-current ${getRiskColor(analysisData.riskScore)}`}
                animate={{ rotate: isAnalyzing ? 360 : 0 }}
                transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
              >
                <span className={`text-2xl font-bold ${getRiskColor(analysisData.riskScore)}`}>
                  {analysisData.riskScore}
                </span>
              </motion.div>
              <h4 className="text-sm font-semibold text-gray-900 mt-2 mb-1">风险评分</h4>
              <AnimatePresence mode="wait">
                <motion.p
                  key={analysisData.recommendation}
                  className={`text-xs font-medium ${getRiskColor(analysisData.riskScore)}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {analysisData.riskScore >= 75 ? '✅ 建议落单' : 
                   analysisData.riskScore >= 40 ? '⚠️ 谨慎落单' : '❌ 不建议落单'}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* 右列：关键信息 */}
            <div className="flex flex-col justify-center space-y-3">
              {/* 关键问题 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">关键问题</h4>
                <div className="space-y-1">
                  <AnimatePresence>
                    {analysisData.keyIssues.slice(0, 2).map((issue, index) => (
                      <motion.div
                        key={issue}
                        className="flex items-center space-x-2 p-2 bg-orange-50 rounded text-xs"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">{issue}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* 关键词 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">差评关键词</h4>
                <div className="flex flex-wrap gap-1">
                  {finalData.keywordCloud.map((item, index) => (
                    <motion.span
                      key={item.word}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.weight >= 4 ? 'bg-red-100 text-red-700' :
                        item.weight >= 3 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.word}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 底部操作按钮 */}
          <motion.button
            onClick={startAnalysis}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? '分析中...' : '重新分析'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveAnalysisDemo; 