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
  ConfirmDialog,
  Modal,
  FormField,
  useToast
} from '@/components/admin';

// 食材数据接口
interface Ingredient {
  id: number;
  name: string;
  englishName: string;
  category: string;
  description: string;
  nutritionFacts: string;
  seasonality: string;
  images: string[];
}

// 样例数据
const ingredients: Ingredient[] = [
  {
    id: 1,
    name: '豆腐',
    englishName: 'Tofu',
    category: '豆制品',
    description: '豆腐，又称豆腐，是一种传统的中国食品，主要成分是大豆蛋白。豆腐质地柔软，味道清淡，可以吸收各种调味料的风味。',
    nutritionFacts: '富含蛋白质、钙、铁等营养素，热量低，适合减肥人士食用。',
    seasonality: '全年',
    images: ['/images/ingredients/tofu-1.jpg', '/images/ingredients/tofu-2.jpg']
  },
  {
    id: 2,
    name: '茭白',
    englishName: 'Water Bamboo',
    category: '蔬菜',
    description: '茭白是一种水生蔬菜，外形似竹笋，肉质脆嫩，味道鲜美。在中国南方地区广泛种植。',
    nutritionFacts: '含有丰富的膳食纤维和维生素C，有助于消化和增强免疫力。',
    seasonality: '夏季、秋季',
    images: ['/images/ingredients/water-bamboo-1.jpg']
  },
  {
    id: 3,
    name: '干香菇',
    englishName: 'Dried Shiitake Mushroom',
    category: '菌类',
    description: '干香菇是晒干或烘干的香菇，具有浓郁的香气和鲜美的口感，是中国烹饪中常用的调味食材。',
    nutritionFacts: '富含蛋白质、维生素D和多种矿物质，有增强免疫力的作用。',
    seasonality: '全年',
    images: ['/images/ingredients/dried-shiitake-1.jpg', '/images/ingredients/dried-shiitake-2.jpg']
  },
  {
    id: 4,
    name: '花椒',
    englishName: 'Sichuan Pepper',
    category: '香料',
    description: '花椒是一种常用的中国香料，具有独特的麻辣味道，是川菜中不可或缺的调料。',
    nutritionFacts: '含有挥发油，有温中散寒、杀虫止痒的功效。',
    seasonality: '秋季',
    images: ['/images/ingredients/sichuan-pepper-1.jpg']
  },
  {
    id: 5,
    name: '豆瓣酱',
    englishName: 'Doubanjiang',
    category: '调味品',
    description: '豆瓣酱是一种由发酵豆类制成的辣酱，色泽红亮，味道咸鲜微辣，是川菜的灵魂调料之一。',
    nutritionFacts: '含有多种氨基酸和矿物质，适量食用有助于增进食欲。',
    seasonality: '全年',
    images: ['/images/ingredients/doubanjiang-1.jpg']
  },
  {
    id: 6,
    name: '莲藕',
    englishName: 'Lotus Root',
    category: '蔬菜',
    description: '莲藕是莲花的地下茎，断面呈多孔状，口感脆嫩，可炒、可炖、可做凉菜。',
    nutritionFacts: '富含淀粉、膳食纤维和维生素C，有清热解毒、养胃健脾的功效。',
    seasonality: '夏季、秋季',
    images: ['/images/ingredients/lotus-root-1.jpg', '/images/ingredients/lotus-root-2.jpg']
  },
  {
    id: 7,
    name: '木耳',
    englishName: 'Black Fungus',
    category: '菌类',
    description: '木耳是一种食用真菌，呈黑色或深褐色，质地柔韧，味道鲜美，可凉拌、炒食或做汤。',
    nutritionFacts: '富含植物胶质和铁元素，有活血化瘀、补血益气的功效。',
    seasonality: '全年',
    images: ['/images/ingredients/black-fungus-1.jpg']
  },
  {
    id: 8,
    name: '料酒',
    englishName: 'Chinese Cooking Wine',
    category: '调味品',
    description: '料酒是中国烹饪中常用的一种调味酒，能去腥解膻，增添菜肴香气。',
    nutritionFacts: '含有少量乙醇和多种氨基酸，适量使用可增进食欲。',
    seasonality: '全年',
    images: ['/images/ingredients/cooking-wine-1.jpg']
  },
  {
    id: 9,
    name: '龙眼肉',
    englishName: 'Dried Longan',
    category: '干果',
    description: '龙眼肉是龙眼果实去壳晒干后的果肉，甜美可口，常用于中医药膳或甜品制作。',
    nutritionFacts: '富含葡萄糖、蔗糖和维生素A，有益气补血、安神益智的功效。',
    seasonality: '全年',
    images: ['/images/ingredients/dried-longan-1.jpg']
  },
  {
    id: 10,
    name: '八角',
    englishName: 'Star Anise',
    category: '香料',
    description: '八角是一种常用的中国香料，呈八角星形状，有浓郁的茴香气味，常用于炖肉和卤味菜肴。',
    nutritionFacts: '含有挥发油和茴香脑，有理气和胃、温中散寒的功效。',
    seasonality: '全年',
    images: ['/images/ingredients/star-anise-1.jpg', '/images/ingredients/star-anise-2.jpg']
  }
];

const AdminIngredients: React.FC = () => {
  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState<Ingredient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null);
  const { showToast } = useToast();
  
  const pageSize = 5;
  
  // 获取所有可用的食材类别
  const categories = Array.from(new Set(ingredients.map(ingredient => ingredient.category)));
  
  // 筛选食材
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = searchTerm === '' || 
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || ingredient.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // 分页逻辑
  const totalPages = Math.ceil(filteredIngredients.length / pageSize);
  const currentIngredients = filteredIngredients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // 处理函数
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);
  
  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  }, []);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleViewIngredient = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
    setIsModalOpen(true);
  };
  
  const handleAddIngredient = () => {
    console.log('Add ingredient');
    // 实际项目中可以导航到创建食材页面或打开创建食材的模态框
  };
  
  const handleEditIngredient = (ingredient: Ingredient) => {
    console.log('Edit ingredient', ingredient);
    // 实际项目中可以导航到编辑食材页面或打开编辑食材的模态框
  };
  
  const openDeleteDialog = (ingredient: Ingredient) => {
    setIngredientToDelete(ingredient);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteIngredient = () => {
    if (ingredientToDelete) {
      console.log('Delete ingredient', ingredientToDelete);
      // 实际项目中可以发送API请求删除食材
      
      // 显示成功提示
      showToast(`食材 "${ingredientToDelete.name}" 已成功删除`, 'success');
      
      setIsDeleteDialogOpen(false);
      setIngredientToDelete(null);
    }
  };
  
  return (
    <AdminLayout 
      title="食材管理" 
      breadcrumbs={[{ label: '食材管理', href: '/admin/ingredients' }]}
    >
      <Head>
        <title>食材管理 - 中国传统美食博物馆</title>
      </Head>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">食材管理</h1>
          <ActionButton
            onClick={handleAddIngredient}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            添加食材
          </ActionButton>
        </div>
        
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <SearchBar
            placeholder="搜索食材名称、英文名或描述..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <SelectFilter
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={[
              { value: '', label: '全部类别' },
              ...categories.map(category => ({ value: category, label: category }))
            ]}
          />
        </div>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">食材名称</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">类别</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">英文名</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">季节性</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {currentIngredients.length > 0 ? (
                currentIngredients.map((ingredient) => (
                  <tr key={ingredient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {ingredient.images && ingredient.images.length > 0 ? (
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={ingredient.images[0]}
                              alt={ingredient.name}
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200" />
                        )}
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{ingredient.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{ingredient.category}</td>
                    <td className="px-6 py-4">{ingredient.englishName}</td>
                    <td className="px-6 py-4">{ingredient.seasonality}</td>
                    <td className="px-6 py-4">
                      <TableActionButtons
                        onView={() => handleViewIngredient(ingredient)}
                        onEdit={() => handleEditIngredient(ingredient)}
                        onDelete={() => openDeleteDialog(ingredient)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4">
                    <EmptyState message="没有找到匹配的食材" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredIngredients.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        
        {/* 删除确认对话框 */}
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="删除食材"
          message={`确定要删除食材 "${ingredientToDelete?.name}" 吗？此操作无法撤销。`}
          confirmLabel="删除"
          cancelLabel="取消"
          onConfirm={handleDeleteIngredient}
          onCancel={() => setIsDeleteDialogOpen(false)}
          variant="danger"
        />
        
        {/* 食材详情模态框 */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`食材详情: ${currentIngredient?.name || ''}`}
          size="large"
        >
          {currentIngredient && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                {currentIngredient.images && currentIngredient.images.length > 0 ? (
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
                    <img
                      src={currentIngredient.images[0]}
                      alt={currentIngredient.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-w-4 aspect-h-3 flex items-center justify-center rounded-lg bg-gray-100">
                    <span className="text-gray-400">无图片</span>
                  </div>
                )}
                
                {currentIngredient.images && currentIngredient.images.length > 1 && (
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {currentIngredient.images.map((image, idx) => (
                      <div key={idx} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md">
                        <img
                          src={image}
                          alt={`${currentIngredient.name} ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">基本信息</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">中文名</dt>
                      <dd className="mt-1 text-sm text-gray-900">{currentIngredient.name}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">英文名</dt>
                      <dd className="mt-1 text-sm text-gray-900">{currentIngredient.englishName}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">类别</dt>
                      <dd className="mt-1 text-sm text-gray-900">{currentIngredient.category}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">季节性</dt>
                      <dd className="mt-1 text-sm text-gray-900">{currentIngredient.seasonality}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">描述</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{currentIngredient.description}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">营养成分</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{currentIngredient.nutritionFacts}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminIngredients; 