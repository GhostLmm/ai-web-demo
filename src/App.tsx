import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* 导航栏 */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img className="h-8 w-8 animate-spin" src={logo} alt="logo" />
              <span className="ml-2 text-xl font-bold text-gray-800">React + Tailwind</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                按钮
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Tailwind CSS 验证页面
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            这是一个使用 Tailwind CSS 样式的验证页面。如果你能看到美丽的渐变背景、现代化的按钮和响应式布局，说明 Tailwind CSS 已经成功集成！
          </p>
          
          {/* 特性卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
            <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition duration-300">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">快速开发</h3>
              <p className="text-gray-600">
                使用 Tailwind CSS 的实用类快速构建现代化界面
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition duration-300">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">响应式设计</h3>
              <p className="text-gray-600">
                内置的响应式修饰符让你轻松创建适配所有设备的界面
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition duration-300">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">高度可定制</h3>
              <p className="text-gray-600">
                通过配置文件轻松定制颜色、间距、字体等设计系统
              </p>
            </div>
          </div>

          {/* 测试按钮组 */}
          <div className="mt-12 space-x-4">
            <button className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transform hover:scale-105 transition duration-200">
              成功样式
            </button>
            <button className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-105 transition duration-200">
              错误样式
            </button>
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transform hover:scale-105 transition duration-200">
              警告样式
            </button>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 React + Tailwind CSS 演示项目
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tailwind CSS 验证成功 ✅
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
