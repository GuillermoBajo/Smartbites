'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { Activity, Goal } from '@prisma/client';
import { countUserMealPlans, getUser, updateUser } from '@/lib/dao/user';
import { createPlan, deletePlan, updatePlan } from '@/lib/dao/plan';
import { PlanFormState, ProfileFormState } from '@/lib/definitions';
import { revalidatePath } from 'next/cache';


export async function invocateEncuesta(idUser: string, results: any) {
    const parsedCredentials = z
        .object({
            activity: z.enum(Object.values(Activity) as [Activity]),
            weight: z.number().min(30).max(350),
            height: z.number().min(100).max(250),
            age: z.number().min(18).max(120),
            exclude: z.string().optional(),
            sex: z.enum(['m', 'h']),
        })
        .safeParse(results);
    if (!parsedCredentials.success) {
        console.log('parsedCredentials', parsedCredentials.error.flatten().fieldErrors)
        return {
            errors: parsedCredentials.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Profile.',
        }
    }
    const data = parsedCredentials.data;
    Object.assign(data, { survey: true })
    try {
        console.log('data', data)
        await updateUser(idUser, data);

    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Profile.',
        };
    }
    revalidatePath('/dashboard');
    redirect('/dashboard')
}

export async function invocatePerfil(idUser: string, prevState: ProfileFormState, formData: FormData) {
    const formDataObj = Array.from(formData.entries()).reduce((obj: any, [key, value]) => {
        if (key === 'weight' || key === 'height') {
            obj[key] = Number(value);
        } else {
            obj[key] = value;
        }
        return obj;
    }, {});
    const parsedCredentials = z
        .object({
            activity: z.enum(Object.values(Activity) as [Activity]),
            weight: z.number().min(40).max(200),
            height: z.number().min(100).max(220),
            exclude: z.string(),
            // completar datos
        })
        .safeParse(formDataObj);
    if (!parsedCredentials.success) {
        return {
            errors: parsedCredentials.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Profile.',
        }
    }

    try {
        await updateUser(idUser, parsedCredentials.data);

    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Profile.',
        };
    }

    revalidatePath('/dashboard/perfil');
    return {
        message: 'Successfully Updated Profile.',
    };
}


export async function invocateCreateUpdatePlan(idUser: string, idPlan: number | null, prevState: PlanFormState, formData: FormData) {
    const parsedCredentials = z
        .object({
            planName: z.string(),
            goal: z.enum(Object.values(Goal) as [Goal]).optional(),
        })
        .safeParse(Object.fromEntries(formData));
    if (!parsedCredentials.success) {
        return {
            errors: parsedCredentials.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed Plan.',
        }
    }
    
    const { planName, goal } = parsedCredentials.data;
    if (goal === undefined && idPlan !== null) {

        try {
            await updatePlan(idPlan, idUser, planName);

        } catch (error) {
            console.log(error)
            return { message: 'Database Error: Failed to Update Plan.' };
        }

    } else if (goal !== undefined && idPlan === null) {
        try {
            const [count, user] = await Promise.all([
                countUserMealPlans(idUser),
                getUser(idUser)
            ]);
    
            if (!user?.prime && count >= 2) {
                return {
                    message: 'Failed to Create Plan. You have reached your limit of 2 plans.',
                };
            }
            const plan = await createPlan(idUser, planName, goal);
            idPlan = plan.id;
    
        } catch (error) {
            console.log(error)
            return { message: 'Database Error: Failed to Create Plan.' };
        }

    } else {
        return { message: 'Incohorent data. Failed to Create/Update Plan.' };
    }
    revalidatePath('/dashboard', 'layout');
    redirect('/dashboard?plan='+idPlan)
}

export async function invocateDeletePlan(idPlan: number, idUser: string) {
    try {
        await deletePlan(idPlan, idUser);
    } catch (error) {
        console.log('deleted')
        return { message: 'Database Error: Failed to Delete Plan.' };
    }
    revalidatePath('/dashboard', 'layout');
    redirect('/dashboard')
}