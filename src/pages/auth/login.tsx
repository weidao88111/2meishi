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

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // 处理URL参数
  useEffect(() => {
    if (router.query.type === 'admin') {
      setUserType('admin');
    }
  }, [router.query]);

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

  // 获取当前格式化的日期时间
  const getCurrentFormattedDateTime = (): string => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
  };

  // 更新用户的最后登录时间
  const updateUserLastLogin = (userId: number): void => {
    const users = getFromLocalStorage<User[]>(USERS_STORAGE_KEY, []);
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, lastLogin: getCurrentFormattedDateTime() };
      }
      return user;
    });
    
    saveToLocalStorage(USERS_STORAGE_KEY, updatedUsers);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Admin login logic
      if (userType === 'admin') {
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('adminLoggedIn', 'true');
          localStorage.setItem('userName', username);
          
          // 触发自定义事件，通知Navbar更新登录状态
          window.dispatchEvent(new Event('loginStatusChange'));
          
          router.push('/admin/dashboard');
        } else {
          setError('管理员账号或密码不正确');
        }
      } 
      // User login logic
      else {
        // 从localStorage获取用户列表
        const users = getFromLocalStorage<User[]>(USERS_STORAGE_KEY, []);
        
        // 查找匹配的用户 (在真实应用中应该使用密码哈希而不是明文比较)
        // 这里简化处理，在实际应用中应使用密码哈希比较
        const user = users.find(u => u.username === username);
        
        // 模拟用户登录，支持测试账号或注册的用户账号
        if ((username === 'user' && password === 'user123') || user) {
          // 如果是已注册用户且状态为活跃，则更新登录时间
          if (user && user.status === 'active') {
            updateUserLastLogin(user.id);
            
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userName', user.username);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', String(user.id));
            
            // 触发自定义事件，通知Navbar更新登录状态
            window.dispatchEvent(new Event('loginStatusChange'));
            
            router.push('/dashboard');
          } 
          // 测试账号登录
          else if (username === 'user' && password === 'user123') {
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userName', username);
            
            // 触发自定义事件，通知Navbar更新登录状态
            window.dispatchEvent(new Event('loginStatusChange'));
            
            router.push('/dashboard');
          }
          // 用户账号被禁用
          else if (user && user.status === 'inactive') {
            setError('您的账号已被禁用，请联系管理员');
          }
          else {
            setError('用户名或密码不正确');
          }
        } else {
          setError('用户名或密码不正确');
        }
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
        <title>{userType === 'admin' ? '管理员登录' : '用户登录'} - 中国传统美食博物馆</title>
        <meta name="description" content="中国传统美食博物馆登录页面" />
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-soft rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{userType === 'admin' ? '管理员登录' : '用户登录'}</h1>
              <p className="text-gray-600">登录中国传统美食博物馆</p>
            </div>
            
            {/* User type selector */}
            <div className="flex rounded-md overflow-hidden mb-6">
              <button
                onClick={() => setUserType('user')}
                className={`flex-1 py-2 text-center transition-colors ${
                  userType === 'user'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                普通用户
              </button>
              <button
                onClick={() => setUserType('admin')}
                className={`flex-1 py-2 text-center transition-colors ${
                  userType === 'admin'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                管理员
              </button>
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
                  placeholder={userType === 'admin' ? "请输入管理员用户名" : "请输入用户名"}
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
            
            {userType === 'user' && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  还没有账号? 
                  <Link href="/auth/register" className="ml-1 text-red-600 hover:text-red-500">
                    注册新用户
                  </Link>
                </p>
              </div>
            )}
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>{userType === 'admin' ? "测试管理员账号: admin / admin123" : "测试用户账号: user / user123"}</p>
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