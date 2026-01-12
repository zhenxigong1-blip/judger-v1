'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '@/components/SessionProvider';
import { useRouter } from 'next/navigation';
import { Application } from '@/types';
import { getApplications } from '@/mock/data';

export default function ApplicationsPage() {
  const { user } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Mock: 用户必须登录才能访问
  if (!user) {
    router.push('/auth/login');
    return null;
  }

  // 初始化加载数据
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getApplications();
      setApplications(data);
      setIsLoading(false);
    };
    
    fetchApplications();
  }, []);

  // 筛选状态
  const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedStatus);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  // 获取状态显示文本和颜色
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'applied':
        return { text: '已投递', color: 'bg-blue-100 text-blue-800' };
      case 'viewed':
        return { text: '已查看', color: 'bg-yellow-100 text-yellow-800' };
      case 'interview':
        return { text: '邀约面试', color: 'bg-purple-100 text-purple-800' };
      case 'offered':
        return { text: '已录用', color: 'bg-green-100 text-green-800' };
      case 'rejected':
        return { text: '已拒绝', color: 'bg-red-100 text-red-800' };
      default:
        return { text: '未知', color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">投递记录</h1>
      
      {/* 筛选和统计 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">全部投递</h2>
            <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
              {applications.length} 条
            </span>
          </div>
          
          {/* 状态筛选 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${selectedStatus === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              全部
            </button>
            <button
              onClick={() => setSelectedStatus('applied')}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${selectedStatus === 'applied' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              已投递
            </button>
            <button
              onClick={() => setSelectedStatus('viewed')}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${selectedStatus === 'viewed' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              已查看
            </button>
            <button
              onClick={() => setSelectedStatus('interview')}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${selectedStatus === 'interview' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              邀约面试
            </button>
            <button
              onClick={() => setSelectedStatus('offered')}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${selectedStatus === 'offered' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              已录用
            </button>
            <button
              onClick={() => setSelectedStatus('rejected')}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${selectedStatus === 'rejected' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              已拒绝
            </button>
          </div>
        </div>
        
        {/* 投递记录列表 */}
        {isLoading ? (
          <div className="empty-state">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p>加载中...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p>没有找到符合条件的投递记录</p>
            <Link href="/jobs" className="mt-4 btn-primary">
              浏览岗位
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => {
              const statusInfo = getStatusInfo(application.status);
              return (
                <div 
                  key={application.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <Link 
                        href={`/jobs/${application.jobId}`}
                        className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors mb-1 block"
                      >
                        {application.jobTitle}
                      </Link>
                      <p className="text-gray-600">{application.companyName}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(application.updatedAt)}
                      </span>
                    </div>
                  </div>
                  
                  {/* 匹配摘要 */}
                  {application.matchSummary && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">匹配摘要</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-1">匹配亮点</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {application.matchSummary.highlights.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-1">匹配缺口</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {application.matchSummary.gaps.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-2">✗</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-1">建议</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {application.matchSummary.suggestions.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-yellow-500 mr-2">💡</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* 操作按钮 */}
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
                      查看详情
                    </button>
                    <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200">
                      联系HR
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}