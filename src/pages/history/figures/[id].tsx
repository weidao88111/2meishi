import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// 历史人物数据
const historicalFigures = [
  {
    id: 'yi-yin',
    name: '伊尹',
    period: '商朝',
    contribution: '中国历史上第一位名厨，传说他发明了鼎器烹调法和多种调味方法，被称为"烹饪始祖"。',
    image: '/images/history/figures/yi-yin.png',
    content: `
      <p>伊尹，商朝初期著名的政治家、厨师，被后世尊为"烹饪始祖"。据传，他最初是有莘氏部落的奴隶，因为烹饪技术精湛，被商汤赏识并任用为厨师。</p>
      
      <p>伊尹精通烹饪之道，据传发明了鼎器烹调法，能够将各种食材的味道完美结合。他对调味品的运用也颇有研究，懂得使用各种香料提升菜肴风味。</p>
      
      <p>《吕氏春秋》中记载："伊尹为汤谋，始以庖厨。"这表明伊尹最初正是因为他的烹饪技术而得到商汤的赏识。在辅佐商汤灭夏建立商朝后，伊尹成为了一代名相，但他对中国烹饪史的贡献同样不可忽视。</p>
      
      <p>伊尹被认为是中国最早系统总结烹饪理论的人。据传，他著有《肴馔》一书，记载了当时的烹饪方法和食谱，可惜已经失传。</p>
      
      <p>在中国传统文化中，伊尹不仅是政治家，也是厨技的化身。他将烹饪技术与治国之道相结合，提出"调和五味"的思想，认为烹饪如同治国，需要恰到好处的平衡。</p>
    `,
    dishes: [
      {
        name: '八珍玉液羹',
        description: '据传是伊尹创制的名菜，选用八种珍贵食材熬制的浓汤',
        image: '/images/dishes/bazhen.png'
      },
      {
        name: '鼎炙牛肉',
        description: '用商代青铜鼎烹制的牛肉，肉质鲜嫩，风味独特',
        image: '/images/dishes/dingzhi.png'
      }
    ]
  },
  {
    id: 'su-dongpo',
    name: '苏东坡',
    period: '宋朝',
    contribution: '著名文学家，也是美食家。东坡肉、东坡豆腐等菜肴以他命名，对宋代饮食文化有重要贡献。',
    image: '/images/history/figures/su-dongpo.png',
    content: `
      <p>苏东坡（1037-1101），本名苏轼，字子瞻，号东坡居士，北宋文学家、书画家、美食家。他不仅是中国文学史上的巨匠，也是中国饮食文化史上的重要人物。</p>
      
      <p>苏东坡热爱美食，并亲自下厨研究烹饪技术。他在饮食上提倡"本味"，认为应当尊重食材本身的风味，不过分加工。他在《食书》中写道："蔬食充肠，鱼肉适口，不求多品，但愿适意而已。"</p>
      
      <p>最著名的"东坡肉"传说起源于苏东坡被贬黄州时期。他改良了当地的红烧肉做法，用慢火炖煮，使肥而不腻，肉质酥烂。此菜后被命名为"东坡肉"，成为中国传统名菜。</p>
      
      <p>除了东坡肉，还有东坡豆腐、东坡鱼等以他名字命名的菜肴。苏东坡在诗词中也常描写饮食，如"老饕餮，须细嚼"、"食饱勿语，脱粟勿抛"等，体现了他对饮食的热爱和见解。</p>
      
      <p>苏东坡对宋代饮食文化的影响深远，他提倡的自然本味、注重烹饪技法的饮食观念，至今仍对中国烹饪艺术有所启示。</p>
    `,
    dishes: [
      {
        name: '东坡肉',
        description: '以皮带肉的五花肉为原料，经过煎、炖等工艺烹制而成，肥而不腻，色泽红亮',
        image: '/images/dishes/dongporou.png'
      },
      {
        name: '东坡豆腐',
        description: '选用上等豆腐，加入葱、姜、蒜等调料，经过煎炒烧炖制成，口感细嫩',
        image: '/images/dishes/dongpodoufu.png'
      }
    ]
  },
  {
    id: 'yuan-mei',
    name: '袁枚',
    period: '清朝',
    contribution: '著有《随园食单》，系统记录了清代菜肴的制作方法，被誉为"中国古代最好的食谱"。',
    image: '/images/history/figures/yuan-mei.png',
    content: `
      <p>袁枚（1716-1797），字子才，号简斋，别号随园老人，清代著名文学家、美食家。他不仅在诗词文学上有很高造诣，更以饮食著作《随园食单》闻名后世。</p>
      
      <p>袁枚晚年居住在南京郊外的随园，常邀友人品尝他精心设计的菜肴。他对烹饪有独到见解，认为做菜要"适口"，既要讲究原料新鲜，又要保持食材本味，反对过分烹饪和调味。</p>
      
      <p>《随园食单》是袁枚最重要的饮食著作，记录了326道菜肴的制作方法，涵盖了鱼、肉、蔬菜、水产、点心等多种类别。该书被誉为"中国古代最好的食谱"，对研究清代饮食文化具有重要价值。</p>
      
      <p>袁枚在《随园食单》中提出了"天然之味"的烹饪理念，强调食材的新鲜和本味，反对过度调味。他说："凡烹饪之法，必须知味，能知其味，然后能调其味。"这一理念对后世中国烹饪艺术产生了深远影响。</p>
      
      <p>此外，袁枚还对饮食礼仪、餐具摆设等有独到见解，在《随园食单》中详细记载，全面反映了当时的饮食文化。</p>
    `,
    dishes: [
      {
        name: '紫酥糕',
        description: '《随园食单》中记载的一种精致点心，外酥内软，色泽紫红',
        image: '/images/dishes/zusugao.png'
      },
      {
        name: '蟹黄狮子头',
        description: '袁枚推崇的菜肴，用蟹黄与肉馅制成的大肉丸，鲜香可口',
        image: '/images/dishes/xiehuang.png'
      }
    ]
  }
  // 可以添加更多历史人物...
];

interface FigureProps {
  figure: any;
}

export default function FigureDetail({ figure }: FigureProps) {
  const router = useRouter();
  
  // 如果页面正在加载中，或者没有找到人物数据，显示加载状态
  if (router.isFallback || !figure) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-xl">加载中...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{figure.name} - 历史美食人物 - 中国传统美食博物馆</title>
        <meta name="description" content={`了解${figure.name}的生平及其对中国饮食文化的贡献。探索与${figure.name}相关的经典菜肴和饮食理念。`} />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 面包屑导航 */}
          <div className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-red-600">首页</Link>
            <span className="mx-2">/</span>
            <Link href="/history" className="hover:text-red-600">历史长廊</Link>
            <span className="mx-2">/</span>
            <Link href="/history?tab=figures" className="hover:text-red-600">历史美食人物</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{figure.name}</span>
          </div>
          
          {/* 头部信息 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 relative h-60 md:h-auto">
                {figure.image && (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${figure.image})` }}></div>
                )}
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{figure.name}</h1>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{figure.period}</span>
                </div>
                <p className="text-gray-700 mb-4">
                  {figure.contribution}
                </p>
              </div>
            </div>
          </div>
          
          {/* 详细内容 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{figure.name}生平与饮食贡献</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: figure.content }} />
          </div>
          
          {/* 代表性菜品 */}
          {figure.dishes && figure.dishes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">相关菜肴</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {figure.dishes.map((dish, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      {dish.image && (
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dish.image})` }}></div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{dish.name}</h3>
                      <p className="text-gray-600 text-sm">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 相关人物导航 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">探索其他历史美食人物</h2>
            <div className="flex flex-wrap gap-3">
              {historicalFigures.map(f => (
                <Link 
                  href={`/history/figures/${f.id}`} 
                  key={f.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    f.id === figure.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {f.name}
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
  // 获取URL中的人物ID
  const id = params?.id;

  // 查找对应的人物数据
  const figure = historicalFigures.find(f => f.id === id);

  // 如果没有找到，返回404
  if (!figure) {
    return {
      notFound: true,
    };
  }

  // 返回人物数据
  return {
    props: {
      figure,
    },
  };
}; 