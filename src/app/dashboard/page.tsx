import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { getOnePlan } from '@/lib/dao/plan';
import { Meal } from '@prisma/client';
import Link from 'next/link';
import EditPlan from '@/ui/buttons/edit-plan';
import { DeletePlan } from '@/ui/buttons/delete-plan';
import { MealWithRecipe } from '@/lib/definitions';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const planId = Number(searchParams['plan']);
  if (!planId) {
    return <></>
  }
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Access denied</p>;
  }
  
  const plan = await getOnePlan(planId, session.id);
  if (!plan) {
    return <p>Plan {planId} not found</p>;
  }

  return (
    <main>
      <div>
        <Header title={plan.name} id={plan.id} userId={session.user.id} />

        <br />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mealTypes.map((mealType, index) => (
            <h3 key={index} className={`text-xl mb-1 text-center hidden sm:block ${getColorTitle(mealType)}`}>{mealType}</h3>
          ))}
        </div>

        {days.map((day, dayIndex) => {
          const meals = plan.meals.filter((meal: Meal) => meal.day === dayIndex);
          return (
            <div key={dayIndex}>
              <Day day={day} meals={meals} />
              <br />
            </div>
          );
        })}
      </div>
    </main>
  );
}

function Header({ id, title, userId }: { id: number, title: string, userId: string }) {
  return (
    <div className="flex justify-between items-center">
      <h1 className={`text-xl md:text-3xl`}>
        {title}
      </h1>
      <div className="flex space-x-2">
        <EditPlan idPlan={id} />
        <DeletePlan idPlan={id} userId={userId} />
      </div>
    </div>
  );
}

function Day({ day, meals }: { day: string, meals: MealWithRecipe[] }) {
  return (
    <div className="w-full mb-4">
      <h3 className="text-lg mb-1">{day}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {meals.map((meal, mealIndex) => (
          <div key={mealIndex} className="flex items-center">
            {meal &&
              <Link
                href={`/dashboard/recipe/${meal.recipeId}`}
                className={`rounded-lg p-2 font-medium text-center w-full text-sm ${getColorMeal(meal.type)}`}
              >
                {meal.recipe.title}
              </Link>}
          </div>
        ))}
      </div>
    </div>
  );
}


function getColorTitle(mealType: string) {
  switch (mealType) {
    case 'Breakfast':
      return 'text-red-600';
    case 'Lunch':
      return 'text-green-600';
    case 'Dinner':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
}

function getColorMeal(mealType: number) {
  switch (mealType) {
    case 0:
      return 'bg-red-200 opacity-50 transition-colors hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400';
    case 1:
      return 'bg-green-200 opacity-50 transition-colors hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400';
    case 2:
      return 'bg-blue-200 opacity-50 transition-colors hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400';
    default:
      return 'bg-gray-200 opacity-50';
  }
}

