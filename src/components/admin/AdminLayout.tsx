import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title, 
  breadcrumbs 
}) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 检查当前路由是否匹配
  const isActiveRoute = (route: string) => {
    if (route === '/admin' && router.pathname === '/admin') {
      return true;
    }
    if (route !== '/admin' && router.pathname.startsWith(route)) {
      return true;
    }
    return false;
  };
  
  // 侧边栏菜单项
  const menuItems = [
    { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', 
      label: '仪表盘', 
      href: '/admin' 
    },
    { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', 
      label: '食谱管理', 
      href: '/admin/recipes' 
    },
    { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', 
      label: '食材管理', 
      href: '/admin/ingredients' 
    },
    { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', 
      label: '地区管理', 
      href: '/admin/regions' 
    },
    { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', 
      label: '用户管理', 
      href: '/admin/users' 
    },
    { icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', 
      label: '文章管理', 
      href: '/admin/articles' 
    },
    { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', 
      label: '系统设置', 
      href: '/admin/settings' 
    }
  ];
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* 移动端侧边栏 */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">关闭侧边栏</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-shrink-0 flex items-center px-4">
            <span className="text-2xl font-bold text-red-600">美食博物馆</span>
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActiveRoute(item.href) ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg 
                    className={`mr-4 h-6 w-6 ${isActiveRoute(item.href) ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-500'}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      {/* 桌面端侧边栏 */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-bold text-red-600">美食博物馆</span>
            </div>
            
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1 bg-white">
                {menuItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActiveRoute(item.href) ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <svg 
                      className={`mr-3 h-6 w-6 ${isActiveRoute(item.href) ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-500'}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="/" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-medium">管</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    系统管理员
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    返回前台
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">打开侧边栏</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <span className="sr-only">查看通知</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="ml-3 relative">
                <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <span className="sr-only">打开用户菜单</span>
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-medium">管</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {/* 面包屑导航 */}
          <div className="py-4 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <div>
                      <Link href="/admin" className="text-gray-400 hover:text-gray-500">
                        <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span className="sr-only">首页</span>
                      </Link>
                    </div>
                  </li>
                  
                  {breadcrumbs.map((item, index) => (
                    <li key={item.href}>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <Link
                          href={item.href}
                          className={`ml-4 text-sm font-medium ${
                            index === breadcrumbs.length - 1
                              ? 'text-gray-700'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                        >
                          {item.label}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
          
          {/* 页面内容 */}
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 