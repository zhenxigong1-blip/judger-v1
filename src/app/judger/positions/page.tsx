'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { getAllPositions } from '@/lib/storage';
import type { PositionInput } from '@/types/judger';

export default function PositionsPage() {
  const [positions, setPositions] = useState<PositionInput[]>([]);

  // 加载岗位数据
  useEffect(() => {
    const loadPositions = () => {
      const data = getAllPositions();
      // 按创建时间倒序排列
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPositions(data);
    };

    loadPositions();

    // 监听 storage 事件（跨标签页同步）
    window.addEventListener('storage', loadPositions);

    return () => {
      window.removeEventListener('storage', loadPositions);
    };
  }, []);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar
        title="核心技术岗位"
        largeTitle
        rightContent={
          <Link href="/judger/positions/new">
            <IOSButton variant="primary" size="sm">
              + 创建失败画像
            </IOSButton>
          </Link>
        }
      />

      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {positions.length === 0 ? (
          <IOSCard className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
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
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              还没有岗位
            </h3>
            <p className="text-gray-600 mb-6">
              创建第一个岗位，开始使用Judger进行失败预判分析
            </p>
            <Link href="/judger/positions/new">
              <IOSButton variant="primary">
                创建岗位
              </IOSButton>
            </Link>
          </IOSCard>
        ) : (
          positions.map((position) => (
            <Link key={position.id} href={`/judger/positions/${position.id}/profile`}>
              <IOSCard clickable>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {position.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {position.department || '未设置部门'} · 创建于 {formatDate(position.createdAt)}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </IOSCard>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
