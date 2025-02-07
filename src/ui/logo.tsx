import { SwatchIcon } from '@heroicons/react/24/solid';
import { raleway, roboto } from '@/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <SwatchIcon className="rotate-[15deg]" />
      <p className={`${roboto.className} font-bold text-[28px]`}>smart</p>
      <p className={`${raleway.className} font-light text-[27px]`}>bites</p>
    </div>
  );
}

export function AcmeLogoBlue() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-blue-600`}
    >
      <SwatchIcon className="rotate-[15deg]" />
      <p className={`${roboto.className} font-bold text-[28px]`}>smart</p>
      <p className={`${raleway.className} font-light text-[27px]`}>bites</p>
    </div>
  );
}
