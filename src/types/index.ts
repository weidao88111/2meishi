export interface Food {
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

export interface Recipe {
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
  mainImage?: string; // Main recipe image
}

export interface Ingredient {
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

export interface Region {
  id: string;
  name: string;
  description: string;
  features: string[];
  famousFoods: string[];
  image: string;
} 