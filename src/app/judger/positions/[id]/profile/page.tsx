'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { FailureProfileCard } from '@/components/judger/FailureProfileCard';
import { getPositionById, getFailureProfileByPositionId } from '@/lib/storage';
import type { PositionInput, PositionFailureProfile } from '@/types/judger';

export default function PositionProfilePage() {
  const params = useParams();
  const router = useRouter();
  const positionId = params.id as string;

  const [position, setPosition] = useState<PositionInput | null>(null);
  const [failureProfile, setFailureProfile] = useState<PositionFailureProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const positionData = getPositionById(positionId);
      const profileData = getFailureProfileByPositionId(positionId);

      if (!positionData) {
        // 岗位不存在，返回列表页
        alert('岗位不存在');
        router.push('/judger/positions');
        return;
      }

      setPosition(positionData);
      setFailureProfile(profileData);
      setLoading(false);
    };

    loadData();
  }, [positionId, router]);

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

  if (!position || !failureProfile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <IOSCard className="max-w-md mx-4">
          <div className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              失败画像不存在
            </h3>
            <p className="text-gray-600 mb-4">
              该岗位的失败画像尚未生成
            </p>
            <IOSButton variant="primary" onClick={() => router.push('/judger/positions')}>
              返回列表
            </IOSButton>
          </div>
        </IOSCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar
        title="失败画像"
        showBackButton
        rightContent={
          <div className="flex items-center gap-2">
            <IOSButton
              variant="primary"
              size="sm"
              onClick={() => {
                // 保存当前岗位 ID
                sessionStorage.setItem('judger_current_position_id', positionId);
                router.push('/judger/search');
              }}
            >
              搜索候选人
            </IOSButton>
            <IOSButton
              variant="ghost"
              size="sm"
              onClick={() => alert('导出PDF功能开发中...')}
            >
              导出
            </IOSButton>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 岗位基本信息 */}
        <IOSCard>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {position.name}
            </h2>
            <p className="text-gray-600">{position.department || '未设置部门'}</p>
          </div>
        </IOSCard>

        {/* 岗位核心问题 */}
        <IOSCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              岗位核心问题
            </h3>
            <ul className="space-y-3">
              {failureProfile.coreProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </IOSCard>

        {/* 3-6个月成功标准 */}
        <IOSCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              3-6个月成功标准
            </h3>
            <ul className="space-y-3">
              {failureProfile.successCriteria.map((criterion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </IOSCard>

        {/* 必要技能 */}
        <IOSCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              必要技能
            </h3>
            <div className="flex flex-wrap gap-2">
              {failureProfile.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-primary-500/10 text-primary-700 rounded-lg text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </IOSCard>

        {/* 高风险失败画像 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 px-2">
            高风险失败画像
          </h3>

          <FailureProfileCard profile={failureProfile.failureProfiles.technical} />
          <FailureProfileCard profile={failureProfile.failureProfiles.role} />
          <FailureProfileCard profile={failureProfile.failureProfiles.stage} />
        </div>
      </div>
    </div>
  );
}
