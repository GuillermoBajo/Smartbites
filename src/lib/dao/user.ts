import { PrismaClient } from '@prisma/client';

/**
 * Creates a new user with the provided email, password, and full name.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @param fullName - The full name of the user.
 * @returns A promise that resolves to the created user.
 * @throws If there is an error creating the user.
 */
export async function createUser(
    email: string,
    fullName: string,
    image: string,
) {
    const prisma = new PrismaClient()
    try {
        const user = await prisma.user.create({
            data: { email, fullName, image },
        });        
        return user;
        
    } catch (error) {
        console.error('Error in createUser:', error);
        throw new Error('Failed to create user');
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Updates a user in the database.
 * @param id - The ID of the user to update.
 * @param data - The updated data for the user.
 * @returns A Promise that resolves to the updated user.
 * @throws If there is an error updating the user.
 */
export async function updateUser(
    id: string,
    data: object
) {
    console.log('data', data)
    const prisma = new PrismaClient()
    try {
        return await prisma.user.update({
            where: { id },
            data,
        });
    } catch (error) {
        console.error('Error in updateUser:', error);

        throw new Error('Failed to update user');
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Deletes a user from the database.
 * @param id - The ID of the user to delete.
 * @returns A promise that resolves to the deleted user.
 * @throws If there is an error deleting the user.
 */
export async function deleteUser(
    id: string,
) {
    console.log('borrar id', id)
    const prisma = new PrismaClient()
    try {
        return await prisma.user.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        throw new Error('Failed to delete user');
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user.
 * @returns A Promise that resolves to the user object if found, or throws an error if not found.
 */
export async function getUser(
    id: string,
) {
    const prisma = new PrismaClient()
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user
    } catch (error) {
        console.error('Error in getUser:', error);
        throw new Error('Failed to get user');
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retrieves a user from the database based on their email.
 * @param email - The email of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or throws an error if not found.
 */
export async function getUserByEmail(
    email: string,
) {
    const prisma = new PrismaClient()
    try {
        return await prisma.user.findUnique({
            where: { email },
        });
    } catch (error) {
        console.error('Error in getUser:', error);
        throw new Error('Failed to get user');
    } finally {
        await prisma.$disconnect();
    }
}


/**
 * Counts the number of meal plans for a given user.
 * 
 * @param userId - The ID of the user.
 * @returns The number of meal plans for the user.
 * @throws Error if there is an error counting the meal plans.
 */
export async function countUserMealPlans(userId: string) {
    const prisma = new PrismaClient();
    try {
        const count = await prisma.mealPlan.count({
            where: { userId: userId, },
        });

        return count;
    } catch (error) {
        console.error('Error in countUserMealPlans:', error);
        throw new Error('Failed to count meal plans');
    } finally {
        await prisma.$disconnect();
    }
}