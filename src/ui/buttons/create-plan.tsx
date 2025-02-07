import Link from "next/link";
import { PlusIcon } from '@heroicons/react/24/outline';


export default function CreatePlan() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-8 items-center rounded-lg bg-green-600 px-3 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <span className="hidden md:block">Create Plan</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}