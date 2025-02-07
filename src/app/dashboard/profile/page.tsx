import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from "next/image";
import { StarIcon } from '@heroicons/react/24/outline';

import { authOptions } from '@/lib/authOptions';
import { getUser } from '@/lib/dao/user';
import UserForm from '@/ui/profile/user-form';


export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Access denied</p>;
  } else if (!session.user.id) {
    return <p>Getting user...</p>;
  }
  const user = await getUser(session.user.id);
  
  if (!user || user === null) {
    redirect('/');
  }
  return (
    <div className="flex justify-around">
      <div className="flex-1 mr-4 justify-center">
        <Image src={session.user.image} alt="Profile picture" width={150} height={150} className="rounded-full" />
        <h1 className="text-2xl font-bold text-gray-800">{user.fullName}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
        {
          user.age && 
          <p className="text-sm text-gray-500">Age: {user.age}</p>
        }
        {
          user.prime && (
            <div className="flex items-center mt-4">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <p className="text-sm text-yellow-500 ml-2">Prime</p>
            </div>
          )
        }
      </div>

      <UserForm user={user} />
    </div>
  )
}




          {/* <div className="flex w-3/4 justify-start gap-4">
            <AssureButton 
              confirmationMessage="¿Estas seguro de que quieres borrar tu cuenta? Esta acción no es reversible" 
              className="w-2/4 bg-red-500 hover:bg-red-400 active:bg-red-600" 
              type="submit"
              onClick={invocateDeleteUser(session.id)}
            >
              Borrar cuenta
            </AssureButton>
          </div> */}