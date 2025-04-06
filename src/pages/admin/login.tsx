import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      if (isLoggedIn) {
        router.push('/admin/dashboard');
      } else {
        setCheckingAuth(false);
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // 这里将来会实现实际的登录API调用
      // 目前使用模拟的管理员账号 (admin/admin123)
      if (username === 'admin' && password === 'admin123') {
        // 设置 cookie 或 localStorage 以保持登录状态
        localStorage.setItem('adminLoggedIn', 'true');
        // 登录成功后跳转到管理员仪表板
        router.push('/admin/dashboard');
      } else {
        setError('用户名或密码不正确');
      }
    } catch (err) {
      console.error('登录失败:', err);
      setError('登录过程中发生错误，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  // If still checking auth state, show loading indicator
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>管理员登录 - 中国传统美食博物馆</title>
        <meta name="description" content="中国传统美食博物馆管理系统登录" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-soft rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">管理员登录</h1>
              <p className="text-gray-600">登录后台管理系统</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  用户名
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="请输入管理员用户名"
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="请输入密码"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    记住我
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-red-600 hover:text-red-500">
                    忘记密码?
                  </a>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>测试账号: admin / admin123</p>
              <p className="mt-1">（仅用于开发演示）</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-red-500">
              &larr; 返回首页
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 