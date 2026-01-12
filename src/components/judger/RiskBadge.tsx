'use client';

import React from 'react';

export interface RiskBadgeProps {
  /**
   * 风险等级
   */
  level: 'high' | 'medium' | 'low';

  /**
   * 显示文本（可选，默认根据level显示）
   */
  label?: string;

  /**
   * 尺寸
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 是否显示图标
   */
  showIcon?: boolean;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * RiskBadge - 风险等级徽章组件
 *
 * 特点：
 * - 颜色编码（红/黄/绿）
 * - iOS风格圆角和阴影
 * - 支持不同尺寸
 * - 可选图标显示
 */
export const RiskBadge = ({
  level,
  label,
  size = 'md',
  showIcon = true,
  className = '',
}: RiskBadgeProps) => {
  // 默认标签
  const defaultLabels = {
    high: '高风险',
    medium: '中风险',
    low: '低风险',
  };

  const displayLabel = label || defaultLabels[level];

  // 风险等级样式
  const levelStyles = {
    high: 'bg-risk-high/10 text-risk-high border-risk-high',
    medium: 'bg-risk-medium/10 text-risk-medium border-risk-medium',
    low: 'bg-risk-low/10 text-risk-low border-risk-low',
  };

  // 尺寸样式
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  // 图标尺寸
  const iconSizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // 风险等级图标
  const riskIcons = {
    high: (
      <svg className={iconSizeStyles[size]} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    medium: (
      <svg className={iconSizeStyles[size]} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    low: (
      <svg className={iconSizeStyles[size]} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-lg border transition-all duration-300 ${levelStyles[level]} ${sizeStyles[size]} ${className}`}
    >
      {showIcon && riskIcons[level]}
      <span>{displayLabel}</span>
    </span>
  );
};
