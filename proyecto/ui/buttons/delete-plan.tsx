'use client'

import { TrashIcon } from '@heroicons/react/24/outline';
import { invocateDeletePlan } from '@/lib/actions';
import { AssureButton } from '@/ui/button';

export function DeletePlan({ idPlan, userId }: { idPlan: number, userId: string }) {

  return (
    <AssureButton
      confirmationMessage="¿Estas seguro de que quieres el plan?"
      type="submit"
      className="bg-red-500 hover:bg-red-400 active:bg-red-600"
      onClick={(e) => {
        e.preventDefault();
        invocateDeletePlan(idPlan, userId);
      }}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </AssureButton>
  );
}