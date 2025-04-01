import React, { useState } from 'react';
import Head from 'next/head';
import IngredientCard from '../../components/ingredients/IngredientCard';

// 食材类别
const categories = [
  { id: 'vegetables', name: '蔬菜类', icon: '🥬' },
  { id: 'meats', name: '肉类', icon: '🥩' },
  { id: 'seafood', name: '海鲜类', icon: '🦐' },
  { id: 'grains', name: '谷物类', icon: '🌾' },
  { id: 'spices', name: '调味料', icon: '🌶️' },
  { id: 'fungi', name: '菌菇类', icon: '🍄' },
  { id: 'fruits', name: '水果类', icon: '🍊' },
  { id: 'beans', name: '豆类', icon: '🫘' }
];

// 定义食材接口
interface Ingredient {
  id: string;
  name: string;
  englishName: string;
  category: string;
  description: string;
  nutritionalValue: string;
  culinaryUses: string;
  culturalSignificance: string;
  storageMethod: string;
  imageUrl: string;
}

// 食材数据
const ingredients: Ingredient[] = [
  {
    id: 'doufu',
    name: '豆腐',
    englishName: 'Tofu',
    category: 'beans',
    description: '豆腐是中国传统食材，由大豆制成，质地柔软，富含蛋白质。是中国饮食中的重要组成部分，有南豆腐、北豆腐、内酯豆腐等多种类型。',
    nutritionalValue: '豆腐富含优质植物蛋白、钙、镁等矿物质，热量低，是素食者良好的蛋白质来源。',
    culinaryUses: '可炒、煮、蒸、炖，制作麻婆豆腐、家常豆腐、豆腐脑等多种菜肴。',
    culturalSignificance: '豆腐代表着中国传统饮食的智慧，象征着物美价廉和民以食为天的理念。',
    storageMethod: '鲜豆腐需冷藏保存，每日更换清水可延长保质期。',
    imageUrl: '/images/ingredients/doufu.png'
  },
  {
    id: 'huajiao',
    name: '花椒',
    englishName: 'Sichuan Pepper',
    category: 'spices',
    description: '花椒是中国特有的调味料，是川菜的灵魂香料之一。颗粒呈褐红色，有独特的麻香味。',
    nutritionalValue: '花椒含有挥发油，有促进消化、增进食欲的功效。',
    culinaryUses: '用于川菜中制作麻辣口味，如麻婆豆腐、水煮鱼等；也可用于卤煮和香料包。',
    culturalSignificance: '花椒是川菜"麻辣"风味的关键，体现了中国饮食文化中的"辛香去腻"理念。',
    storageMethod: '干燥密封保存，避免阳光直射，可保存较长时间。',
    imageUrl: '/images/ingredients/huajiao.png'
  },
  {
    id: 'xianggu',
    name: '香菇',
    englishName: 'Shiitake Mushroom',
    category: 'fungi',
    description: '香菇是中国传统食用菌，菌盖呈伞状，褐色，干香菇有浓郁的香气，鲜香菇口感鲜嫩。',
    nutritionalValue: '富含蛋白质、膳食纤维和多种维生素，有益于心血管健康。',
    culinaryUses: '可炒、煮汤、蒸制，常用于素菜、肉类炖煮和汤品中，能提升菜肴的鲜香味。',
    culturalSignificance: '香菇在中国烹饪中有"素中之荤"的美誉，是素食料理的重要食材。',
    storageMethod: '干香菇密封避光保存；鲜香菇冷藏，最好放入纸袋中保持干燥。',
    imageUrl: '/images/ingredients/xianggu.png'
  },
  {
    id: 'zhurou',
    name: '猪肉',
    englishName: 'Pork',
    category: 'meats',
    description: '猪肉是中国最主要的肉类食材，不同部位有不同用途。五花肉、里脊、前后腿各有特色。',
    nutritionalValue: '富含优质蛋白质、B族维生素和铁等矿物质。',
    culinaryUses: '可红烧、炖煮、炒制、蒸煮等多种烹饪方式，用于制作红烧肉、东坡肉、回锅肉等经典菜肴。',
    culturalSignificance: '猪在中国文化中象征着富足和好运，猪肉是节日和喜庆餐桌上的重要食材。',
    storageMethod: '冷鲜猪肉冷藏保存3-5天；冷冻猪肉可保存约3个月。',
    imageUrl: '/images/ingredients/zhurou.png'
  },
  {
    id: 'doubanjiang',
    name: '豆瓣酱',
    englishName: 'Doubanjiang',
    category: 'spices',
    description: '豆瓣酱是一种发酵酱料，主要由蚕豆、辣椒制成，是川菜的灵魂调料之一。郫县豆瓣酱尤为有名。',
    nutritionalValue: '含有蛋白质、B族维生素和多种矿物质，发酵过程产生有益菌群。',
    culinaryUses: '用于烹制麻婆豆腐、回锅肉、水煮鱼等川菜，能够提供浓郁的咸鲜辣味。',
    culturalSignificance: '豆瓣酱代表了中国古老的发酵技艺，是川菜文化的重要组成部分。',
    storageMethod: '密封冷藏保存，可存放1年以上，随着时间推移风味会更加醇厚。',
    imageUrl: '/images/ingredients/doubanjiang.png'
  },
  {
    id: 'xiaomi',
    name: '小米',
    englishName: 'Millet',
    category: 'grains',
    description: '小米是中国北方传统粮食作物，颗粒细小，黄色，口感软糯，营养丰富。',
    nutritionalValue: '富含碳水化合物、蛋白质、B族维生素和多种矿物质，特别是铁和镁含量丰富。',
    culinaryUses: '可熬粥、蒸饭、制作小米糕点等，北方常见的小米粥是传统早餐。',
    culturalSignificance: '小米在中国北方有"救荒粮"的美誉，象征着勤俭和生命力。',
    storageMethod: '干燥密封保存，避免受潮，可保存较长时间。',
    imageUrl: '/images/ingredients/xiaomi.png'
  },
  {
    id: 'jiucai',
    name: '韭菜',
    englishName: 'Chinese Chives',
    category: 'vegetables',
    description: '韭菜是中国传统蔬菜，叶扁长，有独特的香气，四季可种植。',
    nutritionalValue: '富含维生素C、维生素A、钙和铁等，有一定的抗氧化作用。',
    culinaryUses: '适合炒食、包饺子、制作馅料，常见韭菜炒蛋、韭菜盒子等菜肴。',
    culturalSignificance: '韭菜在民间有"发物"的说法，春季食用被认为有助于阳气生发。',
    storageMethod: '鲜韭菜用湿纸巾包裹，放入保鲜袋中冷藏，可保存3-5天。',
    imageUrl: '/images/ingredients/jiucai.png'
  },
  {
    id: 'xiaren',
    name: '虾仁',
    englishName: 'Shrimp Meat',
    category: 'seafood',
    description: '虾仁是去壳的虾肉，肉质鲜嫩，口感Q弹，是海鲜料理中的常用食材。',
    nutritionalValue: '富含优质蛋白质、牛磺酸、不饱和脂肪酸和微量元素，尤其是钙、锌含量较高。',
    culinaryUses: '可炒、煮汤、蒸制，制作虾仁炒蛋、虾仁蒸蛋、虾仁粥等多种菜肴。',
    culturalSignificance: '虾在中国文化中象征着喜庆和欢乐，"笑逐颜开"的虾象征着欢快的情绪。',
    storageMethod: '鲜虾仁应尽快食用，可冷藏1-2天；冷冻虾仁可保存约1个月。',
    imageUrl: '/images/ingredients/xiaren.png'
  }
];

// 定义食材分类接口
interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function IngredientsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 根据分类和搜索词过滤食材
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesCategory = selectedCategory ? ingredient.category === selectedCategory : true;
    const matchesSearch = searchTerm
      ? ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.englishName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // 根据分类ID查找分类名称
  const getCategoryName = (categoryId: string): string[] => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? [category.name] : [];
  };

  return (
    <>
      <Head>
        <title>食材百科 - 中国传统美食博物馆</title>
        <meta 
          name="description" 
          content="探索中国传统美食食材百科，了解各类食材的营养价值、烹饪用途和文化意义。" 
        />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">中国传统食材百科</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              探索中国烹饪中使用的传统食材，了解它们的营养价值、烹饪方法和文化意义，
              传承千年烹饪智慧，品味舌尖上的中国。
            </p>
          </div>
          
          {/* 搜索栏 */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="搜索食材..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 分类选择 */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`p-2 rounded-lg text-center transition-colors ${
                  selectedCategory === null ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                全部
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    selectedCategory === category.id ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  <span className="block text-xl mb-1">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* 内容区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map(ingredient => (
                <div key={ingredient.id} className="h-full">
                  <IngredientCard
                    id={ingredient.id}
                    name={ingredient.name}
                    englishName={ingredient.englishName}
                    description={ingredient.description}
                    imageUrl={ingredient.imageUrl}
                    category={getCategoryName(ingredient.category)}
                  />
                  <div className="mt-4 bg-white shadow-md rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">详细信息</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">营养价值：</span>
                        <span className="text-gray-600">{ingredient.nutritionalValue}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">烹饪用途：</span>
                        <span className="text-gray-600">{ingredient.culinaryUses}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">文化意义：</span>
                        <span className="text-gray-600">{ingredient.culturalSignificance}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">储存方法：</span>
                        <span className="text-gray-600">{ingredient.storageMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">未找到匹配的食材</h3>
                <p className="text-gray-500">
                  尝试使用不同的搜索词或选择其他分类
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 