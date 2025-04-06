import { Food } from '../types';

export const foods: Food[] = [
  {
    id: 'mapo-tofu',
    name: '麻婆豆腐',
    englishName: 'Mapo Tofu',
    region: 'sichuan',
    category: ['家常菜', '豆腐', '川菜'],
    description: '麻婆豆腐是四川省传统名菜之一，由豆腐、牛肉末、辣椒和花椒等烹制而成。此道菜以麻、辣、烫、嫩、香、酥、烂、鲜著称。',
    history: '麻婆豆腐起源于清代四川省成都市，相传为清同治年间由陈兴盛饭铺老板娘陈刘氏所创。因陈刘氏脸上有麻点，人称"陈麻婆"，故此菜得名"麻婆豆腐"。',
    ingredients: ['豆腐', '牛肉末', '郫县豆瓣酱', '花椒', '辣椒', '葱花', '姜末', '蒜末', '酱油', '食用油'],
    cookingMethod: '先将豆腐切成小方块用沸水焯一下，沥干备用。炒锅烧热，放入油，爆香姜末、蒜末，加入牛肉末煸炒至变色，加入郫县豆瓣酱和辣椒炒出香味，加入适量水煮沸，放入豆腐块小火烧入味，勾芡后撒上葱花和花椒粉即可。',
    culturalSignificance: '麻婆豆腐是中国川菜的代表作之一，代表了川菜麻辣的特点。它融合了豆腐的柔嫩与麻辣的刺激，展现了川菜调味的精妙和变化。',
    images: ['/images/foods/mapo-tofu-1.png', '/images/foods/mapo-tofu-2.png'],
    videos: ['/videos/making-mapo-tofu.mp4'],
    relatedFoods: ['kungpao-chicken', 'hui-guo-rou', 'shui-zhu-yu']
  },
  {
    id: 'peking-duck',
    name: '北京烤鸭',
    englishName: 'Peking Duck',
    region: 'beijing',
    category: ['宫廷菜', '烤鸭', '京菜'],
    description: '北京烤鸭是具有世界声誉的北京著名菜式，用特种肥鸭制作，果木炭火烤制，色泽红艳，肉质细嫩，外脆里嫩。',
    history: '北京烤鸭起源于南北朝时期，当时烤鸭名为"炙鸭"，在明朝宫廷里成为了宴席珍品。清朝时，烤鸭的烹饪技术达到了鼎盛，1864年，全聚德前身建立，将宫廷御厨的烤鸭技术带给大众。',
    ingredients: ['北京鸭', '蜂蜜', '麦芽糖', '五香粉', '葱', '甜面酱', '黄瓜', '薄饼'],
    cookingMethod: '将肥鸭洗净，用小火烤至三分熟，再用大火烤至金黄色，成熟后挂在炉门上去油。上桌时片成片，吃时将烤鸭皮和肉夹在薄饼中，加入葱丝、甜面酱和黄瓜条一起食用。',
    culturalSignificance: '北京烤鸭是中国烹饪文化的瑰宝，代表了中国传统饮食文化的高度，在国际上拥有极高声誉。它的制作过程体现了中华饮食文化的精细与考究。',
    images: ['/images/foods/peking-duck-1.png', '/images/foods/peking-duck-2.png'],
    videos: ['/videos/making-peking-duck.mp4'],
    relatedFoods: ['guangdong-roast-goose', 'nanjing-salted-duck', 'beijing-zhajiang-noodles']
  },
  {
    id: 'white-cut-chicken',
    name: '白切鸡',
    englishName: 'White Cut Chicken',
    region: 'guangdong',
    category: ['经典粤菜', '鸡肉', '凉菜'],
    description: '白切鸡是一道色香味俱全的汉族传统名菜，属于粤菜系。其特点是皮黄肉白，肉质鲜嫩，滋味清淡。',
    history: '白切鸡起源于广东，是粤菜的代表作之一。过去在广东农村，逢年过节或待客，必杀鸡宰鹅，而白切鸡就是最基础也是最能体现粤菜"原汁原味"的烹饪方式。',
    ingredients: ['三黄鸡', '姜', '葱', '食盐', '花生油', '香油', '料酒'],
    cookingMethod: '选用肉质紧实的三黄鸡，宰杀后放入沸水中氽烫，捞出后涂抹一层食用油。再将鸡放入调好的盐水中，旺火煮沸后转小火慢炖，待鸡熟透后，浸泡至温热，取出斩件。蘸上姜葱蒜汁、酱油等调料食用。',
    culturalSignificance: '白切鸡代表了粤菜"鲜、嫩、爽、滑"的特点，体现了粤菜保持食材原味的追求。它是粤菜中最能代表"清而不淡，鲜而不俗"特色的名菜之一。',
    images: ['/images/foods/white-cut-chicken-1.png', '/images/foods/white-cut-chicken-2.png'],
    videos: ['/videos/making-white-cut-chicken.mp4'],
    relatedFoods: ['cantonese-roast-goose', 'steamed-fish', 'char-siu']
  },
  {
    id: 'char-siu',
    name: '蜜汁叉烧',
    englishName: 'Char Siu (BBQ Pork)',
    region: 'guangdong',
    category: ['烧腊', '猪肉', '粤菜'],
    description: '叉烧是广东省传统的烧味，以猪肉为原料，加入蜜糖、酱油等调味料烤制而成。肉质鲜嫩多汁，外表油亮红润，味道甜咸适中。',
    history: '叉烧的历史可以追溯到南宋时期，原是祭祀用的烤肉，后逐渐成为民间美食。广东叉烧在明清时期开始兴盛，至今已有数百年历史，是粤式烧腊的代表之一。',
    ingredients: ['猪颈肉', '蜜糖', '五香粉', '酱油', '料酒', '海鲜酱', '蒜蓉', '叉烧酱'],
    cookingMethod: '将猪肉切成长条，用蜜糖、酱油、料酒等调料腌制数小时。烤箱预热，将肉条放在烤架上，定时翻面并刷上腌料，直至表面呈现红褐色，香气四溢。出炉后切件，撒上芝麻即可食用。',
    culturalSignificance: '叉烧是粤菜中的经典美食，代表了粤式烹饪甜咸平衡的特点。它不仅是一道独立的菜肴，也是多种粤式美食的重要组成部分，如叉烧包、叉烧饭等。',
    images: ['/images/foods/char-siu-1.png', '/images/foods/char-siu-2.png'],
    videos: ['/videos/making-char-siu.mp4'],
    relatedFoods: ['cantonese-roast-goose', 'white-cut-chicken', 'roast-pork']
  },
  {
    id: 'xiaolongbao',
    name: '小笼包',
    englishName: 'Xiaolongbao',
    region: 'jiangsu',
    category: ['点心', '蒸食', '江苏菜'],
    description: '小笼包是江南地区特色传统名点，属于蒸出来的包子类，皮薄、汁多、馅烂、形美，有一口一个的小巧和一口一滋味的感觉。',
    history: '小笼包起源于清朝光绪年间江苏南翔镇，由黄阿顺家创制。后来经过改良和传播，成为江南地区具有代表性的特色点心。',
    ingredients: ['面粉', '猪肉', '虾仁', '葱姜', '料酒', '鸡汤', '猪皮冻'],
    cookingMethod: '将猪皮煮熟切碎冻成冻，与肉馅一起拌匀。调好馅后包入皮内，收口后上笼蒸制。蒸好后皮薄透亮，咬一口有鲜美的肉汁流出。',
    culturalSignificance: '小笼包体现了江南饮食细致、精巧的特点，是江南菜讲究"精"的典范。它在制作工艺上的精细和口味上的讲究，展现了江南饮食文化的独特魅力。',
    images: ['/images/foods/xiaolongbao-1.png', '/images/foods/xiaolongbao-2.png'],
    videos: ['/videos/making-xiaolongbao.mp4'],
    relatedFoods: ['sheng-jian-bao', 'tangbao', 'dim-sum']
  },
  {
    id: 'dongpo-pork',
    name: '东坡肉',
    englishName: 'Dongpo Pork',
    region: 'zhejiang',
    category: ['红烧菜', '猪肉', '浙菜'],
    description: '东坡肉是浙江省杭州市的传统名菜，也是浙江菜的代表菜之一。此菜色泽红亮，肥而不腻，入口即化，香糯软烂。',
    history: '东坡肉相传由北宋文学家苏东坡发明。苏轼贬谪杭州时，为改善民生，提倡民众腌制猪肉过冬，发明了此法，后人为纪念他，称此菜为"东坡肉"。',
    ingredients: ['五花肉', '酱油', '料酒', '冰糖', '葱段', '姜片', '八角', '桂皮'],
    cookingMethod: '将五花肉切成方块汆水后，放入砂锅中，加入各种调味料，小火慢炖数小时，使肉质酥烂，收汁后翻扣在盘中即可。',
    culturalSignificance: '东坡肉不仅是一道美食，更寄托了苏东坡的饮食智慧和民生关怀。它代表了浙江菜的精髓，体现了中国饮食"色、香、味"俱全的追求。',
    images: ['/images/foods/dongpo-pork-1.png', '/images/foods/dongpo-pork-2.png'],
    videos: ['/videos/making-dongpo-pork.mp4'],
    relatedFoods: ['braised-pork-belly', 'hongshao-rou', 'mei-cai-kou-rou']
  },
  {
    id: 'dumplings',
    name: '饺子',
    englishName: 'Jiaozi (Dumplings)',
    region: 'north-china',
    category: ['主食', '节日食品', '传统美食'],
    description: '饺子是中国北方传统的主食和节日食品，由面皮包裹馅料，可煮、蒸、煎、烤等多种烹饪方式。形如元宝，表示财源滚滚。',
    history: '饺子起源于东汉时期，由医圣张仲景发明，最初用来治疗百姓冻伤的耳朵，名为"娇耳"，后演变为饺子。因其形似元宝，在中国人的传统中象征着财富和好运。',
    ingredients: ['面粉', '肉馅(猪肉/牛肉/羊肉)', '白菜/韭菜/荠菜', '葱姜', '盐', '酱油', '香油'],
    cookingMethod: '将面粉和水揉成面团，擀成薄饼，包入馅料，捏紧收口，入水锅煮至浮起或入蒸锅蒸10分钟即可。吃时蘸醋、蒜泥、酱油等调料。',
    culturalSignificance: '饺子是中国人除夕夜的传统食品，有"好彩头"的寓意。它体现了中国人"团圆"和"美好生活"的追求，是中华饮食文化的重要象征之一。',
    images: ['/images/foods/dumplings-1.png', '/images/foods/dumplings-2.png'],
    videos: ['/videos/making-dumplings.mp4'],
    relatedFoods: ['wonton', 'tangyuan', 'shaomai']
  }
]; 