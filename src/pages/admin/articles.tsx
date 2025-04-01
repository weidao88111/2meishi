import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { 
  AdminLayout,
  SearchBar,
  SelectFilter,
  ActionButton,
  Pagination,
  TableActionButtons,
  EmptyState,
  StatusBadge,
  TableHeader,
  ConfirmDialog,
  useToast
} from '@/components/admin';

interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  status: 'published' | 'draft' | 'pending' | 'archived';
  viewCount: number;
  coverImage?: string;
}

// 示例文章数据
const sampleArticles: Article[] = [
  {
    id: 1,
    title: '川菜的历史与演变：探索四川烹饪文化的千年之旅',
    author: '李文',
    category: '菜系历史',
    publishDate: '2023-04-15',
    status: 'published',
    viewCount: 892,
    coverImage: '/images/articles/sichuan-history.jpg'
  },
  {
    id: 2,
    title: '八大菜系主要特点对比：从食材选择到烹饪技法',
    author: '张厨',
    category: '菜系介绍',
    publishDate: '2023-04-10',
    status: 'published',
    viewCount: 1203,
    coverImage: '/images/articles/cuisines-comparison.jpg'
  },
  {
    id: 3,
    title: '中国传统调味品的使用艺术',
    author: '王味',
    category: '烹饪技巧',
    publishDate: '2023-04-05',
    status: 'published',
    viewCount: 567,
    coverImage: '/images/articles/seasonings.jpg'
  },
  {
    id: 4,
    title: '名厨访谈：探秘星级酒店中餐厨房',
    author: '赵访',
    category: '名厨专访',
    publishDate: '2023-04-01',
    status: 'draft',
    viewCount: 0
  },
  {
    id: 5,
    title: '中国传统美食的健康价值研究',
    author: '刘健',
    category: '美食与健康',
    publishDate: '2023-03-28',
    status: 'pending',
    viewCount: 0,
    coverImage: '/images/articles/food-health.jpg'
  },
  {
    id: 6,
    title: '古代宫廷菜的现代传承',
    author: '钱宫',
    category: '美食历史',
    publishDate: '2023-03-20',
    status: 'archived',
    viewCount: 345,
    coverImage: '/images/articles/imperial-cuisine.jpg'
  }
];

// 文章分类选项
const categoryOptions = [
  { value: '', label: '所有分类' },
  { value: '菜系历史', label: '菜系历史' },
  { value: '菜系介绍', label: '菜系介绍' },
  { value: '烹饪技巧', label: '烹饪技巧' },
  { value: '名厨专访', label: '名厨专访' },
  { value: '美食与健康', label: '美食与健康' },
  { value: '美食历史', label: '美食历史' }
];

// 文章状态选项
const statusOptions = [
  { value: '', label: '所有状态' },
  { value: 'published', label: '已发布' },
  { value: 'draft', label: '草稿' },
  { value: 'pending', label: '待审核' },
  { value: 'archived', label: '已归档' }
];

const AdminArticles: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  
  const itemsPerPage = 5;
  
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);
  
  const handleCategoryFilterChange = useCallback((value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  }, []);
  
  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);
  
  // 根据筛选条件过滤文章
  const filteredArticles = sampleArticles.filter(article => {
    const matchesSearch = 
      searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || article.category === categoryFilter;
    const matchesStatus = statusFilter === '' || article.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // 分页逻辑
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleDeleteClick = (id: number) => {
    setArticleToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (articleToDelete !== null) {
      // 实际项目中这里应该调用API删除文章
      console.log(`删除文章，ID: ${articleToDelete}`);
      showToast('文章已成功删除', 'success');
      setIsDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };
  
  // 获取文章状态的显示文本和样式
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'published':
        return { text: '已发布', type: 'success' as const };
      case 'draft':
        return { text: '草稿', type: 'default' as const };
      case 'pending':
        return { text: '待审核', type: 'warning' as const };
      case 'archived':
        return { text: '已归档', type: 'error' as const };
      default:
        return { text: status, type: 'default' as const };
    }
  };
  
  return (
    <AdminLayout 
      title="文章管理" 
      breadcrumbs={[{ label: '文章管理', href: '/admin/articles' }]}
    >
      <Head>
        <title>文章管理 - 中国传统美食博物馆</title>
      </Head>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
          <ActionButton
            onClick={() => console.log('添加文章')}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            添加文章
          </ActionButton>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4">
            <div className="w-full md:w-1/3">
              <SearchBar 
                value={searchTerm} 
                onChange={handleSearch} 
                placeholder="搜索文章标题或作者..." 
              />
            </div>
            <div className="w-full sm:w-auto">
              <SelectFilter 
                value={categoryFilter} 
                onChange={handleCategoryFilterChange} 
                options={categoryOptions} 
                label="分类"
              />
            </div>
            <div className="w-full sm:w-auto">
              <SelectFilter 
                value={statusFilter} 
                onChange={handleStatusFilterChange} 
                options={statusOptions} 
                label="状态"
              />
            </div>
          </div>
          
          {paginatedArticles.length === 0 ? (
            <EmptyState 
              title="暂无文章数据" 
              description="您可以添加新的文章来开始管理" 
              actionText="添加文章"
              onAction={() => console.log('添加文章')}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeader 
                  columns={[
                    { label: '文章信息', width: '50%' },
                    { label: '分类', width: '15%' },
                    { label: '状态', width: '10%' },
                    { label: '浏览量', width: '10%' },
                    { label: '操作', width: '15%' }
                  ]}
                />
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedArticles.map((article) => {
                    const statusInfo = getStatusInfo(article.status);
                    return (
                      <tr key={article.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            {article.coverImage && (
                              <div className="flex-shrink-0 h-16 w-24 mr-3 bg-gray-200 rounded overflow-hidden">
                                <img
                                  src={article.coverImage}
                                  alt={article.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900 line-clamp-2">{article.title}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                <span className="mr-3">作者: {article.author}</span>
                                <span>发布日期: {article.publishDate}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {article.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={statusInfo.type} text={statusInfo.text} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {article.viewCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <TableActionButtons
                            onView={() => console.log(`查看文章，ID: ${article.id}`)}
                            onEdit={() => console.log(`编辑文章，ID: ${article.id}`)}
                            onDelete={() => handleDeleteClick(article.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
        
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="删除文章"
          message="确定要删除该文章吗？此操作无法撤销。"
          confirmLabel="删除"
          cancelLabel="取消"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteDialogOpen(false)}
          variant="danger"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminArticles; 