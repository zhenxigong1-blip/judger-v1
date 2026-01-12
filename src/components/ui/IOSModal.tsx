'use client';

import React, { ReactNode, useEffect } from 'react';

export interface IOSModalProps {
  /**
   * 是否显示模态框
   */
  isOpen: boolean;

  /**
   * 关闭模态框回调
   */
  onClose: () => void;

  /**
   * 模态框标题
   */
  title?: string;

  /**
   * 模态框内容
   */
  children: ReactNode;

  /**
   * 尺寸
   */
  size?: 'sm' | 'md' | 'lg' | 'full';

  /**
   * 是否显示关闭按钮
   */
  showCloseButton?: boolean;

  /**
   * 点击遮罩是否关闭
   */
  closeOnOverlayClick?: boolean;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * IOSModal - iOS风格模态框组件
 *
 * 特点：
 * - 从底部滑入
 * - 圆角顶部
 * - 遮罩背景
 * - 平滑动画
 */
export const IOSModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
}: IOSModalProps) => {
  // 尺寸样式
  const sizeStyles = {
    sm: 'max-h-[40vh]',
    md: 'max-h-[60vh]',
    lg: 'max-h-[80vh]',
    full: 'h-full',
  };

  // ESC键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      {/* 遮罩 */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeOnOverlayClick ? onClose : undefined}
        style={{
          opacity: isOpen ? 1 : 0,
        }}
      />

      {/* 模态框内容 */}
      <div
        className={`relative w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl transition-all duration-300 ${sizeStyles[size]} ${className}`}
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {/* 顶部拖动条（仅移动端） */}
        <div className="sm:hidden flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 头部 */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {/* 标题 */}
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}

            {/* 占位（保持对称） */}
            {!title && <div />}

            {/* 关闭按钮 */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* 内容 */}
        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(100% - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
