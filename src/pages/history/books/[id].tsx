import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// 重要典籍数据
const historicalBooks = [
  {
    id: 'qimin-yaoshu',
    name: '齐民要术',
    author: '贾思勰',
    period: '北魏',
    description: '中国现存最早的一部完整的农书，详细记载了各种农作物的种植和加工方法，包含大量饮食加工技术。',
    image: '/images/history/books/qimin-yaoshu.png',
    content: `
      <p>《齐民要术》是北魏时期贾思勰所著的一部农业百科全书，也是世界农学史上的重要典籍。全书共十卷，记述了当时先进的农业技术和丰富的饮食加工方法。</p>
      
      <p>在饮食方面，《齐民要术》详细记载了面食、肉食、蔬果、调味品等多种食品的加工技术。例如，书中记录了馒头、饼、糕等面食的制作方法，以及腌制、熏制等肉食保存技术。</p>
      
      <p>书中还详细介绍了酿酒技术，记载了黄酒、白酒等多种酒类的酿造方法。同时，还记录了酱、醋、豉等调味品的制作工艺。</p>
      
      <p>《齐民要术》中的烹饪技术反映了魏晋南北朝时期中国饮食文化的发展水平，对研究中国古代饮食史具有重要价值。书中提到的许多技术，如面食发酵、肉类腌制等，至今仍在使用。</p>
      
      <p>此外，《齐民要术》还记载了当时人们的饮食观念和习惯，如四季饮食调养、药膳等，体现了古人"医食同源"的思想。</p>
    `,
    recipes: [
      {
        name: '黄酒酿造法',
        description: '《齐民要术》中记载的传统黄酒酿造方法，使用粳米、曲药等原料',
        image: '/images/dishes/huangjiu.png'
      },
      {
        name: '沤酱法',
        description: '书中详细记载的酱制作方法，使用大豆经过发酵制成',
        image: '/images/dishes/jiang.png'
      }
    ]
  },
  {
    id: 'suiyuan-shidan',
    name: '随园食单',
    author: '袁枚',
    period: '清朝',
    description: '记录了300多种菜肴的制作方法，提出了"本味主义"的烹饪理念，对后世中国烹饪理论有深远影响。',
    image: '/images/history/books/suiyuan-shidan.png',
    content: `
      <p>《随园食单》是清代著名文学家、美食家袁枚所著的一部饮食专著，成书于乾隆五十七年（1792年）。全书记录了326道菜肴的制作方法，被誉为"中国古代最好的食谱"。</p>
      
      <p>袁枚在书中提出了"天然之味"的烹饪理念，强调尊重食材本身的风味，反对过度调味和烹饪。他认为："凡烹饪之法，必须知味，能知其味，然后能调其味。"这一理念对中国烹饪理论产生了深远影响。</p>
      
      <p>《随园食单》中的菜肴种类丰富，包括荤菜、素菜、点心、汤羹等多种类别。每种菜肴都有详细的原料和制作方法说明，具有很高的实用价值。</p>
      
      <p>此外，袁枚还在书中记录了当时的饮食文化和礼仪，如席面安排、餐具使用等，全面反映了清代中期的饮食文化特点。</p>
      
      <p>《随园食单》对后世中国烹饪艺术的发展产生了重要影响，其"本味主义"的烹饪理念被现代烹饪界继承和发扬。</p>
    `,
    recipes: [
      {
        name: '西湖醋鱼',
        description: '《随园食单》中记载的名菜，用鲜鱼配以醋、糖等调料烹制',
        image: '/images/dishes/xihuyu.png'
      },
      {
        name: '蟹粉狮子头',
        description: '书中推崇的一道名菜，用蟹黄和肉糜制成的大肉丸',
        image: '/images/dishes/shizitou.png'
      }
    ]
  },
  {
    id: 'bencao-gangmu',
    name: '本草纲目',
    author: '李时珍',
    period: '明朝',
    description: '收录了近2000种药物，其中许多也是食材，详细记载了它们的性味、功效和食用方法，是中医药膳学的重要典籍。',
    image: '/images/history/books/bencao-gangmu.png',
    content: `
      <p>《本草纲目》是明代医学家李时珍历时27年编撰的一部本草学著作，成书于1578年。全书共52卷，记载了1892种药物，被誉为"东方医学的巅峰之作"。</p>
      
      <p>在饮食文化方面，《本草纲目》具有重要价值。书中记载的药物中，有相当一部分也是常用食材，李时珍详细记述了它们的性味、功效和食用方法，为中医药膳学奠定了基础。</p>
      
      <p>李时珍在书中对很多食物都有详细记载，如谷类、蔬菜、水果、肉类、水产等，并指出它们的饮食价值和药用价值。例如，书中对茶、酒、蜂蜜等食品有专门论述，记载了它们的产地、品种、制作方法和食用价值。</p>
      
      <p>《本草纲目》还记录了许多食疗方法，如用食物治疗疾病的药膳。这些记载体现了中国传统"医食同源"的思想，对中华饮食文化产生了深远影响。</p>
      
      <p>此外，书中还收录了当时民间的饮食习俗和方法，如各地特色食品的制作工艺，对研究明代饮食文化具有重要参考价值。</p>
    `,
    recipes: [
      {
        name: '枸杞酒',
        description: '《本草纲目》中记载的一种药酒，用枸杞浸泡酒液制成，具有滋补功效',
        image: '/images/dishes/goujijiu.png'
      },
      {
        name: '姜蜜饮',
        description: '书中记载的一种饮品，用生姜和蜂蜜制成，具有温胃散寒的功效',
        image: '/images/dishes/jiangmiyin.png'
      }
    ]
  }
  // 可以添加更多典籍...
];

interface BookProps {
  book: any;
}

export default function BookDetail({ book }: BookProps) {
  const router = useRouter();
  
  // 如果页面正在加载中，或者没有找到典籍数据，显示加载状态
  if (router.isFallback || !book) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-xl">加载中...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{book.name} - 重要饮食典籍 - 中国传统美食博物馆</title>
        <meta name="description" content={`了解《${book.name}》的内容及其对中国饮食文化的贡献。探索书中记载的经典食谱和饮食理念。`} />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 面包屑导航 */}
          <div className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-red-600">首页</Link>
            <span className="mx-2">/</span>
            <Link href="/history" className="hover:text-red-600">历史长廊</Link>
            <span className="mx-2">/</span>
            <Link href="/history?tab=books" className="hover:text-red-600">重要饮食典籍</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{book.name}</span>
          </div>
          
          {/* 头部信息 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 relative h-60 md:h-auto">
                {book.image && (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${book.image})` }}></div>
                )}
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{book.name}</h1>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{book.period}</span>
                </div>
                <p className="text-gray-600 mb-4">作者: {book.author}</p>
                <p className="text-gray-700 mb-4">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* 详细内容 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">《{book.name}》内容摘要</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: book.content }} />
          </div>
          
          {/* 代表性食谱 */}
          {book.recipes && book.recipes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">书中记载的经典食谱</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {book.recipes.map((recipe, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      {recipe.image && (
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
                      <p className="text-gray-600 text-sm">{recipe.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 相关典籍导航 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">探索其他重要饮食典籍</h2>
            <div className="flex flex-wrap gap-3">
              {historicalBooks.map(b => (
                <Link 
                  href={`/history/books/${b.id}`} 
                  key={b.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    b.id === book.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 获取URL中的典籍ID
  const id = params?.id;

  // 查找对应的典籍数据
  const book = historicalBooks.find(b => b.id === id);

  // 如果没有找到，返回404
  if (!book) {
    return {
      notFound: true,
    };
  }

  // 返回典籍数据
  return {
    props: {
      book,
    },
  };
}; 