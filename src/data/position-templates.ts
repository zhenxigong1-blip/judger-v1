/**
 * AI 创业公司岗位模板
 *
 * 针对 AI 创业公司最常见的关键技术岗位
 * 预设常见的失败画像和技能要求
 */

import type { PositionInput } from '@/types/judger';

export interface PositionTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;  // emoji
  department: string;
  responsibilities: string;
  keyObjectives: string;
  successCriteria: string;
  requiredSkills: string;
  bonusSkills: string;
  experienceRequired: string;
  businessContext: string;
  companyStage: 'startup' | 'scaleup' | 'enterprise';

  // 常见失败原因（预警）
  commonFailures: {
    technical: string[];
    role: string[];
    stage: string[];
  };
}

export const AI_STARTUP_POSITION_TEMPLATES: PositionTemplate[] = [
  {
    id: 'chief-scientist',
    name: '首席科学家 / Chief Scientist',
    description: '负责 AI 技术方向和核心算法研发的技术领导者',
    icon: '🧠',
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

    requiredSkills: `Python, PyTorch/TensorFlow, LLM 训练（GPT/BERT 等）, 分布式训练（多卡/多机）, 模型优化（量化、剪枝、蒸馏）, GPU 编程（CUDA），云平台（AWS/阿里云/腾讯云）, Linux 系统, Git`,

    bonusSkills: `Rust/C++, 编译器优化, 自研训练框架, 大规模系统架构, Kubernetes, 论文发表经历`,

    experienceRequired: `1. 5年以上 AI/ML 工作经验，3年以上 LLM 相关经验
2. 参与过千卡以上规模的训练项目
3. 有从 0 到 1 构建 AI 系统的经验（不只是调参）
4. 有工程落地能力（不只会写论文）`,

    businessContext: `我们是一家 AI 应用创业公司，正在开发基于 LLM 的 [具体产品方向]。
团队目前 20 人，完成 A 轮融资，需要快速构建技术壁垒。
资源有限，需要在 6 个月内出可用产品，时间紧迫。`,

    companyStage: 'startup',

    commonFailures: {
      technical: [
        '只有理论知识，缺少大规模工程实践（"纸上谈兵"）',
        '习惯用开源工具，遇到深水区（性能优化、分布式）不会解决',
        '追求完美架构，不关注业务 deadline（"工程师洁癖"）',
        '只会单机训练，没有多卡/多机经验',
        '不关注成本，烧钱无度',
      ],
      role: [
        '习惯做纯研究，不愿意"弄脏手"做工程',
        '等别人安排任务，缺少主动推动能力（"大厂螺丝钉"）',
        '沟通能力差，无法跨部门协作',
        '不理解业务，闭门造车',
        '管理能力不足，无法带团队',
      ],
      stage: [
        '习惯大厂的资源支持（算力、数据、工具链），不适应创业公司的资源约束',
        '期望清晰的职责边界，但创业公司需要"全栈"能力',
        '追求技术极致，忽视商业价值和时间窗口',
        '不适应快速变化，期望稳定的技术路线',
        '习惯成熟的流程和制度，不适应创业的"混乱"',
      ],
    },
  },

  {
    id: 'tech-cofounder-cto',
    name: '技术合伙人 / CTO',
    description: 'CEO 的技术搭档，负责技术团队和产品技术实现',
    icon: '⚙️',
    department: '技术团队',

    responsibilities: `1. 搭建技术团队（招聘、培养、管理）
2. 制定技术架构和技术栈选型
3. 推动产品研发，确保按时交付
4. 与 CEO 共同决策，平衡技术和业务
5. 对外技术品牌建设（技术文章、开源、招聘）`,

    keyObjectives: `1. 3 个月内：搭建起 5-10 人的初始技术团队
2. 6 个月内：完成 MVP 产品，获得第一批付费客户
3. 持续优化：产品迭代速度、系统稳定性、团队效率`,

    successCriteria: `1. 产品上线：能跑的系统，不是 Demo
2. 用户增长：有真实用户在用，有正向反馈
3. 团队稳定：核心成员不流失，士气高涨
4. 技术债务可控：不因为"快"导致系统崩溃
5. CEO 满意度：与 CEO 配合默契，没有重大分歧`,

    requiredSkills: `全栈开发能力（前后端都能上手）, Python/Node.js/Go（至少精通一门）, 数据库（SQL + NoSQL）, 云服务（AWS/阿里云），Docker/Kubernetes, CI/CD, 项目管理, 团队管理`,

    bonusSkills: `AI/ML 背景, 大厂架构经验, 开源项目经验, 技术社区影响力, 融资 PPT 制作`,

    experienceRequired: `1. 8年以上技术工作经验，3年以上团队管理经验
2. 有从 0 到 1 构建产品的经验
3. 有创业公司或小团队作战经验（最重要）
4. 技术广度够宽（不能只会一个方向）`,

    businessContext: `我们是一家 [行业方向] 的创业公司，产品是 [具体产品]。
完成 Pre-A 轮融资，需要在 1 年内验证商业模式。
CEO 懂业务，但不懂技术，需要 CTO 独立负责整个技术团队。`,

    companyStage: 'startup',

    commonFailures: {
      technical: [
        '只会某一个技术栈（如只会后端），缺少全栈能力',
        '大厂螺丝钉，没有从 0 到 1 建设经验',
        '过度追求技术先进性，忽视业务价值',
        '不会做技术决策，总是纠结选哪个方案',
      ],
      role: [
        '只想写代码，不愿意做管理和招聘',
        '与 CEO 沟通不畅，技术和业务脱节',
        '缺少 Owner 心态，等 CEO 推动',
        '习惯被动执行，不会主动规划',
        '控制欲过强或过弱，团队管理失衡',
      ],
      stage: [
        '习惯大公司的成熟流程，不适应创业的"一人多角色"',
        '期望清晰的 KPI 和晋升路径，但创业公司没有',
        '不愿意做"脏活累活"（如修 bug、写文档）',
        '风险承受能力差，容易焦虑',
        '期望高薪 + 少量期权，不愿意 all in',
      ],
    },
  },

  {
    id: 'ai-engineering-lead',
    name: 'AI 工程负责人',
    description: '负责 AI 模型训练、部署、优化的工程技术专家',
    icon: '🤖',
    department: '技术团队',

    responsibilities: `1. 搭建和优化 LLM 训练 pipeline
2. 模型推理服务化（API、微服务）
3. 性能优化（推理速度、吞吐量、成本）
4. 监控和调优（日志、指标、告警）
5. 与算法团队配合，快速迭代模型`,

    keyObjectives: `1. 3 个月内：搭建起稳定的训练和推理系统
2. 6 个月内：推理延迟降至 <200ms，成本降至可接受范围
3. 持续优化：系统可用性 >99.9%，支持日均百万级请求`,

    successCriteria: `1. 系统稳定性：无重大故障，可用性高
2. 性能达标：延迟、吞吐量满足业务需求
3. 成本可控：单次推理成本在预算内
4. 可扩展：能快速支持新模型、新功能
5. 文档完善：新人能快速上手`,

    requiredSkills: `Python, PyTorch/TensorFlow, LLM 推理优化（vLLM/TensorRT）, Docker/Kubernetes, 云服务（GPU 实例管理）, 监控系统（Prometheus/Grafana）, 数据库, API 设计`,

    bonusSkills: `Rust/C++, CUDA 编程, 模型量化/剪枝, Triton Inference Server, Ray/Dask（分布式）, MLOps 经验`,

    experienceRequired: `1. 3-5年 AI/ML 工程经验
2. 有大规模模型部署经验（日均请求 >10万）
3. 有性能优化经验（推理加速、成本优化）
4. 熟悉云平台和 Kubernetes`,

    businessContext: `我们的产品需要实时 LLM 推理能力，用户量快速增长。
当前系统性能和成本都不理想，急需优化。
团队 15 人，A 轮后，有一定预算但不能随意烧钱。`,

    companyStage: 'startup',

    commonFailures: {
      technical: [
        '只会调用开源工具（如 vLLM），不会底层优化',
        '缺少大规模系统经验，不知道如何应对流量峰值',
        '不关注成本，只追求性能',
        '监控和日志做得差，出问题难以排查',
      ],
      role: [
        '只关注技术，不理解业务需求',
        '沟通能力差，与算法团队配合不顺',
        '缺少主动性，等别人提需求',
        '文档意识差，代码难以交接',
      ],
      stage: [
        '习惯大厂的完善工具链，不适应创业公司的"手工作坊"',
        '期望有专门的运维团队，但创业公司需要自己搞定',
        '不愿意做"脏活"（如半夜修故障）',
        '追求完美，不接受"够用就好"',
      ],
    },
  },
];

/**
 * 根据模板创建岗位输入对象
 */
export function createPositionFromTemplate(template: PositionTemplate): Omit<PositionInput, 'id' | 'createdAt'> {
  return {
    name: template.name,
    department: template.department,
    responsibilities: template.responsibilities,
    keyObjectives: template.keyObjectives,
    successCriteria: template.successCriteria,
    requiredSkills: template.requiredSkills,
    bonusSkills: template.bonusSkills,
    experienceRequired: template.experienceRequired,
    businessContext: template.businessContext,
    companyStage: template.companyStage,
  };
}

/**
 * 获取所有模板
 */
export function getAllPositionTemplates(): PositionTemplate[] {
  return AI_STARTUP_POSITION_TEMPLATES;
}

/**
 * 根据 ID 获取模板
 */
export function getPositionTemplateById(id: string): PositionTemplate | null {
  return AI_STARTUP_POSITION_TEMPLATES.find((t) => t.id === id) || null;
}
