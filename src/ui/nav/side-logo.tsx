import Link from 'next/link';

import AcmeLogo from '@/ui/logo';

export default function SideLogo() {
  return (
    <Link href="/dashboard" className='mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40'>
      <div className="w-32 text-white md:w-40">
        <AcmeLogo />
      </div>    
    </Link>
  )
}