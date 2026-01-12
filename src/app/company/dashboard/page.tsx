'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from '@/components/SessionProvider';
import { useRouter } from 'next/navigation';
import { CompanySidebar } from '@/components/CompanySidebar';

export default function CompanyDashboardPage() {
  const { user } = useSession();
  const router = useRouter();
  
  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // Mock 数据
  const metrics = [
    { title: '当前岗位数', value: 5, icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 16h.01" />
      </svg>
    )},
    { title: '候选池人数', value: 23, icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { title: '进行中的流程', value: 8, icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )},
    { title: '最近风险提醒', value: 2, icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )},
  ];
  
  // Mock 最近岗位
  const recentJobs = [
    { id: 'job_1', title: 'Senior AI Engineer', candidates: 8, status: 'active' },
    { id: 'job_2', title: 'Machine Learning Engineer', candidates: 5, status: 'active' },
    { id: 'job_3', title: 'AI Product Manager', candidates: 10, status: 'active' },
  ];
  
  // Mock 最近候选人
  const recentCandidates = [
    { id: 'candidate_1', name: '张三', jobTitle: 'Senior AI Engineer', matchScore: 85, status: 'pending' },
    { id: 'candidate_2', name: '李四', jobTitle: 'Machine Learning Engineer', matchScore: 92, status: 'interviewing' },
    { id: 'candidate_3', name: '王五', jobTitle: 'AI Product Manager', matchScore: 78, status: 'pending' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 侧边栏 */}
      <CompanySidebar />
      
      {/* 主内容区 */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">企业工作台</h1>
            <p className="text-gray-600 mt-1">欢迎回来！这里是您的招聘管理中心</p>
          </div>
          
          <Link href="/company/jobs/new" className="btn-primary">
            创建岗位
          </Link>
        </div>
        
        {/* 指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</h3>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 最近动态 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 最近岗位 */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">最近岗位</h2>
              <Link href="/company/jobs" className="text-sm text-primary hover:underline">
                查看全部
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <Link 
                      href={`/company/jobs/${job.id}/candidates`}
                      className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
                    >
                      {job.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{job.candidates} 位候选人</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    {job.status === 'active' ? '招聘中' : '已关闭'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* 最近候选人 */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">最近候选人</h2>
              <Link href="/company/candidates" className="text-sm text-primary hover:underline">
                查看全部
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <Link 
                      href={`/company/candidates/${candidate.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
                    >
                      {candidate.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{candidate.jobTitle}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-700">{candidate.matchScore}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${candidate.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 快速操作 */}
        <div className="card mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">快速操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/company/jobs/new" 
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-center"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-800">创建新岗位</h3>
              <p className="text-xs text-gray-500 mt-1">发布新的招聘需求</p>
            </Link>
            
            <Link 
              href="/company/candidates" 
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-center"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-800">管理候选池</h3>
              <p className="text-xs text-gray-500 mt-1">查看和管理候选人</p>
            </Link>
            
            <Link 
              href="/company/analysis/new" 
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-center"
            >
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-800">风险分析</h3>
              <p className="text-xs text-gray-500 mt-1">分析候选人风险</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}