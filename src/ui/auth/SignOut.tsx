"use client";

import { signOut } from "next-auth/react";
import { revalidatePath } from 'next/cache';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SignOutButton() {
  return (
    <button 
      className="flex w-full h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-600 p-3 text-base text-white font-medium hover:bg-red-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
      onClick={(e) => {
        e.preventDefault(); // Prevent the default link behavior
        signOut();
        revalidatePath('/dashboard');
      }
    }
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}