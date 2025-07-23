import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedContainer, AnimatedItem } from './AnimatedSection';

interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is Synthesia a Free AI Video Generator?',
    answer: 'We have launched a free plan that lets you create free AI videos! It includes 3 minutes of video per month, 6 stock avatars and a full range of AI voices in 140+ languages. Learn more about all available plans or generate a free AI video here.'
  },
  {
    id: 'faq-2', 
    question: 'Can I customize AI-generated videos to add brand identity?',
    answer: 'Yes! Synthesia allows you to fully customize your videos with your brand colors, fonts, logos, and custom backgrounds. You can also create custom avatars that represent your brand or use your company spokesperson.'
  },
  {
    id: 'faq-3',
    question: 'Does AI video creation integrate with existing LMS?',
    answer: 'Absolutely! Synthesia integrates seamlessly with popular Learning Management Systems including Cornerstone OnDemand, Articulate Rise, and many others. You can also export videos in multiple formats for any platform.'
  },
  {
    id: 'faq-4',
    question: 'How does AI video creation improve employee productivity?',
    answer: 'AI video creation dramatically reduces the time and resources needed for training content creation. Instead of spending weeks on traditional video production, you can create professional training videos in minutes, allowing your team to focus on more strategic tasks.'
  }
];

// 决胜单相关的FAQ数据
const decisionFAQData: FAQItem[] = [
  {
    id: 'faq-decision-1',
    question: '我是技术小白，能用吗？',
    answer: '当然！我们提供保姆级视频教程，每一步都有详细说明。加上30天专属技术支持，专业团队一对一答疑解惑，保证您能成功部署和使用。'
  },
  {
    id: 'faq-decision-2',
    question: '购买后还有其他费用吗？',
    answer: '本工具一次性付费。您需要自备第三方服务：N8N云服务（约$20/月）、OpenAI API Key（$10-50/月）。这些都是标准第三方服务费用。'
  },
  {
    id: 'faq-decision-3',
    question: '我的数据安全吗？',
    answer: '绝对安全！系统部署在您自己的N8N服务器上，所有数据都在您本地处理。我们不接触您的任何业务数据，您拥有完全控制权。'
  },
  {
    id: 'faq-decision-4',
    question: '支持哪些电商平台？',
    answer: '目前主要支持亚马逊美国站。正在开发英国、德国、日本站等其他站点，以及eBay、Shopify平台支持。升级免费提供给所有用户。'
  },
  {
    id: 'faq-decision-5',
    question: '分析结果的准确率如何？',
    answer: '经过大量测试，风险预测准确率达85%以上。结合8年亚马逊实战经验调优的AI算法，为您的决策提供可靠参考。'
  },
  {
    id: 'faq-decision-6',
    question: '多久能看到投资回报？',
    answer: '用户平均在第一个月就能避免一次错误补货，节省成本通常是工具价格的5-10倍。许多客户第一次使用就避免了数十万损失。'
  }
];

interface FAQSectionProps {
  variant?: 'synthesia' | 'decision';
  className?: string;
  defaultOpen?: string;
  compact?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  variant = 'decision',
  className = '',
  defaultOpen,
  compact = false
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpen ? [defaultOpen] : [])
  );
  
  const currentFAQData = variant === 'synthesia' ? faqData : decisionFAQData;
  
  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`${compact ? 'max-w-none' : 'max-w-4xl mx-auto'} ${className}`}>
      {variant === 'decision' && !compact && (
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          常见问题解答
        </motion.h3>
      )}

      {variant === 'synthesia' && (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
            FAQS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            AI video<br />
            generation FAQs
          </h2>
        </motion.div>
      )}

      {variant === 'decision' && compact && (
        <motion.h3 
          className="text-xl font-bold mb-6 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          常见问题解答
        </motion.h3>
      )}
      
      <AnimatedContainer className={compact ? "space-y-3" : "space-y-4"}>
        {currentFAQData.map((item, index) => (
          <AnimatedItem key={item.id}>
            <motion.div
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                className={`w-full ${compact ? 'px-4 py-4' : 'px-6 py-5'} text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200`}
                onClick={() => toggleItem(item.id)}
                whileHover={{ backgroundColor: '#f9fafb' }}
              >
                <span className={`font-semibold text-gray-900 ${compact ? 'text-base' : 'text-lg'} pr-8`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ 
                    rotate: openItems.has(item.id) ? 180 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <svg 
                    className="w-5 h-5 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </motion.button>
              
              <AnimatePresence initial={false}>
                {openItems.has(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.3,
                      ease: 'easeInOut'
                    }}
                    className="overflow-hidden"
                  >
                    <div className={`${compact ? 'px-4 pb-4 pt-2' : 'px-6 pb-5 pt-2'} border-t border-gray-100`}>
                      <motion.p 
                        className={`text-gray-600 leading-relaxed ${compact ? 'text-sm' : 'text-base'}`}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.answer}
                      </motion.p>
                      
                      {/* 为决胜单FAQ添加特殊链接 */}
                      {variant === 'decision' && item.id === 'faq-decision-2' && (
                        <motion.div 
                          className="mt-3 text-sm text-blue-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                                                     <button 
                             className="hover:underline text-left text-blue-600"
                             onClick={() => {/* 这里可以添加打开详情的逻辑 */}}
                           >
                             → 查看详细的第三方服务费用说明
                           </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatedItem>
        ))}
      </AnimatedContainer>
      
      {variant === 'decision' && !compact && (
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 mb-4">
            还有其他问题？我们随时为您解答
          </p>
          <div className="flex justify-center space-x-4">
            <motion.a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              邮件咨询
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              微信客服
            </motion.a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FAQSection; 