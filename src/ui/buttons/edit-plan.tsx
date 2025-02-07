import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function EditPlan({ idPlan }: { idPlan: number }) {
  return (
    <Link
      href={`/dashboard/edit?plan=${idPlan}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}