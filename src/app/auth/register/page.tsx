'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/SessionProvider';
import { Role } from '@/types';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.CANDIDATE);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // 表单验证
    if (!email || !password || !confirmPassword) {
      setError('请填写所有必填字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (role !== Role.CANDIDATE && !companyName) {
      setError('请填写公司名称');
      return;
    }

    try {
      setIsLoading(true);
      
      // Mock 注册，实际项目中应调用 API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('注册成功，正在登录...');
      
      // 自动登录
      await login(email, role);
      
      // 根据角色跳转到不同页面
      if (role === Role.CANDIDATE) {
        router.push('/jobs');
      } else {
        router.push('/company/dashboard');
      }
    } catch (err) {
      setError('注册失败，请重试');
      console.error('Register error:', err);
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
          <h1 className="text-2xl font-bold text-gray-800">注册 Judger</h1>
          <p className="text-gray-500 mt-2">为求职者和企业提供高效的招聘解决方案</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
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

          {/* 企业名称（仅企业用户） */}
          {role !== Role.CANDIDATE && (
            <div className="mb-4">
              <label className="label" htmlFor="companyName">
                公司名称
              </label>
              <input
                type="text"
                id="companyName"
                className="input"
                placeholder="请输入公司名称"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}

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
          <div className="mb-4">
            <label className="label" htmlFor="password">
              密码
            </label>
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

          {/* 确认密码 */}
          <div className="mb-6">
            <label className="label" htmlFor="confirmPassword">
              确认密码
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* 隐私政策 */}
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacy" 
                  type="checkbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  disabled={isLoading}
                />
              </div>
              <div className="ml-3 text-sm">
                <p className="text-gray-600">
                  我已阅读并同意 <Link href="#" className="text-primary hover:underline">隐私政策</Link> 和 <Link href="#" className="text-primary hover:underline">服务条款</Link>
                </p>
              </div>
            </div>
          </div>

          {/* 注册按钮 */}
          <button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                注册中...
              </div>
            ) : (
              '注册'
            )}
          </button>
        </form>

        {/* 登录链接 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            已有账号？
            <Link href="/auth/login" className="text-primary font-medium hover:underline ml-1">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}