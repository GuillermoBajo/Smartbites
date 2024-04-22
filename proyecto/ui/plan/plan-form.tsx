'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { PencilIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

import { Goal, MealPlan } from '@prisma/client'
import { invocateCreateUpdatePlan } from '@/lib/actions';
import { Button } from '@/ui/button';
import { error } from 'console';


export default function PlanForm({ userId, plan }: { userId: string, plan: MealPlan | null }) {
  const invocateCreateUpdatePlanId = invocateCreateUpdatePlan.bind(null, userId, plan !== null ? plan.id : null);
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(invocateCreateUpdatePlanId, initialState);
  
  return (
    <form action={dispatch}>
      <div>
        {/* Nombre del plan */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Introduce a name for the plan
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="plan-name"
                name="planName"
                type="text"
                placeholder="Plan name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={plan?.name}
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.planName ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.planName.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

      {!plan && (
        <div className="mb-4">
          <label htmlFor="goal" className="mb-2 block text-sm font-medium">
            Choose your goal
          </label>
          <div className="relative">
            <select
              id="goal"
              name="goal"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="goal-error"
            >
              <option value="" disabled>
                Select a goal
              </option>
              {Object.keys(Goal).map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
            <RocketLaunchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.goal ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.goal.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">
          {plan ? 'Edit plan' : 'Create plan'}
        </Button>
      </div>
      {
        state.message && (
          <div
            id="customer-error"
            aria-live="polite"
            className="mt-2 flex justify-end text-sm text-red-500"
          >
            {state.message}
          </div>
        )
      }
    </form>
  )
}
