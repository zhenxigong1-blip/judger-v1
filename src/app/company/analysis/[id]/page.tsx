'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/components/SessionProvider';
import { CompanySidebar } from '@/components/CompanySidebar';
import { AnalysisTask } from '@/types';
import { getAnalysisTasks } from '@/mock/data';

export default function AnalysisResultPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useSession();
  const [task, setTask] = useState<AnalysisTask | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock: 企业用户必须登录才能访问
  if (!user || user.role === 'candidate') {
    router.push('/auth/login');
    return null;
  }

  // 初始化加载数据
  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getAnalysisTasks();
      const foundTask = data.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      } else {
        router.push('/404');
      }
      setIsLoading(false);
    };
    
    fetchTask();
  }, [id, router]);

  // 复制风险摘要
  const copyRiskSummary = () => {
    if (!task?.results) return;
    
    const summary = `
风险分析报告：${task.candidateName} - ${task.jobTitle}

技术风险：
- 可能失败路径：${task.results.technicalRisk.paths.join('、')}
- 严重程度：${task.results.technicalRisk.severity === 'low' ? '低' : task.results.technicalRisk.severity === 'medium' ? '中' : '高'}

角色风险：
- Owner 心态：${task.results.roleRisk.ownerMindset}
- 模糊推进能力：${task.results.roleRisk.ambiguityHandling}
- 协作方式：${task.results.roleRisk.collaboration}

阶段错配风险：
- 候选人优势：${task.results.stageMismatchRisk.candidateStrength}
- 公司阶段：${task.results.stageMismatchRisk.companyStage}
- 错配点：${task.results.stageMismatchRisk.mismatch}

最大未验证风险：
${task.results.keyRisks.map(risk => `- ${risk}`).join('\n')}

推荐问题：
${task.results.recommendedQuestions.map(q => `- ${q}`).join('\n')}

最终推荐：${task.results.recommendation === 'strongly_recommend' ? '强烈推荐' : task.results.recommendation === 'recommend' ? '谨慎推荐' : '不推荐'}
置信度：${task.results.confidence}%
    `;
    
    navigator.clipboard.writeText(summary.trim());
    alert('风险摘要已复制到剪贴板');
  };

  // 导出报告（Mock）
  const exportReport = () => {
    alert('报告导出功能正在开发中');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        <CompanySidebar />
        <div className="flex-1">
          <div className="empty-state">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p>加载分析报告中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!task || !task.results) {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        <CompanySidebar />
        <div className="flex-1">
          <div className="empty-state">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>分析报告不存在或尚未生成</p>
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

  const results = task.results;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 侧边栏 */}
      <CompanySidebar />
      
      {/* 主内容区 */}
      <div className="flex-1">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">风险分析报告</h1>
              <p className="text-gray-600 mt-1">
                {task.candidateName} - {task.jobTitle}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                生成时间：{new Date(task.createdAt).toLocaleString('zh-CN')}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={copyRiskSummary}
                className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-200"
              >
                复制风险摘要
              </button>
              <button 
                onClick={exportReport}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200"
              >
                导出报告
              </button>
            </div>
          </div>
          
          {/* 推荐结果卡片 */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">最终推荐</h2>
                <p className="text-sm text-gray-600">基于综合分析的最终推荐结果</p>
              </div>
              <div className={`px-4 py-2 rounded-lg font-bold ${results.recommendation === 'strongly_recommend' ? 'bg-green-100 text-green-800' : results.recommendation === 'recommend' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {results.recommendation === 'strongly_recommend' ? '强烈推荐' : results.recommendation === 'recommend' ? '谨慎推荐' : '不推荐'}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">置信度</span>
                <span className="text-sm font-bold text-primary">{results.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${results.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 风险分析内容 */}
        <div className="space-y-6">
          {/* 技术风险 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">技术失败风险</h2>
                <p className="text-sm text-gray-500">分析候选人在技术方面可能面临的失败路径和风险</p>
              </div>
              <span className={`ml-auto px-3 py-1 text-xs rounded-full font-medium ${results.technicalRisk.severity === 'low' ? 'bg-green-100 text-green-800' : results.technicalRisk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {results.technicalRisk.severity === 'low' ? '低风险' : results.technicalRisk.severity === 'medium' ? '中风险' : '高风险'}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">可能失败路径</h3>
                <ul className="space-y-2">
                  {results.technicalRisk.paths.map((path, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span className="text-sm text-gray-600">{path}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">证据点</h3>
                <ul className="space-y-2">
                  {results.technicalRisk.evidence.map((evidence, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-500 mr-2 mt-1">•</span>
                      <span className="text-sm text-gray-600">{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* 角色风险 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">角色失败风险</h2>
                <p className="text-sm text-gray-500">分析候选人在角色适应方面可能面临的风险</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Owner 心态</h3>
                <p className="text-sm text-gray-600">{results.roleRisk.ownerMindset}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">模糊推进能力</h3>
                <p className="text-sm text-gray-600">{results.roleRisk.ambiguityHandling}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">协作方式</h3>
                <p className="text-sm text-gray-600">{results.roleRisk.collaboration}</p>
              </div>
            </div>
          </div>
          
          {/* 阶段错配风险 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">阶段错配风险</h2>
                <p className="text-sm text-gray-500">分析候选人与公司当前阶段的匹配度</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">候选人优势</h3>
                <p className="text-sm text-gray-600">{results.stageMismatchRisk.candidateStrength}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">公司阶段</h3>
                <p className="text-sm text-gray-600">{results.stageMismatchRisk.companyStage}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">错配点</h3>
                <p className="text-sm text-gray-600">{results.stageMismatchRisk.mismatch}</p>
              </div>
            </div>
          </div>
          
          {/* 最大未验证风险 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">最大未验证风险</h2>
                <p className="text-sm text-gray-500">分析过程中发现的关键风险点</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">风险点</h3>
                <ul className="space-y-2">
                  {results.keyRisks.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-500 mr-2 mt-1">•</span>
                      <span className="text-sm text-gray-600">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">推荐面试问题</h3>
                <ul className="space-y-2">
                  {results.recommendedQuestions.map((question, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span className="text-sm text-gray-600">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* 免责声明 */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">免责声明</h3>
          <p className="text-xs text-yellow-700">
            本风险分析报告基于AI模型生成，仅供辅助决策参考。最终招聘决策应由企业结合实际面试情况、背景调查等多方面因素综合考虑。
            AI分析结果可能存在偏差，企业应自行承担招聘决策的全部责任。
          </p>
        </div>
      </div>
    </div>
  );
}