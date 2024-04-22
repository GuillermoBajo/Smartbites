'use client'

import { useFormState } from "react-dom";
import { RocketLaunchIcon, PencilIcon } from '@heroicons/react/24/outline'

import { Activity, User } from "@prisma/client";
import { invocatePerfil } from '@/lib/actions';
import { Button } from "@/ui/button";

export default function UserForm({ user }: { user: User}) {
  const invocatePerfilId = invocatePerfil.bind(null, user.id);
    
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(invocatePerfilId, initialState);

  return (
    <form action={dispatch} className="flex-2 my-5 ml-auto flex flex-col items-center mx-auto">
      {/* <h3 className="text-[25px] mt-10 font-bold text-gray-800">Editar perfil</h3> */}
      <div className="mb-4 w-full">
        <label htmlFor="goal" className="mb-2 block text-sm font-medium">
          Select your activity level at the moment
        </label>
        <div className="relative">
          <select
            id="activity"
            name="activity"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="activity-error"
            defaultValue={user?.activity ?? ""}
          >
            <option value="" disabled>
              Select your activity level
            </option>
            {Object.keys(Activity).map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
          <RocketLaunchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        {state.errors?.activity ? (
          <div
            id="customer-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.activity.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="exclude" className="mb-2  block text-sm font-medium">
          Ingredients you want to exclude from your diet
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="exclude"
              name="exclude"
              type="text"
              placeholder="Introduce the ingredients"
              className="peer block rounded-md w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={user?.exclude ?? ""}
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        {state.errors?.exclude ? (
          <div
            id="customer-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.exclude.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex justify-around w-full mb-4">
        <div>
          <div className="relative mt-2 rounded-md">
            <label htmlFor="weight" className="mb-2 block text-sm font-medium">
              Weight
            </label>
            <div className="relative mt-2 rounded-md flex items-center">
              <input
                id="weight"
                name="weight"
                type="number"
                placeholder="Weight"
                className="peer block w-20 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={user?.weight?.toString()}
              />
              <span className="ml-2 text-sm text-gray-500">
                kg
              </span>
            </div>
          </div>
          {state.errors?.weight ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.weight.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mb-4 mx-4">
          <div className="relative mt-2 rounded-md">
            <label htmlFor="weight" className="mb-2 block text-sm font-medium">
              Height
            </label>
            <div className="relative mt-2 rounded-md flex items-center">
              <input
                id="height"
                name="height"
                type="number"
                placeholder="Height"
                className="peer block w-20 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={user?.height?.toString()}
              />
              <span className="ml-2 text-sm text-gray-500">
                cm
              </span>
            </div>
          </div>
          {state.errors?.height ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.height.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="my-6 flex justify-end gap-4">
        <Button type="submit">Save changes</Button>
      </div>
      {
        state.message && (
        <p className="text-green-500 text-lg font-semibold bg-green-100 p-2 rounded-md">
          {state.message}
        </p>)
      }
    </form>
  )
}