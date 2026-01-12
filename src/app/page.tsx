'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { getJobs } from '@/mock/data';
import { Job } from '@/types';
import { initializeDemoData } from '@/lib/demo-data';

export default function HomePage() {
  const jobs = getJobs().slice(0, 6); // 只显示最新的6个岗位

  // 初始化 Demo 数据
  useEffect(() => {
    initializeDemoData();
  }, []);

  return (
    <div className="space-y-16">
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-4 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              ⚠️ AI 创业公司专属
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              技术合伙人，别招错了
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-50 leading-relaxed">
              基于「失败优先」原则，AI 预判技术合伙人的失败风险<br />
              帮助 AI 创业公司避免千万级招聘失误
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/judger/positions/new"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                立即开始分析
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/demo"
                className="group border-2 border-white/50 backdrop-blur-sm bg-white/10 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                查看演示案例
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 平台特点 */}
      <section className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">为什么选择 Judger？</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            专为 AI 创业公司设计，从「失败优先」的角度分析技术合伙人候选人
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-full blur-2xl group-hover:bg-red-300/30 transition-all"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">失败优先预判</h3>
              <p className="text-gray-600 leading-relaxed">
                不问「他能做什么」，而问「他会在哪里失败」。从技术、角色、阶段三个维度，预判候选人可能失败的原因
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl group-hover:bg-purple-300/30 transition-all"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">创业适配度分析</h3>
              <p className="text-gray-600 leading-relaxed">
                识别「大厂螺丝钉」vs「真牛人」，评估 0-1 建设能力、资源约束适应力、Owner 心态，避免大厂光环陷阱
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl group-hover:bg-blue-300/30 transition-all"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">AI 深度洞察</h3>
              <p className="text-gray-600 leading-relaxed">
                基于大模型的简历分析，自动提取关键信号（主导 vs 参与、大规模 vs 小项目），生成针对性面试问题
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 最新岗位 */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">适用岗位</h2>
              <p className="text-gray-600">AI 创业公司最关键的技术岗位</p>
            </div>
            <Link
              href="/judger/positions/new"
              className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              开始分析
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job: Job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* 悬停背景效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-medium">{job.company.name}</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 shadow-sm group-hover:shadow-md transition-shadow">
                      {job.company.logo ? (
                        <img src={job.company.logo} alt={job.company.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <span className="text-gray-700 font-bold text-lg">{job.company.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">💰</span>
                      <span className="font-semibold">{job.salaryRange.min}k - {job.salaryRange.max}k</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">📍</span>
                      <span>{job.location}</span>
                      {job.remote && (
                        <span className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                          🌐 远程
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {job.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {job.tags.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1.5">
                        +{job.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}