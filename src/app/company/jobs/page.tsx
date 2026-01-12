'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '@/components/SessionProvider';
import { useRouter } from 'next/navigation';
import { CompanySidebar } from '@/components/CompanySidebar';
import { Job } from '@/types';
import { getJobs } from '@/mock/data';

export default function CompanyJobsPage() {
  const { user } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // 初始化加载数据
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getJobs();
      setJobs(data);
      setIsLoading(false);
    };
    
    fetchJobs();
  }, []);

  // 关键词搜索
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 侧边栏 */}
      <CompanySidebar />
      
      {/* 主内容区 */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">岗位管理</h1>
            <p className="text-gray-600 mt-1">管理您发布的所有招聘岗位</p>
          </div>
          
          <Link href="/company/jobs/new" className="btn-primary">
            创建岗位
          </Link>
        </div>
        
        {/* 搜索栏 */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索岗位名称或公司"
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* 岗位列表 */}
        {isLoading ? (
          <div className="empty-state">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p>加载中...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 16h.01" />
            </svg>
            <p>您还没有创建任何岗位</p>
            <Link href="/company/jobs/new" className="mt-4 btn-primary">
              创建第一个岗位
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="card">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      {job.company.logo ? (
                        <img src={job.company.logo} alt={job.company.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-gray-500 font-medium">{job.company.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {job.title}
                        </h3>
                        {job.remote && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">远程</span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{job.company.name} · {job.location}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>💰 {job.salaryRange.min}k - {job.salaryRange.max}k</span>
                        <span>📅 {new Date(job.createdAt).toLocaleDateString('zh-CN')}</span>
                        <span>💼 {job.experience}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Link 
                      href={`/company/jobs/${job.id}/candidates`}
                      className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-200"
                    >
                      查看候选人
                    </Link>
                    <Link 
                      href={`/company/jobs/${job.id}/edit`}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200"
                    >
                      编辑
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}