'use client';

import React, { useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import { useRouter } from 'next/navigation';
import { CompanySidebar } from '@/components/CompanySidebar';

export default function CreateJobPage() {
  const { user } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: 基本信息, 2: JD 撰写, 3: 岗位澄清
  
  // 表单数据
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    remote: false,
    salaryRange: { min: 0, max: 100000 },
    jobType: '',
    experience: '',
    companyStage: 'Startup' as 'Startup' | 'Scaleup' | 'Enterprise',
    jd: '',
    successCriteria: '',
    unacceptableFailures: '',
    mustHaveSkills: '',
    preferredSkills: '',
  });
  
  // LLM 生成的 JD
  const [generatedJd, setGeneratedJd] = useState('');
  const [isGeneratingJd, setIsGeneratingJd] = useState(false);
  
  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // 处理表单字段变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      // 处理嵌套字段，如 salaryRange.min
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 生成 JD
  const handleGenerateJd = async () => {
    try {
      setIsGeneratingJd(true);
      // 模拟 LLM API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock 生成的 JD
      const mockGeneratedJd = `
        我们正在寻找一位优秀的 ${formData.title} 加入我们的团队。
        
        岗位职责：
        1. 负责公司核心产品的开发和维护
        2. 与团队协作，设计和实现高质量的技术解决方案
        3. 参与技术架构设计和优化
        4. 指导和培养初级工程师
        
        任职要求：
        1. ${formData.experience} 相关工作经验
        2. 精通 ${formData.mustHaveSkills}
        3. 有良好的问题解决能力和团队合作精神
        4. 有 ${formData.jobType} 经验优先
      `;
      
      setGeneratedJd(mockGeneratedJd.trim());
      setFormData(prev => ({ ...prev, jd: mockGeneratedJd.trim() }));
    } catch (error) {
      console.error('Generate JD error:', error);
    } finally {
      setIsGeneratingJd(false);
    }
  };

  // 下一步
  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  // 上一步
  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 创建成功，跳转到岗位列表页面
      router.push('/company/jobs');
    } catch (error) {
      console.error('Create job error:', error);
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">创建岗位</h1>
        
        {/* 步骤指示器 */}
        <div className="flex items-center space-x-4 mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${stepNum === step ? 'bg-primary text-white' : stepNum < step ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'}`}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-12 h-1 ${stepNum < step ? 'bg-primary' : 'bg-gray-200'}`}></div>
              )}
              <span className={`text-sm ${stepNum === step ? 'font-medium text-primary' : stepNum < step ? 'text-primary' : 'text-gray-500'}`}>
                {stepNum === 1 ? '基本信息' : stepNum === 2 ? 'JD 撰写' : '岗位澄清'}
              </span>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* 步骤 1: 基本信息 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label" htmlFor="title">
                    岗位标题 *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="input"
                    placeholder="例如：Senior AI Engineer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="label" htmlFor="location">
                    地点 *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="input"
                    placeholder="例如：北京"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="label" htmlFor="remote">
                    支持远程
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remote"
                      name="remote"
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={formData.remote}
                      onChange={handleChange}
                    />
                    <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
                      该岗位支持远程工作
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="label" htmlFor="experience">
                    经验要求 *
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    className="input"
                    placeholder="例如：3-5年"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="label" htmlFor="jobType">
                    岗位类型 *
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    className="input"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">请选择</option>
                    <option value="AI Infra">AI Infra</option>
                    <option value="LLM">LLM</option>
                    <option value="Agent">Agent</option>
                    <option value="Fintech AI">Fintech AI</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="NLP">NLP</option>
                  </select>
                </div>
                
                <div>
                  <label className="label" htmlFor="companyStage">
                    公司阶段 *
                  </label>
                  <select
                    id="companyStage"
                    name="companyStage"
                    className="input"
                    value={formData.companyStage}
                    onChange={handleChange}
                    required
                  >
                    <option value="Startup">Startup</option>
                    <option value="Scaleup">Scaleup</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="label">薪资范围（元/月） *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        name="salaryRange.min"
                        className="input"
                        placeholder="最小值"
                        value={formData.salaryRange.min}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="salaryRange.max"
                        className="input"
                        placeholder="最大值"
                        value={formData.salaryRange.max}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 步骤 2: JD 撰写 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="label" htmlFor="jd">
                  职位描述（JD） *
                </label>
                <div className="flex justify-end mb-2">
                  <button 
                    type="button"
                    onClick={handleGenerateJd}
                    disabled={isGeneratingJd}
                    className={`px-4 py-2 text-sm border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-200 ${isGeneratingJd ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isGeneratingJd ? (
                      <div className="flex items-center justify-center">
                        <div className="loading-spinner mr-2"></div>
                        生成中...
                      </div>
                    ) : (
                      'AI 辅助生成'
                    )}
                  </button>
                </div>
                <textarea
                  id="jd"
                  name="jd"
                  className="input h-60"
                  placeholder="请输入职位描述，包括岗位职责、任职要求等"
                  value={formData.jd}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="label" htmlFor="mustHaveSkills">
                  必须技能（用逗号分隔） *
                </label>
                <input
                  type="text"
                  id="mustHaveSkills"
                  name="mustHaveSkills"
                  className="input"
                  placeholder="例如：Python, TensorFlow, LLM"
                  value={formData.mustHaveSkills}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="label" htmlFor="preferredSkills">
                  加分技能（用逗号分隔）
                </label>
                <input
                  type="text"
                  id="preferredSkills"
                  name="preferredSkills"
                  className="input"
                  placeholder="例如：发表过论文, 有开源项目经验"
                  value={formData.preferredSkills}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          
          {/* 步骤 3: 岗位澄清 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="label" htmlFor="successCriteria">
                  3-6 个月成功标准 *
                </label>
                <textarea
                  id="successCriteria"
                  name="successCriteria"
                  className="input h-32"
                  placeholder="请描述候选人在入职后 3-6 个月内需要达成的关键目标和成果"
                  value={formData.successCriteria}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="label" htmlFor="unacceptableFailures">
                  不可接受失败点 *
                </label>
                <textarea
                  id="unacceptableFailures"
                  name="unacceptableFailures"
                  className="input h-32"
                  placeholder="请描述在技术、角色或阶段方面，候选人绝对不能出现的失败情况"
                  value={formData.unacceptableFailures}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          )}
          
          {/* 操作按钮 */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                上一步
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 ml-auto"
              >
                下一步
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 ml-auto ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    创建中...
                  </div>
                ) : (
                  '创建岗位'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}