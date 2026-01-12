'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { IOSInput } from '@/components/ui/IOSInput';
import { getAllPositions, saveCandidate, saveFailureReport, getFailureProfileByPositionId } from '@/lib/storage';
import { mockGenerateFailureReport } from '@/lib/llm/mock';
import type { CandidateInput, PositionInput } from '@/types/judger';

export default function NewCandidatePage() {
  const router = useRouter();
  const [positions, setPositions] = useState<PositionInput[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    positionId: '',
    resumeText: '',
    resumeFile: null as File | null,
    notes: '',
  });

  const [dragActive, setDragActive] = useState(false);

  // 加载岗位列表
  useEffect(() => {
    const loadedPositions = getAllPositions();
    setPositions(loadedPositions);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type === 'application/pdf' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'text/plain'
      ) {
        setFormData({ ...formData, resumeFile: file });
      } else {
        alert('仅支持 PDF、DOCX、TXT 格式');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resumeFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.positionId) {
      alert('请填写候选人姓名和选择岗位');
      return;
    }

    if (!formData.resumeText && !formData.resumeFile) {
      alert('请上传简历文件或粘贴简历文本');
      return;
    }

    setIsAnalyzing(true);

    try {
      // 创建候选人对象
      const candidate: CandidateInput = {
        id: crypto.randomUUID(),
        name: formData.name,
        positionId: formData.positionId,
        resumeText: formData.resumeText,
        resumeUrl: formData.resumeFile ? formData.resumeFile.name : undefined,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      };

      // 保存候选人信息
      saveCandidate(candidate);

      // 获取岗位失败画像
      const failureProfile = getFailureProfileByPositionId(formData.positionId);

      if (!failureProfile) {
        alert('该岗位的失败画像尚未生成，请先生成岗位失败画像');
        setIsAnalyzing(false);
        return;
      }

      // 模拟 AI 分析延迟（1-2秒）
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 1000));

      // 生成失败预判报告
      const report = mockGenerateFailureReport(candidate, failureProfile);

      // 保存失败报告
      saveFailureReport(report);

      // 跳转到报告页面
      router.push(`/judger/candidates/${candidate.id}/report`);
    } catch (error) {
      console.error('生成报告失败:', error);
      alert('生成报告失败，请重试');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar
        title="候选人失败预判"
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <IOSCard>
            <div className="p-6 space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  候选人信息
                </h2>
                <p className="text-sm text-gray-600">
                  上传简历，AI 将从「失败优先」角度生成详细预判报告
                </p>
              </div>

              <IOSInput
                label="候选人姓名"
                placeholder="请输入候选人姓名"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  选择岗位 *
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  value={formData.positionId}
                  onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
                  required
                >
                  <option value="">请选择岗位</option>
                  {positions.length === 0 ? (
                    <option value="" disabled>暂无岗位，请先创建岗位</option>
                  ) : (
                    positions.map((pos) => (
                      <option key={pos.id} value={pos.id}>
                        {pos.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* 简历上传 */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  简历上传 *
                </label>

                {/* 拖拽上传区域 */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-primary-500 bg-primary-500/5'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {formData.resumeFile ? (
                    <div className="space-y-3">
                      <div className="w-12 h-12 mx-auto bg-primary-500/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-primary-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formData.resumeFile.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, resumeFile: null })}
                        className="text-xs text-danger hover:text-danger font-medium"
                      >
                        移除文件
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 mb-1">
                          拖拽文件到这里，或者
                        </p>
                        <label className="text-sm text-primary-500 hover:text-primary-600 font-medium cursor-pointer">
                          点击选择文件
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx,.txt"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        支持 PDF、DOCX、TXT 格式
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 或者：粘贴简历文本 */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">或者粘贴简历文本</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  简历文本
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  rows={6}
                  placeholder="粘贴候选人简历文本..."
                  value={formData.resumeText}
                  onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })}
                />
              </div>

              <IOSInput
                label="备注（可选）"
                placeholder="补充说明..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </IOSCard>

          <IOSButton
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={isAnalyzing}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? '正在生成失败预判报告...' : '开始分析 ✨'}
          </IOSButton>
        </form>
      </div>
    </div>
  );
}
