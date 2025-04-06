import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-soft shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-red-700">
            中国传统美食博物馆
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600">
              首页
            </Link>
            <Link href="/regions" className="text-gray-700 hover:text-red-600">
              地区分类
            </Link>
            <Link href="/recipes" className="text-gray-700 hover:text-red-600">
              菜谱中心
            </Link>
            <Link href="/ingredients" className="text-gray-700 hover:text-red-600">
              食材百科
            </Link>
            <Link href="/history" className="text-gray-700 hover:text-red-600">
              历史长廊
            </Link>
            <Link href="/ai-assistant" className="text-gray-700 hover:text-red-600">
              AI美食助手
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600">
              关于我们
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              管理系统
            </Link>
          </div>
          <div className="md:hidden">
            <button 
              className="text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  首页
                </Link>
              </li>
              <li>
                <Link href="/regions" className="block text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  地区分类
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="block text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  菜谱中心
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="block text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  食材百科
                </Link>
              </li>
              <li>
                <Link href="/history" className="block text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  历史长廊
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="block text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  AI美食助手
                </Link>
              </li>
              <li>
                <Link href="/about" className="block text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/admin" className="flex items-center text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  管理系统
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 