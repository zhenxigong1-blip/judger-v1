'use client';

import React, { useState, forwardRef, InputHTMLAttributes } from 'react';

export interface IOSInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 标签文本
   */
  label?: string;

  /**
   * 错误提示文本
   */
  error?: string;

  /**
   * 帮助文本
   */
  helperText?: string;

  /**
   * 左侧图标
   */
  leftIcon?: React.ReactNode;

  /**
   * 右侧图标
   */
  rightIcon?: React.ReactNode;

  /**
   * 输入框尺寸
   */
  inputSize?: 'sm' | 'md' | 'lg';

  /**
   * 是否全宽
   */
  fullWidth?: boolean;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * IOSInput - iOS风格输入框组件
 */
export const IOSInput = forwardRef<HTMLInputElement, IOSInputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  inputSize = 'md',
  fullWidth = false,
  className = '',
  value,
  onChange,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');

  const hasValue = value || internalValue;

  // 基础样式
  const containerStyles = fullWidth ? 'w-full' : '';

  // 输入框尺寸
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  // 输入框样式
  const inputStyles = `w-full ${sizeStyles[inputSize]} border-2 rounded-xl transition-all duration-300 focus:outline-none ${
    error
      ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
      : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
  } ${leftIcon ? 'pl-12' : ''} ${rightIcon ? 'pr-12' : ''}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={`${containerStyles} ${className}`}>
      {/* 标签 */}
      {label && (
        <label
          className={`block text-sm font-semibold mb-2 transition-colors ${
            error ? 'text-danger' : isFocused ? 'text-primary' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}

      {/* 输入框容器 */}
      <div className="relative">
        {/* 左侧图标 */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        {/* 输入框 */}
        <input
          ref={ref}
          className={inputStyles}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* 右侧图标或清除按钮 */}
        {rightIcon ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        ) : hasValue && !props.disabled ? (
          <button
            type="button"
            onClick={() => {
              setInternalValue('');
              if (onChange) {
                const event = {
                  target: { value: '' },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
              }
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>

      {/* 错误或帮助文本 */}
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-danger' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

IOSInput.displayName = 'IOSInput';
