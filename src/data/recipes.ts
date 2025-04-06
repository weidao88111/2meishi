import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: 'mapo-tofu-recipe',
    foodId: 'mapo-tofu',
    name: '正宗麻婆豆腐',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      { id: 'tofu', name: '嫩豆腐', amount: '500克' },
      { id: 'beef', name: '牛肉末', amount: '100克' },
      { id: 'doubanjiang', name: '郫县豆瓣酱', amount: '2汤匙' },
      { id: 'chili-oil', name: '辣椒油', amount: '1汤匙' },
      { id: 'sichuan-pepper', name: '花椒粉', amount: '1茶匙' },
      { id: 'soy-sauce', name: '生抽', amount: '2茶匙' },
      { id: 'cooking-wine', name: '料酒', amount: '1汤匙' },
      { id: 'garlic', name: '蒜末', amount: '2瓣' },
      { id: 'ginger', name: '姜末', amount: '1茶匙' },
      { id: 'green-onion', name: '葱花', amount: '2根' },
      { id: 'starch', name: '水淀粉', amount: '1汤匙' },
      { id: 'oil', name: '食用油', amount: '3汤匙' }
    ],
    steps: [
      {
        order: 1,
        description: '豆腐切成约2厘米的方块，放入沸水中焯水约1分钟，捞出沥干备用。',
        image: '/images/recipes/mapo-tofu-step1.png'
      },
      {
        order: 2,
        description: '热锅冷油，放入姜末、蒜末爆香。',
        image: '/images/recipes/mapo-tofu-step2.png'
      },
      {
        order: 3,
        description: '加入牛肉末，翻炒至变色。',
        image: '/images/recipes/mapo-tofu-step3.png'
      },
      {
        order: 4,
        description: '放入郫县豆瓣酱，炒出红油。',
        image: '/images/recipes/mapo-tofu-step4.png'
      },
      {
        order: 5,
        description: '加入适量清水，倒入豆腐，小火炖煮5分钟左右。',
        image: '/images/recipes/mapo-tofu-step5.png'
      },
      {
        order: 6,
        description: '加入生抽、料酒调味，再煮2分钟。',
        image: '/images/recipes/mapo-tofu-step6.png'
      },
      {
        order: 7,
        description: '用水淀粉勾芡，淋入辣椒油。',
        image: '/images/recipes/mapo-tofu-step7.png'
      },
      {
        order: 8,
        description: '最后撒上花椒粉和葱花即可。',
        image: '/images/recipes/mapo-tofu-step8.png'
      }
    ],
    tips: [
      '焯水的时间不要太长，以免豆腐碎裂',
      '炒郫县豆瓣酱的时间要足够，炒出红油才能香',
      '花椒粉最好在最后放，这样麻味才足',
      '如果喜欢更麻辣的口味，可以适当增加辣椒油和花椒粉的用量'
    ]
  },
  {
    id: 'dongpo-pork-recipe',
    foodId: 'dongpo-pork',
    name: '杭州东坡肉',
    difficulty: 'hard',
    prepTime: 30,
    cookTime: 180,
    servings: 6,
    ingredients: [
      { id: 'pork-belly', name: '五花肉', amount: '1000克' },
      { id: 'scallion', name: '葱段', amount: '5根' },
      { id: 'ginger', name: '姜片', amount: '10片' },
      { id: 'soy-sauce', name: '生抽', amount: '4汤匙' },
      { id: 'dark-soy-sauce', name: '老抽', amount: '2汤匙' },
      { id: 'rock-sugar', name: '冰糖', amount: '50克' },
      { id: 'cooking-wine', name: '绍兴酒', amount: '100毫升' },
      { id: 'star-anise', name: '八角', amount: '2个' },
      { id: 'cinnamon', name: '桂皮', amount: '1小段' },
      { id: 'bay-leaf', name: '香叶', amount: '2片' }
    ],
    steps: [
      {
        order: 1,
        description: '五花肉洗净切成5厘米见方的块，放入沸水中焯水，去除血水和杂质。',
        image: '/images/recipes/dongpo-pork-step1.png'
      },
      {
        order: 2,
        description: '锅中放油，将肉块两面煎至金黄，注意火候控制，避免煎糊。',
        image: '/images/recipes/dongpo-pork-main.jpg'
      },
      {
        order: 3,
        description: '砂锅底部铺上葱段和姜片，放入煎好的肉块，排列整齐。',
        image: '/images/recipes/dongpo-pork-step3.png'
      },
      {
        order: 4,
        description: '加入生抽、老抽、绍兴酒，加水没过肉块约2厘米，确保肉块均匀受热。',
        image: '/images/recipes/dongpo-pork-step4.png'
      },
      {
        order: 5,
        description: '放入八角、桂皮、香叶和冰糖，大火烧开后转小火，味道会更加丰富。',
        image: '/images/recipes/dongpo-pork-step5.png'
      },
      {
        order: 6,
        description: '盖上锅盖，小火炖约2.5-3小时，直至肉烂而不散，期间可以适当翻动肉块，使其入味均匀。',
        image: '/images/recipes/dongpo-pork-main.jpg'
      },
      {
        order: 7,
        description: '大火收汁至浓稠，注意不要煮糊。收汁时可适当添加少许冰糖提香增色。',
        image: '/images/recipes/dongpo-pork-step7.png'
      },
      {
        order: 8,
        description: '将肉块摆盘，淋上浓稠的汤汁，肉质应当软烂入味，色泽红亮，味道醇厚。',
        image: '/images/recipes/dongpo-pork-step8.png'
      }
    ],
    tips: [
      '选用肥瘦均匀的五花肉，肥肉和瘦肉的比例约为6:4',
      '焯水时加少许料酒可以去除腥味',
      '炖煮的时间越长越好，肉质会更加软烂',
      '最好用砂锅炖煮，这样热量分布均匀，不容易糊锅',
      '不用盐调味，因为酱油已经有足够的咸味了',
      '出锅前最好静置10分钟，让味道更加融合'
    ]
  },
  {
    id: 'dumplings-recipe',
    foodId: 'dumplings',
    name: '三鲜水饺',
    difficulty: 'medium',
    prepTime: 60,
    cookTime: 15,
    servings: 8,
    ingredients: [
      { id: 'flour', name: '中筋面粉', amount: '500克' },
      { id: 'water', name: '温水', amount: '250毫升' },
      { id: 'pork', name: '猪肉馅', amount: '300克' },
      { id: 'shrimp', name: '虾仁', amount: '200克' },
      { id: 'egg', name: '鸡蛋', amount: '2个' },
      { id: 'chinese-cabbage', name: '白菜', amount: '300克' },
      { id: 'green-onion', name: '葱', amount: '5根' },
      { id: 'ginger', name: '姜', amount: '1小块' },
      { id: 'sesame-oil', name: '香油', amount: '2汤匙' },
      { id: 'salt', name: '盐', amount: '适量' },
      { id: 'white-pepper', name: '白胡椒粉', amount: '适量' },
      { id: 'cooking-wine', name: '料酒', amount: '1汤匙' }
    ],
    steps: [
      {
        order: 1,
        description: '面粉倒入盆中，慢慢加入温水，边加边搅拌，揉成光滑的面团，盖上湿布醒30分钟，这一步很关键，决定了饺子皮的筋道程度。',
        image: '/images/recipes/dumplings-main.jpg'
      },
      {
        order: 2,
        description: '白菜洗净切碎，放入盆中，加入适量盐拌匀，腌制15分钟后挤干水分，这样可以去除白菜的生味，并保持馅料干爽。',
        image: '/images/recipes/dumplings-main.jpg'
      },
      {
        order: 3,
        description: '猪肉馅剁细，虾仁洗净切碎，葱姜切末。将肉馅朝一个方向搅拌至起胶状，这样饺子馅会更加紧实多汁。',
        image: '/images/recipes/dumplings-main.jpg'
      },
      {
        order: 4,
        description: '将猪肉馅、虾仁、白菜、葱姜末放入大盆中，加入料酒、盐、白胡椒粉、香油，朝一个方向搅拌均匀，直到馅料变得黏稠。',
        image: '/images/recipes/dumplings-main.jpg'
      },
      {
        order: 5,
        description: '醒好的面团分成小剂子，擀成直径约10厘米的圆皮，中间稍厚、边缘稍薄，这样可以保证包出的饺子形状美观且不易破。',
        image: '/images/recipes/dumplings-main.jpg'
      },
      {
        order: 6,
        description: '取一个饺子皮，放入适量馅料，捏紧收口成饺子形状。注意不要包入空气，否则煮饺子时容易破皮。传统的褶子可以捏出10-12个褶。',
        image: '/images/recipes/dumplings-main.jpg'
      },
      {
        order: 7,
        description: '锅中烧开水，放入饺子，水再次沸腾后加入少许冷水，重复3次。这种"三沸三加水"的方法可以使饺子皮更有弹性。',
        image: '/images/recipes/dumplings-main.jpg'
      },
      {
        order: 8,
        description: '饺子浮起且皮变得透明时即可捞出，蘸醋、蒜泥或酱油食用。趁热吃口感最佳，皮薄馅嫩，鲜香可口。',
        image: '/images/recipes/dumplings-main.jpg'
      }
    ],
    tips: [
      '面团不要揉得太硬，以手指按压有轻微回弹为宜',
      '馅料最好搅拌至出现粘性，这样饺子煮熟后会更有汁水',
      '包饺子时注意排出馅料中的空气，避免煮时破皮',
      '喜欢吃煎饺的话，可以用同样的方法包好饺子，在平底锅中煎至金黄即可',
      '醋和姜可以制作蘸料，提升风味，还能帮助消化',
      '水饺制作完成后可以冷冻保存，食用时无需解冻直接下锅即可'
    ]
  }
]; 