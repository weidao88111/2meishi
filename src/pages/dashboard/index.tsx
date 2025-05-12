import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button';

// 模拟数据 - 收藏的菜谱
const favoriteRecipes = [
  { id: 1, name: '麻婆豆腐', imageUrl: '/images/foods/mapo-tofu.jpg', region: '川菜' },
  { id: 2, name: '东坡肉', imageUrl: '/images/foods/dongpo-pork.jpg', region: '浙菜' },
  { id: 3, name: '佛跳墙', imageUrl: '/images/foods/buddha-jumps-wall.jpg', region: '闽菜' },
];

// 模拟数据 - 浏览历史
const viewHistory = [
  { id: 4, name: '小笼包', imageUrl: '/images/foods/xiaolongbao.jpg', viewedAt: '今天' },
  { id: 5, name: '糖醋排骨', imageUrl: '/images/foods/sweet-sour-ribs.jpg', viewedAt: '昨天' },
  { id: 6, name: '北京烤鸭', imageUrl: '/images/foods/peking-duck.jpg', viewedAt: '3天前' },
];

// 用户通知
const notifications = [
  { id: 1, content: '您收藏的「麻婆豆腐」食谱有了新的烹饪技巧', time: '2小时前', isRead: false },
  { id: 2, content: '欢迎加入中国传统美食博物馆！开始探索中华美食文化', time: '2天前', isRead: true },
  { id: 3, content: '您发表的评论获得了3个点赞', time: '3天前', isRead: true },
];

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || '';
      
      if (!userLoggedIn) {
        router.push('/auth/login');
        return;
      }
      
      setUserName(name);
      setIsLoading(false);
      
      // 计算未读通知
      const unreads = notifications.filter(n => !n.isRead).length;
      setUnreadCount(unreads);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>用户中心 - 中国传统美食博物馆</title>
        <meta name="description" content="用户个人中心" />
      </Head>
      
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          {/* 用户欢迎区 */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-lg shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden mr-6">
                <span className="text-3xl font-bold text-red-600">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">欢迎回来，{userName}</h1>
                <p className="mt-1 text-gray-100">探索中华美食文化，发现舌尖上的美味</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <Link href="/profile">
                <Button variant="primary" className="bg-white text-red-600 hover:bg-gray-100">
                  个人资料
                </Button>
              </Link>
              <Link href="/profile?tab=collections">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  我的收藏
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧栏 - 快捷入口 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">快捷入口</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/profile" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">个人资料</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile?tab=collections" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">我的收藏</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile?tab=comments" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">我的评论</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile?tab=password" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">修改密码</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile?tab=avatar" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">更换头像</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* 通知区域 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">通知</h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs py-1 px-2 rounded-full">
                      {unreadCount} 新
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {notifications.map(notification => (
                    <li 
                      key={notification.id} 
                      className={`p-3 rounded-md ${!notification.isRead ? 'bg-red-50 border-l-4 border-red-500' : 'bg-gray-50'}`}
                    >
                      <p className="text-gray-700">{notification.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </li>
                  ))}
                </ul>
                <Link href="/notifications">
                  <Button variant="primary" className="mt-4 text-red-600 w-full">
                    查看所有通知
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* 右侧内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 收藏的菜谱 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">我的收藏</h2>
                  <Link href="/profile?tab=collections" className="text-sm text-red-600 hover:text-red-700">
                    查看全部
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {favoriteRecipes.map(recipe => (
                    <div key={recipe.id} className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <div className="h-32 bg-gray-300 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-500">图片</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-800">{recipe.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{recipe.region}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 浏览历史 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">浏览历史</h2>
                  <Link href="/profile?tab=history" className="text-sm text-red-600 hover:text-red-700">
                    查看全部
                  </Link>
                </div>
                <div className="space-y-4">
                  {viewHistory.map(item => (
                    <div key={item.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center mr-4">
                        <span className="text-gray-500 text-xs">图片</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">浏览于 {item.viewedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 美食推荐 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">为您推荐</h2>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <h3 className="font-bold text-gray-800 mb-2">根据您的喜好推荐</h3>
                  <p className="text-gray-600 mb-4">您似乎对川菜感兴趣，以下是一些您可能会喜欢的川菜菜谱</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="text-sm bg-white border-orange-300 text-orange-700 hover:bg-orange-100">
                      水煮鱼
                    </Button>
                    <Button variant="outline" className="text-sm bg-white border-orange-300 text-orange-700 hover:bg-orange-100">
                      回锅肉
                    </Button>
                    <Button variant="outline" className="text-sm bg-white border-orange-300 text-orange-700 hover:bg-orange-100">
                      宫保鸡丁
                    </Button>
                    <Button variant="outline" className="text-sm bg-white border-orange-300 text-orange-700 hover:bg-orange-100">
                      鱼香肉丝
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 