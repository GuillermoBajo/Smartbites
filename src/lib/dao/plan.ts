import { Goal, PrismaClient, Recipe } from '@prisma/client';
import { buildRecipes, dayNum, getCalories } from '../utils';
import { generateMealPlanAPI, getRecipesAPI } from '../spoonacular';


/**
 * Creates a meal plan for a user.
 * 
 * @param idUser - The ID of the user.
 * @param name - The name of the meal plan.
 * @param goal - The goal of the meal plan.
 * @returns The created meal plan.
 * @throws Error if the user is not found or if there is an error creating the meal plan.
 */
export async function createPlan(
    idUser: string,
    name: string,
    goal: Goal,
) {
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({ where: { id: idUser } });
        if (!user) throw new Error('User not found');
        
        let calories = getCalories(user, goal);
        const rawMealPlan = await generateMealPlanAPI(calories, user.exclude);
        
        let meals = [];
        for (const [day, info] of Object.entries(rawMealPlan.week) as [string, { meals: { id: number }[] }][]) {
            for (let i = 0; i < info.meals.length; i++) {
                meals.push({
                    day: dayNum(day),
                    type: i,
                    recipeId: info.meals[i].id,
                });
            }
        }
        const recipesIdSet = new Set(meals.map(meal => meal.recipeId));
        const recipesId = Array.from(recipesIdSet);
        const recipes = await getRecipesAPI(recipesId);
        const recipesCleaned: Recipe[] = buildRecipes(recipes);

        const createdPlan = await prisma.mealPlan.create({
            data: {
                name: name,
                goal: goal,
                user: { connect: { id: idUser } }
            }
        });
        await prisma.recipe.createMany({ 
            skipDuplicates: true,
            data: recipesCleaned 
        });
        await prisma.meal.createMany({
            data: meals.map(meal => ({
                day: meal.day,
                type: meal.type,
                recipeId: meal.recipeId,
                mealPlanId: createdPlan.id
            }))
        });
        console.log('Created meal plan:', createdPlan);
        return createdPlan;

    } catch (error) {
        console.error('Error in createPlan:', error);
        throw new Error('Failed to create a meal plan');
    } finally {
        await prisma.$disconnect(); // Disconnect from the Prisma client
    }
}

/**
 * Retrieves a single meal plan based on the provided plan ID and user ID.
 * @param idPlan - The ID of the meal plan.
 * @param idUser - The ID of the user.
 * @returns A Promise that resolves to the retrieved meal plan.
 * @throws If there is an error retrieving the meal plan.
 */
export async function getOnePlan(
    idPlan: number,
    idUser: string,
) {
    const prisma = new PrismaClient()
    try {
        const plan = await prisma.mealPlan.findUnique({
            where: { id: idPlan, user: { id: idUser } },
            include: { meals: { include: { recipe: true } } }
        });
        console.log('Found meal plan');
        // if (plan === null) return false;
        return plan;

    } catch (error) {
        console.error('Error in getPlan:', error);
        return null;
        throw new Error('Failed to get meal plan');
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retrieves the meal plans for a given user.
 * 
 * @param idUser - The ID of the user.
 * @returns A promise that resolves to an array of meal plans.
 * @throws If there is an error retrieving the meal plans.
 */
export async function getPlans(
    idUser: string,
) {
    const prisma = new PrismaClient()
    try {
        const plans = await prisma.mealPlan.findMany({
            where: { user: { id: idUser } },
        });
        console.log('Found meal plans');
        // if (plans === null) return false;
        return plans;
        
    } catch (error) {
        console.error('Error in getPlan:', error);
        throw new Error('Failed to get meal plan');
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Deletes a meal plan from the database.
 * 
 * @param {number} idPlan - The ID of the meal plan to delete.
 * @param {number} idUser - The ID of the user who owns the meal plan.
 * @returns {Promise<void>} - A promise that resolves when the meal plan is successfully deleted.
 */
export async function deletePlan(
    idPlan: number,
    idUser: string,
) {
    console.log('deletePlan', idPlan, idUser);
    const prisma = new PrismaClient()
    try {
        const plan = await prisma.mealPlan.delete({
            where: { id: idPlan, userId: idUser }
        });
        console.log('Deleted meal plan:', plan);
        return plan;

    } catch (error) {
        console.error('Error in deletePlan:', error);
        throw new Error('Failed to delete meal plan');
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Updates a meal plan with the specified ID.
 * 
 * @param idPlan - The ID of the meal plan to update.
 * @param idUser - The ID of the user who owns the meal plan.
 * @param name - The new name for the meal plan.
 * @returns The updated meal plan.
 * @throws Error if the update fails.
 */
export async function updatePlan(
    idPlan: number, 
    idUser: string,
    name: string,
) {
    console.log('updatePlan', idPlan, idUser, name);
    const prisma = new PrismaClient()
    try {
        const plan = await prisma.mealPlan.update({
            where: { id: idPlan, user: { id: idUser } },
            data: {
                name: name,
            }
        });
        console.log('Updated meal plan:', plan);
        return plan;

    } catch (error) {
        console.error('Error in updatePlan:', error);
        throw new Error('Failed to update meal plan');
    } finally {
        await prisma.$disconnect();
    }
}
