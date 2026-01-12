'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/SessionProvider';
import { Role } from '@/types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.CANDIDATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('请输入邮箱和密码');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, role);
      
      // 根据角色跳转到不同页面
      if (role === Role.CANDIDATE) {
        router.push('/jobs');
      } else {
        router.push('/company/dashboard');
      }
    } catch (err) {
      setError('登录失败，请重试');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">J</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">登录 Judger</h1>
          <p className="text-gray-500 mt-2">为求职者和企业提供高效的招聘解决方案</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 角色选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">角色</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-2 px-4 rounded-lg border font-medium transition-all duration-200 ${role === Role.CANDIDATE 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setRole(Role.CANDIDATE)}
              >
                求职者
              </button>
              <button
                type="button"
                className={`py-2 px-4 rounded-lg border font-medium transition-all duration-200 ${role !== Role.CANDIDATE 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setRole(Role.HR)}
              >
                企业用户
              </button>
            </div>
          </div>

          {/* 邮箱 */}
          <div className="mb-4">
            <label className="label" htmlFor="email">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* 密码 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="label" htmlFor="password">
                密码
              </label>
              <Link href="#" className="text-sm text-primary hover:underline">
                忘记密码？
              </Link>
            </div>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                登录中...
              </div>
            ) : (
              '登录'
            )}
          </button>
        </form>

        {/* 注册链接 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            还没有账号？
            <Link href="/auth/register" className="text-primary font-medium hover:underline ml-1">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}