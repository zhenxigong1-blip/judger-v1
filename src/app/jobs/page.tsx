'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Job } from '@/types';
import { getJobs } from '@/mock/data';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // 筛选条件
  const [filters, setFilters] = useState({
    location: '',
    remote: false,
    experience: '',
    salaryRange: { min: 0, max: 100000 },
    companyStage: '' as 'Startup' | 'Scaleup' | 'Enterprise' | '',
  });
  
  // 排序方式
  const [sortBy, setSortBy] = useState<'latest' | 'salary' | 'match'>('latest');

  // 初始化加载数据
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getJobs();
      setJobs(data);
      setFilteredJobs(data);
      setIsLoading(false);
    };
    
    fetchJobs();
  }, []);

  // 应用筛选和排序
  useEffect(() => {
    let result = [...jobs];
    
    // 关键词搜索
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.name.toLowerCase().includes(term) ||
        job.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // 地点筛选
    if (filters.location) {
      result = result.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // 远程筛选
    if (filters.remote) {
      result = result.filter(job => job.remote);
    }
    
    // 经验筛选
    if (filters.experience) {
      result = result.filter(job => job.experience.includes(filters.experience));
    }
    
    // 薪资范围筛选
    result = result.filter(job => 
      job.salaryRange.min >= filters.salaryRange.min &&
      job.salaryRange.max <= filters.salaryRange.max
    );
    
    // 公司阶段筛选
    if (filters.companyStage) {
      result = result.filter(job => job.company.stage === filters.companyStage);
    }
    
    // 排序
    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'salary':
        result.sort((a, b) => (b.salaryRange.max + b.salaryRange.min) - (a.salaryRange.max + a.salaryRange.min));
        break;
      case 'match':
        // 匹配度排序需要简历数据，这里模拟
        result.sort(() => Math.random() - 0.5);
        break;
    }
    
    setFilteredJobs(result);
  }, [jobs, searchTerm, filters, sortBy]);

  // 处理筛选条件变化
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 筛选侧边栏 */}
      <div className="md:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">筛选</h2>
        
        {/* 搜索框 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="搜索职位、公司、标签"
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* 地点筛选 */}
        <div className="mb-4">
          <label className="label">地点</label>
          <input
            type="text"
            placeholder="城市名称"
            className="input"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>
        
        {/* 远程筛选 */}
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remote"
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={filters.remote}
              onChange={(e) => handleFilterChange('remote', e.target.checked)}
            />
            <label htmlFor="remote" className="ml-2 text-sm font-medium text-gray-700">
              接受远程
            </label>
          </div>
        </div>
        
        {/* 经验筛选 */}
        <div className="mb-4">
          <label className="label">经验要求</label>
          <select
            className="input"
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="">全部</option>
            <option value="1年以下">1年以下</option>
            <option value="1-3年">1-3年</option>
            <option value="3-5年">3-5年</option>
            <option value="5-8年">5-8年</option>
            <option value="8年以上">8年以上</option>
          </select>
        </div>
        
        {/* 公司阶段 */}
        <div className="mb-4">
          <label className="label">公司阶段</label>
          <select
            className="input"
            value={filters.companyStage}
            onChange={(e) => handleFilterChange('companyStage', e.target.value)}
          >
            <option value="">全部</option>
            <option value="Startup">Startup</option>
            <option value="Scaleup">Scaleup</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        
        {/* 薪资范围 */}
        <div className="mb-4">
          <label className="label">薪资范围（元/月）</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="最小值"
              className="input"
              value={filters.salaryRange.min}
              onChange={(e) => handleFilterChange('salaryRange', {
                ...filters.salaryRange,
                min: Number(e.target.value) || 0
              })}
            />
            <input
              type="number"
              placeholder="最大值"
              className="input"
              value={filters.salaryRange.max}
              onChange={(e) => handleFilterChange('salaryRange', {
                ...filters.salaryRange,
                max: Number(e.target.value) || 100000
              })}
            />
          </div>
        </div>
      </div>
      
      {/* 岗位列表 */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">岗位广场</h1>
          
          {/* 排序 */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">排序：</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="latest">最新发布</option>
              <option value="salary">薪资最高</option>
              <option value="match">匹配度</option>
            </select>
          </div>
        </div>
        
        {/* 加载状态 */}
        {isLoading ? (
          <div className="empty-state">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p>加载中...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>没有找到符合条件的岗位</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  location: '',
                  remote: false,
                  experience: '',
                  salaryRange: { min: 0, max: 100000 },
                  companyStage: '',
                });
              }}
              className="mt-4 btn-secondary"
            >
              清除筛选
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => (
              <Link 
                key={job.id} 
                href={`/jobs/${job.id}`}
                className="card fade-in"
              >
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
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        {job.remote && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">远程</span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{job.company.name} · {job.location}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>💰 {job.salaryRange.min}k - {job.salaryRange.max}k</span>
                        <span>📅 {formatDate(job.createdAt)}</span>
                        <span>💼 {job.experience}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="btn-primary">查看详情</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* 分页 */}
        {!isLoading && filteredJobs.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                上一页
              </button>
              <button className="px-4 py-1 rounded-lg bg-primary text-white font-medium">1</button>
              <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">10</button>
              <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                下一页
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}