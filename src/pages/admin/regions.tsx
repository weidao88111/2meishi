import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { 
  AdminLayout, 
  SearchBar, 
  ActionButton, 
  Pagination, 
  TableActionButtons,
  EmptyState,
  ConfirmDialog,
  useToast
} from '@/components/admin';
import { regions } from '@/data/regions';

const AdminRegions: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [regionToDelete, setRegionToDelete] = useState<number | null>(null);
  
  const itemsPerPage = 6;
  
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);
  
  // 根据搜索词过滤区域
  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    region.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    region.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 分页逻辑
  const totalPages = Math.ceil(filteredRegions.length / itemsPerPage);
  const paginatedRegions = filteredRegions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleDeleteClick = (id: number) => {
    setRegionToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (regionToDelete !== null) {
      // 实际项目中这里应该调用API删除区域
      console.log(`删除区域，ID: ${regionToDelete}`);
      showToast('区域已成功删除', 'success');
      setIsDeleteDialogOpen(false);
      setRegionToDelete(null);
    }
  };
  
  return (
    <AdminLayout 
      title="区域管理" 
      breadcrumbs={[{ label: '区域管理', href: '/admin/regions' }]}
    >
      <Head>
        <title>区域管理 - 中国传统美食博物馆</title>
      </Head>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">区域管理</h1>
          <ActionButton
            onClick={() => console.log('添加区域')}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            添加区域
          </ActionButton>
        </div>
        
        <div className="mb-6">
          <SearchBar 
            value={searchTerm} 
            onChange={handleSearch} 
            placeholder="搜索区域名称或描述..." 
          />
        </div>
        
        {paginatedRegions.length === 0 ? (
          <EmptyState 
            title="暂无区域数据" 
            description="您可以添加新的区域来开始管理" 
            actionText="添加区域"
            onAction={() => console.log('添加区域')}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {paginatedRegions.map((region) => (
                <div key={region.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {region.name}
                      <span className="ml-2 text-sm text-gray-500">({region.englishName})</span>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{region.description}</p>
                    <div className="mt-3">
                      <TableActionButtons
                        onView={() => console.log(`查看区域，ID: ${region.id}`)}
                        onEdit={() => console.log(`编辑区域，ID: ${region.id}`)}
                        onDelete={() => handleDeleteClick(region.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
        
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="删除区域"
          message="确定要删除该区域吗？此操作无法撤销，相关的食谱和食材也可能会受到影响。"
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

export default AdminRegions; 