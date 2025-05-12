import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button';

export default function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || '';
      
      if (!userLoggedIn && !adminLoggedIn) {
        router.push('/auth/login');
        return;
      }
      
      setUserName(name);
      setIsAdmin(adminLoggedIn);
      setIsLoading(false);
    }
  }, [router]);

  // 处理URL tab参数
  useEffect(() => {
    if (router.query.tab) {
      const tab = router.query.tab as string;
      const validTabs = ['profile', 'password', 'avatar', 'settings', 'collections', 'comments', 'history'];
      if (validTabs.includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, [router.query]);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('userName');
    router.push('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单验证
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ type: 'error', text: '请填写所有密码字段' });
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: '新密码和确认密码不匹配' });
      return;
    }
    
    if (formData.currentPassword !== 'user123' && formData.currentPassword !== 'admin123') {
      setMessage({ type: 'error', text: '当前密码不正确' });
      return;
    }
    
    // 模拟成功
    setMessage({ type: 'success', text: '密码已成功更新！' });
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSubmitAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!avatarPreview) {
      setMessage({ type: 'error', text: '请先选择一个头像' });
      return;
    }
    
    // 模拟成功
    setMessage({ type: 'success', text: '头像已成功更新！' });
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    // 更新URL参数而不刷新页面
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab }
    }, undefined, { shallow: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // 模拟收藏的菜谱数据
  const collections = [
    { id: 1, name: '麻婆豆腐', region: '川菜', date: '2023-05-12' },
    { id: 2, name: '东坡肉', region: '浙菜', date: '2023-06-18' },
    { id: 3, name: '佛跳墙', region: '闽菜', date: '2023-07-23' },
    { id: 4, name: '糖醋排骨', region: '粤菜', date: '2023-08-05' },
  ];

  // 模拟评论数据
  const comments = [
    { id: 1, content: '这道菜真的太好吃了，我按照食谱做出来效果很棒！', recipe: '水煮鱼', date: '2023-08-15', likes: 5 },
    { id: 2, content: '食材比例可以再调整一下，我觉得太辣了', recipe: '宫保鸡丁', date: '2023-07-20', likes: 2 },
    { id: 3, content: '这个烹饪技巧真的很实用，谢谢分享！', recipe: '回锅肉', date: '2023-06-10', likes: 8 },
  ];

  // 模拟浏览历史数据
  const history = [
    { id: 1, name: '小笼包', region: '苏菜', date: '2023-09-01 14:23' },
    { id: 2, name: '北京烤鸭', region: '京菜', date: '2023-08-28 19:45' },
    { id: 3, name: '蚂蚁上树', region: '川菜', date: '2023-08-25 12:10' },
    { id: 4, name: '粤式茶点', region: '粤菜', date: '2023-08-20 10:35' },
  ];

  return (
    <>
      <Head>
        <title>个人资料 - 中国传统美食博物馆</title>
        <meta name="description" content="用户个人资料页面" />
      </Head>

      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
                <h1 className="text-3xl font-bold">用户中心</h1>
                <p className="mt-2">管理您的账号信息和偏好设置</p>
              </div>

              <div className="flex flex-wrap border-b border-gray-200">
                <button 
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'profile' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => switchTab('profile')}
                >
                  个人资料
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'password' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => switchTab('password')}
                >
                  修改密码
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'avatar' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => switchTab('avatar')}
                >
                  更换头像
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'collections' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => switchTab('collections')}
                >
                  我的收藏
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'comments' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => switchTab('comments')}
                >
                  我的评论
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'history' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => switchTab('history')}
                >
                  浏览历史
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm ${activeTab === 'settings' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => switchTab('settings')}
                >
                  偏好设置
                </button>
              </div>

              {message.text && (
                <div className={`mx-6 mt-4 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700 border-l-4 border-red-500' : 'bg-green-50 text-green-700 border-l-4 border-green-500'}`}>
                  {message.text}
                </div>
              )}

              <div className="p-6">
                {activeTab === 'profile' && (
                  <>
                    <div className="flex items-center mb-8">
                      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-bold overflow-hidden">
                        {avatarPreview ? 
                          <img src={avatarPreview} alt="User avatar" className="w-full h-full object-cover" /> : 
                          userName.charAt(0).toUpperCase()
                        }
                      </div>
                      <div className="ml-6">
                        <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
                        <p className="text-gray-600">{isAdmin ? '管理员' : '普通用户'}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">账号信息</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                          <input
                            type="text"
                            value={userName}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">账号类型</label>
                          <input
                            type="text"
                            value={isAdmin ? '管理员' : '普通用户'}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
                          <input
                            type="email"
                            value={`${userName}@example.com`}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">注册日期</label>
                          <input
                            type="text"
                            value="2023-06-15"
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'password' && (
                  <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">修改密码</h3>
                    <form onSubmit={handleSubmitPassword}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            当前密码
                          </label>
                          <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="请输入当前密码"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            新密码
                          </label>
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="请输入新密码"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            确认新密码
                          </label>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="请再次输入新密码"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button type="submit" variant="primary">
                          更新密码
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'avatar' && (
                  <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">更换头像</h3>
                    <form onSubmit={handleSubmitAvatar}>
                      <div className="flex flex-col items-center space-y-6">
                        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                          {avatarPreview ? 
                            <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" /> : 
                            <span className="text-gray-600 text-3xl font-bold">{userName.charAt(0).toUpperCase()}</span>
                          }
                        </div>
                        
                        <div className="w-full max-w-md">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            选择新头像
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            支持JPG, PNG格式，文件大小不超过2MB
                          </p>
                        </div>
                        
                        <Button type="submit" variant="primary">
                          上传头像
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'collections' && (
                  <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">我的收藏</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">菜名</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">菜系</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收藏日期</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {collections.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{item.region}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{item.date}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-red-600 hover:text-red-900 mr-3">查看</button>
                                <button className="text-gray-600 hover:text-gray-900">取消收藏</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">我的评论</h3>
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-800">评论于：{comment.recipe}</h4>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="mt-2 text-gray-700">{comment.content}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            <span>{comment.likes} 个赞</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">浏览历史</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">菜名</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">菜系</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">浏览时间</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {history.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{item.region}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{item.date}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-red-600 hover:text-red-900">查看</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">偏好设置</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="newsletter"
                          type="checkbox"
                          className="h-4 w-4 text-red-600 border-gray-300 rounded"
                        />
                        <label htmlFor="newsletter" className="ml-2 block text-gray-700">
                          接收美食资讯和活动通知
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="recipe-update"
                          type="checkbox"
                          className="h-4 w-4 text-red-600 border-gray-300 rounded"
                        />
                        <label htmlFor="recipe-update" className="ml-2 block text-gray-700">
                          当有新菜谱时通知我
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="comment-notify"
                          type="checkbox"
                          className="h-4 w-4 text-red-600 border-gray-300 rounded"
                        />
                        <label htmlFor="comment-notify" className="ml-2 block text-gray-700">
                          当有人回复我的评论时通知我
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="dark-mode"
                          type="checkbox"
                          className="h-4 w-4 text-red-600 border-gray-300 rounded"
                        />
                        <label htmlFor="dark-mode" className="ml-2 block text-gray-700">
                          开启暗黑模式
                        </label>
                      </div>

                      <div className="mt-6">
                        <Button 
                          variant="primary"
                          onClick={() => setMessage({ type: 'success', text: '设置已保存！' })}
                        >
                          保存设置
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8 border-t border-gray-200 pt-6">
                  {isAdmin && (
                    <Button
                      variant="secondary"
                      onClick={() => router.push('/admin/dashboard')}
                    >
                      进入管理控制台
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                  >
                    退出登录
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 