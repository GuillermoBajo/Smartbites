import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google';

import '@/ui/global.css';

import SessionProvider from '@/app/provider';

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
