import { Meal, MealPlan, Recipe } from "@prisma/client";

export type Ingredient = {
  measures: {
    metric: {
      amount: number;
      unitShort: string;
    };
  };
  originalName: string;
}

export type Nutrient = {
  name: string;
  amount: number;
}

export type PlanFormState = {
  errors?: {
    goal?: string[];
    planName?: string[];
  };
  message?: string | null;
};

export type ProfileFormState = {
  errors?: {
    activity?: string[];
    weight?: string[];
    height?: string[];
    exclude?: string[];
  };
  message?: string | null;
};

export type MealWithRecipe = Meal & {
  recipe: Recipe;
}

export type MealPlanWithMealsAndRecipes = MealPlan & {
  meals: MealWithRecipe[];
}