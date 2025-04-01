import React, { useState } from 'react';
import Head from 'next/head';
import { 
  AdminLayout,
  ActionButton,
  FormField,
  ConfirmDialog,
  useToast,
  Toast
} from '@/components/admin';

interface SettingsTabProps {
  children: React.ReactNode;
  isActive: boolean;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ children, isActive }) => {
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      {children}
    </div>
  );
};

const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  // 常规设置状态
  const [siteName, setSiteName] = useState('中国传统美食博物馆');
  const [siteDescription, setSiteDescription] = useState('探索中国传统美食文化的在线博物馆');
  const [contactEmail, setContactEmail] = useState('contact@foodmuseum.com');
  const [icp, setIcp] = useState('京ICP备12345678号');
  
  // SEO设置状态
  const [metaTitle, setMetaTitle] = useState('中国传统美食博物馆 - 探索传统美食文化');
  const [metaDescription, setMetaDescription] = useState('中国传统美食博物馆是一个致力于展示和传承中国传统美食文化的平台，包含各地方菜系介绍、食材百科、传统烹饪技艺等内容。');
  const [metaKeywords, setMetaKeywords] = useState('中国美食,传统菜系,烹饪技艺,食材百科,饮食文化');
  
  // 内容设置状态
  const [articlesPerPage, setArticlesPerPage] = useState('10');
  const [enableComments, setEnableComments] = useState(true);
  const [moderateComments, setModerateComments] = useState(true);
  
  // 缓存设置状态
  const [enableCache, setEnableCache] = useState(true);
  const [cacheDuration, setCacheDuration] = useState('3600');
  
  // 备份设置状态
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [backupRetention, setBackupRetention] = useState('30');
  
  const handleSaveSettings = () => {
    // 实际项目中应该发送API请求保存设置
    console.log('保存设置');
    showToast('设置已成功保存', 'success');
  };
  
  const handleOpenResetDialog = () => {
    setIsResetDialogOpen(true);
  };
  
  const handleResetSettings = () => {
    // 实际项目中应该发送API请求重置设置
    console.log('重置设置');
    showToast('设置已重置为默认值', 'info');
    setIsResetDialogOpen(false);
  };
  
  const handleClearCache = () => {
    // 实际项目中应该发送API请求清除缓存
    console.log('清除缓存');
    showToast('缓存已成功清除', 'success');
  };
  
  const handleBackupNow = () => {
    // 实际项目中应该发送API请求执行备份
    console.log('执行备份');
    showToast('系统备份已成功创建', 'success');
  };
  
  return (
    <AdminLayout 
      title="系统设置" 
      breadcrumbs={[{ label: '系统设置', href: '/admin/settings' }]}
    >
      <Head>
        <title>系统设置 - 中国传统美食博物馆</title>
      </Head>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="mt-1 text-sm text-gray-500">管理网站系统的各项设置和配置</p>
        </div>
        
        {/* 设置标签页 */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'general', name: '常规设置' },
              { id: 'seo', name: 'SEO设置' },
              { id: 'content', name: '内容设置' },
              { id: 'cache', name: '缓存设置' },
              { id: 'backup', name: '备份设置' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        {/* 设置表单区域 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {/* 常规设置 */}
          <SettingsTab isActive={activeTab === 'general'}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">常规设置</h2>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <FormField
                label="网站名称"
                id="site-name"
                name="siteName"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
              />
              <FormField
                label="网站描述"
                id="site-description"
                name="siteDescription"
                type="textarea"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
              />
              <FormField
                label="联系邮箱"
                id="contact-email"
                name="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <FormField
                label="ICP备案号"
                id="icp"
                name="icp"
                type="text"
                value={icp}
                onChange={(e) => setIcp(e.target.value)}
              />
            </div>
          </SettingsTab>
          
          {/* SEO设置 */}
          <SettingsTab isActive={activeTab === 'seo'}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">SEO设置</h2>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <FormField
                label="Meta标题"
                id="meta-title"
                name="metaTitle"
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
              <FormField
                label="Meta描述"
                id="meta-description"
                name="metaDescription"
                type="textarea"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
              <FormField
                label="Meta关键词"
                id="meta-keywords"
                name="metaKeywords"
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="以逗号分隔的关键词列表"
              />
            </div>
          </SettingsTab>
          
          {/* 内容设置 */}
          <SettingsTab isActive={activeTab === 'content'}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">内容设置</h2>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <FormField
                label="每页文章数量"
                id="articles-per-page"
                name="articlesPerPage"
                type="number"
                value={articlesPerPage}
                onChange={(e) => setArticlesPerPage(e.target.value)}
              />
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enable-comments"
                    name="enableComments"
                    type="checkbox"
                    checked={enableComments}
                    onChange={(e) => setEnableComments(e.target.checked)}
                    className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enable-comments" className="font-medium text-gray-700">启用评论功能</label>
                  <p className="text-gray-500">允许用户在文章下方发表评论</p>
                </div>
              </div>
              {enableComments && (
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="moderate-comments"
                      name="moderateComments"
                      type="checkbox"
                      checked={moderateComments}
                      onChange={(e) => setModerateComments(e.target.checked)}
                      className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="moderate-comments" className="font-medium text-gray-700">审核评论</label>
                    <p className="text-gray-500">评论需要管理员审核后才能显示</p>
                  </div>
                </div>
              )}
            </div>
          </SettingsTab>
          
          {/* 缓存设置 */}
          <SettingsTab isActive={activeTab === 'cache'}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">缓存设置</h2>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enable-cache"
                    name="enableCache"
                    type="checkbox"
                    checked={enableCache}
                    onChange={(e) => setEnableCache(e.target.checked)}
                    className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enable-cache" className="font-medium text-gray-700">启用缓存</label>
                  <p className="text-gray-500">缓存页面和数据以提高网站性能</p>
                </div>
              </div>
              {enableCache && (
                <FormField
                  label="缓存时间（秒）"
                  id="cache-duration"
                  name="cacheDuration"
                  type="number"
                  value={cacheDuration}
                  onChange={(e) => setCacheDuration(e.target.value)}
                />
              )}
              <div className="mt-2">
                <ActionButton
                  onClick={handleClearCache}
                  variant="secondary"
                  icon={
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                >
                  清除缓存
                </ActionButton>
              </div>
            </div>
          </SettingsTab>
          
          {/* 备份设置 */}
          <SettingsTab isActive={activeTab === 'backup'}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">备份设置</h2>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="auto-backup"
                    name="autoBackup"
                    type="checkbox"
                    checked={autoBackup}
                    onChange={(e) => setAutoBackup(e.target.checked)}
                    className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="auto-backup" className="font-medium text-gray-700">自动备份</label>
                  <p className="text-gray-500">按设定的频率自动创建系统备份</p>
                </div>
              </div>
              {autoBackup && (
                <>
                  <FormField
                    label="备份频率"
                    id="backup-frequency"
                    name="backupFrequency"
                    type="select"
                    value={backupFrequency}
                    onChange={(e) => setBackupFrequency(e.target.value)}
                    options={[
                      { value: 'daily', label: '每天' },
                      { value: 'weekly', label: '每周' },
                      { value: 'monthly', label: '每月' }
                    ]}
                  />
                  <FormField
                    label="备份保留天数"
                    id="backup-retention"
                    name="backupRetention"
                    type="number"
                    value={backupRetention}
                    onChange={(e) => setBackupRetention(e.target.value)}
                  />
                </>
              )}
              <div className="mt-2">
                <ActionButton
                  onClick={handleBackupNow}
                  variant="secondary"
                  icon={
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  }
                >
                  立即备份
                </ActionButton>
              </div>
            </div>
          </SettingsTab>
          
          {/* 操作按钮区域 */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <ActionButton
              onClick={handleOpenResetDialog}
              variant="danger"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              重置设置
            </ActionButton>
            <ActionButton
              onClick={handleSaveSettings}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
            >
              保存设置
            </ActionButton>
          </div>
        </div>
        
        {/* 重置设置确认对话框 */}
        <ConfirmDialog
          isOpen={isResetDialogOpen}
          title="重置设置"
          message="确定要将所有设置重置为默认值吗？此操作无法撤销。"
          confirmLabel="重置"
          cancelLabel="取消"
          onConfirm={handleResetSettings}
          onCancel={() => setIsResetDialogOpen(false)}
          variant="warning"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminSettings; 