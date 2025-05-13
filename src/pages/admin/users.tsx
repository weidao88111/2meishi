import React, { useState, useCallback, useEffect } from 'react';
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
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | 'registered';
  status: 'active' | 'inactive';
  lastLogin: string;
}

// 存储用户数据的localStorage键名
const USERS_STORAGE_KEY = 'foodmuseum_admin_users';

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
  },
  {
    id: 6,
    username: 'zhang',
    name: '小张',
    email: 'zhang@foodmuseum.com',
    role: 'registered',
    status: 'active',
    lastLogin: '2023-05-11 09:30'
  },
  {
    id: 7,
    username: 'zhao',
    name: '小赵',
    email: 'zhao@foodmuseum.com',
    role: 'registered',
    status: 'active',
    lastLogin: '2023-05-10 13:45'
  },
  {
    id: 8,
    username: 'liu',
    name: '小刘',
    email: 'liu@foodmuseum.com',
    role: 'editor',
    status: 'inactive',
    lastLogin: '2023-05-08 15:20'
  },
  {
    id: 9,
    username: 'chen',
    name: '小陈',
    email: 'chen@foodmuseum.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2023-05-09 10:15'
  },
  {
    id: 10,
    username: 'wang',
    name: '小汪',
    email: 'wang@foodmuseum.com',
    role: 'registered',
    status: 'active',
    lastLogin: '2023-05-12 08:40'
  },
  {
    id: 11,
    username: 'yang',
    name: '小杨',
    email: 'yang@example.com',
    role: 'registered',
    status: 'active',
    lastLogin: '2023-05-16 09:25'
  },
  {
    id: 12,
    username: 'li',
    name: '小李',
    email: 'li@example.com',
    role: 'registered',
    status: 'active',
    lastLogin: '2023-05-16 11:10'
  },
  {
    id: 13,
    username: 'wu',
    name: '小吴',
    email: 'wu@example.com',
    role: 'registered',
    status: 'inactive',
    lastLogin: '2023-05-15 16:45'
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);
  
  // 从localStorage获取用户数据，如果没有则使用示例数据
  const [users, setUsers] = useState<User[]>(() => {
    // 这个函数只会在组件首次渲染时执行一次
    if (typeof window !== 'undefined') {
      return getFromLocalStorage<User[]>(USERS_STORAGE_KEY, sampleUsers);
    }
    return sampleUsers;
  });
  
  // 添加用户相关状态
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<{
    username: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }>({
    username: '',
    name: '',
    email: '',
    role: 'registered',
    status: 'active'
  });
  
  // 当用户数据变化时，保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveToLocalStorage(USERS_STORAGE_KEY, users);
      // 显示保存指示器
      setShowSavedIndicator(true);
      // 2秒后隐藏
      const timer = setTimeout(() => {
        setShowSavedIndicator(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [users]);
  
  const itemsPerPage = 10;
  
  // 角色选项
  const roleOptions = [
    { value: '', label: '所有角色' },
    { value: 'admin', label: '管理员' },
    { value: 'editor', label: '编辑' },
    { value: 'viewer', label: '访客' },
    { value: 'registered', label: '注册用户' }
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
  const filteredUsers = users.filter(user => {
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
      // 从用户列表中移除用户
      setUsers(users.filter(user => user.id !== userToDelete));
      // localStorage会通过useEffect自动更新
      showToast('用户已成功删除', 'success');
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };
  
  const handleEditClick = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setUserToEdit(user);
      setSelectedRole(user.role);
      setIsEditDialogOpen(true);
    }
  };
  
  const handleEditConfirm = () => {
    if (userToEdit && selectedRole) {
      setUsers(users.map(user => 
        user.id === userToEdit.id ? { ...user, role: selectedRole as 'admin' | 'editor' | 'viewer' | 'registered' } : user
      ));
      // localStorage会通过useEffect自动更新
      showToast('用户角色已成功修改', 'success');
      setIsEditDialogOpen(false);
      setUserToEdit(null);
    }
  };
  
  // 获取角色对应的显示名称
  const getRoleLabel = (role: string): string => {
    switch(role) {
      case 'admin': return '管理员';
      case 'editor': return '编辑';
      case 'viewer': return '访客';
      case 'registered': return '注册用户';
      default: return '未知';
    }
  };
  
  // 打开添加用户对话框
  const handleAddUserClick = () => {
    setIsAddUserDialogOpen(true);
  };
  
  // 处理新用户表单输入变化
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 添加新用户
  const handleAddUserConfirm = () => {
    // 表单验证
    if (!newUser.username || !newUser.name || !newUser.email) {
      showToast('请填写所有必填字段', 'error');
      return;
    }
    
    // 检查用户名是否已存在
    if (users.some(user => user.username === newUser.username)) {
      showToast('用户名已存在', 'error');
      return;
    }
    
    // 创建新用户
    const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
    
    const userToAdd: User = {
      id: maxId + 1,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'admin' | 'editor' | 'viewer' | 'registered',
      status: newUser.status as 'active' | 'inactive',
      lastLogin: formattedDate
    };
    
    // 添加用户并更新状态
    setUsers([...users, userToAdd]);
    // localStorage会通过useEffect自动更新
    showToast('用户添加成功', 'success');
    
    // 重置表单并关闭对话框
    setNewUser({
      username: '',
      name: '',
      email: '',
      role: 'registered',
      status: 'active'
    });
    setIsAddUserDialogOpen(false);
  };
  
  // 重置用户数据到默认状态
  const handleResetUsersData = () => {
    if (confirm("确定要重置用户数据吗？所有修改将丢失。")) {
      setUsers(sampleUsers);
      showToast('用户数据已重置', 'info');
    }
  };
  
  // 引用文件上传的隐藏input
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // 导出用户数据为JSON文件
  const handleExportUsersData = () => {
    try {
      const dataStr = JSON.stringify(users, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `foodmuseum_users_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      showToast('用户数据已导出', 'success');
    } catch (error) {
      console.error('导出数据失败:', error);
      showToast('导出数据失败', 'error');
    }
  };
  
  // 触发文件选择对话框
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // 处理文件导入
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content) as User[];
        
        // 验证导入的数据格式
        if (!Array.isArray(importedData) || !importedData.every(item => 
          typeof item.id === 'number' &&
          typeof item.username === 'string' &&
          typeof item.name === 'string' &&
          typeof item.email === 'string'
        )) {
          throw new Error('数据格式不正确');
        }
        
        setUsers(importedData);
        showToast('用户数据已导入', 'success');
      } catch (error) {
        console.error('导入数据失败:', error);
        showToast('导入数据失败，请检查文件格式', 'error');
      }
      
      // 重置文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    reader.readAsText(file);
  };
  
  return (
    <AdminLayout 
      title="用户管理" 
      breadcrumbs={[{ label: '用户管理', href: '/admin/users' }]}
    >
      <Head>
        <title>用户管理 - 中国传统美食博物馆</title>
      </Head>
      
      {/* 隐藏的文件输入 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        style={{ display: 'none' }}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
            {showSavedIndicator && (
              <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                已保存到本地
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <ActionButton
              onClick={handleImportClick}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              }
              variant="secondary"
            >
              导入
            </ActionButton>
            <ActionButton
              onClick={handleExportUsersData}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
              variant="secondary"
            >
              导出
            </ActionButton>
            <ActionButton
              onClick={handleResetUsersData}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              variant="secondary"
            >
              重置数据
            </ActionButton>
            <ActionButton
              onClick={handleAddUserClick}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              添加用户
            </ActionButton>
          </div>
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
                          status={user.role === 'admin' ? 'info' : user.role === 'editor' ? 'success' : user.role === 'viewer' ? 'default' : 'info'} 
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
                          onEdit={() => handleEditClick(user.id)}
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
        
        {userToEdit && (
          <div className={`fixed inset-0 overflow-y-auto ${isEditDialogOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        修改用户角色
                      </h3>
                      <div className="mt-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          为用户 {userToEdit.name} 选择新角色
                        </label>
                        <select
                          id="role"
                          name="role"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          {roleOptions.filter(option => option.value !== '').map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleEditConfirm}
                  >
                    确认修改
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 添加用户对话框 */}
        <div className={`fixed inset-0 overflow-y-auto ${isAddUserDialogOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      添加新用户
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          用户名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          value={newUser.username}
                          onChange={handleNewUserChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          姓名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          value={newUser.name}
                          onChange={handleNewUserChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          邮箱 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          value={newUser.email}
                          onChange={handleNewUserChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          角色
                        </label>
                        <select
                          id="role"
                          name="role"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          value={newUser.role}
                          onChange={handleNewUserChange}
                        >
                          {roleOptions.filter(option => option.value !== '').map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          状态
                        </label>
                        <select
                          id="status"
                          name="status"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          value={newUser.status}
                          onChange={handleNewUserChange}
                        >
                          <option value="active">活跃</option>
                          <option value="inactive">非活跃</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddUserConfirm}
                >
                  添加用户
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsAddUserDialogOpen(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers; 