'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from './SessionProvider';
import { Role } from '@/types';

export const Navbar: React.FC = () => {
  const { user, logout } = useSession();

  // 根据用户角色渲染不同的导航菜单
  const renderNavMenu = () => {
    if (!user) {
      // 未登录状态
      return (
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
            内推岗位
          </Link>
          <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
            登录
          </Link>
          <Link href="/auth/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg hover:scale-105">
            注册
          </Link>
        </div>
      );
    }

    // 已登录状态，根据角色展示不同菜单
    switch (user.role) {
      case Role.CANDIDATE:
        return (
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              岗位广场
            </Link>
            <Link href="/candidate/resume" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              简历中心
            </Link>
            <Link href="/candidate/applications" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              投递记录
            </Link>
            <button
              onClick={logout}
              className="text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
            >
              退出
            </button>
          </div>
        );
      case Role.COMPANY_ADMIN:
      case Role.HR:
      case Role.CTO:
      case Role.CEO:
        return (
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/company/dashboard" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              工作台
            </Link>
            <Link href="/company/jobs" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              岗位管理
            </Link>
            <Link href="/company/candidates" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              候选池
            </Link>
            <Link href="/company/analysis" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              风险分析
            </Link>
            <button
              onClick={logout}
              className="text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
            >
              退出
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Judger</span>
        </Link>

        {/* 导航菜单 */}
        {renderNavMenu()}

        {/* 移动端菜单按钮 */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-blue-50 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};