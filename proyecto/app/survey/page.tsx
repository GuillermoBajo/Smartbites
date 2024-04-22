import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { getUser } from '@/lib/dao/user';
import Encuesta from '@/ui/survey/survey';
import { AcmeLogoBlue } from '@/ui/logo';


export default async function Encuestas() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <p>Access denied</p>;
  }
  const user = await getUser(session.user.id);
  if (!user) {
    redirect('/');
  }
  if (user.survey) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen">
      {/* Cabecera con color azul claro y logo */}
      <header className="m-7 flex justify-between items-center">
        <Link href="/" >
          <AcmeLogoBlue />
        </Link>
      </header>

      {/* Espacio para la encuesta utilizando el componente EncuestaComponent */}
      <div className="flex-grow p-4">
        <Encuesta userId={session.user.id} />
      </div>
    </div>
  );
};