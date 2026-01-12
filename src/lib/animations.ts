/**
 * Framer Motion 动画配置
 * iOS风格的动画效果
 */

import { Variants } from 'framer-motion';

/**
 * 页面转场动画 - 从右滑入
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1], // easeOutExpo
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * 卡片进入动画 - 从下方滑入 + 淡入
 */
export const cardEnter: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * 列表项依次进入动画 - stagger效果
 */
export const listContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const listItem: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * 模态框动画 - 从底部滑入（iOS风格）
 */
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContent: Variants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * 淡入动画
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0 },
};

/**
 * 缩放动画
 */
export const scaleIn: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * 数字滚动动画配置
 */
export const numberRollTransition = {
  duration: 2,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * 悬停动画 - 轻微上浮
 */
export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
};

/**
 * 点击动画 - 轻微缩小
 */
export const tapShrink = {
  scale: 0.98,
};

/**
 * 展开/收起动画
 */
export const expandCollapse: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * 进度条增长动画
 */
export const progressGrow: Variants = {
  initial: { width: 0 },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * 环形进度条动画配置
 */
export const circularProgressTransition = {
  duration: 2,
  ease: [0.22, 1, 0.36, 1],
};
