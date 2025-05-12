import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 检查用户登录状态
    if (typeof window !== 'undefined') {
      const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || '';
      
      setIsLoggedIn(userLoggedIn || adminLoggedIn);
      setUserName(name);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    setIsDropdownOpen(false);
    router.push('/');
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
            
            {/* 登录状态显示 */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="text-gray-700 hover:text-red-600 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {userName || '用户'}
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      个人资料
                    </Link>
                    {localStorage.getItem('adminLoggedIn') === 'true' && (
                      <Link href="/admin/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        管理控制台
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="text-gray-700 hover:text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                登录/注册
              </Link>
            )}
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
              
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/profile" className="flex items-center text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      个人资料
                    </Link>
                  </li>
                  {localStorage.getItem('adminLoggedIn') === 'true' && (
                    <li>
                      <Link href="/admin/dashboard" className="flex items-center text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        管理控制台
                      </Link>
                    </li>
                  )}
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left text-gray-700 hover:text-red-600"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      退出登录
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/auth/login" className="flex items-center text-gray-700 hover:text-red-600" onClick={toggleMenu}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    登录/注册
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 