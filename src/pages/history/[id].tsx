import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// 引入朝代数据
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
    image: '/images/history/pre-qin.png',
    content: `
      <p>先秦时期是中国饮食文化的初始阶段，从夏商周到春秋战国，经历了近两千年的发展。</p>
      
      <p>这一时期，饮食以谷物为主，肉食为辅。谷物主要有黍、稷、麦等。《诗经》中多次提到"我黍与与，我稷翼翼"，反映了当时粮食作物的重要性。肉食主要来自家畜饲养和狩猎，如牛、羊、猪、鹿等。《礼记》中记载"庖有六畜"，即猪、牛、羊、犬、鸡、马（后来马被替换为鱼）。</p>
      
      <p>烹饪方法较为简单，以煮、炙（烤）为主。商代青铜鼎的出现，标志着中国烹饪器具的重大进步。周代发明了蒸食法，出现了蒸饼、糕点等。调味品有盐、酱、醯（醋的前身）等。</p>
      
      <p>饮食礼仪开始形成。周代建立了严格的饮食等级制度，贵族与平民的饮食有明显区别。孔子提出了一系列饮食道德观念，如"食不厌精，脍不厌细"、"不时不食"等，对后世产生深远影响。</p>
      
      <p>酒文化在这一时期也有显著发展。《诗经》中有大量描写饮酒的诗句。甲骨文中已有"酒"字，商代酒已比较普及。周代出现了专门酿酒的官员"酒正"。春秋战国时期，饮酒成为士人交往的重要方式。</p>
    `,
    dishes: [
      {
        name: '甑糕',
        description: '先秦时期的一种蒸制糕点，用粘米粉制成，是最早的蒸制食品之一',
        image: '/images/dishes/zhenggao.png'
      },
      {
        name: '炙肉',
        description: '先秦时期最流行的肉食烹饪方式，将肉直接放在火上烤制',
        image: '/images/dishes/zhirou.png'
      },
      {
        name: '黍米饭',
        description: '用黍米煮成的饭，是先秦时期最主要的主食之一',
        image: '/images/dishes/shumi.png'
      }
    ]
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
    image: '/images/history/qin-han.png',
    content: `
      <p>秦汉时期是中国历史上的第一个大一统时代，也是饮食文化快速发展的重要时期。</p>
      
      <p>农业技术的进步带来了粮食增产，饮食材料更加丰富。秦汉时期，水田农业在南方得到发展，稻米成为南方主要粮食。北方则继续以小麦、粟为主食。</p>
      
      <p>西汉时期，张骞出使西域，带回了葡萄、胡桃、胡瓜、胡萝卜、芝麻等多种食材，这些被称为"胡食"的新食材极大丰富了中国饮食。</p>
      
      <p>馒头、饺子等面食在这一时期出现或发展。传说中，三国时期，诸葛亮为了祭祀江神而发明了馒头的雏形。汉代医圣张仲景为了治疗百姓冻伤耳朵，发明了"祛寒娇耳汤"，被认为是饺子的前身。</p>
      
      <p>宫廷饮食文化极为发达，特别是汉武帝时期。《汉书·礼乐志》记载："太官令丞，掌共御食珍羞百官宴享之事"，表明汉代宫廷已有专门负责饮食的机构。</p>
      
      <p>烹饪技艺更加精细，《释名》中记载了煎、熬、煮、蒸、炙、爓（炒）等烹饪方法。调味品种类增加，盐、醯（醋）、酱、豉（豆豉）等广泛使用。</p>
    `,
    dishes: [
      {
        name: '饺子',
        description: '据传由张仲景发明，最初用于治疗冻伤，后成为中国传统食品',
        image: '/images/dishes/jiaozi.png'
      },
      {
        name: '羊肉泡馍',
        description: '起源于秦汉时期，最初是军中食品，后成为西北地区名菜',
        image: '/images/dishes/paomo.png'
      },
      {
        name: '葡萄酒',
        description: '由张骞从西域引入，成为汉代贵族喜爱的饮品',
        image: '/images/dishes/putaojiu.png'
      }
    ]
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
    image: '/images/history/wei-jin.png',
    content: `
      <p>魏晋南北朝时期，由于长期分裂和民族迁徙，北方游牧民族的饮食习惯与中原饮食文化交融，同时南北方饮食差异加大。</p>
      
      <p>北方以面食为主，《齐民要术》中记载了多种面食做法，如煎饼、环饼、胡饼等。游牧民族喜食牛羊肉，使北方肉食烹饪更加丰富。</p>
      
      <p>南方则以稻米为主食，水产品丰富，鱼类烹饪方法多样。晋人陆机《毛诗草木鸟兽虫鱼疏》记载了多种鱼类及其烹饪方法。</p>
      
      <p>茶文化在这一时期兴起。西晋·张载《登成都白水楼》中有"开瓮取酒还赊米，洗盏烹茶细点藜"的诗句。茶逐渐从药用发展为日常饮品。</p>
      
      <p>北魏贾思勰所著《齐民要术》是这一时期最重要的饮食著作，详细记载了各种食物的加工方法，包括面食、肉食、蔬果、调味品等制作技术，是研究中国古代饮食的重要文献。</p>
      
      <p>文人雅士对饮食的审美追求提高，饮酒文化发达。竹林七贤"高谈清论，酒后雅韵"的风格影响了整个时代饮食文化的格调。</p>
    `,
    dishes: [
      {
        name: '冷淘',
        description: '魏晋时期流行的一种冷食，将煮熟的面条放入冷水中降温后食用',
        image: '/images/dishes/lengtao.png'
      },
      {
        name: '茗茶',
        description: '魏晋时期茶文化兴起，茶从药用逐渐发展为日常饮品',
        image: '/images/dishes/mingcha.png'
      },
      {
        name: '胡饼',
        description: '受北方游牧民族影响发展起来的面食，类似今天的烧饼',
        image: '/images/dishes/hubing.png'
      }
    ]
  }
  // 其他朝代数据可根据需要添加...
];

interface DynastyProps {
  dynasty: any;
}

export default function DynastyDetail({ dynasty }: DynastyProps) {
  const router = useRouter();
  
  // 如果页面正在加载中，或者没有找到朝代数据，显示加载状态
  if (router.isFallback || !dynasty) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-xl">加载中...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{dynasty.name} - 历史长廊 - 中国传统美食博物馆</title>
        <meta name="description" content={`探索${dynasty.name}的美食历史与文化特点。了解这一时期的代表性食物、烹饪技术及历史背景。`} />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 面包屑导航 */}
          <div className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-red-600">首页</Link>
            <span className="mx-2">/</span>
            <Link href="/history" className="hover:text-red-600">历史长廊</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{dynasty.name}</span>
          </div>
          
          {/* 头部信息 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 relative h-60 md:h-auto">
                {dynasty.image && (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dynasty.image})` }}></div>
                )}
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{dynasty.name}</h1>
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
          </div>
          
          {/* 详细内容 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{dynasty.name}饮食文化简介</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: dynasty.content }} />
          </div>
          
          {/* 代表性菜品 */}
          {dynasty.dishes && dynasty.dishes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">代表性菜品</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dynasty.dishes.map((dish, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden p-4">
                    <h3 className="font-bold text-lg mb-2">{dish.name}</h3>
                    <p className="text-gray-600 text-sm">{dish.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 相关朝代导航 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">探索其他朝代</h2>
            <div className="flex flex-wrap gap-3">
              {dynasties.map(d => (
                <Link 
                  href={`/history/${d.id}`} 
                  key={d.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    d.id === dynasty.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {d.name}
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
  // 获取URL中的朝代ID
  const id = params?.id;

  // 查找对应的朝代数据
  const dynasty = dynasties.find(d => d.id === id);

  // 如果没有找到，返回404
  if (!dynasty) {
    return {
      notFound: true,
    };
  }

  // 返回朝代数据
  return {
    props: {
      dynasty,
    },
  };
}; 