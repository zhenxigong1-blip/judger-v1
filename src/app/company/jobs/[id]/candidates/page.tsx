'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/components/SessionProvider';
import { CompanySidebar } from '@/components/CompanySidebar';
import { CandidateRecord } from '@/types';
import { getCandidateRecords } from '@/mock/data';

export default function JobCandidatesPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useSession();
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMatching, setIsMatching] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'latest'>('match');
  
  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // 初始化加载数据
  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getCandidateRecords();
      setCandidates(data);
      setIsLoading(false);
    };
    
    fetchCandidates();
  }, [id]);

  // 处理匹配排序
  const handleMatch = async () => {
    try {
      setIsMatching(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟匹配排序，实际项目中应调用 LLM API 进行匹配
      const sortedCandidates = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
      setCandidates(sortedCandidates);
    } catch (error) {
      console.error('Matching error:', error);
    } finally {
      setIsMatching(false);
    }
  };

  // 排序
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'match') {
      return b.matchScore - a.matchScore;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 侧边栏 */}
      <CompanySidebar />
      
      {/* 主内容区 */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">候选池</h1>
            <p className="text-gray-600 mt-1">管理该岗位的所有候选人</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">排序：</label>
              <select
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'match' | 'latest')}
              >
                <option value="match">匹配度</option>
                <option value="latest">最新</option>
              </select>
            </div>
            
            <button 
              onClick={handleMatch}
              disabled={isMatching}
              className={`px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 ${isMatching ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isMatching ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
                  匹配中...
                </div>
              ) : (
                '匹配此岗位'
              )}
            </button>
          </div>
        </div>
        
        {/* 候选池统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">总候选人数</h3>
            <p className="text-2xl font-bold text-gray-800">{candidates.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">待处理</h3>
            <p className="text-2xl font-bold text-blue-600">{candidates.filter(c => c.status === 'pending').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">面试中</h3>
            <p className="text-2xl font-bold text-purple-600">{candidates.filter(c => c.status === 'interviewing').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">已录用</h3>
            <p className="text-2xl font-bold text-green-600">{candidates.filter(c => c.status === 'offered').length}</p>
          </div>
        </div>
        
        {/* 候选人列表 */}
        {isLoading ? (
          <div className="empty-state">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p>加载中...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p>该岗位还没有候选人</p>
            <button className="mt-4 btn-secondary">
              导入候选人
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCandidates.map((candidate) => (
              <div key={candidate.id} className="card">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500 font-medium text-lg">{candidate.name.charAt(0)}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {candidate.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${candidate.status === 'pending' ? 'bg-blue-100 text-blue-800' : candidate.status === 'interviewing' ? 'bg-purple-100 text-purple-800' : candidate.status === 'offered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {candidate.status === 'pending' ? '待处理' : candidate.status === 'interviewing' ? '面试中' : candidate.status === 'offered' ? '已录用' : '已拒绝'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>{candidate.email}</span>
                        <span>{new Date(candidate.createdAt).toLocaleDateString('zh-CN')}</span>
                      </div>
                      
                      {/* 匹配分数 */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">匹配度</span>
                          <span className="text-sm font-bold text-primary">{candidate.matchScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${candidate.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* 匹配亮点 */}
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">匹配亮点</h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate.matchHighlights.map((highlight, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* 风险标签 */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">风险标签</h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate.riskTags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <Link 
                      href={`/company/candidates/${candidate.id}`}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 text-center"
                    >
                      查看详情
                    </Link>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 text-sm">
                        邀请面试
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 text-sm">
                        标记为待定
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 text-sm">
                        淘汰
                      </button>
                    </div>
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