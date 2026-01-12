'use client';

import React, { ReactNode } from 'react';

export interface IOSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片内容
   */
  children: ReactNode;

  /**
   * 卡片变体样式
   * - default: 标准白色卡片
   * - glass: 毛玻璃效果
   * - elevated: 高度抬升（更强阴影）
   */
  variant?: 'default' | 'glass' | 'elevated';

  /**
   * 是否可点击（显示悬停效果）
   */
  clickable?: boolean;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * IOSCard - iOS风格卡片组件
 *
 * 特点：
 * - 大圆角（16px）
 * - 轻柔阴影
 * - 流畅的悬停动画
 * - 支持毛玻璃效果
 */
export const IOSCard = ({
  children,
  variant = 'default',
  clickable = false,
  className = '',
  ...props
}: IOSCardProps) => {
  // 基础样式
  const baseStyles = 'rounded-2xl transition-all duration-300';

  // 变体样式
  const variantStyles = {
    default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
    glass: 'backdrop-blur-md bg-white/30 border border-white/50 shadow-lg',
    elevated: 'bg-white shadow-lg hover:shadow-2xl',
  };

  // 悬停效果（如果可点击）
  const hoverStyles = clickable ? 'cursor-pointer hover:-translate-y-1' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
