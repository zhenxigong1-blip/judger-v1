'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface IOSNavigationBarProps {
  /**
   * 标题
   */
  title?: string;

  /**
   * 是否显示返回按钮
   */
  showBackButton?: boolean;

  /**
   * 返回按钮文本（默认"返回"）
   */
  backButtonText?: string;

  /**
   * 返回按钮点击事件（默认使用router.back()）
   */
  onBackClick?: () => void;

  /**
   * 左侧自定义内容（会覆盖返回按钮）
   */
  leftContent?: ReactNode;

  /**
   * 右侧内容
   */
  rightContent?: ReactNode;

  /**
   * 是否使用大标题模式
   */
  largeTitle?: boolean;

  /**
   * 是否使用毛玻璃效果
   */
  blurred?: boolean;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * IOSNavigationBar - iOS风格导航栏组件
 *
 * 特点：
 * - 毛玻璃背景（可选）
 * - 大标题模式支持
 * - 返回按钮和自定义操作
 * - 固定在顶部
 */
export const IOSNavigationBar = ({
  title,
  showBackButton = false,
  backButtonText = '返回',
  onBackClick,
  leftContent,
  rightContent,
  largeTitle = false,
  blurred = true,
  className = '',
}: IOSNavigationBarProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  // 基础样式
  const baseStyles = 'sticky top-0 z-50 transition-all duration-300';

  // 背景样式
  const backgroundStyles = blurred
    ? 'backdrop-blur-md bg-white/80 border-b border-gray-200/50'
    : 'bg-white border-b border-gray-200';

  return (
    <nav className={`${baseStyles} ${backgroundStyles} ${className}`}>
      {/* 常规导航栏 */}
      {!largeTitle && (
        <div className="flex items-center justify-between h-14 px-4">
          {/* 左侧内容 */}
          <div className="flex-shrink-0 min-w-0 flex-1">
            {leftContent ? (
              leftContent
            ) : showBackButton ? (
              <button
                onClick={handleBackClick}
                className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{backButtonText}</span>
              </button>
            ) : null}
          </div>

          {/* 中间标题 */}
          {title && (
            <div className="flex-shrink-0 px-4">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h1>
            </div>
          )}

          {/* 右侧内容 */}
          <div className="flex-shrink-0 min-w-0 flex-1 flex justify-end">
            {rightContent}
          </div>
        </div>
      )}

      {/* 大标题模式 */}
      {largeTitle && (
        <div className="px-4 pb-4">
          {/* 顶部工具栏 */}
          <div className="flex items-center justify-between h-14">
            {/* 左侧内容 */}
            <div className="flex-shrink-0">
              {leftContent ? (
                leftContent
              ) : showBackButton ? (
                <button
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>{backButtonText}</span>
                </button>
              ) : null}
            </div>

            {/* 右侧内容 */}
            <div className="flex-shrink-0">
              {rightContent}
            </div>
          </div>

          {/* 大标题 */}
          {title && (
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {title}
            </h1>
          )}
        </div>
      )}
    </nav>
  );
};
