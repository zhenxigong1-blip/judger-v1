'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { RiskBadge } from '@/components/judger/RiskBadge';
import { getCandidateById, getFailureReportByCandidateId, getPositionById } from '@/lib/storage';
import type { CandidateInput, FailurePredictionReport, PositionInput } from '@/types/judger';

export default function FailureReportPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const [candidate, setCandidate] = useState<CandidateInput | null>(null);
  const [report, setReport] = useState<FailurePredictionReport | null>(null);
  const [position, setPosition] = useState<PositionInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'technical' | 'role' | 'stage'>('technical');

  useEffect(() => {
    const loadData = () => {
      const candidateData = getCandidateById(candidateId);
      const reportData = getFailureReportByCandidateId(candidateId);

      if (!candidateData) {
        alert('候选人不存在');
        router.push('/judger/candidates/new');
        return;
      }

      setCandidate(candidateData);
      setReport(reportData);

      if (candidateData.positionId) {
        const positionData = getPositionById(candidateData.positionId);
        setPosition(positionData);
      }

      setLoading(false);
    };

    loadData();
  }, [candidateId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!candidate || !report) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <IOSCard className="max-w-md mx-4">
          <div className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              失败预判报告不存在
            </h3>
            <p className="text-gray-600 mb-4">
              该候选人的失败预判报告尚未生成
            </p>
            <IOSButton variant="primary" onClick={() => router.push('/judger/candidates/new')}>
              返回
            </IOSButton>
          </div>
        </IOSCard>
      </div>
    );
  }

  // 环形进度条
  const CircularProgress = ({ percentage, size = 'lg' }: { percentage: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = {
      sm: { width: 'w-20 h-20', radius: 30, strokeWidth: 6, fontSize: 'text-lg' },
      md: { width: 'w-28 h-28', radius: 40, strokeWidth: 8, fontSize: 'text-2xl' },
      lg: { width: 'w-36 h-36', radius: 50, strokeWidth: 10, fontSize: 'text-3xl' },
    };

    const config = sizes[size];
    const circumference = 2 * Math.PI * config.radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`relative ${config.width}`}>
        <svg className={`transform -rotate-90 ${config.width}`}>
          <circle
            cx="50%"
            cy="50%"
            r={config.radius}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="50%"
            cy="50%"
            r={config.radius}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-2000 ${
              percentage < 30 ? 'text-success' : percentage < 60 ? 'text-warning' : 'text-danger'
            }`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold ${config.fontSize}`}>{percentage}%</span>
          <span className="text-xs text-gray-500 mt-1">失败概率</span>
        </div>
      </div>
    );
  };

  // 技能水平映射
  const levelLabels = {
    none: '无',
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
    expert: '专家',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar
        title="失败预判报告"
        showBackButton
        rightContent={
          <div className="flex items-center gap-2">
            <IOSButton variant="ghost" size="sm" onClick={() => alert('分享功能开发中...')}>
              分享
            </IOSButton>
            <IOSButton variant="ghost" size="sm" onClick={() => alert('导出PDF功能开发中...')}>
              导出
            </IOSButton>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 候选人信息卡片 */}
        <IOSCard>
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500 font-bold text-xl">
                {candidate.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {candidate.name}
                </h2>
                <p className="text-sm text-gray-600">
                  应聘：{position?.name || '未知岗位'}
                </p>
              </div>
            </div>
          </div>
        </IOSCard>

        {/* 核心结论卡片 */}
        <IOSCard variant="elevated">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 失败概率环形图 */}
              <CircularProgress percentage={report.failureProbability} />

              {/* 推荐等级和评价 */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <span className="text-sm font-semibold text-gray-600">推荐等级</span>
                  <span
                    className={`px-4 py-2 rounded-xl text-lg font-bold ${
                      report.recommendationLevel === 'A'
                        ? 'bg-success/10 text-success'
                        : report.recommendationLevel === 'B'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-danger/10 text-danger'
                    }`}
                  >
                    {report.recommendationLevel}级候选人
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {report.summary}
                </p>
              </div>
            </div>
          </div>
        </IOSCard>

        {/* 主要风险因素 */}
        <IOSCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              主要风险因素
            </h3>
            <div className="space-y-3">
              {report.mainRiskFactors.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <span className="text-gray-800 font-medium">{risk.title}</span>
                  <RiskBadge level={risk.severity} size="sm" showIcon={false} />
                </div>
              ))}
            </div>
          </div>
        </IOSCard>

        {/* 风险详细分析（标签页） */}
        <IOSCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              风险详细分析
            </h3>

            {/* 标签切换 */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {[
                { key: 'technical', label: '技术风险' },
                { key: 'role', label: '角色风险' },
                { key: 'stage', label: '阶段风险' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 font-medium transition-all duration-300 border-b-2 ${
                    activeTab === tab.key
                      ? 'text-primary-500 border-primary-500'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 技术风险详情 */}
            {activeTab === 'technical' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">技能差距分析</h4>
                  <div className="space-y-4">
                    {report.riskAnalysis.technical.skillGaps.map((gap, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-semibold text-gray-900">{gap.skillName}</span>
                          {gap.required && (
                            <span className="text-xs px-2 py-1 bg-danger/10 text-danger rounded-md">
                              必需
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-sm">
                            <span className="text-gray-500">候选人：</span>
                            <span className="text-gray-700 font-medium ml-1">
                              {levelLabels[gap.candidateLevel]}
                            </span>
                          </div>
                          <span className="text-gray-400">→</span>
                          <div className="text-sm">
                            <span className="text-gray-500">要求：</span>
                            <span className="text-gray-700 font-medium ml-1">
                              {levelLabels[gap.requiredLevel]}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{gap.gap}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <RiskBadge level={report.riskAnalysis.technical.overallRisk} size="sm" />
                    <span className="font-semibold text-gray-900">综合风险评估</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {report.riskAnalysis.technical.summary}
                  </p>
                </div>
              </div>
            )}

            {/* 角色风险详情 */}
            {activeTab === 'role' && (
              <div className="space-y-4">
                {[
                  { key: 'ownershipMindset', label: 'Owner心态' },
                  { key: 'ambiguityHandling', label: '模糊性处理能力' },
                  { key: 'collaboration', label: '协作能力' },
                ].map((dimension) => {
                  const data = report.riskAnalysis.role[dimension.key as keyof typeof report.riskAnalysis.role] as {
                    score: number;
                    evidence: string[];
                  };
                  return (
                    <div key={dimension.key} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">{dimension.label}</span>
                        <span className={`text-2xl font-bold ${
                          data.score >= 70 ? 'text-success' : data.score >= 50 ? 'text-warning' : 'text-danger'
                        }`}>
                          {data.score}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            data.score >= 70 ? 'bg-success' : data.score >= 50 ? 'bg-warning' : 'bg-danger'
                          }`}
                          style={{ width: `${data.score}%` }}
                        />
                      </div>
                      <div className="space-y-1">
                        {data.evidence.map((item, i) => (
                          <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>{item}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <RiskBadge level={report.riskAnalysis.role.overallRisk} size="sm" />
                    <span className="font-semibold text-gray-900">综合风险评估</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {report.riskAnalysis.role.summary}
                  </p>
                </div>
              </div>
            )}

            {/* 阶段风险详情 */}
            {activeTab === 'stage' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-1">候选人优势环境</p>
                    <p className="text-lg font-bold text-gray-900">
                      {report.riskAnalysis.stage.candidateOptimalStage === 'startup'
                        ? '初创期'
                        : report.riskAnalysis.stage.candidateOptimalStage === 'scaleup'
                        ? '成长期'
                        : '成熟期'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-1">当前公司阶段</p>
                    <p className="text-lg font-bold text-gray-900">
                      {report.riskAnalysis.stage.currentCompanyStage === 'startup'
                        ? '初创期'
                        : report.riskAnalysis.stage.currentCompanyStage === 'scaleup'
                        ? '成长期'
                        : '成熟期'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">匹配度评分</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            report.riskAnalysis.stage.matchScore >= 70
                              ? 'bg-success'
                              : report.riskAnalysis.stage.matchScore >= 50
                              ? 'bg-warning'
                              : 'bg-danger'
                          }`}
                          style={{ width: `${report.riskAnalysis.stage.matchScore}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {report.riskAnalysis.stage.matchScore}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-semibold text-gray-700 mb-2">主要顾虑</p>
                  <ul className="space-y-2">
                    {report.riskAnalysis.stage.concerns.map((concern, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-danger">⚠</span>
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <RiskBadge level={report.riskAnalysis.stage.overallRisk} size="sm" />
                    <span className="font-semibold text-gray-900">综合风险评估</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {report.riskAnalysis.stage.summary}
                  </p>
                </div>
              </div>
            )}
          </div>
        </IOSCard>

        {/* 创业适配度分析 */}
        {report.startupFit && (
          <IOSCard variant="elevated">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  🚀 创业适配度分析
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">综合评分</span>
                  <span className={`text-3xl font-bold ${
                    report.startupFit.overallScore >= 70 ? 'text-success' :
                    report.startupFit.overallScore >= 50 ? 'text-warning' : 'text-danger'
                  }`}>
                    {report.startupFit.overallScore}
                  </span>
                </div>
              </div>

              {/* 综合评价 */}
              <div className={`p-4 rounded-xl border mb-6 ${
                report.startupFit.overallRisk === 'low' ? 'bg-success/5 border-success/20' :
                report.startupFit.overallRisk === 'medium' ? 'bg-warning/5 border-warning/20' :
                'bg-danger/5 border-danger/20'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <RiskBadge level={report.startupFit.overallRisk} size="sm" />
                  <span className="font-semibold text-gray-900">综合评价</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {report.startupFit.summary}
                </p>
              </div>

              {/* 关键建议 */}
              <div className="p-4 bg-primary-50 border border-primary-200 rounded-xl mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary-500">💡</span>
                  <span className="font-semibold text-gray-900">关键建议</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {report.startupFit.keyRecommendation}
                </p>
              </div>

              <div className="space-y-6">
                {/* 背景适配分析 */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>👤</span>
                    <span>背景适配分析</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">候选人背景</p>
                      <p className="text-sm font-medium text-gray-900">
                        {report.startupFit.backgroundFit.candidateBackground === 'big-tech' ? '大厂背景' :
                         report.startupFit.backgroundFit.candidateBackground === 'startup' ? '创业背景' :
                         report.startupFit.backgroundFit.candidateBackground === 'mixed' ? '混合背景' : '未知背景'}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {report.startupFit.backgroundFit.backgroundDescription}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">风险等级</p>
                      <RiskBadge level={report.startupFit.backgroundFit.riskLevel} size="sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">✓ 优势</p>
                      <ul className="space-y-1">
                        {report.startupFit.backgroundFit.strengths.map((strength, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-success">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">⚠ 主要顾虑</p>
                      <ul className="space-y-1">
                        {report.startupFit.backgroundFit.concerns.map((concern, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-warning">•</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 0-1建设能力 */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🔨</span>
                    <span>0-1 建设能力</span>
                  </h4>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            report.startupFit.zerotoOneAbility.score >= 70 ? 'bg-success' :
                            report.startupFit.zerotoOneAbility.score >= 50 ? 'bg-warning' : 'bg-danger'
                          }`}
                          style={{ width: `${report.startupFit.zerotoOneAbility.score}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-2xl font-bold ${
                      report.startupFit.zerotoOneAbility.score >= 70 ? 'text-success' :
                      report.startupFit.zerotoOneAbility.score >= 50 ? 'text-warning' : 'text-danger'
                    }`}>
                      {report.startupFit.zerotoOneAbility.score}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {report.startupFit.zerotoOneAbility.recommendation}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">证据：</p>
                    <ul className="space-y-1">
                      {report.startupFit.zerotoOneAbility.evidence.map((item, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-gray-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 资源约束适应力 */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>💰</span>
                    <span>资源约束适应力</span>
                  </h4>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            report.startupFit.resourceConstraintAdaptation.score >= 70 ? 'bg-success' :
                            report.startupFit.resourceConstraintAdaptation.score >= 50 ? 'bg-warning' : 'bg-danger'
                          }`}
                          style={{ width: `${report.startupFit.resourceConstraintAdaptation.score}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-2xl font-bold ${
                      report.startupFit.resourceConstraintAdaptation.score >= 70 ? 'text-success' :
                      report.startupFit.resourceConstraintAdaptation.score >= 50 ? 'text-warning' : 'text-danger'
                    }`}>
                      {report.startupFit.resourceConstraintAdaptation.score}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">主要顾虑：</p>
                      <ul className="space-y-1">
                        {report.startupFit.resourceConstraintAdaptation.concerns.map((concern, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-warning">⚠</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">证据：</p>
                      <ul className="space-y-1">
                        {report.startupFit.resourceConstraintAdaptation.evidence.map((item, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-gray-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Owner心态评估 */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>Owner 心态评估</span>
                  </h4>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            report.startupFit.enhancedOwnershipMindset.score >= 70 ? 'bg-success' :
                            report.startupFit.enhancedOwnershipMindset.score >= 50 ? 'bg-warning' : 'bg-danger'
                          }`}
                          style={{ width: `${report.startupFit.enhancedOwnershipMindset.score}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-2xl font-bold ${
                      report.startupFit.enhancedOwnershipMindset.score >= 70 ? 'text-success' :
                      report.startupFit.enhancedOwnershipMindset.score >= 50 ? 'text-warning' : 'text-danger'
                    }`}>
                      {report.startupFit.enhancedOwnershipMindset.score}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">✓ 积极信号</p>
                      <ul className="space-y-1">
                        {report.startupFit.enhancedOwnershipMindset.positiveSignals.map((signal, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-success">•</span>
                            <span>{signal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">⚠ 消极信号</p>
                      <ul className="space-y-1">
                        {report.startupFit.enhancedOwnershipMindset.negativeSignals.map((signal, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-danger">•</span>
                            <span>{signal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-semibold text-gray-700 mb-2">💬 针对性面试问题：</p>
                    <ul className="space-y-2">
                      {report.startupFit.enhancedOwnershipMindset.interviewQuestions.map((question, i) => (
                        <li key={i} className="text-xs text-gray-700">
                          <span className="font-semibold text-primary-500">Q{i + 1}:</span> {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 大厂光环分析（如果有） */}
                {report.startupFit.bigTechGlowAnalysis && (
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span>🏢</span>
                      <span>大厂光环分析</span>
                    </h4>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2">曾就职公司：</p>
                      <div className="flex flex-wrap gap-2">
                        {report.startupFit.bigTechGlowAnalysis.companies.map((company, i) => (
                          <span key={i} className="px-2 py-1 bg-white rounded-md text-xs font-medium text-gray-700 border border-gray-200">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">真实能力判断：</p>
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                        report.startupFit.bigTechGlowAnalysis.realCapability === 'strong' ? 'bg-success/20 text-success' :
                        report.startupFit.bigTechGlowAnalysis.realCapability === 'medium' ? 'bg-warning/20 text-warning' :
                        'bg-danger/20 text-danger'
                      }`}>
                        {report.startupFit.bigTechGlowAnalysis.realCapability === 'strong' ? '真牛人' :
                         report.startupFit.bigTechGlowAnalysis.realCapability === 'medium' ? '中等水平' : '大厂螺丝钉'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                          <span className="text-success">✓</span>
                          <span>绿旗信号</span>
                        </p>
                        <ul className="space-y-1">
                          {report.startupFit.bigTechGlowAnalysis.greenFlags.map((flag, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                              <span className="text-success">•</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                          <span className="text-danger">🚩</span>
                          <span>红旗警示</span>
                        </p>
                        <ul className="space-y-1">
                          {report.startupFit.bigTechGlowAnalysis.redFlags.map((flag, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                              <span className="text-danger">•</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </IOSCard>
        )}

        {/* 下一步建议 */}
        {report.nextSteps.map((step, index) => (
          <IOSCard key={index} variant="elevated">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    step.priority === 'high'
                      ? 'bg-danger/10 text-danger'
                      : step.priority === 'medium'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {step.priority === 'high' ? '高' : step.priority === 'medium' ? '中' : '低'}优先级
                </span>
              </div>

              {step.questions && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    建议面试问题
                  </h4>
                  <div className="space-y-3">
                    {step.questions.map((question, i) => (
                      <div
                        key={i}
                        className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700"
                      >
                        <span className="font-semibold text-primary-500 mr-2">
                          Q{i + 1}:
                        </span>
                        {question}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <IOSButton
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        const text = step.questions?.join('\n\n');
                        navigator.clipboard.writeText(text || '');
                        alert('面试问题已复制到剪贴板！');
                      }}
                    >
                      复制面试问题
                    </IOSButton>
                  </div>
                </div>
              )}
            </div>
          </IOSCard>
        ))}
      </div>
    </div>
  );
}
