'use client';

import React, { useState } from 'react';
import { IOSCard } from '@/components/ui/IOSCard';
import { RiskBadge } from './RiskBadge';

export interface FailureProfile {
  type: 'technical' | 'role' | 'stage';
  title: string;
  description: string;
  indicators: string[];
  severity: 'high' | 'medium' | 'low';
}

export interface FailureProfileCardProps {
  /**
   * 失败画像数据
   */
  profile: FailureProfile;

  /**
   * 是否默认展开
   */
  defaultExpanded?: boolean;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * FailureProfileCard - 失败画像卡片组件
 *
 * 特点：
 * - 可展开/收起
 * - 显示失败类型、描述和指标
 * - iOS风格设计
 * - 平滑的展开动画
 */
export const FailureProfileCard = ({
  profile,
  defaultExpanded = false,
  className = '',
}: FailureProfileCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // 失败类型图标
  const typeIcons = {
    technical: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    role: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    stage: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  };

  // 失败类型颜色
  const typeColors = {
    technical: 'text-blue-600',
    role: 'text-purple-600',
    stage: 'text-orange-600',
  };

  return (
    <IOSCard className={className}>
      <div className="p-6">
        {/* 头部：点击展开/收起 */}
        <div
          className="flex items-start gap-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* 图标 */}
          <div className={`flex-shrink-0 ${typeColors[profile.type]}`}>
            {typeIcons[profile.type]}
          </div>

          {/* 标题和风险徽章 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {profile.title}
              </h3>
              <RiskBadge level={profile.severity} size="sm" />
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {profile.description}
            </p>
          </div>

          {/* 展开/收起图标 */}
          <div className="flex-shrink-0 text-gray-400 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* 展开内容：失败指标 */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isExpanded ? '1000px' : '0',
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              失败指标
            </h4>
            <ul className="space-y-2">
              {profile.indicators.map((indicator, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5" />
                  <span>{indicator}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </IOSCard>
  );
};
