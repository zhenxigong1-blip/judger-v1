'use client';

import React, { ReactNode } from 'react';

export interface IOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮内容
   */
  children: ReactNode;

  /**
   * 按钮变体样式
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';

  /**
   * 按钮尺寸
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 是否全宽
   */
  fullWidth?: boolean;

  /**
   * 是否加载中
   */
  loading?: boolean;

  /**
   * 左侧图标
   */
  leftIcon?: ReactNode;

  /**
   * 右侧图标
   */
  rightIcon?: ReactNode;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * IOSButton - iOS风格按钮组件
 */
export const IOSButton = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: IOSButtonProps) => {
  // 基础样式
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';

  // 变体样式
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-primary-500',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm hover:shadow-md hover:scale-105 focus:ring-gray-400',
    danger: 'bg-gradient-to-r from-danger to-danger text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-danger',
    ghost: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
  };

  // 尺寸样式
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // 宽度样式
  const widthStyles = fullWidth ? 'w-full' : '';

  // 禁用/加载状态样式
  const stateStyles = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${stateStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {/* 左侧图标 */}
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}

      {/* 加载状态 */}
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>加载中...</span>
        </>
      ) : (
        children
      )}

      {/* 右侧图标 */}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};
