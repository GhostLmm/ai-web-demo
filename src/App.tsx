import React, { useState, useEffect } from 'react';
import DemoReport from './components/DemoReport';

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

// 模态框组件
const PaymentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">完成支付</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="text-center">
          <div className="bg-gray-100 p-8 rounded-lg mb-4">
            <div className="w-48 h-48 bg-gray-300 mx-auto flex items-center justify-center rounded">
              <span className="text-gray-600">微信支付二维码</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            请使用微信扫描上方二维码完成支付
          </p>
          <p className="text-xs text-gray-500">
            支付后请截图，并添加客服微信：<span className="font-bold">ai-sales-001</span>
          </p>
        </div>
      </div>
    </div>
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
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">决胜单</div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600">定价</a>
              <a href="#demo" className="text-gray-700 hover:text-indigo-600">演示</a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                立即购买
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 区域1：英雄首屏区 */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wide">
                #1 AI决策平台
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                告别采购赌博，<br />
                <span className="text-indigo-600">你的亚马逊专属</span><br />
                AI决策大脑
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                在下一次补货前，让"决胜单"Agent分析所有风险，用数据告诉你这批货到底该不该下单。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium text-lg"
                >
                  立即查看「限时团购」方案 →
                </button>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">⭐</span>
                  <span>无需信用卡 • G2评分4.7/5</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <div className="text-gray-600">AI决策报告演示</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区域2：痛点共鸣区 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            你是否也曾因为一次错误的补货，<br />亏掉数万利润？
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="p-6">
              <div className="text-4xl mb-4">😰</div>
              <h3 className="text-lg font-semibold mb-2">凭感觉补货</h3>
              <p className="text-gray-600">心里没底，夜夜难眠</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">😵</div>
              <h3 className="text-lg font-semibold mb-2">差评突然增多</h3>
              <p className="text-gray-600">不知源头，应对无力</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-lg font-semibold mb-2">团队手动分析</h3>
              <p className="text-gray-600">耗时耗力，效率低下</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-lg font-semibold mb-2">误判形势</h3>
              <p className="text-gray-600">库存积压，资金占用</p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 max-w-4xl mx-auto text-left">
            <h4 className="font-bold text-red-800 mb-2">深圳卖家张总的教训：</h4>
            <p className="text-red-700">
              一款月销3000件的爆款，因未及时发现材料相关的差评增多，盲目追单5000件，
              最终导致差评爆发，链接被限制，库存价值30万的货砸在手里...
            </p>
          </div>
        </div>
      </section>

      {/* 区域3：解决方案区 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            是时候改变了！隆重介绍：
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-16">
            "决胜单"——您的AI采购决策顾问
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-5xl mb-6">📊</div>
              <h4 className="text-xl font-bold mb-4">100%数据驱动</h4>
              <p className="text-gray-600">告别直觉，让每一个采购决策都有据可依</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-5xl mb-6">🚨</div>
              <h4 className="text-xl font-bold mb-4">24/7风险预警</h4>
              <p className="text-gray-600">自动监控差评和痛点，在问题爆发前发出警报</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-5xl mb-6">⚡</div>
              <h4 className="text-xl font-bold mb-4">90%效率提升</h4>
              <p className="text-gray-600">从数小时的人工分析，到3分钟的自动化报告</p>
            </div>
          </div>
        </div>
      </section>

      {/* 区域4：原理揭秘区 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              四位一体，揭秘"决胜单"如何为您保驾护航
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">全域数据专员</h4>
                  <p className="text-gray-600">自动抓取亚马逊前台数据、最新差评和Q&A</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">AI洞察分析师</h4>
                  <p className="text-gray-600">利用大语言模型，深度分析和归纳差评背后的结构性问题与核心痛点</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">资深风险评估官</h4>
                  <p className="text-gray-600">运行独家风险评估模型，量化"落单风险"，输出精准分数</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">首席汇报秘书</h4>
                  <p className="text-gray-600">自动生成结构化、可视化的决策报告，并推送到您的微信或邮箱</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <div className="text-gray-600">AI工作流演示图</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区域5：案例展示区 */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              眼见为实：一份真实的"决胜单"分析报告
            </h2>
          </div>
          
          <DemoReport />
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              报告解读说明
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <div>
                  <div className="font-semibold mb-2">风险分数</div>
                  <div className="text-sm text-gray-600">"78分，风险可控，建议落单"</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <div>
                  <div className="font-semibold mb-2">差评关键词云</div>
                  <div className="text-sm text-gray-600">核心差评点："zipper breaks"（拉链易坏）</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <div>
                  <div className="font-semibold mb-2">决策建议</div>
                  <div className="text-sm text-gray-600">"可下单，但建议与供应商沟通，升级拉链配件"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区域6：核心转化区 */}
      <section id="pricing" className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              加入我们，成为第一批用AI优化库存的聪明卖家
            </h2>
            <p className="text-xl text-indigo-200 mb-8">仅限本微信群</p>
            <p className="text-lg text-indigo-300 mb-8">阶梯团购，越早越优惠，名额售罄价格立即上涨！</p>
            
            {/* 倒计时器 */}
            <div className="bg-indigo-800 rounded-lg p-6 inline-block mb-12">
              <div className="text-lg font-semibold mb-4">距早鸟价结束仅剩：</div>
              <div className="flex space-x-4 text-center">
                <div className="bg-white text-indigo-900 rounded-lg p-3 min-w-[80px]">
                  <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                  <div className="text-sm">天</div>
                </div>
                <div className="bg-white text-indigo-900 rounded-lg p-3 min-w-[80px]">
                  <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-sm">时</div>
                </div>
                <div className="bg-white text-indigo-900 rounded-lg p-3 min-w-[80px]">
                  <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-sm">分</div>
                </div>
                <div className="bg-white text-indigo-900 rounded-lg p-3 min-w-[80px]">
                  <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-sm">秒</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 价格方案 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 天使合伙人 */}
            <div className="bg-white text-gray-900 rounded-2xl p-8 relative transform hover:scale-105 transition duration-300">
              {remainingSeats.angel <= 5 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  仅剩{remainingSeats.angel}席
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">天使合伙人</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-indigo-600">¥3,999</span>
                  <div className="text-sm text-gray-500">原价 <span className="line-through">¥12,999</span></div>
                </div>
                <div className="text-sm text-red-600 font-semibold mb-6">
                  剩余 {remainingSeats.angel} 席
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  disabled={remainingSeats.angel === 0}
                  className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
                    remainingSeats.angel > 0 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {remainingSeats.angel > 0 ? '立即抢占' : '已售罄'}
                </button>
              </div>
            </div>
            
            {/* 早鸟先锋 */}
            <div className="bg-white text-gray-900 rounded-2xl p-8 relative">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">早鸟先锋</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-indigo-600">¥5,999</span>
                  <div className="text-sm text-gray-500">原价 <span className="line-through">¥12,999</span></div>
                </div>
                <div className="text-sm text-orange-600 font-semibold mb-6">
                  剩余 {remainingSeats.early} 席
                </div>
                <button 
                  disabled={remainingSeats.angel > 0}
                  className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
                    remainingSeats.angel === 0 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {remainingSeats.angel > 0 ? '排队预定' : '立即抢占'}
                </button>
              </div>
            </div>
            
            {/* 标准团购 */}
            <div className="bg-white text-gray-900 rounded-2xl p-8 relative">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">标准团购</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-indigo-600">¥7,999</span>
                  <div className="text-sm text-gray-500">原价 <span className="line-through">¥12,999</span></div>
                </div>
                <div className="text-sm text-green-600 font-semibold mb-6">
                  剩余 {remainingSeats.standard} 席
                </div>
                <button 
                  disabled
                  className="w-full py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                >
                  排队预定
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-indigo-200 text-sm">
            支付后请截图，并添加客服微信：<span className="font-bold text-white">ai-sales-001</span>
          </div>
        </div>
      </section>

      {/* 区域7：价值打包区 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              今天下单，您将获得总价值超过 ¥15,000 的大礼包！
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 flex items-start space-x-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">"决胜单"N8N Agent工作流模板</h4>
                <p className="text-sm text-gray-600">价值 ¥12,999</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 flex items-start space-x-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">超详细部署视频教程</h4>
                <p className="text-sm text-gray-600">价值 ¥999</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 flex items-start space-x-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">30天部署问题专属技术支持</h4>
                <p className="text-sm text-gray-600">价值 ¥1,999</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 flex items-start space-x-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">专属VIP用户交流群永久席位</h4>
                <p className="text-sm text-gray-600">无价</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6 flex items-start space-x-4 border-2 border-indigo-200">
              <div className="text-indigo-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1 text-indigo-800">【天使合伙人专享】1对1在线部署指导</h4>
                <p className="text-sm text-indigo-600">价值 ¥2,999</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区域8：信任背书区 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              我是谁？为什么你可以信任我？
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-bold mb-4">资深亚马逊运营专家</h3>
              <p className="text-gray-600 mb-6">
                我是一个在深圳奋斗了8年的亚马逊老兵。我踩过你踩过的所有坑，
                从月销几万到月销千万，从一个人单打独斗到带领50人团队，
                也因此萌生了开发这款工具的想法...
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-indigo-600">✓</span>
                  <span>8年亚马逊实战经验</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-indigo-600">✓</span>
                  <span>服务过500+亚马逊卖家</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-indigo-600">✓</span>
                  <span>累计为客户节省成本超过1000万</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      "这个工具太棒了，简直是我们采购部门的福音！一个月就为我们避免了一次20万的错误补货。"
                    </p>
                    <div className="text-sm text-gray-500">
                      — 深圳某头部卖家 产品经理
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">B</span>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      "从手动分析到AI自动化，效率提升了10倍不止，现在团队可以专注于更重要的战略决策。"
                    </p>
                    <div className="text-sm text-gray-500">
                      — 杭州某跨境电商 运营总监
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区域9：风险逆转区 & FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 零风险承诺 */}
          <div className="text-center mb-16">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="text-green-600 text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">我们郑重承诺</h3>
              <p className="text-green-700 text-lg">
                购买后30天内，若因我们的模板或指导问题导致您无法成功部署，我们将全额退款！
              </p>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12">常见问题解答</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold mb-2">Q: 我是技术小白，能用吗？</h4>
                <p className="text-gray-600">
                  A: 当然！我们的视频教程是保姆级的，并且提供30天支持，保证您能用上。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold mb-2">Q: 购买后还有其他费用吗？</h4>
                <p className="text-gray-600">
                  A: 本工具是一次性付费。但您需要自备N8N环境、OpenAI API Key等，这些第三方服务的费用需要您自行承担。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold mb-2">Q: 我的数据安全吗？</h4>
                <p className="text-gray-600">
                  A: 绝对安全。整个工具部署在您自己的N8N服务器上，所有数据都在您本地处理，我们不触碰您的任何业务数据。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold mb-2">Q: 支持哪些电商平台？</h4>
                <p className="text-gray-600">
                  A: 目前主要支持亚马逊美国站，后续会逐步支持其他站点和平台。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区域10：最终号召区 */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            最后的机会
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
            一次错误的补货决策，损失的可能就是几万甚至几十万。而今天，只需一笔小小的投资，
            就能拥有一个永不疲倦的AI决策大脑。
          </p>
          <p className="text-lg text-indigo-300 mb-12">
            天使合伙人席位即将售罄，价格马上上涨。立即行动，锁定骨折优惠！
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-4 bg-white text-indigo-900 rounded-lg hover:bg-gray-100 transition duration-200 font-bold text-xl"
          >
            立即抢占最后席位，告别采购赌博！
          </button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold text-indigo-400 mb-4">决胜单</div>
          <p className="text-gray-400 mb-4">
            让AI为您的每一个采购决策保驾护航
          </p>
          <p className="text-sm text-gray-500">
            © 2024 决胜单AI. 保留所有权利
          </p>
        </div>
      </footer>

      {/* 支付模态框 */}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
