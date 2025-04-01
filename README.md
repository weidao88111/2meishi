# 中国传统美食线上博物馆

这是一个基于Next.js开发的中国传统美食线上博物馆网站，作为毕业设计项目。该网站旨在展示和传播中国丰富多样的传统美食文化，为用户提供一个了解、探索中华美食历史与工艺的平台。

## 项目介绍

中国传统美食线上博物馆收集并展示来自中国各地区的特色美食，包括其历史背景、制作工艺、文化意义等内容。网站以互动性和教育性为核心，通过现代网络技术让用户身临其境地体验中华美食文化的魅力。

## 技术栈

- **框架**: Next.js 15
- **前端**: React 19、TypeScript
- **样式**: TailwindCSS 4
- **部署**: Cloudflare Pages

## 网站结构

### 页面架构

- **首页 (`/`)**: 网站主页，展示精选美食和主要导航
- **地区分类 (`/regions`)**: 按地区分类的美食展示
- **菜谱中心 (`/recipes`)**: 详细的菜谱展示与搜索
- **食材百科 (`/ingredients`)**: 中国传统食材介绍与分类
- **历史长廊 (`/history`)**: 中国美食发展的历史时间线
- **AI美食助手 (`/ai-assistant`)**: 智能问答与美食推荐系统
- **关于我们 (`/about`)**: 项目介绍 
- **后台管理 (`/admin`)**: 系统管理功能

### 后台管理系统

后台管理系统提供对网站内容的管理功能，包括以下页面：

1. **登录页面 (`/admin/login`)**: 管理员身份验证
2. **控制面板 (`/admin/dashboard`)**: 网站数据概览与统计
3. **美食管理 (`/admin/foods`)**: 添加、编辑、删除美食条目
4. **菜谱管理 (`/admin/recipes`)**: 管理菜谱内容
5. **食材管理 (`/admin/ingredients`)**: 管理食材百科内容
6. **地区管理 (`/admin/regions`)**: 管理地区分类与信息
7. **历史内容管理 (`/admin/history`)**: 管理历史长廊内容
8. **用户反馈管理 (`/admin/feedback`)**: 查看与处理用户反馈
9. **系统设置 (`/admin/settings`)**: 网站基本设置与配置

每个管理页面提供以下功能：
- 内容列表视图（支持排序、筛选）
- 详情查看
- 新增内容
- 编辑现有内容
- 删除内容
- 批量操作

后台管理系统采用基于角色的访问控制（RBAC），支持多级管理员权限：
- 超级管理员（全部权限）
- 内容编辑（内容管理权限）
- 数据分析员（只读权限）

### 组件设计

网站使用模块化组件设计，确保代码复用性和维护性：

1. **布局组件**
   - `Layout`: 全局布局组件，包含导航栏和页脚
   - `Navbar`: 响应式导航栏
   - `Footer`: 页脚信息

2. **展示组件**
   - `FoodCard`: 美食卡片展示组件
   - `RecipeCard`: 菜谱卡片展示组件
   - `IngredientCard`: 食材卡片展示组件
   - `Gallery`: 图片画廊组件
   - `VideoPlayer`: 视频播放组件
   - `Timeline`: 历史时间线组件
   - `RecipeSteps`: 菜谱步骤展示组件
   - `NutritionFacts`: 营养成分展示组件

3. **交互组件**
   - `SearchBar`: 搜索功能组件
   - `FilterOptions`: 筛选选项组件
   - `RegionMap`: 交互式地区地图组件
   - `Quiz`: 美食知识问答组件
   - `AIChat`: AI助手聊天界面组件
   - `RecipeCalculator`: 份量计算器组件

4. **共享UI组件**
   - `Button`: 自定义按钮组件
   - `Modal`: 模态框组件
   - `Carousel`: 轮播图组件
   - `Badge`: 标签组件
   - `Rating`: 评分组件
   - `Tabs`: 选项卡组件
   - `DropdownMenu`: 下拉菜单组件

## 数据结构

基础数据模型示例：

```typescript
interface Food {
  id: string;
  name: string;
  englishName: string;
  region: string;
  category: string[];
  description: string;
  history: string;
  ingredients: string[];
  cookingMethod: string;
  culturalSignificance: string;
  images: string[];
  videos?: string[];
  relatedFoods: string[];
}

interface Recipe {
  id: string;
  foodId: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // 单位: 分钟
  cookTime: number; // 单位: 分钟
  servings: number;
  ingredients: {
    id: string;
    name: string;
    amount: string;
  }[];
  steps: {
    order: number;
    description: string;
    image?: string;
  }[];
  tips: string[];
}

interface Ingredient {
  id: string;
  name: string;
  englishName: string;
  category: string[];
  description: string;
  nutritionFacts: string;
  seasonality: string[];
  commonUses: string[];
  storage: string;
  substitutes: string[];
  images: string[];
}
```

## 功能特点

1. **响应式设计**: 适配各种设备屏幕大小
2. **交互式地图**: 通过地图探索各地区美食
3. **多媒体展示**: 高清图片和视频展示美食制作过程
4. **搜索与筛选**: 根据地区、口味、食材等筛选美食
5. **知识问答**: 趣味性的中国美食知识问答
6. **分享功能**: 方便用户分享喜爱的美食到社交媒体
7. **AI美食助手**: 智能回答用户关于中国美食的问题，提供个性化推荐

## 开发指南

### 安装与运行

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build

# 启动生产服务
npm run start
```

### 目录结构

```
/
├── public/            # 静态资源
│   ├── images/        # 图片资源
│   │   ├── foods/     # 美食图片
│   │   ├── recipes/   # 菜谱步骤图片
│   │   ├── ingredients/ # 食材图片
│   │   └── regions/   # 地区图片
│   └── videos/        # 视频资源
├── src/
│   ├── components/    # 可复用组件
│   │   ├── layout/    # 布局相关组件
│   │   ├── ui/        # UI组件
│   │   ├── features/  # 功能性组件
│   │   ├── recipes/   # 菜谱相关组件
│   │   ├── ingredients/ # 食材相关组件
│   │   ├── admin/     # 后台管理组件
│   │   └── ai/        # AI助手相关组件
│   ├── pages/         # 页面文件
│   │   ├── api/       # API路由
│   │   ├── regions/   # 地区页面
│   │   ├── recipes/   # 菜谱页面
│   │   ├── ingredients/ # 食材页面
│   │   ├── history/   # 历史长廊页面
│   │   ├── ai-assistant/ # AI助手页面
│   │   ├── admin/     # 后台管理页面
│   │   └── about/     # 关于我们页面
│   ├── styles/        # 样式文件
│   ├── data/          # 静态数据
│   │   ├── foods.ts   # 美食数据
│   │   ├── recipes.ts # 菜谱数据
│   │   ├── ingredients.ts # 食材数据
│   │   └── regions.ts # 地区数据
│   ├── lib/           # 公共函数库
│   │   ├── ai/        # AI模型集成
│   │   └── auth/      # 身份认证
│   ├── hooks/         # 自定义钩子
│   ├── types/         # TypeScript类型定义
│   ├── utils/         # 工具函数
│   └── contexts/      # 上下文管理
│       └── auth/      # 认证上下文
└── ...配置文件
```

## 部署

项目支持通过Vercel或Cloudflare Pages进行部署：

```