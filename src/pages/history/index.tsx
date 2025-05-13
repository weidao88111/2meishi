import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// 朝代数据
const dynasties = [
  {
    id: 'pre-qin',
    name: '先秦时期',
    period: '公元前2100年-公元前221年',
    description: '中国饮食文化的起源阶段，主要以谷物为主食，辅以简单的肉食和野菜。礼仪饮食开始形成，"食不厌精，脍不厌细"的观念已经出现。',
    keyEvents: [
      '《诗经》中记载了许多饮食习俗',
      '孔子提出"食不言，寝不语"等饮食礼仪',
      '越王勾践"卧薪尝胆"的典故',
      '禹王治水时期的"八珍"饮食文化'
    ],
    significantFoods: ['黍米', '稷', '麦', '糯米', '羹'],
    image: '/images/history/pre-qin.png'
  },
  {
    id: 'qin-han',
    name: '秦汉时期',
    period: '公元前221年-公元220年',
    description: '这一时期饮食文化迅速发展，随着农业生产力的提高和对外交流的增加，饮食种类日益丰富。张骞出使西域带回了许多新的食材，极大丰富了中国饮食。',
    keyEvents: [
      '《齐民要术》记载了详细的农业和饮食技术',
      '张骞从西域引进葡萄、胡桃、胡瓜等食材',
      '汉代"食案"的出现，餐具逐渐完善',
      '宫廷饮食文化的兴盛'
    ],
    significantFoods: ['馒头', '饺子', '葡萄酒', '羊肉泡馍', '蒸饼'],
    image: '/images/history/qin-han.png'
  },
  {
    id: 'wei-jin',
    name: '魏晋南北朝',
    period: '220年-589年',
    description: '南北方饮食文化差异开始明显，北方以面食为主，南方以稻米为主。文人雅士对饮食的审美追求提高，精致的宴饮文化兴起。',
    keyEvents: [
      '北方游牧民族的饮食习惯融入中原文化',
      '茶文化兴起，开始有系统的茶道理论',
      '《齐民要术》成书，记载了大量烹饪技术',
      '南方水产品烹饪方式的创新'
    ],
    significantFoods: ['茶', '面条', '炙肉', '粽子', '冷淘'],
    image: '/images/history/wei-jin.png'
  },
  {
    id: 'tang-song',
    name: '唐宋时期',
    period: '618年-1279年',
    description: '中国饮食文化的黄金时期，唐代宫廷菜肴华丽繁复，宋代饮食更加平民化，茶馆、酒楼、点心铺遍布城市，中国饮食业进入高度商业化阶段。',
    keyEvents: [
      '唐朝对外贸易繁荣，引入异域香料',
      '宋代出现大量食谱和饮食专著',
      '酒楼文化兴盛，出现专业厨师群体',
      '点茶法的流行与斗茶活动'
    ],
    significantFoods: ['点心', '火锅', '糖醋鱼', '东坡肉', '茶点'],
    image: '/images/history/tang-song.png'
  },
  {
    id: 'yuan',
    name: '元代',
    period: '1271年-1368年',
    description: '蒙古饮食文化与中原饮食文化交融，肉类消费增加，乳制品在北方广泛流行。马可·波罗的到来也促进了中西饮食文化的初步交流。',
    keyEvents: [
      '蒙古饮食习惯影响中原，烤全羊等食物流行',
      '奶制品加工技术的传入和发展',
      '马可·波罗带来西方饮食见闻',
      '宫廷设立专门的饮膳机构'
    ],
    significantFoods: ['奶茶', '烤全羊', '馓子', '蒙古包肉', '奶酪'],
    image: '/images/history/yuan.png'
  },
  {
    id: 'ming-qing',
    name: '明清时期',
    period: '1368年-1912年',
    description: '中国传统饮食进入成熟期，地方菜系明确形成，饮食理论著作丰富，南北饮食特色鲜明。随着新大陆作物的引入，玉米、番薯、辣椒等食材极大丰富了中国人的餐桌。',
    keyEvents: [
      '《本草纲目》系统记载食材药用价值',
      '《随园食单》等美食著作的出现',
      '八大菜系正式形成，地方特色鲜明',
      '新大陆食材如辣椒、番茄、玉米的引入'
    ],
    significantFoods: ['满汉全席', '宫廷菜', '四川火锅', '北京烤鸭', '扬州炒饭'],
    image: '/images/history/ming-qing.png'
  },
  {
    id: 'modern',
    name: '近现代',
    period: '1912年-至今',
    description: '中国饮食在保持传统的同时，不断吸收世界各地的烹饪技巧。改革开放后，饮食产业蓬勃发展，中餐走向世界，同时西方快餐也进入中国。如今，中国饮食文化正在迎来传统与创新的新融合。',
    keyEvents: [
      '中西餐饮文化的交流融合',
      '厨师职业化和烹饪教育的普及',
      '中华饮食文化的全球化传播',
      '新食材、新技术带来的烹饪创新'
    ],
    significantFoods: ['融合菜', '分子料理', '改良传统菜', '健康食品', '地方特色小吃'],
    image: '/images/history/modern.png'
  }
];

// 历史人物
const historicalFigures = [
  {
    id: 'yi-yin',
    name: '伊尹',
    period: '商朝',
    contribution: '中国历史上第一位名厨，传说他发明了鼎器烹调法和多种调味方法，被称为"烹饪始祖"。',
    image: '/images/history/figures/yi-yin.png'
  },
  {
    id: 'su-dongpo',
    name: '苏东坡',
    period: '宋朝',
    contribution: '著名文学家，也是美食家。东坡肉、东坡豆腐等菜肴以他命名，对宋代饮食文化有重要贡献。',
    image: '/images/history/figures/su-dongpo.png'
  },
  {
    id: 'yuan-mei',
    name: '袁枚',
    period: '清朝',
    contribution: '著有《随园食单》，系统记录了清代菜肴的制作方法，被誉为"中国古代最好的食谱"。',
    image: '/images/history/figures/yuan-mei.png'
  },
  {
    id: 'Li-Shizhen',
    name: '李时珍',
    period: '明朝',
    contribution: '《本草纲目》的作者，系统记载了大量食材的药用价值和食用方法，对中医药膳理论贡献巨大。',
    image: '/images/history/figures/li-shizhen.png'
  }
];

// 重要典籍
const historicalBooks = [
  {
    id: 'qimin-yaoshu',
    name: '齐民要术',
    author: '贾思勰',
    period: '北魏',
    description: '中国现存最早的一部完整的农书，详细记载了各种农作物的种植和加工方法，包含大量饮食加工技术。',
    image: '/images/history/books/qimin-yaoshu.png'
  },
  {
    id: 'suiyuan-shidan',
    name: '随园食单',
    author: '袁枚',
    period: '清朝',
    description: '记录了300多种菜肴的制作方法，提出了"本味主义"的烹饪理念，对后世中国烹饪理论有深远影响。',
    image: '/images/history/books/suiyuan-shidan.png'
  },
  {
    id: 'bencao-gangmu',
    name: '本草纲目',
    author: '李时珍',
    period: '明朝',
    description: '收录了近2000种药物，其中许多也是食材，详细记载了它们的性味、功效和食用方法，是中医药膳学的重要典籍。',
    image: '/images/history/books/bencao-gangmu.png'
  },
  {
    id: 'yinshan-zhengyao',
    name: '饮膳正要',
    author: '忽思慧',
    period: '元朝',
    description: '元代宫廷御膳食谱，详细记载了蒙古、中亚和中原的饮食文化交融，是研究元代饮食的重要史料。',
    image: '/images/history/books/yinshan-zhengyao.png'
  }
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'figures' | 'books'>('timeline');
  const [selectedDynasty, setSelectedDynasty] = useState<string | null>(null);

  // 根据选择显示朝代内容
  const displayedDynasties = selectedDynasty 
    ? dynasties.filter(dynasty => dynasty.id === selectedDynasty)
    : dynasties;

  return (
    <>
      <Head>
        <title>历史长廊 - 中国传统美食博物馆</title>
        <meta 
          name="description" 
          content="探索中国饮食文化的历史演变，了解各个朝代的饮食特点、历史名厨和重要典籍。" 
        />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">中国饮食文化历史长廊</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              穿越时空，探索五千年中华饮食文化的演变历程，
              了解历代美食发展、著名美食家和重要饮食典籍。
            </p>
          </div>
          
          {/* 标签页切换 */}
          <div className="flex justify-center mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'timeline'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              朝代美食演变
            </button>
            <button
              onClick={() => setActiveTab('figures')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'figures'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              历史美食人物
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'books'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              重要饮食典籍
            </button>
          </div>
          
          {/* 朝代时间线 */}
          {activeTab === 'timeline' && (
            <div>
              {/* 朝代选择器 */}
              <div className="mb-8">
                <div className="flex overflow-x-auto pb-2 space-x-2">
                  <button
                    onClick={() => setSelectedDynasty(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedDynasty === null
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    全部朝代
                  </button>
                  {dynasties.map(dynasty => (
                    <button
                      key={dynasty.id}
                      onClick={() => setSelectedDynasty(dynasty.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                        selectedDynasty === dynasty.id
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {dynasty.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 朝代内容 */}
              <div className="space-y-12">
                {displayedDynasties.map((dynasty, index) => (
                  <div key={dynasty.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/history/${dynasty.id}`}>
                    <div className="md:flex">
                      <div className="md:w-1/3 relative h-60 md:h-auto">
                        {dynasty.image && (
                          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dynasty.image})` }}></div>
                        )}
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold text-gray-900">{dynasty.name}</h2>
                          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{dynasty.period}</span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {dynasty.description}
                        </p>
                        
                        <h3 className="font-semibold mb-2 text-gray-800">重要事件</h3>
                        <ul className="list-disc pl-5 mb-4 text-gray-600 text-sm">
                          {dynasty.keyEvents.map((event, i) => (
                            <li key={i}>{event}</li>
                          ))}
                        </ul>
                        
                        <h3 className="font-semibold mb-2 text-gray-800">代表性食物</h3>
                        <div className="flex flex-wrap gap-2">
                          {dynasty.significantFoods.map((food, i) => (
                            <span key={i} className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm">
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 历史人物 */}
          {activeTab === 'figures' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {historicalFigures.map(figure => (
                <div key={figure.id} className="bg-white rounded-lg shadow-md overflow-hidden flex hover:shadow-lg transition-shadow">
                  <Link href={`/history/figures/${figure.id}`} className="flex w-full">
                  <div className="w-1/3 relative">
                    {figure.image && (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${figure.image})` }}></div>
                    )}
                  </div>
                  <div className="p-4 w-2/3">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-bold">{figure.name}</h2>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{figure.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {figure.contribution}
                    </p>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          {/* 重要典籍 */}
          {activeTab === 'books' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {historicalBooks.map(book => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden flex hover:shadow-lg transition-shadow">
                  <Link href={`/history/books/${book.id}`} className="flex w-full">
                  <div className="w-1/3 relative">
                    {book.image && (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${book.image})` }}></div>
                    )}
                  </div>
                  <div className="p-4 w-2/3">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold">{book.name}</h2>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>作者: {book.author}</span>
                        <span>{book.period}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {book.description}
                    </p>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          {/* 底部引用说明 */}
          <div className="mt-12 bg-gray-50 p-4 rounded-lg text-xs text-gray-500">
            <p>资料来源：《中国饮食文化史》、《中华饮食文明》等。图片仅供参考，版权归原作者所有。</p>
            <p className="mt-1">注：以上内容为中国饮食历史的简要概述，实际历史更加丰富多元。</p>
          </div>
        </div>
      </div>
    </>
  );
} 