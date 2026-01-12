/**
 * Mock LLM 服务
 *
 * 模拟 AI 生成的各种分析结果
 * 用于 Demo 阶段，后续可替换为真实的 LLM API
 */

import {
  PositionInput,
  PositionFailureProfile,
  CandidateSearchQuery,
  CandidateSearchResult,
  CandidateInput,
  FailurePredictionReport,
  SkillItem,
  FailureProfile,
  RiskFactor,
} from '@/types/judger';

/**
 * 模拟生成岗位失败画像
 */
export const mockGenerateFailureProfile = (
  input: PositionInput
): PositionFailureProfile => {
  // 模拟 AI 分析延迟
  const delay = Math.random() * 1000 + 500;

  // 从输入中提取技能
  const requiredSkills = parseSkills(input.requiredSkills);
  const bonusSkills = input.bonusSkills ? parseSkills(input.bonusSkills) : [];

  // 生成核心问题
  const coreProblems = generateCoreProblems(input);

  // 生成成功标准
  const successCriteria = parseSuccessCriteria(input.successCriteria);

  // 生成三类失败画像
  const failureProfiles = {
    technical: generateTechnicalFailureProfile(input),
    role: generateRoleFailureProfile(input),
    stage: generateStageFailureProfile(input),
  };

  return {
    id: crypto.randomUUID(),
    positionId: input.id,
    coreProblems,
    successCriteria,
    requiredSkills,
    bonusSkills,
    failureProfiles,
    generatedAt: new Date().toISOString(),
  };
};

/**
 * 模拟候选人搜索
 */
export const mockSearchCandidates = (
  query: CandidateSearchQuery
): CandidateSearchResult[] => {
  // Mock 候选人数据池
  const mockCandidates = [
    {
      id: '1',
      name: '张三',
      experienceSummary: '5年AI经验，专注LLM训练和推理优化，曾在大厂负责千卡规模训练',
      riskScore: 'low' as const,
      riskFactors: ['技术栈匹配度高', '有大规模训练经验', '主动推动过多个项目'],
      recommendationLevel: 'A' as const,
      matchPercentage: 92,
      currentCompany: 'ByteDance',
      currentTitle: 'AI训练工程师',
    },
    {
      id: '2',
      name: '李四',
      experienceSummary: '3年深度学习经验，主要做小规模模型训练，缺少分布式系统经验',
      riskScore: 'medium' as const,
      riskFactors: ['分布式经验不足', 'Owner心态待验证', '技能有一定差距'],
      recommendationLevel: 'B' as const,
      matchPercentage: 68,
      currentCompany: 'Startup XYZ',
      currentTitle: '算法工程师',
    },
    {
      id: '3',
      name: '王五',
      experienceSummary: '8年研发经验，但主要在大厂做传统后端，AI经验有限',
      riskScore: 'high' as const,
      riskFactors: ['AI技能不足', '大厂背景可能不适应创业', '技术栈不匹配'],
      recommendationLevel: 'C' as const,
      matchPercentage: 45,
      currentCompany: 'Alibaba',
      currentTitle: '后端工程师',
    },
    {
      id: '4',
      name: '赵六',
      experienceSummary: '4年AI研究经验，有论文发表，但工程能力较弱，缺少生产经验',
      riskScore: 'medium' as const,
      riskFactors: ['工程能力不足', '缺少生产环境经验', '学术背景为主'],
      recommendationLevel: 'B' as const,
      matchPercentage: 71,
      currentCompany: '清华大学',
      currentTitle: '博士研究生',
    },
  ];

  // 根据查询条件过滤
  let results = mockCandidates;

  if (query.excludeHighRisk) {
    results = results.filter((c) => c.riskScore !== 'high');
  }

  if (query.experienceYears?.min) {
    // 简单模拟，实际应该解析 experienceSummary
    results = results.filter((c) => {
      const match = c.experienceSummary.match(/(\d+)年/);
      return match && parseInt(match[1]) >= (query.experienceYears?.min || 0);
    });
  }

  return results;
};

/**
 * 模拟生成候选人失败预判报告
 */
export const mockGenerateFailureReport = (
  candidate: CandidateInput,
  profile: PositionFailureProfile
): FailurePredictionReport => {
  // 根据候选人信息和岗位画像生成失败概率
  const failureProbability = Math.floor(Math.random() * 60) + 20; // 20-80%

  // 确定推荐等级
  let recommendationLevel: 'A' | 'B' | 'C';
  if (failureProbability < 35) {
    recommendationLevel = 'A';
  } else if (failureProbability < 55) {
    recommendationLevel = 'B';
  } else {
    recommendationLevel = 'C';
  }

  // 生成主要风险因素
  const mainRiskFactors: RiskFactor[] = [
    {
      category: 'technical',
      title: '缺少大规模分布式训练经验',
      description: '候选人主要经验集中在小规模模型训练，对千卡以上规模的分布式系统缺少实践经验',
      severity: 'high',
      evidence: ['简历中未提及千卡以上规模训练', '项目经验以单机为主'],
    },
    {
      category: 'role',
      title: 'Owner心态待验证',
      description: '简历中多为执行类项目描述，主动推动的案例较少',
      severity: 'medium',
      evidence: ['项目描述偏执行类', '缺少主动发起的项目'],
    },
  ];

  // 生成综合评价
  const summary = generateSummary(failureProbability, recommendationLevel);

  // 生成风险分析
  const riskAnalysis = {
    technical: generateTechnicalRiskAnalysis(candidate, profile),
    role: generateRoleRiskAnalysis(candidate),
    stage: generateStageRiskAnalysis(candidate, profile),
  };

  // 生成下一步建议
  const nextSteps = generateNextSteps(failureProbability, recommendationLevel);

  // 生成创业适配度分析 ⭐️ 新增
  const startupFit = generateStartupFitAnalysis(candidate, profile);

  return {
    id: crypto.randomUUID(),
    candidateId: candidate.id,
    positionId: candidate.positionId,
    failureProbability,
    recommendationLevel,
    summary,
    mainRiskFactors,
    riskAnalysis,
    startupFit, // ⭐️ 新增
    nextSteps,
    generatedAt: new Date().toISOString(),
  };
};

// ==================== 辅助函数 ====================

/**
 * 解析技能字符串为技能列表
 */
function parseSkills(skillsText: string): SkillItem[] {
  const skills = skillsText.split(/[,，、]/).map((s) => s.trim()).filter(Boolean);

  return skills.map((skill, index) => ({
    name: skill,
    category: categorizeSkill(skill),
    importance: (index < 3 ? 'critical' : index < 6 ? 'important' : 'nice-to-have') as 'critical' | 'important' | 'nice-to-have',
  }));
}

/**
 * 技能分类
 */
function categorizeSkill(skill: string): string {
  const lowerSkill = skill.toLowerCase();

  if (/python|java|c\+\+|rust|go|javascript/.test(lowerSkill)) {
    return '编程语言';
  }
  if (/pytorch|tensorflow|keras/.test(lowerSkill)) {
    return '深度学习框架';
  }
  if (/分布式|并行|gpu|cuda/.test(lowerSkill)) {
    return '系统能力';
  }
  if (/优化|调优|性能/.test(lowerSkill)) {
    return '性能优化';
  }

  return '技术能力';
}

/**
 * 生成核心问题
 */
function generateCoreProblems(input: PositionInput): string[] {
  const problems: string[] = [];

  // 从关键目标中提取
  if (input.keyObjectives) {
    const objectives = input.keyObjectives.split(/[。；\n]/).filter((s) => s.trim());
    problems.push(...objectives.slice(0, 3));
  }

  // 从工作职责中补充
  if (problems.length < 3 && input.responsibilities) {
    const responsibilities = input.responsibilities.split(/[。；\n]/).filter((s) => s.trim());
    problems.push(...responsibilities.slice(0, 3 - problems.length));
  }

  // 确保至少有3个
  if (problems.length === 0) {
    problems.push(
      '解决核心技术问题',
      '推动关键项目落地',
      '在不确定环境中做出决策'
    );
  }

  return problems.slice(0, 5);
}

/**
 * 解析成功标准
 */
function parseSuccessCriteria(criteriaText: string): string[] {
  const criteria = criteriaText.split(/[。；\n]/).map((s) => s.trim()).filter(Boolean);

  if (criteria.length === 0) {
    return [
      '3个月内完成核心功能开发',
      '达到预定的性能指标',
      '独立推动至少一个重要决策',
    ];
  }

  return criteria.slice(0, 5);
}

/**
 * 生成技术失败画像
 */
function generateTechnicalFailureProfile(input: PositionInput): FailureProfile {
  return {
    type: 'technical',
    title: '技术能力不足导致的失败',
    description: '候选人在核心技术能力上存在明显短板，可能无法胜任所需的技术工作。',
    indicators: [
      '缺少大规模分布式系统经验',
      '对核心技术栈理解不深',
      '性能优化能力不足',
      '缺少生产环境实践经验',
    ],
    severity: 'high',
  };
}

/**
 * 生成角色失败画像
 */
function generateRoleFailureProfile(input: PositionInput): FailureProfile {
  const isStartup = input.companyStage === 'startup';

  return {
    type: 'role',
    title: '角色胜任力不足导致的失败',
    description: isStartup
      ? '候选人可能缺少owner心态或处理模糊性的能力，在创业环境中难以主动推动工作。'
      : '候选人可能在角色定位和协作能力上存在不足。',
    indicators: isStartup
      ? [
          '习惯被动接受任务，缺少主动推动能力',
          '面对不确定性时容易焦虑或等待指示',
          '沟通协作能力欠缺，难以跨团队合作',
        ]
      : [
          '角色定位不清晰',
          '跨部门协作能力不足',
          '影响力有限',
        ],
    severity: 'medium',
  };
}

/**
 * 生成阶段失败画像
 */
function generateStageFailureProfile(input: PositionInput): FailureProfile {
  const stage = input.companyStage;

  const descriptions = {
    startup: '候选人习惯大公司的成熟流程，可能难以适应创业环境的快速变化和资源限制。',
    scaleup: '候选人可能不适应快速增长期的混乱和不确定性。',
    enterprise: '候选人可能不习惯成熟企业的流程和文化。',
  };

  const indicators = {
    startup: [
      '依赖完善的基础设施和工具',
      '不适应快速变化和多线程工作',
      '期望清晰的职责边界和成熟的管理流程',
    ],
    scaleup: [
      '难以适应快速扩张带来的变化',
      '不习惯不断调整的组织架构',
      '缺少规模化经验',
    ],
    enterprise: [
      '不习惯复杂的流程和审批',
      '难以在大组织中发挥影响力',
      '期望更快的决策速度',
    ],
  };

  return {
    type: 'stage',
    title: '公司阶段不匹配导致的失败',
    description: descriptions[stage],
    indicators: indicators[stage],
    severity: 'medium',
  };
}

/**
 * 生成技术风险分析
 */
function generateTechnicalRiskAnalysis(candidate: CandidateInput, profile: PositionFailureProfile) {
  const skillGaps = profile.requiredSkills.slice(0, 3).map((skill) => {
    const candidateLevel = ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any;
    const requiredLevel = skill.importance === 'critical' ? 'advanced' : 'intermediate';

    return {
      skillName: skill.name,
      required: skill.importance === 'critical',
      candidateLevel,
      requiredLevel: requiredLevel as any,
      gap: `候选人在${skill.name}方面的能力需要提升`,
    };
  });

  return {
    skillGaps,
    experienceGaps: ['缺少大规模项目经验', '生产环境实践不足'],
    overallRisk: 'medium' as const,
    summary: '技术基础较好，但核心能力存在差距，需要学习和成长时间',
  };
}

/**
 * 生成角色风险分析
 */
function generateRoleRiskAnalysis(candidate: CandidateInput) {
  return {
    ownershipMindset: {
      score: Math.floor(Math.random() * 30) + 50, // 50-80
      evidence: ['简历中多为执行类项目描述', '缺少主动推动的案例'],
    },
    ambiguityHandling: {
      score: Math.floor(Math.random() * 30) + 50,
      evidence: ['经历多为明确任务', '创业项目经验不足'],
    },
    collaboration: {
      score: Math.floor(Math.random() * 30) + 60,
      evidence: ['有跨团队协作经验', '团队规模较小'],
    },
    overallRisk: 'medium' as const,
    summary: 'Owner心态和模糊性处理能力待验证，建议面试重点考察',
  };
}

/**
 * 生成阶段风险分析
 */
function generateStageRiskAnalysis(candidate: CandidateInput, profile: PositionFailureProfile) {
  // 简单模拟：假设候选人来自大厂
  const candidateOptimalStage = 'enterprise' as const;

  // 从 profile 获取当前公司阶段（需要从 position 获取，这里简化处理）
  const currentCompanyStage = 'startup' as const;

  const matchScore = candidateOptimalStage === currentCompanyStage ? 85 : 45;

  return {
    candidateOptimalStage,
    currentCompanyStage,
    matchScore,
    adaptabilityScore: Math.floor(Math.random() * 30) + 50,
    concerns: [
      '习惯大厂完善的基础设施',
      '可能不适应快速变化的环境',
      '对资源限制的适应性未知',
    ],
    overallRisk: 'medium' as const,
    summary: '大厂背景可能存在适应性问题，需要评估其对创业环境的认知',
  };
}

/**
 * 生成综合评价
 */
function generateSummary(failureProbability: number, level: 'A' | 'B' | 'C'): string {
  if (level === 'A') {
    return '候选人综合素质优秀，技术能力强，与岗位匹配度高，建议优先考虑。';
  } else if (level === 'B') {
    return '候选人技术基础扎实，但存在一定差距，建议通过深度面试验证学习能力和适应性。';
  } else {
    return '候选人与岗位匹配度较低，存在较大风险，建议谨慎考虑或寻找更合适的人选。';
  }
}

/**
 * 生成下一步建议
 */
function generateNextSteps(failureProbability: number, level: 'A' | 'B' | 'C') {
  if (level === 'C') {
    return [
      {
        type: 'reject' as const,
        title: '建议暂不推进',
        description: '候选人与岗位匹配度较低，建议继续寻找更合适的人选',
        priority: 'high' as const,
      },
    ];
  }

  return [
    {
      type: 'interview' as const,
      title: '建议深度面试',
      description: '重点验证核心技术能力、学习能力和适应性',
      priority: 'high' as const,
      questions: [
        '请分享一个您参与的最大规模的项目，涉及多少人？遇到的主要挑战是什么？',
        '描述一个您主动推动的技术决策，过程是怎样的？',
        '如何看待不确定性和模糊的需求？能举个例子吗？',
        '从大厂到创业公司（或反向），您认为最大的挑战是什么？',
      ],
    },
  ];
}

/**
 * 生成创业适配度分析（针对 AI 创业公司）
 */
function generateStartupFitAnalysis(
  candidate: CandidateInput,
  profile: PositionFailureProfile
): any {
  // 分析候选人背景
  const resumeText = candidate.resumeText || '';
  const lowerResume = resumeText.toLowerCase();

  // 判断是否有大厂背景
  const bigTechKeywords = ['google', 'facebook', 'meta', 'amazon', 'microsoft', 'alibaba', '阿里巴巴', 'tencent', '腾讯', 'bytedance', '字节', 'baidu', '百度', 'huawei', '华为'];
  const hasBigTech = bigTechKeywords.some(keyword => lowerResume.includes(keyword));

  // 判断是否有创业背景
  const startupKeywords = ['创业', 'startup', '初创', '联合创始人', 'co-founder'];
  const hasStartup = startupKeywords.some(keyword => lowerResume.includes(keyword));

  // 确定候选人背景类型
  let candidateBackground: 'big-tech' | 'startup' | 'mixed' | 'unknown';
  if (hasBigTech && hasStartup) {
    candidateBackground = 'mixed';
  } else if (hasBigTech) {
    candidateBackground = 'big-tech';
  } else if (hasStartup) {
    candidateBackground = 'startup';
  } else {
    candidateBackground = 'unknown';
  }

  // 背景分析
  const backgroundFit = generateBackgroundFit(candidateBackground, resumeText);

  // 0-1 建设能力评估
  const zerotoOneAbility = generateZeroToOneAbility(resumeText, candidateBackground);

  // 资源约束适应力评估
  const resourceConstraintAdaptation = generateResourceConstraintAdaptation(resumeText, candidateBackground);

  // Owner 心态评估（加强版）
  const enhancedOwnershipMindset = generateEnhancedOwnershipMindset(resumeText);

  // 大厂光环分析（如果有大厂背景）
  const bigTechGlowAnalysis = hasBigTech ? generateBigTechGlowAnalysis(resumeText, candidateBackground) : undefined;

  // 计算综合评分
  const scores = [
    zerotoOneAbility.score,
    resourceConstraintAdaptation.score,
    enhancedOwnershipMindset.score,
  ];
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  // 确定风险等级
  let overallRisk: 'high' | 'medium' | 'low';
  if (overallScore >= 70) {
    overallRisk = 'low';
  } else if (overallScore >= 50) {
    overallRisk = 'medium';
  } else {
    overallRisk = 'high';
  }

  // 生成综合评价
  const summary = generateStartupFitSummary(candidateBackground, overallScore, hasBigTech);

  // 关键建议
  const keyRecommendation = generateKeyRecommendation(candidateBackground, overallScore, overallRisk);

  return {
    backgroundFit,
    zerotoOneAbility,
    resourceConstraintAdaptation,
    enhancedOwnershipMindset,
    bigTechGlowAnalysis,
    overallScore,
    overallRisk,
    summary,
    keyRecommendation,
  };
}

/**
 * 生成背景适配分析
 */
function generateBackgroundFit(
  background: 'big-tech' | 'startup' | 'mixed' | 'unknown',
  resumeText: string
): any {
  const backgroundDescriptions = {
    'big-tech': '候选人主要在大厂工作，习惯成熟的流程和充足的资源',
    'startup': '候选人有创业公司经验，熟悉小团队快速迭代',
    'mixed': '候选人同时具备大厂和创业经验，理解不同环境',
    'unknown': '候选人背景不明确，需要深度面试验证',
  };

  const riskLevels = {
    'big-tech': 'medium' as const,
    'startup': 'low' as const,
    'mixed': 'low' as const,
    'unknown': 'medium' as const,
  };

  const concerns = {
    'big-tech': [
      '习惯大厂的资源支持，可能不适应创业公司的资源约束',
      '期望清晰的职责边界和成熟流程',
      '可能追求技术完美，忽视业务优先级',
    ],
    'startup': [
      '创业经验可能不够系统化',
      '技术深度可能不如大厂候选人',
    ],
    'mixed': [
      '需要验证其在创业环境中的真实表现',
      '大厂经历可能占比过重',
    ],
    'unknown': [
      '背景不清晰，风险难以评估',
      '需要深度面试了解工作方式',
    ],
  };

  const strengths = {
    'big-tech': [
      '技术能力通常较强',
      '见识过大规模系统',
      '工作方法论成熟',
    ],
    'startup': [
      '适应创业节奏',
      '灵活性强',
      '全栈能力可能更好',
    ],
    'mixed': [
      '兼具大厂技术深度和创业灵活性',
      '理解不同环境的差异',
      '适应能力强',
    ],
    'unknown': [
      '可能带来新视角',
    ],
  };

  return {
    candidateBackground: background,
    backgroundDescription: backgroundDescriptions[background],
    riskLevel: riskLevels[background],
    concerns: concerns[background],
    strengths: strengths[background],
  };
}

/**
 * 生成 0-1 建设能力评估
 */
function generateZeroToOneAbility(
  resumeText: string,
  background: string
): any {
  const lowerResume = resumeText.toLowerCase();

  // 关键词检测
  const positiveKeywords = ['从0到1', '搭建', '建设', '创建', '设计并实现', 'build from scratch', 'founding'];
  const hasPositive = positiveKeywords.some(kw => lowerResume.includes(kw));

  const negativeKeywords = ['维护', '优化', '迭代', 'maintain', 'optimize', '接手'];
  const hasNegative = negativeKeywords.some(kw => lowerResume.includes(kw));

  // 基础分数
  let score = 50;

  // 根据背景调整
  if (background === 'startup' || background === 'mixed') {
    score += 20;
  } else if (background === 'big-tech') {
    score -= 10;
  }

  // 根据关键词调整
  if (hasPositive) score += 15;
  if (hasNegative) score -= 10;

  // 确保在 0-100 范围
  score = Math.max(0, Math.min(100, score));

  // 生成证据
  const evidence = [];
  if (hasPositive) {
    evidence.push('简历中提及从0到1构建系统的经验');
  }
  if (background === 'startup') {
    evidence.push('有创业公司工作经历，可能接触过早期项目');
  }
  if (background === 'big-tech' && !hasPositive) {
    evidence.push('⚠️ 大厂背景，但简历未明确提及0-1建设经验');
  }
  if (evidence.length === 0) {
    evidence.push('需要面试深入了解项目经历');
  }

  // 生成建议
  const recommendation = score >= 70
    ? '候选人具备较强的0-1建设能力，可以放心委以重任'
    : score >= 50
    ? '建议深度面试，重点询问从头构建系统的经历'
    : '⚠️ 高风险：0-1能力不足，可能更适合优化和维护类工作';

  return {
    score,
    evidence,
    recommendation,
  };
}

/**
 * 生成资源约束适应力评估
 */
function generateResourceConstraintAdaptation(
  resumeText: string,
  background: string
): any {
  let score = 50;

  // 根据背景调整
  if (background === 'startup') {
    score += 25;
  } else if (background === 'big-tech') {
    score -= 15;
  } else if (background === 'mixed') {
    score += 10;
  }

  // 确保在 0-100 范围
  score = Math.max(0, Math.min(100, score));

  const concerns = [];
  const evidence = [];

  if (background === 'big-tech') {
    concerns.push('习惯大厂的完善基础设施和工具链');
    concerns.push('可能期望专业的运维/SRE团队支持');
    evidence.push('⚠️ 大厂背景，需要验证在资源受限情况下的工作方式');
  } else if (background === 'startup') {
    evidence.push('有创业公司经历，理解资源约束');
  }

  if (concerns.length === 0) {
    concerns.push('需要验证在资源受限情况下的应对能力');
  }
  if (evidence.length === 0) {
    evidence.push('需要面试了解工作环境偏好');
  }

  return {
    score,
    concerns,
    evidence,
  };
}

/**
 * 生成 Owner 心态评估（加强版）
 */
function generateEnhancedOwnershipMindset(resumeText: string): any {
  const lowerResume = resumeText.toLowerCase();

  // 积极信号关键词
  const positiveKeywords = ['主导', '推动', '发起', '负责', 'lead', 'drive', 'initiative', 'owner'];
  const positiveCount = positiveKeywords.filter(kw => lowerResume.includes(kw)).length;

  // 消极信号关键词
  const negativeKeywords = ['参与', '协助', '配合', 'participate', 'assist', 'support'];
  const negativeCount = negativeKeywords.filter(kw => lowerResume.includes(kw)).length;

  // 计算分数
  let score = 50 + (positiveCount * 10) - (negativeCount * 5);
  score = Math.max(0, Math.min(100, score));

  // 关键指标
  const keyIndicators = [
    'Owner心态：能否主动推动工作',
    '责任感：能否对结果负责',
    '主动性：能否在模糊情况下做决策',
  ];

  // 积极信号
  const positiveSignals = [];
  if (positiveCount > 2) {
    positiveSignals.push('简历中多次提及主导、推动类项目');
  }
  if (lowerResume.includes('独立')) {
    positiveSignals.push('有独立负责项目的描述');
  }
  if (positiveSignals.length === 0) {
    positiveSignals.push('待验证');
  }

  // 消极信号
  const negativeSignals = [];
  if (negativeCount > positiveCount) {
    negativeSignals.push('⚠️ 简历中多为"参与"、"协助"类描述，主导项目较少');
  }
  if (score < 50) {
    negativeSignals.push('⚠️ Owner心态不明确，可能更习惯执行角色');
  }
  if (negativeSignals.length === 0) {
    negativeSignals.push('无明显消极信号');
  }

  // 面试问题
  const interviewQuestions = [
    '请分享一个您主动发起并推动落地的项目，遇到了哪些困难？',
    '描述一次您在没有明确指示的情况下，自己做出重要决策的经历',
    '如果项目遇到阻碍，您通常如何解决？等待指示还是主动推进？',
    '您如何定义"Owner心态"？能举个自己的例子吗？',
  ];

  return {
    score,
    keyIndicators,
    positiveSignals,
    negativeSignals,
    interviewQuestions,
  };
}

/**
 * 生成大厂光环分析
 */
function generateBigTechGlowAnalysis(
  resumeText: string,
  background: string
): any {
  const lowerResume = resumeText.toLowerCase();

  // 识别大厂
  const bigTechMap: Record<string, string> = {
    'google': 'Google',
    'facebook': 'Facebook',
    'meta': 'Meta',
    'amazon': 'Amazon',
    'microsoft': 'Microsoft',
    'alibaba': 'Alibaba',
    '阿里巴巴': 'Alibaba',
    'tencent': 'Tencent',
    '腾讯': 'Tencent',
    'bytedance': 'ByteDance',
    '字节': 'ByteDance',
    'baidu': 'Baidu',
    '百度': 'Baidu',
  };

  const companies: string[] = [];
  for (const [keyword, company] of Object.entries(bigTechMap)) {
    if (lowerResume.includes(keyword)) {
      companies.push(company);
    }
  }

  // 判断真实能力
  const hasLeadership = /主导|负责|lead|owner/.test(lowerResume);
  const hasScale = /千卡|百万|million|large-scale/.test(lowerResume);
  const hasParticipate = /参与|协助|assist|participate/.test(lowerResume);

  let realCapability: 'strong' | 'medium' | '螺丝钉';
  if (hasLeadership && hasScale) {
    realCapability = 'strong';
  } else if (hasLeadership || hasScale) {
    realCapability = 'medium';
  } else {
    realCapability = '螺丝钉';
  }

  // 红旗警示
  const redFlags = [];
  if (realCapability === '螺丝钉') {
    redFlags.push('⚠️ 简历中多为"参与"描述，可能是大厂螺丝钉');
  }
  if (!hasScale) {
    redFlags.push('⚠️ 未提及大规模项目经验');
  }
  if (companies.length > 3) {
    redFlags.push('⚠️ 跳槽频繁，稳定性存疑');
  }

  // 绿旗信号
  const greenFlags = [];
  if (hasLeadership) {
    greenFlags.push('✓ 有主导项目的经历');
  }
  if (hasScale) {
    greenFlags.push('✓ 参与过大规模系统');
  }
  if (background === 'mixed') {
    greenFlags.push('✓ 同时有大厂和创业经验，理解不同环境');
  }

  if (redFlags.length === 0) {
    redFlags.push('无明显红旗');
  }
  if (greenFlags.length === 0) {
    greenFlags.push('待验证');
  }

  return {
    isBigTech: true,
    companies: Array.from(new Set(companies)),
    realCapability,
    redFlags,
    greenFlags,
  };
}

/**
 * 生成创业适配度综合评价
 */
function generateStartupFitSummary(
  background: string,
  overallScore: number,
  hasBigTech: boolean
): string {
  if (background === 'startup' && overallScore >= 70) {
    return '候选人有创业公司经验，适应创业节奏，Owner心态和0-1能力较强，整体风险较低。';
  }

  if (background === 'mixed' && overallScore >= 65) {
    return '候选人兼具大厂技术深度和创业灵活性，理解不同环境差异，创业适配度较好。';
  }

  if (background === 'big-tech' && overallScore >= 60) {
    return '候选人有大厂背景，技术能力强，但需要重点验证其在资源受限和模糊环境下的适应能力。';
  }

  if (background === 'big-tech' && overallScore < 50) {
    return '⚠️ 高风险：候选人习惯大厂环境，可能难以适应创业公司的快节奏和资源约束，建议谨慎考虑。';
  }

  return '候选人创业适配度一般，建议深度面试重点验证Owner心态、0-1能力和资源约束适应力。';
}

/**
 * 生成关键建议
 */
function generateKeyRecommendation(
  background: string,
  overallScore: number,
  overallRisk: string
): string {
  if (overallRisk === 'low') {
    return '建议进入终面，重点讨论具体项目和期望，确认双方匹配度';
  }

  if (overallRisk === 'medium' && background === 'big-tech') {
    return '建议深度面试，重点询问：1) 如何应对资源受限情况 2) 在模糊环境下的决策案例 3) 为什么选择创业公司';
  }

  if (overallRisk === 'high') {
    return '⚠️ 创业适配度较低，建议谨慎推进。如果继续，务必设置试用期考核关键指标。';
  }

  return '建议深度面试验证创业适配度，重点关注Owner心态和灵活性';
}
