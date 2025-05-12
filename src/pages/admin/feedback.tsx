import { useState } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
// 创建简单的toast工具对象代替hooks
const useToast = () => {
  const showToast = (message: string, type: string) => {
    console.log(`Toast: ${message}, Type: ${type}`);
  };
  return { showToast };
};

// 模拟反馈数据类型
interface Feedback {
  id: number;
  subject: string;
  email: string;
  content: string;
  status: 'pending' | 'processing' | 'resolved';
  createdAt: string;
  category: string;
  response?: string;
}

// 示例反馈数据
const sampleFeedbacks: Feedback[] = [
  {
    id: 1,
    subject: '网站加载速度过慢',
    email: 'user1@example.com',
    content: '在使用手机浏览网站时，图片加载非常缓慢，建议优化图片大小。',
    status: 'resolved',
    createdAt: '2023-05-15 14:30',
    category: '技术问题',
    response: '感谢您的反馈！我们已经优化了图片的压缩算法，请再次尝试访问。'
  },
  {
    id: 2,
    subject: '建议添加新的地区美食',
    email: 'user2@example.com',
    content: '希望能增加贵州黔东南地区的苗族特色美食介绍，这些都很有代表性！',
    status: 'processing',
    createdAt: '2023-05-16 10:15',
    category: '内容建议',
  },
  {
    id: 3,
    subject: '菜谱步骤不清晰',
    email: 'user3@example.com',
    content: '重庆辣子鸡的做法中，关于辣椒的用量描述不够明确，建议更新。',
    status: 'pending',
    createdAt: '2023-05-17 09:45',
    category: '内容纠错',
  },
  {
    id: 4,
    subject: '搜索功能问题',
    email: 'user4@example.com',
    content: '使用搜索功能查找"小吃"相关内容时，结果不相关，请检查搜索算法。',
    status: 'processing',
    createdAt: '2023-05-18 16:20',
    category: '技术问题',
  },
  {
    id: 5,
    subject: '历史长廊信息有误',
    email: 'user5@example.com',
    content: '唐代美食部分中提到的"佛跳墙"应该是清代菜品，请更正。',
    status: 'resolved',
    createdAt: '2023-05-19 11:05',
    category: '内容纠错',
    response: '非常感谢您的指正！我们已更新相关内容。'
  }
];

// 状态标签组件
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = '';
  let textColor = '';
  let statusText = '';
  
  switch(status) {
    case 'pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      statusText = '待处理';
      break;
    case 'processing':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      statusText = '处理中';
      break;
    case 'resolved':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      statusText = '已解决';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      statusText = '未知';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {statusText}
    </span>
  );
};

const AdminFeedback = () => {
  const { showToast } = useToast();
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseText, setResponseText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  // 状态选项
  const statusOptions = [
    { value: '', label: '所有状态' },
    { value: 'pending', label: '待处理' },
    { value: 'processing', label: '处理中' },
    { value: 'resolved', label: '已解决' }
  ];
  
  // 分类选项
  const categoryOptions = [
    { value: '', label: '所有分类' },
    { value: '技术问题', label: '技术问题' },
    { value: '内容建议', label: '内容建议' },
    { value: '内容纠错', label: '内容纠错' },
    { value: '其他', label: '其他' }
  ];
  
  // 根据筛选条件过滤反馈
  const filteredFeedbacks = sampleFeedbacks.filter(feedback => {
    const matchesStatus = statusFilter === '' || feedback.status === statusFilter;
    const matchesCategory = categoryFilter === '' || feedback.category === categoryFilter;
    
    return matchesStatus && matchesCategory;
  });
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };
  
  const handleViewFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setResponseText(feedback.response || '');
  };
  
  const handleUpdateStatus = (newStatus: 'pending' | 'processing' | 'resolved') => {
    if (!selectedFeedback) return;
    
    // 实际项目中这里应该调用API更新状态
    console.log(`更新反馈状态，ID: ${selectedFeedback.id}, 新状态: ${newStatus}`);
    
    // 模拟更新
    const updatedFeedbacks = sampleFeedbacks.map(f => 
      f.id === selectedFeedback.id ? { ...f, status: newStatus } : f
    );
    
    // 更新选中的反馈
    const updated = updatedFeedbacks.find(f => f.id === selectedFeedback.id);
    if (updated) {
      setSelectedFeedback(updated);
    }
    
    showToast('状态已更新', 'success');
  };
  
  const handleSendResponse = () => {
    if (!selectedFeedback || !responseText.trim()) return;
    
    // 实际项目中这里应该调用API发送回复
    console.log(`发送回复，ID: ${selectedFeedback.id}, 回复内容: ${responseText}`);
    
    // 模拟更新
    const updatedFeedbacks = sampleFeedbacks.map(f => 
      f.id === selectedFeedback.id ? { ...f, response: responseText, status: 'resolved' as const } : f
    );
    
    // 更新选中的反馈
    const updated = updatedFeedbacks.find(f => f.id === selectedFeedback.id);
    if (updated) {
      setSelectedFeedback(updated);
    }
    
    showToast('回复已发送', 'success');
  };
  
  return (
    <>
      <Head>
        <title>用户反馈管理 - 中国传统美食博物馆</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <AdminLayout 
        title="用户反馈管理"
        breadcrumbs={[
          {
            label: "控制台",
            href: "/admin"
          },
          {
            label: "用户反馈管理",
            href: "/admin/feedback"
          }
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 反馈列表区域 */}
          <div className={`${selectedFeedback ? 'hidden md:block' : ''} md:col-span-1`}>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col space-y-3">
                <h3 className="text-lg font-medium text-gray-900">反馈列表</h3>
                <div className="flex flex-col space-y-2">
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    value={categoryFilter}
                    onChange={handleCategoryFilterChange}
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ul className="divide-y divide-gray-200 max-h-[calc(100vh-15rem)] overflow-y-auto">
                {filteredFeedbacks.map((feedback) => (
                  <li 
                    key={feedback.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedFeedback?.id === feedback.id ? 'bg-red-50' : ''}`}
                    onClick={() => handleViewFeedback(feedback)}
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-red-600 truncate">{feedback.subject}</p>
                        <StatusBadge status={feedback.status} />
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <span className="truncate">{feedback.category}</span>
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>{feedback.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {filteredFeedbacks.length === 0 && (
                  <li className="px-4 py-12 text-center">
                    <p className="text-gray-500">没有符合条件的反馈</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          {/* 反馈详情区域 */}
          <div className={`${selectedFeedback ? '' : 'hidden md:block'} md:col-span-2`}>
            {selectedFeedback ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">反馈详情</h3>
                  <button
                    type="button"
                    className="md:hidden text-gray-400 hover:text-gray-500"
                    onClick={() => setSelectedFeedback(null)}
                  >
                    <span className="sr-only">返回列表</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900">{selectedFeedback.subject}</h2>
                      <StatusBadge status={selectedFeedback.status} />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{selectedFeedback.email}</span>
                      <span>{selectedFeedback.createdAt}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 whitespace-pre-line">{selectedFeedback.content}</p>
                    </div>
                    <div className="flex gap-2 mb-6">
                      <button
                        type="button"
                        className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                          selectedFeedback.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                        onClick={() => handleUpdateStatus('pending')}
                      >
                        待处理
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                          selectedFeedback.status === 'processing' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                        onClick={() => handleUpdateStatus('processing')}
                      >
                        处理中
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                          selectedFeedback.status === 'resolved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                        onClick={() => handleUpdateStatus('resolved')}
                      >
                        已解决
                      </button>
                    </div>
                    {selectedFeedback.response && (
                      <div className="border-t border-gray-200 pt-4 mb-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">回复:</h3>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-gray-700 whitespace-pre-line">{selectedFeedback.response}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">发送回复:</h3>
                    <textarea
                      rows={4}
                      className="shadow-sm block w-full focus:ring-red-500 focus:border-red-500 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="输入回复内容..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={handleSendResponse}
                        disabled={!responseText.trim()}
                      >
                        发送回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-white shadow rounded-lg">
                <div className="text-center p-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">没有选择反馈</h3>
                  <p className="mt-1 text-sm text-gray-500">从左侧列表选择一个反馈查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminFeedback; 