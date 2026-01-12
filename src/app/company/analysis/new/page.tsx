'use client';

import React, { useState, Suspense } from 'react';
import { useSession } from '@/components/SessionProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { CompanySidebar } from '@/components/CompanySidebar';

function NewAnalysisPageContent() {
  const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [interviewNotes, setInterviewNotes] = useState('');
  const [error, setError] = useState('');

  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // Mock 岗位列表
  const jobs = [
    { id: 'job_1', title: 'Senior AI Engineer', company: 'AI Lab' },
    { id: 'job_2', title: 'Machine Learning Engineer', company: 'FinTech AI' },
    { id: 'job_3', title: 'AI Product Manager', company: 'Enterprise AI' },
  ];

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('仅支持 PDF 和 DOCX 格式的简历');
        return;
      }
      
      // 验证文件大小（不超过 5MB）
      if (file.size > 5 * 1024 * 1024) {
        setError('简历大小不能超过 5MB');
        return;
      }
      
      setSelectedFile(file);
      setError('');
    }
  };

  // 处理提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJob) {
      setError('请选择岗位');
      return;
    }
    
    if (!selectedFile) {
      setError('请上传简历');
      return;
    }
    
    try {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 分析成功，跳转到分析结果页面
      router.push('/company/analysis/analysis_1');
    } catch (error) {
      setError('分析失败，请重试');
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 侧边栏 */}
      <CompanySidebar />
      
      {/* 主内容区 */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">新建风险分析</h1>
          <p className="text-gray-600 mt-1">上传候选人简历和选择岗位，生成风险分析报告</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            {/* 选择岗位 */}
            <div>
              <label className="label" htmlFor="job">
                选择岗位 *
              </label>
              <select
                id="job"
                name="job"
                className="input"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                required
              >
                <option value="">请选择岗位</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} - {job.company}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">或 <a href="#" className="text-primary hover:underline">上传自定义 JD</a></p>
            </div>
            
            {/* 上传简历 */}
            <div>
              <label className="label" htmlFor="resume">
                上传简历 *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
                <label 
                  htmlFor="resume" 
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <p className="text-gray-600">点击或拖拽简历文件到此处上传</p>
                    <p className="text-xs text-gray-500">支持 PDF 和 DOCX 格式，文件大小不超过 5MB</p>
                  </div>
                </label>
                
                {selectedFile && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{selectedFile.name}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        移除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* 面试记录（可选） */}
            <div>
              <label className="label" htmlFor="interviewNotes">
                面试记录（可选）
              </label>
              <textarea
                id="interviewNotes"
                name="interviewNotes"
                className="input h-32"
                placeholder="请输入面试记录，这将有助于生成更准确的分析报告"
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
              ></textarea>
            </div>
            
            {/* 免责声明 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">免责声明</h3>
              <p className="text-xs text-yellow-700">
                AI 输出仅供辅助决策，最终招聘决策由企业自行承担。我们建议结合实际面试情况和其他评估手段综合考虑。
              </p>
            </div>
          </div>
          
          {/* 提交按钮 */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
                  生成分析中...
                </div>
              ) : (
                '开始分析'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewAnalysisPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <NewAnalysisPageContent />
    </Suspense>
  );
}
