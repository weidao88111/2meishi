import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';

// 从用户管理页面复制的User接口定义
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | 'registered';
  status: 'active' | 'inactive';
  lastLogin: string;
}

// 存储用户数据的localStorage键名（需要与管理页面使用相同的键名）
const USERS_STORAGE_KEY = 'foodmuseum_admin_users';

export default function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState(''); // 添加姓名字段
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      
      if (userLoggedIn) {
        router.push('/dashboard');
      } else if (adminLoggedIn) {
        router.push('/admin/dashboard');
      } else {
        setCheckingAuth(false);
      }
    }
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!username || !name || !email || !password || !confirmPassword) {
      setError('请填写所有必填项');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('请输入有效的电子邮箱');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // 从localStorage获取现有用户列表
      const existingUsers = getFromLocalStorage<User[]>(USERS_STORAGE_KEY, []);
      
      // 检查用户名是否已被使用
      if (existingUsers.some(user => user.username === username)) {
        setError('该用户名已被使用');
        setIsLoading(false);
        return;
      }
      
      // 检查邮箱是否已被使用
      if (existingUsers.some(user => user.email === email)) {
        setError('该邮箱已被注册');
        setIsLoading(false);
        return;
      }
      
      // 创建新用户对象
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
      
      // 生成新ID（取最大ID + 1，如果没有用户则从1开始）
      const maxId = existingUsers.length > 0 ? Math.max(...existingUsers.map(user => user.id)) : 0;
      
      const newUser: User = {
        id: maxId + 1,
        username,
        name,
        email,
        role: 'registered', // 默认为注册用户角色
        status: 'active',
        lastLogin: formattedDate
      };
      
      // 将新用户添加到用户列表并保存到localStorage
      const updatedUsers = [...existingUsers, newUser];
      saveToLocalStorage(USERS_STORAGE_KEY, updatedUsers);
      
      // 设置注册成功的状态
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userName', username);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', String(newUser.id));
      
      // 触发自定义事件，通知Navbar更新登录状态
      window.dispatchEvent(new Event('loginStatusChange'));
      
      // 注册成功后跳转到用户主页
      router.push('/dashboard');
    } catch (err) {
      console.error('注册失败:', err);
      setError('注册过程中发生错误，请稍后再试');
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
        <title>注册 - 中国传统美食博物馆</title>
        <meta name="description" content="注册中国传统美食博物馆账号" />
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-soft rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">注册账号</h1>
              <p className="text-gray-600">创建您的中国传统美食博物馆账号</p>
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
            
            <form onSubmit={handleRegister}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  用户名 <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="请输入用户名"
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="请输入您的姓名"
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  电子邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="请输入电子邮箱"
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密码 <span className="text-red-500">*</span>
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
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  确认密码 <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="请再次输入密码"
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                    我已阅读并同意 <a href="#" className="text-red-600 hover:text-red-500">服务条款</a> 和 <a href="#" className="text-red-600 hover:text-red-500">隐私政策</a>
                  </label>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? '注册中...' : '注册'}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                已有账号? 
                <Link href="/auth/login" className="ml-1 text-red-600 hover:text-red-500">
                  登录
                </Link>
              </p>
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