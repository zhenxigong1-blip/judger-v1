'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { RiskBadge } from '@/components/judger/RiskBadge';
import { mockSearchCandidates, mockGenerateFailureReport } from '@/lib/llm/mock';
import { saveCandidate, saveFailureReport, getFailureProfileByPositionId } from '@/lib/storage';
import type { CandidateSearchQuery, CandidateSearchResult } from '@/types/judger';

export default function SearchResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<CandidateSearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<CandidateSearchQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingReportFor, setGeneratingReportFor] = useState<string | null>(null);

  useEffect(() => {
    const loadSearchResults = async () => {
      try {
        // 从 sessionStorage 读取搜索条件
        const queryString = sessionStorage.getItem('judger_search_query');
        if (!queryString) {
          // 没有搜索条件，返回搜索页
          router.push('/judger/search');
          return;
        }

        const query: CandidateSearchQuery = JSON.parse(queryString);
        setSearchQuery(query);

        // 模拟搜索延迟
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 调用 Mock LLM 获取搜索结果
        const searchResults = mockSearchCandidates(query);
        setResults(searchResults);
        setLoading(false);
      } catch (error) {
        console.error('搜索失败:', error);
        alert('搜索失败，请重试');
        router.push('/judger/search');
      }
    };

    loadSearchResults();
  }, [router]);

  // 处理查看报告
  const handleViewReport = async (result: CandidateSearchResult) => {
    try {
      setGeneratingReportFor(result.id);

      // 获取第一个岗位作为默认岗位（实际应该让用户选择）
      const positionId = sessionStorage.getItem('judger_current_position_id') || '';

      if (!positionId) {
        alert('请先创建岗位或从岗位页面发起搜索');
        setGeneratingReportFor(null);
        return;
      }

      // 创建候选人对象
      const candidate = {
        id: result.id,
        name: result.name,
        positionId: positionId,
        resumeText: result.experienceSummary,
        notes: `从候选人搜索添加 - 当前公司: ${result.currentCompany}, 当前职位: ${result.currentTitle}`,
        createdAt: new Date().toISOString(),
      };

      // 保存候选人
      saveCandidate(candidate);

      // 获取岗位失败画像
      const failureProfile = getFailureProfileByPositionId(positionId);

      if (!failureProfile) {
        alert('该岗位的失败画像尚未生成');
        setGeneratingReportFor(null);
        return;
      }

      // 模拟生成报告延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 生成失败预判报告
      const report = mockGenerateFailureReport(candidate, failureProfile);

      // 保存报告
      saveFailureReport(report);

      // 跳转到报告页
      router.push(`/judger/candidates/${result.id}/report`);
    } catch (error) {
      console.error('生成报告失败:', error);
      alert('生成报告失败，请重试');
      setGeneratingReportFor(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">正在搜索候选人...</p>
        </div>
      </div>
    );
  }

  // 环形进度条组件
  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-14 h-14">
        <svg className="transform -rotate-90 w-14 h-14">
          {/* 背景圆 */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          {/* 进度圆 */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-primary-500 transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar
        title={`搜索结果 (${results.length})`}
        showBackButton
      />

      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {/* 搜索关键词显示 */}
        {searchQuery && searchQuery.keywords.length > 0 && (
          <IOSCard>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">搜索关键词:</p>
              <div className="flex flex-wrap gap-2">
                {searchQuery.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-500/10 text-primary-700 rounded-md text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </IOSCard>
        )}

        {results.length === 0 ? (
          <IOSCard className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              未找到匹配的候选人
            </h3>
            <p className="text-gray-600">
              请尝试调整搜索条件或关键词
            </p>
          </IOSCard>
        ) : (
          results.map((result) => (
            <IOSCard key={result.id} clickable>
              <div className="p-6">
                {/* 头部：姓名和风险徽章 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {result.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {result.currentTitle} @ {result.currentCompany}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <RiskBadge level={result.riskScore} size="sm" />
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        result.recommendationLevel === 'A'
                          ? 'bg-success/10 text-success'
                          : result.recommendationLevel === 'B'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-danger/10 text-danger'
                      }`}
                    >
                      {result.recommendationLevel}级
                    </span>
                  </div>
                </div>

                {/* 经验摘要 */}
                <p className="text-sm text-gray-700 mb-4">
                  {result.experienceSummary}
                </p>

                {/* 匹配度和操作 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <CircularProgress percentage={result.matchPercentage} />
                    <div>
                      <p className="text-xs text-gray-500">匹配度</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {result.matchPercentage}%
                      </p>
                    </div>
                  </div>

                  <IOSButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewReport(result)}
                    loading={generatingReportFor === result.id}
                    disabled={generatingReportFor !== null}
                  >
                    {generatingReportFor === result.id ? '生成中...' : '查看报告 →'}
                  </IOSButton>
                </div>

                {/* 风险因素 */}
                {result.riskFactors.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      关键因素
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.riskFactors.map((factor, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </IOSCard>
          ))
        )}
      </div>
    </div>
  );
}
