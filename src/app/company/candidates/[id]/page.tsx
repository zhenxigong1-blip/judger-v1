'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/components/SessionProvider';
import { CompanySidebar } from '@/components/CompanySidebar';

export default function CandidateDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useSession();
  const [candidate, setCandidate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // 初始化加载数据
  useEffect(() => {
    const fetchCandidate = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock 候选人数据
      const mockCandidate = {
        id: id,
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        createdAt: '2024-01-08T10:00:00Z',
        status: 'pending',
        resume: {
          parsedData: {
            education: [
              {
                school: '北京大学',
                degree: '硕士',
                major: '计算机科学',
                startDate: '2018-09',
                endDate: '2021-06',
              },
              {
                school: '清华大学',
                degree: '本科',
                major: '软件工程',
                startDate: '2014-09',
                endDate: '2018-06',
              },
            ],
            experience: [
              {
                company: '科技公司A',
                position: 'AI工程师',
                startDate: '2021-07',
                endDate: '2023-12',
                responsibilities: [
                  '开发和优化机器学习模型',
                  '参与大规模AI项目',
                  '与团队协作解决技术问题',
                ],
                achievements: [
                  '提高了模型准确率15%',
                  '主导了3个核心项目',
                ],
              },
            ],
            skills: ['Python', 'TensorFlow', 'PyTorch', 'LLM', 'NLP', 'AWS', 'Docker'],
            projects: [
              {
                name: '智能推荐系统',
                description: '基于用户行为的智能推荐系统',
                technologies: ['Python', 'TensorFlow', 'Redis'],
                achievements: ['推荐准确率提升20%'],
              },
            ],
          },
        },
        matchScore: 85,
        matchHighlights: ['Python经验丰富', '有LLM经验', '硕士学历'],
        riskTags: ['经验不足', '缺少金融领域经验'],
        jobTitle: 'Senior AI Engineer',
      };
      
      setCandidate(mockCandidate);
      setIsLoading(false);
    };
    
    fetchCandidate();
  }, [id]);

  // 处理状态更新
  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsUpdating(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCandidate(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Update status error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // 生成分析报告
  const handleGenerateAnalysis = () => {
    // 跳转到风险分析页面
    router.push(`/company/analysis/new?candidateId=${id}&jobId=job_1`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        <CompanySidebar />
        <div className="flex-1">
          <div className="empty-state">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p>加载候选人详情中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        <CompanySidebar />
        <div className="flex-1">
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>候选人不存在</p>
            <button 
              onClick={() => router.back()}
              className="mt-4 btn-secondary"
            >
              返回
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 侧边栏 */}
      <CompanySidebar />
      
      {/* 主内容区 */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{candidate.name}</h1>
            <p className="text-gray-600 mt-1">{candidate.email} | {candidate.phone}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleGenerateAnalysis}
              className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-200"
            >
              生成风险分析
            </button>
            <div className="relative">
              <select
                value={candidate.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating}
                className="appearance-none bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 focus:outline-none pr-8"
              >
                <option value="pending">待处理</option>
                <option value="interviewing">面试中</option>
                <option value="offered">已录用</option>
                <option value="rejected">已拒绝</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* 匹配概览 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">匹配概览</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 匹配分数 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{candidate.matchScore}%</div>
              <div className="text-sm text-gray-600">匹配度</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${candidate.matchScore}%` }}
                ></div>
              </div>
            </div>
            
            {/* 匹配亮点 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">匹配亮点</h3>
              <ul className="space-y-2">
                {candidate.matchHighlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-sm text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 风险标签 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">风险标签</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.riskTags.map((tag: string, index: number) => (
                  <span key={index} className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 简历详情 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">简历详情</h2>
          
          {/* 教育经历 */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-800 mb-3">教育经历</h3>
            <div className="space-y-4">
              {candidate.resume.parsedData.education.map((edu: any, index: number) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{edu.school}</h4>
                    <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-600">{edu.degree} · {edu.major}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* 工作经历 */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-800 mb-3">工作经历</h3>
            <div className="space-y-4">
              {candidate.resume.parsedData.experience.map((exp: any, index: number) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{exp.position}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  
                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-700 mb-1">岗位职责</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {exp.responsibilities.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {exp.achievements.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">工作成果</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {exp.achievements.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* 技能 */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-800 mb-3">技能</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.resume.parsedData.skills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* 项目经历 */}
          {candidate.resume.parsedData.projects.length > 0 && (
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">项目经历</h3>
              <div className="space-y-4">
                {candidate.resume.parsedData.projects.map((project: any, index: number) => (
                  <div key={index} className="pl-4 border-l-2 border-gray-200">
                    <h4 className="font-medium text-gray-800">{project.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    <div className="mt-2">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">技术栈</h5>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.achievements.length > 0 && (
                      <div className="mt-2">
                        <h5 className="text-sm font-medium text-gray-700 mb-1">项目成果</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {project.achievements.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-1">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* 面试记录与备注 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 面试记录 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">面试记录</h2>
            <div className="empty-state">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="text-sm text-gray-500">还没有面试记录</p>
              <button className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 text-sm">
                添加面试记录
              </button>
            </div>
          </div>
          
          {/* 备注 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">备注</h2>
            <div className="space-y-4">
              <textarea
                className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="添加备注..."
              ></textarea>
              <button className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200">
                保存备注
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}