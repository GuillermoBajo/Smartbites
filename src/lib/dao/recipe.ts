import { PrismaClient } from '@prisma/client';

/**
 * Retrieves a recipe by its ID.
 * @param id - The ID of the recipe to retrieve.
 * @returns The retrieved recipe.
 * @throws Error if there was an error retrieving the recipe.
 */
export async function getRecipe(
    id: number
) {
    const prisma = new PrismaClient()
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id: id }
        });
        return recipe;

    } catch (error) {
        console.error('Error in getRecipe:', error);
        throw new Error('Failed to get recipe');
    }
}

export async function getRecipes() {
    const prisma = new PrismaClient()
    try {
        const recipes = await prisma.recipe.findMany();
        return recipes;

    } catch (error) {
        console.error('Error in getRecipes:', error);
        throw new Error('Failed to get recipes');
    }
}

const ITEMS_PER_PAGE = 10;
export async function getFilteredRecipes(filter: string, page: number) {
    console.log(filter)
    const prisma = new PrismaClient()
    try {
        const recipes = await prisma.recipe.findMany({
            where: { title: { contains: filter, mode: 'insensitive' } },
            orderBy: { title: 'asc' },
            skip: (page-1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE
        });
        console.log(filter, recipes.map(recipe => recipe.title))
        return recipes;

    } catch (error) {
        console.error('Error in getFilteredRecipes:', error);
        throw new Error('Failed to get recipes');
    }       
}

export async function getPageCount(filter: string) {
    const prisma = new PrismaClient()
    try {
        const count = await prisma.recipe.count({
            where: { title: { contains: filter, mode: 'insensitive' } },
        });
        return Math.ceil(count / ITEMS_PER_PAGE);

    } catch (error) {
        console.error('Error in getPageCount:', error);
        throw new Error('Failed to get page count');
    }       
}