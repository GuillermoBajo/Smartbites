"use client";
import { usePathname } from 'next/navigation';

import CreatePlan from '@/ui/buttons/create-plan';
import { lusitana } from '@/ui/fonts';

export default function DashboardHeader() {
  const pathname = usePathname();
  const isRecipe = pathname.includes('/recipe');
  const isProfile = pathname.includes('/profile');
  const title = getTitle(isRecipe, isProfile);
  
  return (
    <div className="flex justify-between items-center">
      <h1 className={`${lusitana.className} text-[40px] md:text-[40px]`}>
        {title}
      </h1>
      { title == 'Dashboard' && <CreatePlan /> }
    </div>
  );
}

function getTitle(isRecipe: boolean, isProfile: boolean) {
  if (isRecipe) {
    // return ''
    return 'Recipe'
  } else if (isProfile) {
    return 'Mi perfil'
  } else {
    return 'Dashboard'
  }
}