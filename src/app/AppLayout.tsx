'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@/components/ConnectButton';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/gated', label: 'Gated Page' },
    { path: '/stake', label: 'Staking Page' },
  ];

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                    pathname === item.path
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:border-primary-300 hover:text-primary-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
