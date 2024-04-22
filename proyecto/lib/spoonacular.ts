import axios from "axios";

export async function getRecipesAPI(
    ids: number[],
) {
    const infoBulkEndpoint = 'https://api.spoonacular.com/recipes/informationBulk';
    // const nutrientsEndpoint = 'https://api.spoonacular.com/recipes/{id}/nutritionWidget.json';

    const res = await axios.get(infoBulkEndpoint, {
        params: {
            ids: ids.join(','),
            includeNutrition: true,
            apiKey: process.env.SPOONACULAR_API_KEY
        }
    });
    let recipes = res.data;


    // for (const recipe of recipes) {
    //     const res = await axios.get(nutrientsEndpoint.replace('{id}', recipe.id), {
    //         params: {
    //             apiKey: process.env.SPOONACULAR_API_KEY
    //         }
    //     });
    //     recipe.nutrients = res.data;
    // }

    return recipes;
}


export async function generateMealPlanAPI(
    calories: number, 
    exclude: string | null,
) {
    const endpoint = 'https://api.spoonacular.com/mealplanner/generate';
    const res = await axios.get(endpoint, {
        params: {
            timeFrame: 'week',
            targetCalories: calories,
            apiKey: process.env.SPOONACULAR_API_KEY,
            exclude: exclude,
        }
    });
    return res.data;
}
