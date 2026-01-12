/**
 * Demo 数据初始化
 *
 * 为 Judger V1.0 创建示例岗位、候选人和报告
 * 方便用户快速体验完整流程
 */

import type { PositionInput, CandidateInput } from '@/types/judger';
import { savePosition, saveFailureProfile, saveCandidate, saveFailureReport } from './storage';
import { mockGenerateFailureProfile, mockGenerateFailureReport } from './llm/mock';

/**
 * 检查是否已初始化 Demo 数据
 */
export function isDemoDataInitialized(): boolean {
  return localStorage.getItem('judger_demo_initialized') === 'true';
}

/**
 * 标记 Demo 数据已初始化
 */
function markDemoDataInitialized() {
  localStorage.setItem('judger_demo_initialized', 'true');
}

/**
 * 初始化 Demo 数据
 */
export function initializeDemoData() {
  if (isDemoDataInitialized()) {
    console.log('Demo 数据已存在，跳过初始化');
    return;
  }

  console.log('开始初始化 Demo 数据...');

  // 1. 创建示例岗位
  const demoPosition: PositionInput = {
    id: 'demo-position-1',
    name: '首席科学家 / Chief Scientist',
    department: '技术团队',
    responsibilities: `1. 确定公司 AI 技术路线和架构
2. 带领团队攻克核心技术难题（LLM 训练、推理优化等）
3. 将研究成果工程化落地，确保产品可用
4. 招聘和培养 AI 团队
5. 与 CEO 共同制定技术战略`,
    keyObjectives: `1. 3 个月内：搭建起可用的 LLM 训练/推理 pipeline
2. 6 个月内：完成核心模型训练，达到产品级性能指标
3. 持续优化：模型效果、推理速度、成本控制`,
    successCriteria: `1. 技术方案落地：不是纸上谈兵，实际可运行的系统
2. 性能达标：模型效果满足业务需求，推理延迟 <500ms
3. 成本可控：单次推理成本降至可商业化水平
4. 团队产出：团队成员能独立负责模块，有持续产出
5. 技术债务可控：代码质量高，架构清晰，可维护`,
    requiredSkills: 'Python, PyTorch, LLM训练, 分布式训练, 模型优化, GPU编程, 云平台, Linux, Git',
    bonusSkills: 'Rust, C++, 编译器优化, 自研训练框架, Kubernetes',
    experienceRequired: `1. 5年以上 AI/ML 工作经验，3年以上 LLM 相关经验
2. 参与过千卡以上规模的训练项目
3. 有从 0 到 1 构建 AI 系统的经验
4. 有工程落地能力（不只会写论文）`,
    businessContext: `我们是一家 AI 应用创业公司，正在开发基于 LLM 的智能招聘决策工具。
团队目前 20 人，完成 A 轮融资，需要快速构建技术壁垒。
资源有限，需要在 6 个月内出可用产品，时间紧迫。`,
    companyStage: 'startup',
    createdAt: new Date('2024-01-15').toISOString(),
  };

  // 2. 保存岗位
  savePosition(demoPosition);

  // 3. 生成失败画像
  const failureProfile = mockGenerateFailureProfile(demoPosition);
  saveFailureProfile(failureProfile);

  // 4. 创建示例候选人 1 - 大厂背景，风险较低
  const demoCandidate1: CandidateInput = {
    id: 'demo-candidate-1',
    name: '张伟',
    positionId: demoPosition.id,
    resumeText: `张伟 - 资深 AI 研究员

个人信息：
- 工作年限：8年
- 学历：清华大学计算机博士
- 当前公司：ByteDance
- 当前职位：AI Lab 技术专家

工作经历：

ByteDance AI Lab (2019-至今)
技术专家 / Tech Lead
- 主导 LLM 预训练和微调平台建设，支持千卡规模训练
- 负责推理优化，将延迟从 800ms 降至 200ms，成本降低 60%
- 带领 5 人团队，完成多个核心模型的训练和部署
- 主动推动多个技术决策，包括训练框架选型和架构设计

Microsoft Research Asia (2017-2019)
研究员
- 发表 NeurIPS、ICML 等顶会论文 3 篇
- 参与大规模 Transformer 模型训练项目
- 与工程团队合作，将研究成果产品化

技术能力：
- 编程语言：Python (精通), C++ (熟练), Rust (了解)
- 深度学习：PyTorch (精通), TensorFlow (熟练)
- 分布式训练：Megatron-LM, DeepSpeed, 自研训练框架
- GPU 编程：CUDA, Triton
- 云平台：AWS, 阿里云
- 大规模系统：参与过 2000 卡训练项目

项目经历：
1. LLM 预训练平台 (主导)
   - 从 0 到 1 搭建分布式训练平台
   - 支持千卡级别训练，训练效率业界领先
   - 自研通信优化，提升 30% 吞吐量

2. 推理加速引擎 (主导)
   - 设计并实现高性能推理引擎
   - 支持多种量化策略 (INT8, FP16)
   - 线上服务支持日均千万级请求`,
    notes: 'Demo 候选人 - 大厂背景，技术能力强',
    createdAt: new Date('2024-01-20').toISOString(),
  };

  saveCandidate(demoCandidate1);

  const report1 = mockGenerateFailureReport(demoCandidate1, failureProfile);
  saveFailureReport(report1);

  // 5. 创建示例候选人 2 - 创业背景，适配度高
  const demoCandidate2: CandidateInput = {
    id: 'demo-candidate-2',
    name: '李娜',
    positionId: demoPosition.id,
    resumeText: `李娜 - AI 创业者 / 技术合伙人

个人信息：
- 工作年限：6年
- 学历：北京大学计算机硕士
- 当前公司：AI Startup XYZ（联合创始人）
- 当前职位：CTO

工作经历：

AI Startup XYZ (2021-至今)
联合创始人 / CTO
- 从 0 到 1 搭建整个技术团队（现 15 人）
- 负责 AI 算法和工程全栈开发
- 在资源受限情况下，3 个月完成 MVP，6 个月获得首批付费客户
- 主动推动产品迭代和技术架构演进
- 与 CEO 配合，完成 Pre-A 轮融资

Alibaba DAMO Academy (2018-2021)
算法工程师
- 参与 NLP 模型训练和部署
- 负责模型优化，提升推理速度
- 跨团队协作，推动算法落地

技术能力：
- 全栈开发：前端 (React), 后端 (Python, Node.js), 数据库 (PostgreSQL, MongoDB)
- AI/ML：PyTorch, Transformer, BERT, GPT
- 分布式：小规模分布式系统（4-8卡）
- DevOps：Docker, Kubernetes, CI/CD
- 云平台：阿里云, AWS

项目经历：
1. AI 应用平台 (主导, 创业项目)
   - 从 0 到 1 构建完整产品
   - 在资源约束下快速迭代，验证商业模式
   - 技术栈选型、架构设计、团队招聘全程参与
   - 现已服务 200+ 企业客户

2. NLP 模型服务化 (主导, 阿里)
   - 将研究模型工程化，支持线上服务
   - 优化推理性能，满足 SLA 要求`,
    notes: 'Demo 候选人 - 创业背景，Owner 心态强',
    createdAt: new Date('2024-01-21').toISOString(),
  };

  saveCandidate(demoCandidate2);

  const report2 = mockGenerateFailureReport(demoCandidate2, failureProfile);
  saveFailureReport(report2);

  // 6. 创建示例候选人 3 - 学术背景，风险较高
  const demoCandidate3: CandidateInput = {
    id: 'demo-candidate-3',
    name: '王晓明',
    positionId: demoPosition.id,
    resumeText: `王晓明 - 博士研究生

个人信息：
- 工作年限：4年（博士期间）
- 学历：清华大学计算机在读博士（预计 2024 年毕业）
- 当前单位：清华大学
- 导师：某知名教授

学术成果：
- 发表 NeurIPS、ICML、ACL 顶会论文 5 篇（2 篇一作）
- 研究方向：大规模语言模型、高效训练
- 参与国家自然科学基金项目 2 项

研究经历：

清华大学 NLP Lab (2020-至今)
博士研究生
- 研究大规模语言模型的高效训练方法
- 提出新的训练算法，发表多篇论文
- 参与实验室集群（32 卡）上的模型训练
- 与导师和师兄协作，完成多个研究项目

Google Research 实习 (2023.6-2023.9)
研究实习生
- 参与 LLM 预训练项目
- 协助进行实验和论文撰写
- 学习大规模训练的工程实践

技术能力：
- 编程语言：Python (精通), C++ (了解)
- 深度学习：PyTorch (精通), JAX (了解)
- 分布式训练：DDP, FSDP（小规模）
- 理论基础：扎实的数学和算法功底
- 论文阅读：广泛阅读最新研究进展

项目经历：
1. 高效训练算法研究
   - 提出新的训练策略，提升训练效率
   - 在学术集群上验证效果
   - 发表顶会论文

2. LLM 预训练实验
   - 参与导师的预训练项目
   - 负责实验设计和结果分析
   - 协助论文撰写`,
    notes: 'Demo 候选人 - 学术背景，工程能力待验证',
    createdAt: new Date('2024-01-22').toISOString(),
  };

  saveCandidate(demoCandidate3);

  const report3 = mockGenerateFailureReport(demoCandidate3, failureProfile);
  saveFailureReport(report3);

  // 标记已初始化
  markDemoDataInitialized();

  console.log('✅ Demo 数据初始化完成！');
  console.log('- 1 个示例岗位');
  console.log('- 3 个示例候选人');
  console.log('- 3 份失败预判报告');
}

/**
 * 重置 Demo 数据（清除并重新初始化）
 */
export function resetDemoData() {
  localStorage.removeItem('judger_demo_initialized');
  localStorage.removeItem('judger_positions');
  localStorage.removeItem('judger_failure_profiles');
  localStorage.removeItem('judger_candidates');
  localStorage.removeItem('judger_failure_reports');

  console.log('Demo 数据已清除');
  initializeDemoData();
}
