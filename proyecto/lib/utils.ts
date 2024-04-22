import { titleCase } from "title-case";

import { Recipe, User } from '@prisma/client'
import { Ingredient, Nutrient } from "@/lib/definitions";


function filterUniqueRecipes(recipes: Recipe[]): Recipe[] {
  const uniqueRecipes = recipes.reduce((unique: Recipe[], current: Recipe) => {
    const alreadyExists = unique.some(recipe => recipe.id === current.id);
    if (!alreadyExists) {
      unique.push(current);
    }
    return unique;
  }, []);

  return uniqueRecipes;
}

export function buildRecipes(
  recipes: any[],
) : Recipe[] {
  const recipes_reduced = []
  const filter_props = ["id", "title", "image", "summary", "instructions", "nutrition", "extendedIngredients"]
  const filter_nutrients = ["Calories", "Fat", "Carbohydrates", "Protein"]
  for (const recipe of recipes) {
    // console.log(recipe)
    const filtered: Recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      instructions: recipe.instructions,
      calories: 0,
      fat: 0,
      carbohydrates: 0,
      protein: 0,
      ingredients: []
    };
    
    filter_props.forEach(prop => {
      if (recipe.hasOwnProperty(prop)) {
        if (prop === "extendedIngredients") {
          const ingredients = recipe[prop].map((ingredient: Ingredient) => {
            const amount = ingredient.measures.metric.amount + " ";
            const unit = ingredient.measures.metric.unitShort + " ";
            return `${amount}${unit}${ingredient.originalName}`;
          });
          Object.assign(filtered, { ingredients });

        } else if (prop === "nutrition") {
          console.log(recipe[prop]['nutrients'])
          recipe[prop]['nutrients'].forEach((nutrient: Nutrient) => {
            if (filter_nutrients.includes(nutrient.name)) {
              Object.assign(filtered, { [nutrient.name.toLowerCase()]: nutrient.amount });
            }
          });

        } else if (prop === "summary") {
          const summary = recipe[prop].replace(/<[^>]*>?/gm, '');
          const endIndex = summary.indexOf(' It is brought to you by') || summary.indexOf(' With a spoonacular score') || summary.indexOf(' This recipe from');
          Object.assign(filtered, { summary: endIndex === -1 ? summary : summary.substring(0, endIndex) });

        } else if (prop === "instructions") {
          Object.assign(filtered, { instructions: recipe[prop].replace(/<[^>]*>?/gm, '') });
          
        } else if (prop === "title") {
          Object.assign(filtered, { title: titleCase(recipe[prop]) });
          
        } else {
          Object.assign(filtered, { [prop]: recipe[prop] });
        }
      }
    })
    recipes_reduced.push(filtered);
  }

  const recipes_filtered = filterUniqueRecipes(recipes_reduced);

  return recipes_filtered;
}

export const getCalories = (
  user: User, 
  goal: string
) => {
  if (user.weight === null || user.height === null || user.age === null) 
    throw new Error('User is null');

  let imb = 10 * user.weight + 6.25 * user.height - 5 * user.age;
  user.sex == 'w' ? imb -= 161 : imb += 5;

  let calories = 0;
  switch (user.activity) {
    case 'LIGHT':
      calories = imb * 1.375;
      break;
    case 'MODERATE':
      calories = imb * 1.55;
      break;
    case 'HIGH':
      calories = imb * 1.725;
      break;
    case 'EXTREME':
      calories = imb * 1.9;
      break;
    default:
      throw new Error('Invalid activity');
  }

  switch (goal) {
    case 'MANTAIN':
      break;
    case 'LOSE':
      calories -= 500;
      break;
    case 'GAIN':
      calories = calories * 0.15 + calories;
      break;
    default:
      throw new Error('Invalid goal');
  }

  return calories;
}

export const dayNum = (
  day: string = new Date().getDay().toString()
) => {
  switch (day) {
    case 'monday':
      return 0;
    case 'tuesday':
      return 1;
    case 'wednesday':
      return 2;
    case 'thursday':
      return 3;
    case 'friday':
      return 4;
    case 'saturday':
      return 5;
    case 'sunday':
      return 6;
    default:
      return -1;
  }
}
