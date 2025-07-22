import React from 'react';

const DemoReport = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      {/* 报告头部 */}
      <div className="border-b-2 border-gray-100 pb-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">AI决策分析报告</h3>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
            风险分数: 78分
          </div>
        </div>
        <div className="text-sm text-gray-500">
          产品ASIN: B08X9QYN7K • 分析时间: 2024-01-15 14:30
        </div>
      </div>

      {/* 风险评估 */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
          风险评估
        </h4>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">整体风险等级</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">可控</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">建议: 可以下单，但需注意产品质量控制</div>
        </div>
      </div>

      {/* 差评分析 */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
          差评关键词分析
        </h4>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium">
              zipper breaks (15次)
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-medium">
              color fading (8次)
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-sm font-medium">
              size issue (5次)
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
              poor quality (12次)
            </span>
          </div>
          <div className="text-sm text-gray-600">
            主要问题集中在拉链质量上，建议联系供应商改进材料
          </div>
        </div>
      </div>

      {/* 趋势分析 */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
          销售趋势
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">↗ +15%</div>
            <div className="text-sm text-gray-600">月销量增长</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4.2★</div>
            <div className="text-sm text-gray-600">平均评分</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">3.2%</div>
            <div className="text-sm text-gray-600">差评率</div>
          </div>
        </div>
      </div>

      {/* 最终建议 */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-3 flex items-center text-indigo-800">
          <i className="fas fa-lightbulb mr-2"></i>
          AI决策建议
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>建议下单，该产品销售趋势良好</span>
          </div>
          <div className="flex items-start">
            <span className="text-yellow-500 mr-2">⚠</span>
            <span>重点关注拉链质量，建议与供应商讨论升级方案</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">💡</span>
            <span>可考虑适度增加库存，预期需求会继续增长</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoReport; 