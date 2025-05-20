'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav className="flex gap-4 p-4">
        <Link className={clsx(pathname === '/' && 'bg-amber-800')} href="/">
          Home
        </Link>
        <Link
          className={clsx(pathname === '/houses' && 'bg-amber-800')}
          href="/houses"
        >
          Houses
        </Link>
        <Link
          className={clsx(pathname === '/contact' && 'bg-amber-800')}
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className={clsx(pathname === '/dynamic' && 'bg-amber-800')}
          href="/dynamic"
        >
          Dynamic Content
        </Link>
      </nav>
    </header>
  );
};
