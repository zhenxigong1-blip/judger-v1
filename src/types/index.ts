// 用户角色
export enum Role {
  CANDIDATE = 'candidate',
  COMPANY_ADMIN = 'company_admin',
  HR = 'hr',
  CTO = 'cto',
  CEO = 'ceo',
}

// 用户信息
export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
  companyId?: string;
}

// 岗位信息
export interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    stage: 'Startup' | 'Scaleup' | 'Enterprise';
  };
  location: string;
  remote: boolean;
  salaryRange: {
    min: number;
    max: number;
  };
  tags: string[];
  experience: string;
  createdAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferences: string[];
  teamIntroduction: string;
  interviewProcess: string[];
  benefits: string[];
}

// 简历信息
export interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  parsedData: {
    name?: string;
    email?: string;
    phone?: string;
    education: Array<{
      school: string;
      degree: string;
      major: string;
      startDate: string;
      endDate: string;
    }>;
    experience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      responsibilities: string[];
      achievements: string[];
    }>;
    skills: string[];
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
      achievements: string[];
    }>;
  };
  createdAt: string;
}

// 投递记录
export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  resumeId: string;
  status: 'applied' | 'viewed' | 'interview' | 'rejected' | 'offered';
  createdAt: string;
  updatedAt: string;
  matchSummary?: {
    highlights: string[];
    gaps: string[];
    suggestions: string[];
  };
}

// 公司信息
export interface Company {
  id: string;
  name: string;
  logo?: string;
  stage: 'Startup' | 'Scaleup' | 'Enterprise';
  description: string;
  website?: string;
  industry: string;
}

// 岗位画像
export interface JobProfile {
  id: string;
  jobId: string;
  mustHave: string[];
  excludes: string[];
  successCriteria: string[];
  unacceptableFailures: string[];
  preferredSkills: string[];
  createdAt: string;
}

// 候选人记录（企业端）
export interface CandidateRecord {
  id: string;
  name: string;
  email: string;
  resumeId: string;
  jobId: string;
  matchScore: number;
  matchHighlights: string[];
  riskTags: string[];
  status: 'pending' | 'interviewing' | 'offered' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// 风险分析任务
export interface AnalysisTask {
  id: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  results?: {
    technicalRisk: {
      paths: string[];
      evidence: string[];
      severity: 'low' | 'medium' | 'high';
    };
    roleRisk: {
      ownerMindset: string;
      ambiguityHandling: string;
      collaboration: string;
    };
    stageMismatchRisk: {
      candidateStrength: string;
      companyStage: string;
      mismatch: string;
    };
    keyRisks: string[];
    recommendedQuestions: string[];
    recommendation: 'strongly_recommend' | 'recommend' | 'not_recommend';
    confidence: number;
  };
}

// LLM API 响应
export interface LLMResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// 匹配摘要
export interface MatchSummary {
  highlights: string[];
  gaps: string[];
  suggestions: string[];
}

// 风险分析结果
export interface RiskAnalysis {
  technicalRisk: {
    paths: string[];
    evidence: string[];
    severity: 'low' | 'medium' | 'high';
  };
  roleRisk: {
    ownerMindset: string;
    ambiguityHandling: string;
    collaboration: string;
  };
  stageMismatchRisk: {
    candidateStrength: string;
    companyStage: string;
    mismatch: string;
  };
  keyRisks: string[];
  recommendedQuestions: string[];
  recommendation: 'strongly_recommend' | 'recommend' | 'not_recommend';
  confidence: number;
}