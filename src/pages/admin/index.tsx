import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  linkHref: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon, linkHref }) => (
  <Link 
    href={linkHref}
    className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}
          </span>
          <span className="text-sm text-gray-500 ml-1">与上月相比</span>
        </div>
      </div>
      <div className="p-3 rounded-full bg-red-50 text-red-600">
        {icon}
      </div>
    </div>
  </Link>
);

// 最近活动项组件
interface ActivityItemProps {
  user: string;
  action: string;
  target: string;
  time: string;
  userAvatar: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ user, action, target, time, userAvatar }) => (
  <div className="flex items-start space-x-4 pb-6">
    <div className="flex-shrink-0">
      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-red-600 font-medium">{userAvatar}</span>
      </div>
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm text-gray-800">
        <span className="font-medium">{user}</span>
        <span className="ml-1">{action}</span>
        <span className="font-medium ml-1">{target}</span>
      </p>
      <p className="text-sm text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>管理系统 - 中国传统美食博物馆</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <AdminLayout 
        title="仪表盘" 
        breadcrumbs={[{ label: '仪表盘', href: '/admin' }]}
      >
        {/* 欢迎消息 */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold text-gray-800">欢迎回来，管理员</h2>
          <p className="text-gray-600 mt-2">这里是中国传统美食博物馆的管理系统，您可以在这里管理网站内容和用户。</p>
        </div>
        
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="总食谱数" 
            value="124" 
            change="12%" 
            isPositive={true} 
            linkHref="/admin/recipes"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          
          <StatCard 
            title="总食材数" 
            value="86" 
            change="8%" 
            isPositive={true} 
            linkHref="/admin/ingredients"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            }
          />
          
          <StatCard 
            title="注册用户" 
            value="38" 
            change="5%" 
            isPositive={true} 
            linkHref="/admin/users"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          
          <StatCard 
            title="文章总数" 
            value="42" 
            change="3%" 
            isPositive={false} 
            linkHref="/admin/articles"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
        </div>
        
        {/* 图表和活动记录 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 图表 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">网站访问统计</h3>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>最近7天</option>
                  <option>最近30天</option>
                  <option>最近90天</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">访问量统计图表将显示在这里</p>
                <p className="text-sm text-gray-400">集成图表库后可显示实际数据</p>
              </div>
            </div>
          </div>
          
          {/* 最近活动 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">最近活动</h3>
              <a href="#" className="text-sm text-red-600 hover:text-red-800">查看全部</a>
            </div>
            
            <div className="space-y-6">
              <ActivityItem 
                user="系统管理员" 
                action="添加了新食谱" 
                target="麻婆豆腐" 
                time="今天 14:32" 
                userAvatar="管"
              />
              
              <ActivityItem 
                user="内容编辑小王" 
                action="更新了食材" 
                target="花椒" 
                time="今天 11:15" 
                userAvatar="王"
              />
              
              <ActivityItem 
                user="内容编辑小李" 
                action="添加了地区介绍" 
                target="四川菜系" 
                time="昨天 16:48" 
                userAvatar="李"
              />
              
              <ActivityItem 
                user="系统管理员" 
                action="发布了新文章" 
                target="中国饮食礼仪简介" 
                time="昨天 09:23" 
                userAvatar="管"
              />
              
              <ActivityItem 
                user="访客账号" 
                action="注册成为新用户" 
                target="" 
                time="3天前 18:05" 
                userAvatar="访"
              />
            </div>
          </div>
        </div>
        
        {/* 快速访问链接 */}
        <div className="bg-white rounded-lg shadow mt-6 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">快速访问</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/recipes" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors duration-200">
              <svg className="w-8 h-8 text-red-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-gray-700">食谱管理</span>
            </Link>
            
            <Link href="/admin/ingredients" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors duration-200">
              <svg className="w-8 h-8 text-red-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-gray-700">食材管理</span>
            </Link>
            
            <Link href="/admin/regions" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors duration-200">
              <svg className="w-8 h-8 text-red-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">地区管理</span>
            </Link>
            
            <Link href="/admin/users" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors duration-200">
              <svg className="w-8 h-8 text-red-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-gray-700">用户管理</span>
            </Link>
          </div>
        </div>
      </AdminLayout>
    </>
  );
} 