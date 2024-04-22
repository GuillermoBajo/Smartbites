"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from 'clsx';
import { MinusIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

import { MealPlan } from "@prisma/client";


export default function PlanLinks({ allPlans }: { allPlans: MealPlan[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [term, setTerm] = useState<string>(params.get('plan') || '');
  if (!term && allPlans.length > 0) {
    setTerm(allPlans[0].id.toString());
  }

  function handleSelection(term: string) {
    params.set('plan', term);
    router.replace(`/dashboard?${params.toString()}`);
    setTerm(term);
  }

  return (
    <>
      <h2>My meal plans</h2>
      {allPlans.map((plan) => {
        const LinkIcon = getIcon(plan.goal);
        return (
          <button
            key={plan.id}
            onClick={() => handleSelection(plan.id.toString())}
            className={clsx(
              'flex h-[25px] grow items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 md:h-[25px]',
              {
                'bg-sky-100 text-blue-600': term === plan.id.toString(),
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{plan.name}</p>
          </button>
        );
      })}
    </>
  )
}


function getIcon(goal: string) {
  switch (goal) {
    case 'LOSE':
      return ArrowTrendingDownIcon;
    case 'GAIN':
      return ArrowTrendingUpIcon;
    case 'MANTAIN':
      return MinusIcon;
    default:
      return MinusIcon;
  }
}