'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '@/types';

interface SessionContextType {
  user: User | null;
  login: (email: string, role: Role) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时检查本地存储中的用户信息
  useEffect(() => {
    const storedUser = localStorage.getItem('judger_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('judger_user');
      }
    }
    setIsLoading(false);
  }, []);

  // 登录函数
  const login = async (email: string, role: Role) => {
    // Mock 登录，实际项目中应调用 API
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email,
      role,
      name: email.split('@')[0],
      companyId: role !== Role.CANDIDATE ? `company_${Math.floor(Math.random() * 1000)}` : undefined,
    };
    
    setUser(mockUser);
    localStorage.setItem('judger_user', JSON.stringify(mockUser));
  };

  // 登出函数
  const logout = () => {
    setUser(null);
    localStorage.removeItem('judger_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

// 自定义 Hook，用于访问会话状态
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};