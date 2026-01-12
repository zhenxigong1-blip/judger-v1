'use client';

import Link from 'next/link';
import { IOSCard } from '@/components/ui/IOSCard';
import { IOSButton } from '@/components/ui/IOSButton';
import { IOSNavigationBar } from '@/components/ui/IOSNavigationBar';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <IOSNavigationBar title="产品演示" showBackButton />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 欢迎提示 */}
        <IOSCard variant="elevated">
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎯</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              欢迎体验 Judger V1.0
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              基于「失败优先」原则的 AI 招聘决策工具<br />
              专为 AI 创业公司技术合伙人招聘设计
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-xl text-sm text-primary-900">
              ✅ 已为您准备好 Demo 数据，可直接体验完整流程
            </div>
          </div>
        </IOSCard>

        {/* 核心功能演示 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">核心功能演示</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 功能 1 */}
            <Link href="/judger/positions">
              <IOSCard clickable variant="elevated" className="h-full">
                <div className="p-6">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    1. 岗位失败画像
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    AI 生成技术/角色/阶段三类失败画像，预判候选人可能失败的原因
                  </p>
                  <div className="flex items-center text-sm text-primary-500 font-medium">
                    查看示例岗位 →
                  </div>
                </div>
              </IOSCard>
            </Link>

            {/* 功能 2 */}
            <Link href="/judger/search">
              <IOSCard clickable variant="elevated" className="h-full">
                <div className="p-6">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    2. 反向全网搜人
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    输入技术关键词，AI 从全网匹配候选人并进行风险评估
                  </p>
                  <div className="flex items-center text-sm text-primary-500 font-medium">
                    开始搜索 →
                  </div>
                </div>
              </IOSCard>
            </Link>

            {/* 功能 3 */}
            <Link href="/judger/candidates/demo-candidate-1/report">
              <IOSCard clickable variant="elevated" className="h-full">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    3. 失败预判报告
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    详细的失败概率、风险分析、创业适配度评估和面试建议
                  </p>
                  <div className="flex items-center text-sm text-primary-500 font-medium">
                    查看示例报告 →
                  </div>
                </div>
              </IOSCard>
            </Link>
          </div>
        </div>

        {/* 完整流程演示 */}
        <IOSCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              完整流程演示
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">创建岗位并生成失败画像</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    选择"首席科学家"模板，填写岗位信息，AI 自动生成三类失败画像
                  </p>
                  <Link href="/judger/positions/demo-position-1/profile">
                    <IOSButton variant="secondary" size="sm">
                      查看示例画像
                    </IOSButton>
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">搜索候选人</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    输入技术关键词（如：LLM训练、分布式系统），AI 匹配候选人并评估风险
                  </p>
                  <Link href="/judger/search">
                    <IOSButton variant="secondary" size="sm">
                      开始搜索
                    </IOSButton>
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">查看失败预判报告</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    查看候选人的失败概率、风险因素、创业适配度和面试建议
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/judger/candidates/demo-candidate-1/report">
                      <IOSButton variant="secondary" size="sm">
                        张伟 (大厂背景)
                      </IOSButton>
                    </Link>
                    <Link href="/judger/candidates/demo-candidate-2/report">
                      <IOSButton variant="secondary" size="sm">
                        李娜 (创业背景)
                      </IOSButton>
                    </Link>
                    <Link href="/judger/candidates/demo-candidate-3/report">
                      <IOSButton variant="secondary" size="sm">
                        王晓明 (学术背景)
                      </IOSButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IOSCard>

        {/* 核心亮点 */}
        <IOSCard variant="glass">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ✨ 核心亮点
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">失败优先</h4>
                  <p className="text-sm text-gray-600">
                    不问「他能做什么」，而问「他会在哪里失败」
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">创业适配度</h4>
                  <p className="text-sm text-gray-600">
                    识别「大厂螺丝钉」vs「真牛人」，评估 0-1 能力
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">AI 深度洞察</h4>
                  <p className="text-sm text-gray-600">
                    自动提取关键信号，生成针对性面试问题
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">专注AI创业</h4>
                  <p className="text-sm text-gray-600">
                    针对首席科学家、CTO 等关键技术岗位
                  </p>
                </div>
              </div>
            </div>
          </div>
        </IOSCard>

        {/* 开始体验 */}
        <div className="text-center">
          <Link href="/judger/positions">
            <IOSButton variant="primary" size="lg">
              开始体验完整流程 ✨
            </IOSButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
