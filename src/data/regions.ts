export interface Region {
  id: number;
  name: string;
  englishName: string;
  description: string;
  cuisine: string;  // 代表菜系
  features: string[];  // 特色
  famousDishes: string[];  // 著名菜品
  image: string;
}

export const regions: Region[] = [
  {
    id: 1,
    name: '川菜',
    englishName: 'Sichuan Cuisine',
    description: '川菜以麻辣著称，讲究"一菜一格，百菜百味"，风味独特，口味多变。川菜使用各种辣椒、花椒和香料，创造出麻、辣、鲜、香、酸、甜等多种味型。',
    cuisine: '四川菜系',
    features: ['麻辣', '香辣', '酸辣', '鱼香'],
    famousDishes: ['麻婆豆腐', '回锅肉', '水煮鱼', '宫保鸡丁'],
    image: '/images/regions/sichuan.png'
  },
  {
    id: 2,
    name: '粤菜',
    englishName: 'Cantonese Cuisine',
    description: '粤菜原料丰富多样，烹调技法多达数十种，讲究"鲜、嫩、爽、滑"，保持食材的原汁原味。粤菜注重选料新鲜，口味清淡，善用蒸、炒等烹饪方式。',
    cuisine: '广东菜系',
    features: ['清淡', '鲜美', '嫩滑', '多样'],
    famousDishes: ['白切鸡', '脆皮烧鹅', '蜜汁叉烧', '清蒸鱼'],
    image: '/images/regions/guangdong.png'
  },
  {
    id: 3,
    name: '鲁菜',
    englishName: 'Shandong Cuisine',
    description: '鲁菜是中国最古老的菜系之一，技法多样，讲究火候精准，味道醇厚。鲁菜口味偏咸鲜，擅长炒、爆、烧等烹饪技艺，代表了北方菜肴的风格特点。',
    cuisine: '山东菜系',
    features: ['咸鲜', '醇厚', '火候精准', '选料严谨'],
    famousDishes: ['葱烧海参', '烤全鱼', '九转大肠', '德州扒鸡'],
    image: '/images/regions/shandong.png'
  },
  {
    id: 4,
    name: '苏菜',
    englishName: 'Jiangsu Cuisine',
    description: '苏菜精致细腻，注重刀工和火候，讲究"浓油赤酱"与"清淡鲜香"的统一。苏菜选料严谨，擅长煨、焖、炖等技法，菜品造型美观，风味独特。',
    cuisine: '江苏菜系',
    features: ['精致', '细腻', '平和', '鲜甜'],
    famousDishes: ['清蒸蟹粉狮子头', '松鼠桂鱼', '盐水鸭', '水晶肴肉'],
    image: '/images/regions/jiangsu.png'
  },
  {
    id: 5,
    name: '浙菜',
    englishName: 'Zhejiang Cuisine',
    description: '浙菜以鲜、嫩、脆、爽、美为特色，重视原料的鲜度，烹调技法多样。浙菜口味清鲜淡雅，注重菜品色香味形的和谐统一，富有江南水乡特色。',
    cuisine: '浙江菜系',
    features: ['鲜美', '清淡', '精致', '脆嫩'],
    famousDishes: ['西湖醋鱼', '东坡肉', '龙井虾仁', '叫化鸡'],
    image: '/images/regions/zhejiang.png'
  },
  {
    id: 6,
    name: '闽菜',
    englishName: 'Fujian Cuisine',
    description: '闽菜以海鲜为主要食材，讲究"鲜、香、脆、嫩、汁浓、味美"。闽菜善用汤，讲究红糟、鱼露等独特调味品，注重菜肴色泽鲜艳，滋味清鲜。',
    cuisine: '福建菜系',
    features: ['清鲜', '汤汁浓郁', '讲究调味', '海鲜为主'],
    famousDishes: ['佛跳墙', '沙茶面', '芋泥肉丸', '烧肉粽'],
    image: '/images/regions/fujian.png'
  },
  {
    id: 7,
    name: '湘菜',
    englishName: 'Hunan Cuisine',
    description: '湘菜以香辣著称，重油重辣，味浓色艳。湘菜选料广泛，烹调技法多样，尤其擅长煸、炒、腊、熏、蒸等技法，菜品特色鲜明，注重口感和香味。',
    cuisine: '湖南菜系',
    features: ['香辣', '浓郁', '酸辣', '鲜香'],
    famousDishes: ['剁椒鱼头', '口味虾', '臭豆腐', '红煨肉'],
    image: '/images/regions/hunan.png'
  },
  {
    id: 8,
    name: '徽菜',
    englishName: 'Anhui Cuisine',
    description: '徽菜选料独特，多用山野时蔬和山林药材，善用烹、炒、蒸、炖等技法。徽菜讲究火功，突出本味，菜品滋补强身，保持了原汁原味的特点。',
    cuisine: '安徽菜系',
    features: ['原汁原味', '用料独特', '火功精湛', '讲究营养'],
    famousDishes: ['臭鳜鱼', '符离集烧鸡', '腌鲜鳜鱼', '徽州毛豆腐'],
    image: '/images/regions/anhui.png'
  }
]; 