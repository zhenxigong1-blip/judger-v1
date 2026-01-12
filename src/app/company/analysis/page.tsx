'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '@/components/SessionProvider';
import { useRouter } from 'next/navigation';
import { CompanySidebar } from '@/components/CompanySidebar';
import { AnalysisTask } from '@/types';
import { getAnalysisTasks } from '@/mock/data';

export default function AnalysisHistoryPage() {
  const { user } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<AnalysisTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // 初始化加载数据
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getAnalysisTasks();
      setTasks(data);
      setIsLoading(false);
    };
    
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 侧边栏 */}
      <CompanySidebar />
      
      {/* 主内容区 */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">风险分析历史</h1>
            <p className="text-gray-600 mt-1">查看和管理所有风险分析报告</p>
          </div>
          
          <Link href="/company/analysis/new" className="btn-primary">
            新建分析
          </Link>
        </div>
        
        {/* 分析任务列表 */}
        {isLoading ? (
          <div className="empty-state">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p>加载中...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 16h.01" />
            </svg>
            <p>还没有分析记录</p>
            <Link href="/company/analysis/new" className="mt-4 btn-primary">
              开始第一个分析
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="card">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {task.candidateName} - {task.jobTitle}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {task.status === 'completed' ? '已完成' : task.status === 'pending' ? '处理中' : '失败'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(task.createdAt).toLocaleString('zh-CN')}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {task.results && (
                      <span className={`text-sm font-medium ${task.results.recommendation === 'strongly_recommend' ? 'text-green-600' : task.results.recommendation === 'recommend' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {task.results.recommendation === 'strongly_recommend' ? '强烈推荐' : task.results.recommendation === 'recommend' ? '谨慎推荐' : '不推荐'}
                      </span>
                    )}
                    <Link 
                      href={`/company/analysis/${task.id}`}
                      className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-200"
                    >
                      查看报告
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