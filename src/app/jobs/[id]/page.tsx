'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Job } from '@/types';
import { getJobById } from '@/mock/data';
import { useSession } from '@/components/SessionProvider';

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [hasResume, setHasResume] = useState(true); // Mock: 假设用户已有简历
  
  // 匹配摘要（Mock）
  const matchSummary = {
    highlights: ['Python经验丰富', '有LLM经验', '硕士学历'],
    gaps: ['缺少大规模模型训练经验', '没有发表过论文'],
    suggestions: ['补充大规模模型项目经验', '考虑发表相关论文'],
  };

  // 加载职位详情
  useEffect(() => {
    const fetchJobDetail = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getJobById(id as string);
      if (data) {
        setJob(data);
      } else {
        // 职位不存在，跳转到404页面
        router.push('/404');
      }
      setIsLoading(false);
    };
    
    fetchJobDetail();
  }, [id, router]);

  // 处理投递
  const handleApply = async () => {
    if (!user) {
      // 未登录，跳转到登录页面
      router.push('/auth/login');
      return;
    }
    
    if (!hasResume) {
      // 没有简历，跳转到简历上传页面
      router.push('/candidate/resume');
      return;
    }
    
    try {
      setIsApplying(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 投递成功，跳转到投递记录页面
      router.push('/candidate/applications');
    } catch (error) {
      console.error('Apply error:', error);
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="empty-state">
        <div className="loading-spinner mx-auto mb-2"></div>
        <p>加载职位详情中...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="empty-state">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>职位不存在</p>
        <Link href="/jobs" className="mt-4 btn-secondary">
          返回岗位广场
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 职位详情 */}
      <div className="md:col-span-2">
        {/* 职位基本信息 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              {job.company.logo ? (
                <img src={job.company.logo} alt={job.company.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-500 font-medium text-lg">{job.company.name.charAt(0)}</span>
              )}
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
                {job.remote && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">远程</span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{job.company.name} · {job.location}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>💰 {job.salaryRange.min}k - {job.salaryRange.max}k</span>
                <span>💼 {job.experience}</span>
                <span>🏢 {job.company.stage}</span>
              </div>
            </div>
          </div>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* 匹配摘要 */}
          {hasResume && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">匹配摘要</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-1">匹配亮点</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {matchSummary.highlights.map((item, index) => (
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
                    {matchSummary.gaps.map((item, index) => (
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
                    {matchSummary.suggestions.map((item, index) => (
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
        </div>
        
        {/* 职位描述 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">职位描述</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">岗位职责</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">任职要求</h3>
              <ul className="space-y-2">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 加分项 */}
          {job.preferences.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">加分项</h3>
              <ul className="space-y-2">
                {job.preferences.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* 团队介绍 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">团队介绍</h2>
          <p className="text-gray-600 leading-relaxed">{job.teamIntroduction}</p>
        </div>
        
        {/* 面试流程和福利 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">面试流程</h2>
            <ol className="space-y-2">
              {job.interviewProcess.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary font-medium mr-3">{index + 1}.</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">公司福利</h2>
            <ul className="space-y-2">
              {job.benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-3 mt-1">✨</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* 右侧边栏 - 申请按钮和相关推荐 */}
      <div className="md:col-span-1">
        {/* 申请卡片 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 sticky top-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">申请该职位</h3>
            <p className="text-sm text-gray-600">
              {hasResume ? '使用已有简历投递' : '请先上传简历'}
            </p>
          </div>
          
          <button
            onClick={handleApply}
            disabled={isApplying}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${isApplying ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
          >
            {isApplying ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                投递中...
              </div>
            ) : hasResume ? (
              '一键投递'
            ) : (
              '上传简历'
            )}
          </button>
          
          {hasResume && (
            <button className="w-full mt-3 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-200">
              更换简历
            </button>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">相关职位</h4>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Link 
                  key={i} 
                  href={`/jobs/job_${i + 3}`} 
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="text-sm font-medium text-gray-800 hover:text-primary">
                    {i === 1 ? 'Senior Machine Learning Engineer' : 'AI Research Scientist'}
                  </h5>
                  <p className="text-xs text-gray-600 mt-1">
                    {i === 1 ? 'FinTech AI' : 'AI Lab'} · {i === 1 ? '上海' : '北京'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {i === 1 ? '25k - 45k' : '30k - 50k'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}