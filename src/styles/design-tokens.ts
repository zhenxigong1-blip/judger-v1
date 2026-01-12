/**
 * Judger 科技感设计系统 - Design Tokens
 *
 * 面向 AI 创业公司的专业工具
 * 深色为主、荧光点缀、数据驱动的视觉风格
 */

export const techDesignTokens = {
  /**
   * 色彩系统 - 科技感/未来感配色
   */
  colors: {
    // 主色调 - 电光蓝/紫（AI 感）
    primary: {
      50: '#F0F4FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',  // 主紫
      600: '#4F46E5',  // 深紫
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81',
      glow: 'rgba(99, 102, 241, 0.5)',  // 发光效果
    },

    // 次要色 - 青色（科技感）
    secondary: {
      50: '#ECFEFF',
      100: '#CFFAFE',
      200: '#A5F3FC',
      300: '#67E8F9',
      400: '#22D3EE',
      500: '#06B6D4',  // 主青
      600: '#0891B2',
      700: '#0E7490',
      800: '#155E75',
      900: '#164E63',
      glow: 'rgba(6, 182, 212, 0.5)',
    },

    // 强调色 - 霓虹绿（警示/高亮）
    accent: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#10B981',  // 主绿
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
      glow: 'rgba(16, 185, 129, 0.5)',
    },

    // 深色背景系统
    dark: {
      50: '#18181B',   // 最深背景
      100: '#27272A',  // 深背景
      200: '#3F3F46',  // 卡片背景
      300: '#52525B',  // hover 背景
      400: '#71717A',  // 边框
      500: '#A1A1AA',  // 辅助文字
      600: '#D4D4D8',  // 次要文字
      700: '#E4E4E7',  // 主要文字
      800: '#F4F4F5',  // 高亮文字
      900: '#FAFAFA',  // 纯白
    },

    // 灰度（浅色模式用，保留兼容）
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

    // 语义色 - 状态颜色
    success: {
      light: '#10B981',
      dark: '#34D399',
      glow: 'rgba(52, 211, 153, 0.5)',
    },
    warning: {
      light: '#F59E0B',
      dark: '#FBBF24',
      glow: 'rgba(251, 191, 36, 0.5)',
    },
    danger: {
      light: '#EF4444',
      dark: '#F87171',
      glow: 'rgba(248, 113, 113, 0.5)',
    },
    info: {
      light: '#3B82F6',
      dark: '#60A5FA',
      glow: 'rgba(96, 165, 250, 0.5)',
    },

    // 背景色系统
    background: {
      primary: '#0A0A0B',      // 主背景（几乎黑）
      secondary: '#18181B',    // 次要背景
      tertiary: '#27272A',     // 卡片背景
      elevated: '#3F3F46',     // 悬浮元素
      light: '#FFFFFF',        // 浅色模式（可选）
    },

    // 文字色系统
    text: {
      primary: '#FAFAFA',      // 主要文字（白）
      secondary: '#D4D4D8',    // 次要文字
      tertiary: '#A1A1AA',     // 辅助文字
      disabled: '#71717A',     // 禁用文字
      inverse: '#18181B',      // 反色文字（浅色背景用）
    },

    // 边框色系统
    border: {
      subtle: '#27272A',       // 微弱边框
      default: '#3F3F46',      // 默认边框
      strong: '#52525B',       // 强边框
      glow: 'rgba(99, 102, 241, 0.3)',  // 发光边框
    },

    // 风险评分色彩
    risk: {
      high: {
        color: '#F87171',
        glow: 'rgba(248, 113, 113, 0.5)',
      },
      medium: {
        color: '#FBBF24',
        glow: 'rgba(251, 191, 36, 0.5)',
      },
      low: {
        color: '#34D399',
        glow: 'rgba(52, 211, 153, 0.5)',
      },
    },

    // 渐变色（科技感）
    gradients: {
      primary: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      secondary: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      accent: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      dark: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
      danger: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',

      // 特殊效果渐变
      mesh: 'radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
      glow: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
    },
  },

  /**
   * 圆角 - 锐利/小圆角设计
   */
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

  /**
   * 阴影和发光效果
   */
  shadows: {
    // 传统阴影（浅色模式兼容）
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

    // 发光效果（Glow）- 科技感核心
    glow: {
      sm: '0 0 10px rgba(99, 102, 241, 0.5)',
      md: '0 0 20px rgba(99, 102, 241, 0.6)',
      lg: '0 0 30px rgba(99, 102, 241, 0.7)',
      xl: '0 0 40px rgba(99, 102, 241, 0.8)',

      primary: '0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(99, 102, 241, 0.3)',
      secondary: '0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.3)',
      accent: '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)',
      danger: '0 0 20px rgba(248, 113, 113, 0.6), 0 0 40px rgba(248, 113, 113, 0.3)',
    },

    // 深色模式阴影（更强对比）
    dark: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.4)',
      md: '0 4px 16px rgba(0, 0, 0, 0.5)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
      xl: '0 16px 48px rgba(0, 0, 0, 0.7)',
    },
  },

  /**
   * 模糊效果
   */
  blur: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
  },

  /**
   * 字体系统 - 现代科技感字体
   */
  typography: {
    fontFamily: {
      // 主字体：Inter（现代、清晰）
      base: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      // 标题字体：Space Grotesk（几何、科技感）
      heading: '"Space Grotesk", Inter, sans-serif',
      // 等宽字体：用于代码、数据
      mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: ['12px', { lineHeight: '16px', letterSpacing: '0.01em' }],
      sm: ['14px', { lineHeight: '20px', letterSpacing: '0.01em' }],
      base: ['16px', { lineHeight: '24px', letterSpacing: '0' }],
      lg: ['18px', { lineHeight: '28px', letterSpacing: '0' }],
      xl: ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
      '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
      '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
      '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.02em' }],
      '5xl': ['48px', { lineHeight: '1', letterSpacing: '-0.02em' }],
      '6xl': ['60px', { lineHeight: '1', letterSpacing: '-0.03em' }],
      '7xl': ['72px', { lineHeight: '1', letterSpacing: '-0.03em' }],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  /**
   * 间距系统
   */
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
  },

  /**
   * 动画时长
   */
  transitions: {
    fastest: '100ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
    slowest: '700ms',
  },

  /**
   * 动画缓动函数
   */
  easings: {
    default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

    // 科技感特殊缓动
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  /**
   * 断点 - 响应式
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Z-index层级
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  },

  /**
   * 科技感特殊效果
   */
  effects: {
    // 网格背景
    gridPattern: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 40px)',

    // 点阵背景
    dotPattern: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
    dotPatternSize: '20px 20px',

    // 扫描线效果
    scanline: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, transparent 1px, transparent 2px)',

    // 光晕效果（用于背景）
    halo: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent)',
  },
};

// 导出类型
export type TechDesignTokens = typeof techDesignTokens;

// 默认导出（向后兼容）
export const designTokens = techDesignTokens;
