import { Job, Company, Application, Resume, CandidateRecord, AnalysisTask } from '@/types';

// Mock 公司数据
export const mockCompanies: Company[] = [
  {
    id: 'company_1',
    name: 'AI Lab',
    logo: 'https://via.placeholder.com/100',
    stage: 'Startup',
    description: '专注于人工智能研究的初创公司',
    website: 'https://ailab.com',
    industry: 'AI/ML',
  },
  {
    id: 'company_2',
    name: 'FinTech AI',
    logo: 'https://via.placeholder.com/100',
    stage: 'Scaleup',
    description: '金融科技领域的人工智能解决方案提供商',
    website: 'https://fintechai.com',
    industry: 'Fintech',
  },
  {
    id: 'company_3',
    name: 'Enterprise AI',
    logo: 'https://via.placeholder.com/100',
    stage: 'Enterprise',
    description: '为大型企业提供AI解决方案',
    website: 'https://enterpriseai.com',
    industry: 'Enterprise Software',
  },
];

// Mock 岗位数据
export const mockJobs: Job[] = [
  {
    id: 'job_1',
    title: 'Senior AI Engineer',
    company: mockCompanies[0],
    location: '北京',
    remote: false,
    salaryRange: { min: 30000, max: 50000 },
    tags: ['AI Infra', 'LLM', 'Python'],
    experience: '3-5年',
    createdAt: '2024-01-08T10:00:00Z',
    description: '负责公司核心AI模型的开发与优化',
    responsibilities: [
      '设计和实现大规模AI模型',
      '优化模型性能和部署',
      '与团队协作解决复杂AI问题',
    ],
    requirements: [
      '3年以上AI相关工作经验',
      '精通Python和机器学习框架',
      '有大规模模型训练经验',
    ],
    preferences: [
      '有LLM或Transformer模型经验',
      '有发表过AI相关论文',
    ],
    teamIntroduction: '我们是一个充满激情的AI团队，致力于推动AI技术的发展',
    interviewProcess: [
      '技术笔试',
      '技术面试（2轮）',
      'HR面试',
    ],
    benefits: [
      '极具竞争力的薪资',
      '灵活的工作时间',
      '股票期权',
      '完善的福利体系',
    ],
  },
  {
    id: 'job_2',
    title: 'Machine Learning Engineer',
    company: mockCompanies[1],
    location: '上海',
    remote: true,
    salaryRange: { min: 25000, max: 45000 },
    tags: ['ML', 'Fintech', 'Python'],
    experience: '2-4年',
    createdAt: '2024-01-07T14:30:00Z',
    description: '开发金融领域的机器学习模型',
    responsibilities: [
      '开发和维护金融风险模型',
      '分析金融数据并提取 insights',
      '与业务团队合作实现AI解决方案',
    ],
    requirements: [
      '2年以上机器学习工作经验',
      '精通Python和相关库',
      '有金融领域经验优先',
    ],
    preferences: [
      '有深度学习经验',
      '熟悉金融风险评估',
    ],
    teamIntroduction: '我们的团队由来自金融和AI领域的专家组成',
    interviewProcess: [
      '技术面试',
      '案例分析',
      'HR面试',
    ],
    benefits: [
      '远程工作',
      '年度体检',
      '带薪年假',
    ],
  },
  {
    id: 'job_3',
    title: 'AI Product Manager',
    company: mockCompanies[2],
    location: '深圳',
    remote: false,
    salaryRange: { min: 35000, max: 60000 },
    tags: ['AI', 'Product', 'Strategy'],
    experience: '5-8年',
    createdAt: '2024-01-06T09:15:00Z',
    description: '负责AI产品的规划和落地',
    responsibilities: [
      '定义AI产品的愿景和路线图',
      '协调研发、设计和市场团队',
      '与客户沟通了解需求',
    ],
    requirements: [
      '5年以上产品管理经验',
      '有AI产品经验优先',
      '良好的沟通和协调能力',
    ],
    preferences: [
      '有技术背景',
      '了解机器学习基本原理',
    ],
    teamIntroduction: '我们的产品团队专注于打造行业领先的AI产品',
    interviewProcess: [
      '产品面试',
      '案例分析',
      '高管面试',
    ],
    benefits: [
      '豪华办公环境',
      '定期团建',
      '职业发展机会',
    ],
  },
];

// Mock 简历数据
export const mockResumes: Resume[] = [
  {
    id: 'resume_1',
    fileName: '张三的简历.pdf',
    fileUrl: 'https://via.placeholder.com/150',
    parsedData: {
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
    },
    createdAt: '2024-01-05T16:45:00Z',
  },
];

// Mock 投递记录
export const mockApplications: Application[] = [
  {
    id: 'application_1',
    jobId: 'job_1',
    jobTitle: 'Senior AI Engineer',
    companyName: 'AI Lab',
    resumeId: 'resume_1',
    status: 'applied',
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
    matchSummary: {
      highlights: ['Python经验丰富', '有LLM经验', '硕士学历'],
      gaps: ['缺少大规模模型训练经验', '没有发表过论文'],
      suggestions: ['补充大规模模型项目经验', '考虑发表相关论文'],
    },
  },
  {
    id: 'application_2',
    jobId: 'job_2',
    jobTitle: 'Machine Learning Engineer',
    companyName: 'FinTech AI',
    resumeId: 'resume_1',
    status: 'viewed',
    createdAt: '2024-01-07T14:30:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    matchSummary: {
      highlights: ['Python经验丰富', '有机器学习模型开发经验'],
      gaps: ['缺少金融领域经验'],
      suggestions: ['补充金融相关项目经验'],
    },
  },
];

// Mock 候选人记录
export const mockCandidateRecords: CandidateRecord[] = [
  {
    id: 'candidate_record_1',
    name: '张三',
    email: 'zhangsan@example.com',
    resumeId: 'resume_1',
    jobId: 'job_1',
    matchScore: 85,
    matchHighlights: ['Python经验丰富', '有LLM经验', '硕士学历'],
    riskTags: ['经验不足', '缺少金融领域经验'],
    status: 'pending',
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
  },
  {
    id: 'candidate_record_2',
    name: '李四',
    email: 'lisi@example.com',
    resumeId: 'resume_2',
    jobId: 'job_1',
    matchScore: 92,
    matchHighlights: ['有5年AI经验', '主导过LLM项目', '发表过2篇论文'],
    riskTags: ['薪资要求较高'],
    status: 'interviewing',
    createdAt: '2024-01-07T14:30:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
  },
];

// Mock 风险分析任务
export const mockAnalysisTasks: AnalysisTask[] = [
  {
    id: 'analysis_1',
    candidateName: '张三',
    jobId: 'job_1',
    jobTitle: 'Senior AI Engineer',
    status: 'completed',
    createdAt: '2024-01-08T10:00:00Z',
    results: {
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
    },
  },
];

// 获取岗位列表
export const getJobs = (): Job[] => {
  return mockJobs;
};

// 根据ID获取岗位
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

// 获取投递记录
export const getApplications = (): Application[] => {
  return mockApplications;
};

// 获取简历
export const getResumes = (): Resume[] => {
  return mockResumes;
};

// 获取候选人记录
export const getCandidateRecords = (): CandidateRecord[] => {
  return mockCandidateRecords;
};

// 获取风险分析任务
export const getAnalysisTasks = (): AnalysisTask[] => {
  return mockAnalysisTasks;
};