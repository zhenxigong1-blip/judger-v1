'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { IOSInput } from '@/components/ui/IOSInput';
import { savePosition, saveFailureProfile } from '@/lib/storage';
import { mockGenerateFailureProfile } from '@/lib/llm/mock';
import { getAllPositionTemplates, createPositionFromTemplate, type PositionTemplate } from '@/data/position-templates';
import type { PositionInput } from '@/types/judger';

export default function NewPositionPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PositionTemplate | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);

  const [formData, setFormData] = useState<Omit<PositionInput, 'id' | 'createdAt'>>({
    name: '',
    department: '',
    responsibilities: '',
    keyObjectives: '',
    successCriteria: '',
    requiredSkills: '',
    bonusSkills: '',
    experienceRequired: '',
    businessContext: '',
    companyStage: 'startup',
  });

  const templates = getAllPositionTemplates();

  // 应用模板
  const handleApplyTemplate = (template: PositionTemplate) => {
    const templateData = createPositionFromTemplate(template);
    setFormData(templateData);
    setSelectedTemplate(template);
    setShowTemplates(false);
  };

  // 清除模板（从头开始）
  const handleClearTemplate = () => {
    setFormData({
      name: '',
      department: '',
      responsibilities: '',
      keyObjectives: '',
      successCriteria: '',
      requiredSkills: '',
      bonusSkills: '',
      experienceRequired: '',
      businessContext: '',
      companyStage: 'startup',
    });
    setSelectedTemplate(null);
    setShowTemplates(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsGenerating(true);

    try {
      // 创建岗位对象
      const position: PositionInput = {
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      // 保存岗位信息
      savePosition(position);

      // 模拟 AI 生成延迟（500-1500ms）
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500));

      // 生成失败画像
      const failureProfile = mockGenerateFailureProfile(position);

      // 保存失败画像
      saveFailureProfile(failureProfile);

      // 跳转到失败画像页面
      router.push(`/judger/positions/${position.id}/profile`);
    } catch (error) {
      console.error('创建岗位失败:', error);
      alert('创建岗位失败，请重试');
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar
        title="为核心技术岗位生成失败画像"
        showBackButton
        rightContent={
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            取消
          </button>
        }
      />

      <div className="max-w-3xl mx-auto p-6">
        {/* 引导提示 */}
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
          <p className="text-sm text-primary-900">
            💡 <strong>提示：</strong>选择 AI 创业公司常见岗位模板，或从头创建自定义岗位。越详细的信息，AI 预判越准确。
          </p>
        </div>

        {/* 模板选择卡片 */}
        {showTemplates && (
          <IOSCard className="mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  选择岗位模板（推荐）
                </h3>
                <button
                  type="button"
                  onClick={() => setShowTemplates(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  跳过，自定义 →
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleApplyTemplate(template)}
                    className="text-left p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl flex-shrink-0">{template.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {template.commonFailures.technical.slice(0, 2).map((failure, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                            >
                              ⚠️ {failure}
                            </span>
                          ))}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-primary-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </IOSCard>
        )}

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <IOSCard>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {selectedTemplate ? `${selectedTemplate.icon} ${selectedTemplate.name}` : '岗位基本信息'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedTemplate
                      ? '已应用模板，可继续编辑调整'
                      : '填写岗位详细信息，AI 将生成失败画像'}
                  </p>
                </div>
                {selectedTemplate && (
                  <button
                    type="button"
                    onClick={handleClearTemplate}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    清除模板
                  </button>
                )}
              </div>

              <IOSInput
                label="岗位名称"
                placeholder="例如：首席科学家"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <IOSInput
                label="所属部门/团队"
                placeholder="例如：技术团队"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  工作职责 *
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  rows={6}
                  placeholder="描述该岗位的主要工作职责..."
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    关键目标/问题 *
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary-500 hover:text-primary-600 font-medium"
                    onClick={() => alert('AI辅助功能开发中...')}
                  >
                    AI辅助
                  </button>
                </div>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  rows={4}
                  placeholder="该岗位需要解决的核心问题..."
                  value={formData.keyObjectives}
                  onChange={(e) => setFormData({ ...formData, keyObjectives: e.target.value })}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    3-6个月成功标准 *
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary-500 hover:text-primary-600 font-medium"
                    onClick={() => alert('AI辅助功能开发中...')}
                  >
                    AI辅助
                  </button>
                </div>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  rows={4}
                  placeholder="入职后3-6个月的成功标准..."
                  value={formData.successCriteria}
                  onChange={(e) => setFormData({ ...formData, successCriteria: e.target.value })}
                  required
                />
              </div>

              <IOSInput
                label="必要技能"
                placeholder="例如：Python, PyTorch, 分布式训练"
                value={formData.requiredSkills}
                onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                helperText="用逗号分隔多个技能"
                required
              />

              <IOSInput
                label="加分技能"
                placeholder="例如：Rust, CUDA优化"
                value={formData.bonusSkills}
                onChange={(e) => setFormData({ ...formData, bonusSkills: e.target.value })}
              />

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  经验要求
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  rows={3}
                  placeholder="例如：5年以上 AI/ML 工作经验，3年以上 LLM 相关经验..."
                  value={formData.experienceRequired}
                  onChange={(e) => setFormData({ ...formData, experienceRequired: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  业务场景/背景
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  rows={3}
                  placeholder="例如：我们是一家 AI 应用创业公司，正在开发..."
                  value={formData.businessContext}
                  onChange={(e) => setFormData({ ...formData, businessContext: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  公司阶段 *
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  value={formData.companyStage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyStage: e.target.value as 'startup' | 'scaleup' | 'enterprise',
                    })
                  }
                  required
                >
                  <option value="startup">初创期（Startup）</option>
                  <option value="scaleup">成长期（Scale-up）</option>
                  <option value="enterprise">成熟期（Enterprise）</option>
                </select>
              </div>
            </div>
          </IOSCard>

          <IOSButton
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={isGenerating}
            disabled={isGenerating}
          >
            {isGenerating ? '正在生成失败画像...' : '生成失败画像 ✨'}
          </IOSButton>
        </form>
      </div>
    </div>
  );
}
