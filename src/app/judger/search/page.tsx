'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { IOSInput } from '@/components/ui/IOSInput';

export default function SearchPage() {
  const router = useRouter();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    experienceMin: '',
    experienceMax: '',
    education: '',
    location: '',
    excludeHighRisk: false,
  });

  const handleAddKeyword = () => {
    if (currentKeyword.trim()) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleSearch = () => {
    if (keywords.length === 0) {
      alert('请至少添加一个搜索关键词');
      return;
    }

    // 保存搜索条件到 sessionStorage
    const searchQuery = {
      keywords,
      experienceYears: {
        min: filters.experienceMin ? parseInt(filters.experienceMin) : undefined,
        max: filters.experienceMax ? parseInt(filters.experienceMax) : undefined,
      },
      education: filters.education || undefined,
      location: filters.location || undefined,
      excludeHighRisk: filters.excludeHighRisk,
    };

    sessionStorage.setItem('judger_search_query', JSON.stringify(searchQuery));

    // 跳转到结果页
    router.push('/judger/search/results');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar title="反向搜人" largeTitle />

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* 引导提示 */}
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
          <p className="text-sm text-primary-900">
            💡 <strong>提示：</strong>输入技术关键词（如：LLM训练、分布式系统、PyTorch），AI 将从全网匹配候选人并进行失败风险评估。
          </p>
        </div>

        <IOSCard>
          <div className="p-6 space-y-6">
            {/* 搜索关键词 */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                技术关键词 *
              </label>

              {/* 已添加的关键词标签 */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-500/10 text-primary-700 rounded-lg text-sm font-medium"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(index)}
                        className="hover:text-primary-900 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* 输入框 */}
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                  placeholder="输入关键词后按回车添加..."
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <IOSButton
                  variant="secondary"
                  onClick={handleAddKeyword}
                  disabled={!currentKeyword.trim()}
                >
                  添加
                </IOSButton>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                例如：LLM训练、分布式系统、PyTorch、千卡训练
              </p>
            </div>

            {/* 高级筛选 */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                <span>高级筛选</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAdvanced ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 高级筛选面板 */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: showAdvanced ? '500px' : '0',
                  opacity: showAdvanced ? 1 : 0,
                }}
              >
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <IOSInput
                      label="最少经验（年）"
                      type="number"
                      placeholder="0"
                      value={filters.experienceMin}
                      onChange={(e) => setFilters({ ...filters, experienceMin: e.target.value })}
                      inputSize="sm"
                    />
                    <IOSInput
                      label="最多经验（年）"
                      type="number"
                      placeholder="20"
                      value={filters.experienceMax}
                      onChange={(e) => setFilters({ ...filters, experienceMax: e.target.value })}
                      inputSize="sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      学历要求
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-sm"
                      value={filters.education}
                      onChange={(e) => setFilters({ ...filters, education: e.target.value })}
                    >
                      <option value="">不限</option>
                      <option value="phd">博士</option>
                      <option value="master">硕士</option>
                      <option value="bachelor">本科</option>
                      <option value="other">其他</option>
                    </select>
                  </div>

                  <IOSInput
                    label="位置/城市"
                    placeholder="例如：北京"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    inputSize="sm"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="excludeHighRisk"
                      checked={filters.excludeHighRisk}
                      onChange={(e) => setFilters({ ...filters, excludeHighRisk: e.target.checked })}
                      className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-2 focus:ring-primary-500/20"
                    />
                    <label htmlFor="excludeHighRisk" className="text-sm text-gray-700">
                      排除高风险候选人
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IOSCard>

        {/* 搜索按钮 */}
        <IOSButton
          variant="primary"
          fullWidth
          size="lg"
          onClick={handleSearch}
          disabled={keywords.length === 0}
        >
          开始搜索
        </IOSButton>
      </div>
    </div>
  );
}
