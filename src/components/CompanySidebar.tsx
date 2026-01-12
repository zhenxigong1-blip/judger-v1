'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const CompanySidebar: React.FC = () => {
  const pathname = usePathname();
  
  // 导航菜单
  const menuItems = [
    {
      title: '工作台',
      href: '/company/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: '岗位管理',
      href: '/company/jobs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: '候选池',
      href: '/company/candidates',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: '风险分析',
      href: '/company/analysis',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">企业中心</h2>
        <p className="text-sm text-gray-500 mt-1">管理岗位、候选人与分析</p>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className={isActive ? 'text-primary' : 'text-gray-500'}>
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* 企业信息卡片 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">A</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">AI Lab</h3>
            <p className="text-xs text-gray-500">Startup · AI/ML</p>
          </div>
        </div>
        <button className="w-full mt-3 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-all duration-200">
          管理公司信息
        </button>
      </div>
    </aside>
  );
};