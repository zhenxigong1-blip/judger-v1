'use client';

import React, { useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import { useRouter } from 'next/navigation';
import { getResumes } from '@/mock/data';

export default function ResumeCenterPage() {
  const { user } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState(getResumes());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  
  // Mock: 用户必须登录才能访问
  if (!user) {
    router.push('/auth/login');
    return null;
  }

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

  // 处理文件上传
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('请选择要上传的简历');
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // 模拟上传进度
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 上传成功，刷新简历列表
      setResumes([...resumes, {
        id: `resume_${Date.now()}`,
        fileName: selectedFile.name,
        fileUrl: 'https://via.placeholder.com/150',
        parsedData: {
          name: user.name || '未知',
          email: user.email,
          phone: '未知',
          education: [],
          experience: [],
          skills: [],
          projects: [],
        },
        createdAt: new Date().toISOString(),
      }]);
      
      setSelectedFile(null);
    } catch (err) {
      setError('上传失败，请重试');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 处理简历删除
  const handleDelete = async (resumeId: string) => {
    if (confirm('确定要删除这份简历吗？')) {
      try {
        // 模拟 API 请求延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 删除成功，更新简历列表
        setResumes(resumes.filter(resume => resume.id !== resumeId));
      } catch (err) {
        setError('删除失败，请重试');
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">简历中心</h1>
      
      {/* 上传区域 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">上传简历</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {isUploading ? (
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-600">正在上传简历... {uploadProgress}%</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center space-y-3">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <p className="text-gray-600">点击或拖拽简历文件到此处上传</p>
                <p className="text-xs text-gray-500">支持 PDF 和 DOCX 格式，文件大小不超过 5MB</p>
                
                <label className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 cursor-pointer">
                  选择文件
                  <input 
                    type="file" 
                    accept=".pdf,.docx" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              
              {selectedFile && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{selectedFile.name}</span>
                    </div>
                    <button 
                      onClick={handleUpload}
                      className="btn-primary"
                    >
                      上传
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* 隐私提示 */}
        <div className="mt-6 text-xs text-gray-500 bg-yellow-50 p-3 rounded-lg">
          <p className="font-medium mb-1">隐私提示：</p>
          <p>您上传的简历将仅用于职位匹配和投递，我们会严格保护您的个人信息。您可以随时删除已上传的简历。</p>
        </div>
      </div>
      
      {/* 简历列表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">我的简历</h2>
        
        {resumes.length === 0 ? (
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <p>您还没有上传任何简历</p>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-800">{resume.fileName}</h3>
                      <p className="text-sm text-gray-500">
                        上传于 {new Date(resume.createdAt).toLocaleString('zh-CN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="text-sm text-gray-600 hover:text-primary transition-colors">
                      查看
                    </button>
                    <button className="text-sm text-gray-600 hover:text-primary transition-colors">
                      设为默认
                    </button>
                    <button 
                      onClick={() => handleDelete(resume.id)}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>
                
                {/* 简历预览 */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">简历预览</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">基本信息</h5>
                      <p>{resume.parsedData.name} | {resume.parsedData.email}</p>
                      {resume.parsedData.phone && <p>{resume.parsedData.phone}</p>}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">教育经历</h5>
                      {resume.parsedData.education.length > 0 ? (
                        <ul className="space-y-1">
                          {resume.parsedData.education.slice(0, 2).map((edu, index) => (
                            <li key={index}>{edu.school} · {edu.degree}</li>
                          ))}
                          {resume.parsedData.education.length > 2 && (
                            <li className="text-gray-500">... 等 {resume.parsedData.education.length} 条</li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-gray-500">未解析到教育经历</p>
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">技能</h5>
                      {resume.parsedData.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {resume.parsedData.skills.slice(0, 5).map((skill, index) => (
                            <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {resume.parsedData.skills.length > 5 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
                              +{resume.parsedData.skills.length - 5}
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">未解析到技能</p>
                      )}
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