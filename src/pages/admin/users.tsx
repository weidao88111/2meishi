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

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
}

// 示例用户数据
const sampleUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    name: '系统管理员',
    email: 'admin@foodmuseum.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-05-15 14:30'
  },
  {
    id: 2,
    username: 'editor1',
    name: '内容编辑小王',
    email: 'editor1@foodmuseum.com',
    role: 'editor',
    status: 'active',
    lastLogin: '2023-05-14 10:15'
  },
  {
    id: 3,
    username: 'editor2',
    name: '内容编辑小李',
    email: 'editor2@foodmuseum.com',
    role: 'editor',
    status: 'inactive',
    lastLogin: '2023-05-10 09:45'
  },
  {
    id: 4,
    username: 'viewer1',
    name: '访客账号',
    email: 'viewer1@foodmuseum.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2023-05-13 16:20'
  },
  {
    id: 5,
    username: 'viewer2',
    name: '游客体验',
    email: 'viewer2@foodmuseum.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2023-05-12 11:05'
  }
];

const AdminUsers: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  
  const itemsPerPage = 10;
  
  // 角色选项
  const roleOptions = [
    { value: '', label: '所有角色' },
    { value: 'admin', label: '管理员' },
    { value: 'editor', label: '编辑' },
    { value: 'viewer', label: '访客' }
  ];
  
  // 状态选项
  const statusOptions = [
    { value: '', label: '所有状态' },
    { value: 'active', label: '活跃' },
    { value: 'inactive', label: '非活跃' }
  ];
  
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);
  
  const handleRoleFilterChange = useCallback((value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  }, []);
  
  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);
  
  // 根据筛选条件过滤用户
  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = 
      searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    const matchesStatus = statusFilter === '' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // 分页逻辑
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (userToDelete !== null) {
      // 实际项目中这里应该调用API删除用户
      console.log(`删除用户，ID: ${userToDelete}`);
      showToast('用户已成功删除', 'success');
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };
  
  // 获取角色对应的显示名称
  const getRoleLabel = (role: string): string => {
    switch(role) {
      case 'admin': return '管理员';
      case 'editor': return '编辑';
      case 'viewer': return '访客';
      default: return '未知';
    }
  };
  
  return (
    <AdminLayout 
      title="用户管理" 
      breadcrumbs={[{ label: '用户管理', href: '/admin/users' }]}
    >
      <Head>
        <title>用户管理 - 中国传统美食博物馆</title>
      </Head>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <ActionButton
            onClick={() => console.log('添加用户')}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            添加用户
          </ActionButton>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4">
            <div className="w-full md:w-1/3">
              <SearchBar 
                value={searchTerm} 
                onChange={handleSearch} 
                placeholder="搜索用户名、姓名或邮箱..." 
              />
            </div>
            <div className="w-full sm:w-auto">
              <SelectFilter 
                value={roleFilter} 
                onChange={handleRoleFilterChange} 
                options={roleOptions} 
                label="角色"
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
          
          {paginatedUsers.length === 0 ? (
            <EmptyState 
              title="暂无用户数据" 
              description="您可以添加新的用户来开始管理" 
              actionText="添加用户"
              onAction={() => console.log('添加用户')}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeader 
                  columns={[
                    { label: '用户信息', width: '40%' },
                    { label: '角色', width: '15%' },
                    { label: '状态', width: '15%' },
                    { label: '最近登录', width: '20%' },
                    { label: '操作', width: '10%' }
                  ]}
                />
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 font-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge 
                          status={user.role === 'admin' ? 'info' : user.role === 'editor' ? 'success' : 'default'} 
                          text={getRoleLabel(user.role)} 
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge 
                          status={user.status === 'active' ? 'success' : 'error'} 
                          text={user.status === 'active' ? '活跃' : '非活跃'} 
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <TableActionButtons
                          onView={() => console.log(`查看用户，ID: ${user.id}`)}
                          onEdit={() => console.log(`编辑用户，ID: ${user.id}`)}
                          onDelete={() => handleDeleteClick(user.id)}
                        />
                      </td>
                    </tr>
                  ))}
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
          title="删除用户"
          message="确定要删除该用户吗？此操作无法撤销。"
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

export default AdminUsers; 