/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 科技感色彩系统
      colors: {
        // 主色 - 电光紫/蓝
        primary: {
          50: '#F0F4FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          DEFAULT: '#6366F1',
          glow: 'rgba(99, 102, 241, 0.5)',
        },

        // 次要色 - 青色
        secondary: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
          DEFAULT: '#06B6D4',
          glow: 'rgba(6, 182, 212, 0.5)',
        },

        // 强调色 - 霓虹绿
        accent: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          DEFAULT: '#10B981',
          glow: 'rgba(16, 185, 129, 0.5)',
        },

        // 深色背景系统
        dark: {
          50: '#18181B',
          100: '#27272A',
          200: '#3F3F46',
          300: '#52525B',
          400: '#71717A',
          500: '#A1A1AA',
          600: '#D4D4D8',
          700: '#E4E4E7',
          800: '#F4F4F5',
          900: '#FAFAFA',
        },

        // 灰度
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },

        // 语义色
        success: {
          light: '#10B981',
          dark: '#34D399',
          DEFAULT: '#34D399',
          glow: 'rgba(52, 211, 153, 0.5)',
        },
        warning: {
          light: '#F59E0B',
          dark: '#FBBF24',
          DEFAULT: '#FBBF24',
          glow: 'rgba(251, 191, 36, 0.5)',
        },
        danger: {
          light: '#EF4444',
          dark: '#F87171',
          DEFAULT: '#F87171',
          glow: 'rgba(248, 113, 113, 0.5)',
        },
        info: {
          light: '#3B82F6',
          dark: '#60A5FA',
          DEFAULT: '#60A5FA',
          glow: 'rgba(96, 165, 250, 0.5)',
        },

        // 背景色
        background: {
          primary: '#0A0A0B',
          secondary: '#18181B',
          tertiary: '#27272A',
          elevated: '#3F3F46',
        },

        // 文字色
        text: {
          primary: '#FAFAFA',
          secondary: '#D4D4D8',
          tertiary: '#A1A1AA',
          disabled: '#71717A',
        },

        // 边框色
        border: {
          subtle: '#27272A',
          default: '#3F3F46',
          strong: '#52525B',
          glow: 'rgba(99, 102, 241, 0.3)',
        },

        // 风险评分色彩
        risk: {
          high: '#F87171',
          medium: '#FBBF24',
          low: '#34D399',
        },
      },

      // 科技感圆角（更锐利）
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },

      // 发光效果阴影
      boxShadow: {
        // 传统阴影
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

        // 发光效果（Glow）
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.5)',
        'glow-md': '0 0 20px rgba(99, 102, 241, 0.6)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.7)',
        'glow-xl': '0 0 40px rgba(99, 102, 241, 0.8)',

        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-secondary': '0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.3)',
        'glow-accent': '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)',
        'glow-danger': '0 0 20px rgba(248, 113, 113, 0.6), 0 0 40px rgba(248, 113, 113, 0.3)',

        // 深色阴影
        'dark-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'dark-md': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 8px 24px rgba(0, 0, 0, 0.6)',
        'dark-xl': '0 16px 48px rgba(0, 0, 0, 0.7)',
      },

      // 模糊效果
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },

      // 字体 - 科技感字体
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },

      // 字重
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      // 字间距
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
      },

      // 动画时长
      transitionDuration: {
        fastest: '100ms',
        fast: '150ms',
        normal: '250ms',
        slow: '350ms',
        slower: '500ms',
        slowest: '700ms',
      },

      // 动画缓动
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      // 渐变色
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        'gradient-dark': 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
        'gradient-danger': 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',

        // 特殊效果
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        'gradient-halo': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent)',

        // 网格背景
        'grid-pattern': 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 40px)',

        // 点阵背景
        'dot-pattern': 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },

      // 背景尺寸
      backgroundSize: {
        'dot-pattern': '20px 20px',
      },

      // Z-index层级
      zIndex: {
        base: '0',
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        modalBackdrop: '1040',
        modal: '1050',
        popover: '1060',
        tooltip: '1070',
        notification: '1080',
      },

      // 动画
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in-up': 'slide-in-up 0.3s ease-out',
        'slide-in-down': 'slide-in-down 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
