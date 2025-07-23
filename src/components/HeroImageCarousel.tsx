import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// 暂时使用同一张图片，后续可以替换为不同的图片
const heroImages = [
  {
    id: 1,
    src: '/hero-image.png',
    alt: 'AI决策大脑 - 数据分析',
    title: 'AI智能分析',
    subtitle: '精准识别风险点'
  },
  {
    id: 2,
    src: '/hero-image.png',
    alt: 'AI决策大脑 - 风险评估',
    title: '风险评估报告',
    subtitle: '量化决策依据'
  },
  {
    id: 3,
    src: '/hero-image.png',
    alt: 'AI决策大脑 - 决策建议',
    title: '智能决策建议',
    subtitle: '告别采购赌博'
  },
  {
    id: 4,
    src: '/hero-image.png',
    alt: 'AI决策大脑 - 实时监控',
    title: '24/7实时监控',
    subtitle: '永不疲倦的大脑'
  }
];

const HeroImageCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        className="h-full"
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={image.id} className="relative">
            <div className="relative w-full h-full">
              {/* 背景图片 */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url('${image.src}')`,
                  backgroundPosition: 'center center'
                }}
              />
              
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
              
              {/* 文字内容覆盖层 - 居中显示 */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {image.title}
                  </motion.h3>
                  <motion.p 
                    className="text-xl text-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {image.subtitle}
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 底部导航控制区 */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center space-x-8">
        {/* 左箭头 */}
        <button className="swiper-button-prev-custom w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* 进度指示器 */}
        <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="text-sm text-white font-medium">
            {String(currentSlide + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
          </div>
          <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              animate={{ 
                width: `${((currentSlide + 1) / heroImages.length) * 100}%` 
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        {/* 右箭头 */}
        <button className="swiper-button-next-custom w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 自定义分页器样式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .swiper-pagination-bullet {
            width: 12px !important;
            height: 12px !important;
            background: rgba(255, 255, 255, 0.5) !important;
            opacity: 1 !important;
            margin: 0 4px !important;
            border-radius: 50% !important;
            transition: all 0.3s ease !important;
          }
          
          .swiper-pagination-bullet-active {
            background: white !important;
            transform: scale(1.2) !important;
          }
        `
      }} />
    </div>
  );
};

export default HeroImageCarousel; 