// LLM API 模拟服务
import { LLMResponse, MatchSummary, RiskAnalysis } from '@/types';

// 模拟 LLM API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 生成 JD
export const generateJD = async (prompt: string): Promise<LLMResponse> => {
  await delay(1000);
  
  // Mock 生成的 JD
  const mockJD = `
  我们正在寻找一位优秀的工程师加入我们的团队。
  
  岗位职责：
  1. 负责公司核心产品的开发和维护
  2. 与团队协作，设计和实现高质量的技术解决方案
  3. 参与技术架构设计和优化
  4. 指导和培养初级工程师
  
  任职要求：
  1. 3-5年相关工作经验
  2. 精通 Python 和机器学习框架
  3. 有良好的问题解决能力和团队合作精神
  4. 有 AI 领域经验优先
  
  加分项：
  - 有 LLM 或 Transformer 模型经验
  - 有发表过 AI 相关论文
  - 有开源项目经验
  `;
  
  return {
    success: true,
    data: {
      jd: mockJD.trim(),
    },
  };
};

// 解析简历
export const parseResume = async (file: File): Promise<LLMResponse> => {
  await delay(1500);
  
  // Mock 解析结果
  const mockParsedData = {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    education: [
      {
        school: '北京大学',
        degree: '硕士',
        major: '计算机科学',
        startDate: '2018-09',
        endDate: '2021-06',
      },
    ],
    experience: [
      {
        company: '科技公司A',
        position: 'AI工程师',
        startDate: '2021-07',
        endDate: '2023-12',
        responsibilities: [
          '开发和优化机器学习模型',
          '参与大规模AI项目',
          '与团队协作解决技术问题',
        ],
        achievements: [
          '提高了模型准确率15%',
          '主导了3个核心项目',
        ],
      },
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'LLM', 'NLP'],
    projects: [
      {
        name: '智能推荐系统',
        description: '基于用户行为的智能推荐系统',
        technologies: ['Python', 'TensorFlow', 'Redis'],
        achievements: ['推荐准确率提升20%'],
      },
    ],
  };
  
  return {
    success: true,
    data: {
      parsedData: mockParsedData,
    },
  };
};

// 结构化岗位画像
export const structureJobProfile = async (clarification: any): Promise<LLMResponse> => {
  await delay(800);
  
  // Mock 结构化结果
  const mockJobProfile = {
    mustHave: ['Python', '机器学习', '3年以上经验'],
    excludes: ['缺乏团队合作能力', '无法适应快速迭代'],
    successCriteria: [
      '3个月内完成核心模型开发',
      '提高模型准确率10%',
      '培养1-2名初级工程师',
    ],
    unacceptableFailures: [
      '核心模型上线后出现重大bug',
      '无法与团队协作',
      '技术选型出现严重错误',
    ],
    preferredSkills: ['LLM经验', '发表过论文', '开源项目经验'],
  };
  
  return {
    success: true,
    data: mockJobProfile,
  };
};

// 生成匹配摘要
export const generateMatchSummary = async (jobProfile: any, resumeData: any): Promise<LLMResponse<MatchSummary>> => {
  await delay(1000);
  
  // Mock 匹配摘要
  const mockMatchSummary: MatchSummary = {
    highlights: ['Python经验丰富', '有LLM经验', '硕士学历'],
    gaps: ['缺少大规模模型训练经验', '没有发表过论文'],
    suggestions: ['补充大规模模型项目经验', '考虑发表相关论文'],
  };
  
  return {
    success: true,
    data: mockMatchSummary,
  };
};

// 生成风险分析报告
export const generateRiskAnalysis = async (jobProfile: any, resumeData: any): Promise<LLMResponse<RiskAnalysis>> => {
  await delay(2000);
  
  // Mock 风险分析结果
  const mockRiskAnalysis: RiskAnalysis = {
    technicalRisk: {
      paths: ['缺少大规模模型训练经验', '对最新AI技术跟进不够'],
      evidence: ['简历中未提及大规模模型项目', '技能列表中缺少一些前沿技术'],
      severity: 'medium',
    },
    roleRisk: {
      ownerMindset: '中等',
      ambiguityHandling: '良好',
      collaboration: '良好',
    },
    stageMismatchRisk: {
      candidateStrength: '成熟的AI技术栈',
      companyStage: 'Startup',
      mismatch: '候选人更适合成熟公司',
    },
    keyRisks: ['技术经验与岗位要求有差距', '可能不适应创业公司节奏'],
    recommendedQuestions: [
      '请分享你在大规模模型训练方面的经验',
      '你如何跟进最新的AI技术？',
      '你为什么选择加入创业公司？',
    ],
    recommendation: 'recommend',
    confidence: 85,
  };
  
  return {
    success: true,
    data: mockRiskAnalysis,
  };
};