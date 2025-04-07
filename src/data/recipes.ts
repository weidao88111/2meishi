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
    ],
    mainImage: '/images/recipes/mapo-tofu-main.png'
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
      { id: 'pork-belly', name: '五花肉', amount: '800克' },
      { id: 'scallion', name: '葱段', amount: '适量' },
      { id: 'ginger', name: '姜片', amount: '适量' },
      { id: 'soy-sauce', name: '生抽', amount: '4汤匙' },
      { id: 'dark-soy-sauce', name: '老抽', amount: '2汤匙' },
      { id: 'rock-sugar', name: '冰糖', amount: '90克' },
      { id: 'cooking-wine', name: '花雕酒', amount: '100毫升' },
      { id: 'cooking-wine-2', name: '料酒', amount: '2汤匙' }
    ],
    steps: [
      {
        order: 1,
        description: '800g五花肉洗净冷水下锅，加入2勺料酒，煮4～5分钟后捞出。',
        image: '/images/recipes/dongpo-pork-step1.png'
      },
      {
        order: 2,
        description: '将五花肉改刀成5cm左右的方块。',
        image: '/images/recipes/dongpo-pork-step2.png'
      },
      {
        order: 3,
        description: '五花肉块下锅，中小火煎出多余油脂，除肉皮和底部外，肉的四面分别煎至上色，夹出备用。',
        image: '/images/recipes/dongpo-pork-step3.png'
      },
      {
        order: 4,
        description: '煎好的五花肉块用棉线绑成十字。绑棉线是为了防止肉在炖煮的过程中散开。',
        image: '/images/recipes/dongpo-pork-step4.png'
      },
      {
        order: 5,
        description: '锅中放入90g冰糖和80g清水，用中小火熬成棕色的冰糖汁，熬好之后再加入50g开水稀释备用。',
        image: '/images/recipes/dongpo-pork-step5.png'
      },
      {
        order: 6,
        description: '铸铁锅底部铺上一层小葱段和姜片，将五花肉块皮朝下，码在锅里，加入4勺生抽、2勺老抽、4勺冰糖水和100ml花雕酒，倒入没过肉块的温水。',
        image: '/images/recipes/dongpo-pork-step6.png'
      },
      {
        order: 7,
        description: '盖上盖子中大火炖30分钟，翻动肉块将肉皮朝上，转小火继续炖煮45分钟左右，直到筷子可以轻松插入肉中，开大火收汁，关火。',
        image: '/images/recipes/dongpo-pork-step7.png'
      },
      {
        order: 8,
        description: '东坡肉完成！肥而不腻，肉质软烂，色泽红亮。',
        image: '/images/recipes/dongpo-pork-step8.png'
      }
    ],
    tips: [
      '选用肥瘦均匀的五花肉，肥肉和瘦肉的比例约为6:4',
      '焯水时加少许料酒可以去除腥味',
      '炖煮的时间根据锅具和灶的功率不同可能需要调整，以肉的状态为准',
      '最好用砂锅或铸铁锅炖煮，这样热量分布均匀',
      '不用盐调味，因为酱油已经有足够的咸味了'
    ],
    mainImage: '/images/recipes/dongpo-pork-main.png'
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
        image: '/images/recipes/dumplings-main.png'
      },
      {
        order: 2,
        description: '白菜洗净切碎，放入盆中，加入适量盐拌匀，腌制15分钟后挤干水分，这样可以去除白菜的生味，并保持馅料干爽。',
        image: '/images/recipes/dumplings-main.png'
      },
      {
        order: 3,
        description: '猪肉馅剁细，虾仁洗净切碎，葱姜切末。将肉馅朝一个方向搅拌至起胶状，这样饺子馅会更加紧实多汁。',
        image: '/images/recipes/dumplings-main.png'
      },
      {
        order: 4,
        description: '将猪肉馅、虾仁、白菜、葱姜末放入大盆中，加入料酒、盐、白胡椒粉、香油，朝一个方向搅拌均匀，直到馅料变得黏稠。',
        image: '/images/recipes/dumplings-main.png'
      },
      {
        order: 5,
        description: '醒好的面团分成小剂子，擀成直径约10厘米的圆皮，中间稍厚、边缘稍薄，这样可以保证包出的饺子形状美观且不易破。',
        image: '/images/recipes/dumplings-main.png'
      },
      {
        order: 6,
        description: '取一个饺子皮，放入适量馅料，捏紧收口成饺子形状。注意不要包入空气，否则煮饺子时容易破皮。传统的褶子可以捏出10-12个褶。',
        image: '/images/recipes/dumplings-main.png'
      },
      {
        order: 7,
        description: '锅中烧开水，放入饺子，水再次沸腾后加入少许冷水，重复3次。这种"三沸三加水"的方法可以使饺子皮更有弹性。',
        image: '/images/recipes/dumplings-main.png'
      },
      {
        order: 8,
        description: '饺子浮起且皮变得透明时即可捞出，蘸醋、蒜泥或酱油食用。趁热吃口感最佳，皮薄馅嫩，鲜香可口。',
        image: '/images/recipes/dumplings-main.png'
      }
    ],
    tips: [
      '面团不要揉得太硬，以手指按压有轻微回弹为宜',
      '馅料最好搅拌至出现粘性，这样饺子煮熟后会更有汁水',
      '包饺子时注意排出馅料中的空气，避免煮时破皮',
      '喜欢吃煎饺的话，可以用同样的方法包好饺子，在平底锅中煎至金黄即可',
      '醋和姜可以制作蘸料，提升风味，还能帮助消化',
      '水饺制作完成后可以冷冻保存，食用时无需解冻直接下锅即可'
    ],
    mainImage: '/images/recipes/dumplings-main.png'
  },
  {
    id: 'qingtuan-recipe',
    foodId: 'qingtuan',
    name: '清明艾草粿',
    difficulty: 'medium',
    prepTime: 60,
    cookTime: 30,
    servings: 8,
    ingredients: [
      { id: 'glutinous-rice-flour', name: '糯米粉', amount: '300克' },
      { id: 'mugwort', name: '鲜艾草', amount: '100克' },
      { id: 'red-bean-paste', name: '豆沙馅', amount: '200克' },
      { id: 'sugar', name: '白砂糖', amount: '30克' }
    ],
    steps: [
      {
        order: 1,
        description: '艾草洗净，放入沸水中焯水30秒，捞出放入冷水中，挤干水分。',
        image: '/images/recipes/qingtuan.png'
      }
    ],
    tips: [
      '艾草要选新鲜的嫩叶，这样制作出的艾草粿颜色碧绿，清香浓郁',
      '糯米粉与水的比例要适当，以能揉成团且不粘手为宜',
      '艾草粿蒸熟后要立即浇凉水，避免表面干裂',
      '传统上清明节食用艾草粿，有驱邪避瘟之意'
    ],
    mainImage: '/images/recipes/qingtuan.png'
  },
  {
    id: 'migao-recipe',
    foodId: 'migao',
    name: '传统米糕',
    difficulty: 'easy',
    prepTime: 30,
    cookTime: 40,
    servings: 6,
    ingredients: [
      { id: 'rice', name: '糯米', amount: '500克' },
      { id: 'water', name: '清水', amount: '600毫升' },
      { id: 'sugar', name: '红糖', amount: '100克' },
      { id: 'red-dates', name: '红枣', amount: '10颗' },
      { id: 'lotus-seeds', name: '莲子', amount: '50克' }
    ],
    steps: [
      {
        order: 1,
        description: '糯米洗净后浸泡4小时，沥干水分。',
        image: '/images/recipes/migao.png'
      }
    ],
    tips: [
      '糯米一定要充分浸泡，这样蒸出来的米糕才会软糯可口',
      '蒸制时间不能太短，否则米糕中心会生硬',
      '出锅后稍冷却再脱模，避免米糕散开',
      '可根据个人喜好添加坚果、果干等配料增加口感和风味'
    ],
    mainImage: '/images/recipes/migao.png'
  },
  {
    id: 'zhengroupie-recipe',
    foodId: 'zhengroupie',
    name: '蒸肉糕',
    difficulty: 'medium',
    prepTime: 45,
    cookTime: 60,
    servings: 8,
    ingredients: [
      { id: 'pork', name: '五花肉', amount: '500克' },
      { id: 'glutinous-rice', name: '糯米', amount: '300克' },
      { id: 'shiitake', name: '香菇', amount: '8朵' },
      { id: 'soy-sauce', name: '生抽', amount: '2汤匙' },
      { id: 'cooking-wine', name: '料酒', amount: '1汤匙' },
      { id: 'scallion', name: '葱段', amount: '3根' },
      { id: 'ginger', name: '姜片', amount: '5片' }
    ],
    steps: [
      {
        order: 1,
        description: '糯米提前浸泡4小时，香菇用温水泡发。',
        image: '/images/recipes/zhengroupie.png'
      }
    ],
    tips: [
      '肉糕蒸制时间要足够长，确保糯米完全熟透',
      '五花肉最好选择肥瘦相间的部位，这样口感更佳',
      '香菇泡发的水可以用来调味，增加鲜香',
      '传统坝坝宴中的招牌菜，寓意团圆美满'
    ],
    mainImage: '/images/recipes/zhengroupie.png'
  },
  {
    id: 'bozigao-recipe',
    foodId: 'bozigao',
    name: '钵仔糕',
    difficulty: 'easy',
    prepTime: 20,
    cookTime: 25,
    servings: 10,
    ingredients: [
      { id: 'rice-flour', name: '粘米粉', amount: '250克' },
      { id: 'wheat-starch', name: '澄面', amount: '50克' },
      { id: 'sugar', name: '白砂糖', amount: '150克' },
      { id: 'water', name: '清水', amount: '500毫升' },
      { id: 'red-bean', name: '红豆沙', amount: '适量' }
    ],
    steps: [
      {
        order: 1,
        description: '将粘米粉、澄面、白砂糖混合，慢慢加入清水搅拌成糊状。',
        image: '/images/recipes/bozigao.png'
      }
    ],
    tips: [
      '糊状物要搅拌均匀，不能有颗粒感',
      '蒸制时火候要均匀，避免表面不平',
      '钵仔糕出锅后要立即脱模趁热食用，口感最佳',
      '广东传统小吃，香甜软糯，老少皆宜'
    ],
    mainImage: '/images/recipes/bozigao.png'
  },
  {
    id: 'tangbing-recipe',
    foodId: 'tangbing',
    name: '炸糖饼',
    difficulty: 'medium',
    prepTime: 40,
    cookTime: 20,
    servings: 12,
    ingredients: [
      { id: 'flour', name: '中筋面粉', amount: '300克' },
      { id: 'egg', name: '鸡蛋', amount: '2个' },
      { id: 'yeast', name: '酵母', amount: '3克' },
      { id: 'sugar', name: '白砂糖', amount: '60克' },
      { id: 'oil', name: '食用油', amount: '适量' },
      { id: 'osmanthus', name: '桂花', amount: '少许' }
    ],
    steps: [
      {
        order: 1,
        description: '面粉、酵母、白砂糖混合，加入鸡蛋和温水揉成光滑面团，醒发至两倍大。',
        image: '/images/recipes/tangbing.png'
      }
    ],
    tips: [
      '面团发酵充分，炸出的糖饼才会蓬松空心',
      '油温控制在160-170度之间最佳',
      '炸至金黄色即可捞出，避免炸糊',
      '传统节日美食，酥脆甜香，深受孩子喜爱'
    ],
    mainImage: '/images/recipes/tangbing.png'
  },
  {
    id: 'jiaoyanpaigu-recipe',
    foodId: 'jiaoyanpaigu',
    name: '椒盐排骨',
    difficulty: 'medium',
    prepTime: 30,
    cookTime: 40,
    servings: 4,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '完美复刻中餐厅38块钱一份的椒盐排骨，骨香肉烂，好吃到吮手指',
        image: '/images/recipes/jiaoyanpaigu.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/jiaoyanpaigu.png'
  },
  {
    id: 'gulaorou-recipe',
    foodId: 'gulaorou',
    name: '咕咾肉',
    difficulty: 'medium',
    prepTime: 25,
    cookTime: 30,
    servings: 4,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '【中餐厅】张亮版菠萝咕咾肉',
        image: '/images/recipes/gulaorou.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/gulaorou.png'
  },
  {
    id: 'tudousibing-recipe',
    foodId: 'tudousibing',
    name: '土豆丝饼',
    difficulty: 'easy',
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '十分钟快手早餐煎土豆丝饼儿童早餐营养中餐',
        image: '/images/recipes/tudousibing.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/tudousibing.png'
  },
  {
    id: 'gongbaojiding-recipe',
    foodId: 'gongbaojiding',
    name: '宫保鸡丁',
    difficulty: 'medium',
    prepTime: 25,
    cookTime: 20,
    servings: 4,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '【中餐厅】亮大厨教做宫保鸡丁',
        image: '/images/recipes/gongbaojiding.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/gongbaojiding.png'
  },
  {
    id: 'yanduxian-recipe',
    foodId: 'yanduxian',
    name: '腌笃鲜',
    difficulty: 'hard',
    prepTime: 30,
    cookTime: 90,
    servings: 6,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '中餐｜浓郁奶白的腌笃鲜（白汤的秘密）',
        image: '/images/recipes/yanduxian.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/yanduxian.png'
  },
  {
    id: 'shuizhuniurou-recipe',
    foodId: 'shuizhuniurou',
    name: '水煮牛肉',
    difficulty: 'medium',
    prepTime: 30,
    cookTime: 25,
    servings: 4,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '水煮牛肉 麻辣 简单快手菜 中餐厅 零厨艺的朋友亦能成功',
        image: '/images/recipes/shuizhuniurou.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/shuizhuniurou.png'
  },
  {
    id: 'boluogulaorou-recipe',
    foodId: 'boluogulaorou',
    name: '菠萝咕咾肉',
    difficulty: 'medium',
    prepTime: 25,
    cookTime: 30,
    servings: 4,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '【中餐厅】张亮版菠萝咕咾肉',
        image: '/images/recipes/boluogulaorou.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/boluogulaorou.png'
  },
  {
    id: 'qiezhidaxia-recipe',
    foodId: 'qiezhidaxia',
    name: '茄汁大虾',
    difficulty: 'medium',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    ingredients: [],
    steps: [
      {
        order: 1,
        description: '不用一滴水焖出一锅超入味的茄汁大虾❗️赛过中餐厅黄晓明版❗️',
        image: '/images/recipes/qiezhidaxia.png'
      }
    ],
    tips: [],
    mainImage: '/images/recipes/qiezhidaxia.png'
  }
]; 