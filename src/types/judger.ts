/**
 * Judger V1.0 数据模型定义
 *
 * 包含三大模块的核心类型：
 * 1. 岗位失败画像系统
 * 2. 反向全网搜人
 * 3. 候选人失败预判报告
 */

// ==================== 通用类型 ====================

/**
 * 公司发展阶段
 */
export type CompanyStage = 'startup' | 'scaleup' | 'enterprise';

/**
 * 风险等级
 */
export type RiskLevel = 'high' | 'medium' | 'low';

/**
 * 推荐等级
 */
export type RecommendationLevel = 'A' | 'B' | 'C';

/**
 * 失败画像类型
 */
export type FailureProfileType = 'technical' | 'role' | 'stage';

/**
 * 技能项
 */
export interface SkillItem {
  name: string;
  category: string;
  importance: 'critical' | 'important' | 'nice-to-have';
}

// ==================== 模块1: 岗位失败画像 ====================

/**
 * 岗位基础信息（用户输入）
 */
export interface PositionInput {
  id: string;
  name: string; // 岗位名称 *
  department?: string; // 所属部门
  responsibilities: string; // 工作职责 *
  keyObjectives: string; // 关键目标 * (AI辅助)
  successCriteria: string; // 3-6个月成功标准 * (AI辅助)
  requiredSkills: string; // 必要技能 *
  bonusSkills?: string; // 加分技能
  experienceRequired?: string; // 经验要求
  businessContext?: string; // 业务场景
  companyStage: CompanyStage; // 公司阶段
  createdAt: string;
}

/**
 * 失败画像详情
 */
export interface FailureProfile {
  type: FailureProfileType;
  title: string;
  description: string;
  indicators: string[]; // 失败指标
  severity: RiskLevel;
}

/**
 * 岗位失败画像（AI生成，只读）
 */
export interface PositionFailureProfile {
  id: string;
  positionId: string;
  coreProblems: string[]; // 岗位核心问题
  successCriteria: string[]; // 成功标准（拆解）
  requiredSkills: SkillItem[]; // 必要技能列表
  bonusSkills: SkillItem[]; // 加分技能
  failureProfiles: {
    technical: FailureProfile; // 技术失败画像
    role: FailureProfile; // 角色失败画像
    stage: FailureProfile; // 阶段失败画像
  };
  generatedAt: string;
}

// ==================== 模块2: 反向全网搜人 ====================

/**
 * 候选人搜索条件
 */
export interface CandidateSearchQuery {
  keywords: string[]; // 搜索关键词
  experienceYears?: {
    min?: number;
    max?: number;
  };
  education?: 'phd' | 'master' | 'bachelor' | 'other';
  location?: string;
  excludeHighRisk?: boolean; // 排除高风险候选人
}

/**
 * 候选人搜索结果
 */
export interface CandidateSearchResult {
  id: string;
  name: string;
  experienceSummary: string;
  riskScore: RiskLevel;
  riskFactors: string[];
  recommendationLevel: RecommendationLevel;
  matchPercentage: number; // 0-100%
  avatarUrl?: string;
  currentCompany?: string;
  currentTitle?: string;
}

// ==================== 模块3: 候选人失败预判报告 ====================

/**
 * 候选人信息输入
 */
export interface CandidateInput {
  id: string;
  name: string; // 候选人姓名 *
  positionId: string; // 关联岗位 *
  resumeText?: string; // 简历文本 *
  resumeUrl?: string; // 简历链接
  skillList?: string[]; // 技能清单 (AI辅助)
  notes?: string;
  createdAt: string;
}

/**
 * 风险因素
 */
export interface RiskFactor {
  category: 'technical' | 'role' | 'stage';
  title: string;
  description: string;
  severity: RiskLevel;
  evidence: string[]; // 支持证据
}

/**
 * 技能差距分析
 */
export interface SkillGap {
  skillName: string;
  required: boolean; // 是否必要技能
  candidateLevel: 'expert' | 'advanced' | 'intermediate' | 'beginner' | 'none';
  requiredLevel: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  gap: string; // 差距描述
}

/**
 * 技术风险分析
 */
export interface TechnicalRiskAnalysis {
  skillGaps: SkillGap[];
  experienceGaps: string[];
  overallRisk: RiskLevel;
  summary: string;
}

/**
 * 角色风险分析
 */
export interface RoleRiskAnalysis {
  ownershipMindset: {
    score: number; // 0-100
    evidence: string[];
  };
  ambiguityHandling: {
    score: number; // 0-100
    evidence: string[];
  };
  collaboration: {
    score: number; // 0-100
    evidence: string[];
  };
  overallRisk: RiskLevel;
  summary: string;
}

/**
 * 阶段风险分析
 */
export interface StageRiskAnalysis {
  candidateOptimalStage: CompanyStage;
  currentCompanyStage: CompanyStage;
  matchScore: number; // 0-100
  adaptabilityScore: number; // 0-100
  concerns: string[];
  overallRisk: RiskLevel;
  summary: string;
}

/**
 * 创业适配度分析（针对 AI 创业公司）
 */
export interface StartupFitAnalysis {
  // 背景分析
  backgroundFit: {
    candidateBackground: 'big-tech' | 'startup' | 'mixed' | 'unknown';
    backgroundDescription: string; // 背景描述
    riskLevel: RiskLevel;
    concerns: string[]; // 主要顾虑
    strengths: string[]; // 优势
  };

  // 0-1 建设能力
  zerotoOneAbility: {
    score: number; // 0-100
    evidence: string[]; // 支持证据
    recommendation: string; // 建议
  };

  // 资源约束适应力
  resourceConstraintAdaptation: {
    score: number; // 0-100
    concerns: string[]; // 主要顾虑
    evidence: string[]; // 支持证据
  };

  // Owner 心态评估（加强版）
  enhancedOwnershipMindset: {
    score: number; // 0-100
    keyIndicators: string[]; // 关键指标
    positiveSignals: string[]; // 积极信号
    negativeSignals: string[]; // 消极信号
    interviewQuestions: string[]; // 针对性面试问题
  };

  // 大厂光环分析（如果有大厂背景）
  bigTechGlowAnalysis?: {
    isBigTech: boolean;
    companies: string[]; // 大厂列表
    realCapability: 'strong' | 'medium' | '螺丝钉'; // 真实能力判断
    redFlags: string[]; // 红旗警示
    greenFlags: string[]; // 绿旗信号
  };

  // 综合评估
  overallScore: number; // 0-100，创业适配度总分
  overallRisk: RiskLevel;
  summary: string; // 综合评价
  keyRecommendation: string; // 关键建议
}

/**
 * 下一步建议
 */
export interface NextStepSuggestion {
  type: 'interview' | 'training' | 'assessment' | 'reject';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  questions?: string[]; // 面试问题列表
  trainingTopics?: string[]; // 培训主题
}

/**
 * 失败预判报告（AI生成）
 */
export interface FailurePredictionReport {
  id: string;
  candidateId: string;
  positionId: string;

  // 核心结论
  failureProbability: number; // 失败概率 0-100%
  recommendationLevel: RecommendationLevel;
  summary: string; // 综合评价（1-2句话）

  // 风险分析
  mainRiskFactors: RiskFactor[];
  riskAnalysis: {
    technical: TechnicalRiskAnalysis;
    role: RoleRiskAnalysis;
    stage: StageRiskAnalysis;
  };

  // 创业适配度分析（针对 AI 创业公司）⭐️ 新增
  startupFit: StartupFitAnalysis;

  // 行动建议
  nextSteps: NextStepSuggestion[];

  generatedAt: string;
}

// ==================== 辅助类型 ====================

/**
 * API响应包装
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
