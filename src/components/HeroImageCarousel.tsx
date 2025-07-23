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

// 使用新生成的4:3比例AI主题图片(512×384)
const heroImages = [
  {
    id: 1,
    src: 'https://p26-aiop-sign.byteimg.com/tos-cn-i-vuqhorh59i/20250723204222250F68037324DC120C82-6011-0~tplv-vuqhorh59i-image.image?rk3s=7f9e702d&x-expires=1753360949&x-signature=cf7MxFxFzHQWgu5QoxLKVP9KCJw%3D',
    alt: 'AI智能分析 - 数据驱动决策',
    title: 'AI智能分析',
    subtitle: '精准识别风险点'
  },
  {
    id: 2,
    src: 'https://p26-aiop-sign.byteimg.com/tos-cn-i-vuqhorh59i/202507232042374D05D4A2A3F803089FD2-7568-0~tplv-vuqhorh59i-image.image?rk3s=7f9e702d&x-expires=1753360965&x-signature=9%2BHuT3E1MU9sLcXF6meGNr3gHtY%3D',
    alt: '风险评估报告 - 量化分析',
    title: '风险评估报告',
    subtitle: '量化决策依据'
  },
  {
    id: 3,
    src: 'https://p3-aiop-sign.byteimg.com/tos-cn-i-vuqhorh59i/2025072320425206B1B64CC6AD2A14F616-8073-0~tplv-vuqhorh59i-image.image?rk3s=7f9e702d&x-expires=1753360979&x-signature=EM1gRhXH8PXo%2Fa0ZJ8bc6MAgzzY%3D',
    alt: '智能决策建议 - AI推荐',
    title: '智能决策建议',
    subtitle: '告别采购赌博'
  },
  {
    id: 4,
    src: 'https://p9-aiop-sign.byteimg.com/tos-cn-i-vuqhorh59i/202507232043064F46E705FEEC4A1204D1-1984-0~tplv-vuqhorh59i-image.image?rk3s=7f9e702d&x-expires=1753360995&x-signature=dWNOHR6lGgpzhveQVoFNFbaNqD0%3D',
    alt: '24/7实时监控 - 永不停歇',
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
              
              {/* 轻微的渐变遮罩，仅用于提升导航控件的可见性 */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
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