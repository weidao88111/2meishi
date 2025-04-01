import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';

// 仪表板卡片组件
const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('text', 'bg')} bg-opacity-20`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  // 模拟数据
  const statsData = {
    totalFoods: 108,
    totalRecipes: 246,
    totalIngredients: 175,
    regions: 8,
    totalViews: 12587,
    feedbacks: 43
  };

  // 模拟最近活动数据
  const recentActivities = [
    { id: 1, type: '新增', item: '粤菜-白切鸡', user: '管理员', time: '1小时前' },
    { id: 2, type: '编辑', item: '四川菜系介绍', user: '内容编辑', time: '3小时前' },
    { id: 3, type: '新增', item: '食材-青花椒', user: '管理员', time: '昨天' },
    { id: 4, type: '删除', item: '重复的菜谱', user: '管理员', time: '2天前' },
    { id: 5, type: '编辑', item: '历史长廊-唐代美食', user: '内容编辑', time: '3天前' },
  ];

  return (
    <>
      <Head>
        <title>管理仪表板 - 中国传统美食博物馆</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <AdminLayout title="仪表板">
        {/* 统计卡片 */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="美食总数" 
              value={statsData.totalFoods} 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>} 
              color="text-blue-600" 
            />
            <StatCard 
              title="菜谱总数" 
              value={statsData.totalRecipes} 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} 
              color="text-green-600" 
            />
            <StatCard 
              title="食材总数" 
              value={statsData.totalIngredients} 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} 
              color="text-indigo-600" 
            />
            <StatCard 
              title="地区数量" 
              value={statsData.regions} 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} 
              color="text-yellow-600" 
            />
            <StatCard 
              title="总浏览量" 
              value={statsData.totalViews.toLocaleString()} 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} 
              color="text-purple-600" 
            />
            <StatCard 
              title="用户反馈" 
              value={statsData.feedbacks} 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>} 
              color="text-red-600" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 快速访问链接 */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">快速访问</h3>
              </div>
              <div className="px-6 py-4">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3 flex items-center justify-between">
                    <Link href="/admin/foods" className="text-blue-600 hover:text-blue-800">
                      美食管理
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <Link href="/admin/recipes" className="text-blue-600 hover:text-blue-800">
                      菜谱管理
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <Link href="/admin/ingredients" className="text-blue-600 hover:text-blue-800">
                      食材管理
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <Link href="/admin/regions" className="text-blue-600 hover:text-blue-800">
                      地区管理
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <Link href="/admin/history" className="text-blue-600 hover:text-blue-800">
                      历史长廊管理
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <Link href="/admin/feedback" className="text-blue-600 hover:text-blue-800">
                      用户反馈管理
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <Link href="/admin/settings" className="text-blue-600 hover:text-blue-800">
                      系统设置
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 最近活动 */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">最近活动</h3>
              </div>
              <div className="px-6 py-4">
                <ul className="divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                            activity.type === '新增' ? 'bg-green-100 text-green-500' : 
                            activity.type === '编辑' ? 'bg-blue-100 text-blue-500' : 
                            'bg-red-100 text-red-500'
                          }`}>
                            {activity.type === '新增' && (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            )}
                            {activity.type === '编辑' && (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            )}
                            {activity.type === '删除' && (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            )}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.type} {activity.item}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.user} · {activity.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-3 bg-gray-50 text-right">
                <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  查看所有活动
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
} 