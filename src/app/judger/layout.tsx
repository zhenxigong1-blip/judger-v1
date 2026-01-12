'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function JudgerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 导航项
  const navItems = [
    {
      name: '岗位',
      href: '/judger/positions',
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${active ? 'text-primary-500' : 'text-gray-500'}`}
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: '搜人',
      href: '/judger/search',
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${active ? 'text-primary-500' : 'text-gray-500'}`}
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      name: '分析',
      href: '/judger/candidates/new',
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${active ? 'text-primary-500' : 'text-gray-500'}`}
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/judger/positions') {
      return pathname === href || pathname.startsWith('/judger/positions/');
    }
    if (href === '/judger/search') {
      return pathname === href || pathname.startsWith('/judger/search/');
    }
    if (href === '/judger/candidates/new') {
      return pathname.startsWith('/judger/candidates/');
    }
    return pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 主内容区域 */}
      <main className="pb-20">
        {children}
      </main>

      {/* iOS风格底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 border-t border-gray-200/50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 min-w-0 flex-1 transition-all duration-200"
                >
                  {item.icon(active)}
                  <span
                    className={`text-xs font-medium transition-colors ${
                      active ? 'text-primary-500' : 'text-gray-500'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
