import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from "next/headers";
import { getServerSession } from 'next-auth';
import { UserIcon, BookOpenIcon } from '@heroicons/react/24/outline';

import { authOptions } from '@/lib/authOptions';
import { getPlans } from '@/lib/dao/plan';
import { getUser } from '@/lib/dao/user';

import PlanLinks from '@/ui/nav/plan-selector';
import SideLogo from '@/ui/nav/side-logo';
import SignOutButton from '@/ui/auth/SignOut';

export default async function SideNav() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }
  if (!session.user.id) {
    <p>Getting user...</p>
  }
  const headersList = headers();
  console.log('url', headersList.get('x-url'))
  
  const [user, allPlans] = await Promise.all([
    getUser(session.user.id),
    getPlans(session.user.id)
  ]);
  console.log('SideNav', user, allPlans)

  if (!user) {
    redirect('/');
  } else if (!user.survey) {
    redirect('/survey');
  } 
  else if (allPlans.length === 0 && headersList.get('x-url') !== '/dashboard/create' && headersList.get('x-url') !== null) {
    redirect('/dashboard/create');
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">     
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">

        <SideLogo />
        
        <PlanLinks allPlans={allPlans} />
        
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
        <Link
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md text-lg font-lg hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          href="/dashboard/recipe"
        >
          <BookOpenIcon className="w-6" />
          <div className="hidden md:block">Recipe book</div>
        </Link>
        
        <Link
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md text-lg font-lg hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          href="/dashboard/profile"
        >
          <UserIcon className="w-6" />
          <div className="hidden md:block">My profile</div>
        </Link>

        <SignOutButton />
      </div>
    </div>
  );
}