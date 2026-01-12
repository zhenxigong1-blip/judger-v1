# Judger - 招聘与招聘判断平台

Judger 是一个专注于“招聘 + 判断”的网站，为求职者和企业用户提供高效的招聘解决方案。

## 产品定位

- **网站名称**：Judger
- **核心用户**：
  - 求职者（C 端）：浏览机会、上传简历、投递
  - 企业用户（B 端）：CEO / HR / CTO，使用速招和分析模块
- **重点**：招聘 + 判断，不做复杂社交，不做 C 端运营增长

## 技术栈

- **前端**：Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **后端**：Mock API（实际项目中可替换为真实 API）
- **状态管理**：React Context API
- **样式**：Tailwind CSS
- **构建工具**：Next.js 内置构建工具

## 功能模块

### 1. 内推模块（Referrals）

面向普通求职者，提供类似 BOSS 直聘的浏览体验 + 简历上传投递功能。

- **岗位广场**：
  - 列表卡片：职位名、公司、地点、薪资区间、标签、经验要求、发布时间
  - 搜索与筛选：关键词、城市/远程、经验、岗位类别、薪资范围、公司阶段
  - 排序：最新、匹配度、薪资最高

- **职位详情页**：
  - 展示：JD、岗位职责、要求、加分项、团队介绍、面试流程、福利
  - CTA：上传简历 / 一键投递
  - 显示“匹配摘要”（若已上传简历）

- **简历中心**：
  - 上传简历（PDF/DOCX）
  - 解析结果预览（教育/经历/技能）
  - 支持多份简历版本
  - 删除/替换简历

- **投递记录**：
  - 状态：已投递 / 已查看 / 邀约面试 / 拒绝 / 录用
  - 简单消息栏

### 2. 速招模块（Fast Hire）

面向创业公司 CEO/HR/CTO，让 B 端能快速写 JD、形成“岗位画像”、并对“已有简历库/市场人才”进行匹配推进。

- **企业工作台 Dashboard**：
  - 当前岗位数、候选池人数、进行中的流程、最近风险提醒

- **创建岗位（JD 撰写 + 岗位澄清）**：
  - 输入：岗位标题、地点、远程、预算薪资、岗位类型
  - AI 辅助写 JD
  - 岗位澄清问答（3–6 个月成功标准、不可接受失败点、必须能力/加分能力）
  - 输出：岗位“结构化画像”

- **候选池与匹配页**：
  - 候选来源：已有简历库、市场人才
  - 功能："匹配此岗位"按钮、候选卡片、下一步动作

- **候选人详情页（B 端）**：
  - 简历解析
  - 匹配分析（亮点/缺口）
  - 流程状态（面试轮次、评语、行动）
  - 备注与协同评论

### 3. 分析模块（Risk Analysis）

面向创业公司 CEO/HR/CTO，上传“计划发 offer 的候选人简历 + 对应 JD”，输出候选人风险分析。

- **新建分析任务**：
  - 上传：候选人简历（PDF/DOCX） + 选择对应岗位（或上传 JD 文本）
  - 可选：面试记录文本粘贴

- **风险分析结果页**：
  - 技术失败风险：可能失败路径、证据点、严重程度
  - 角色失败风险：Owner 心态、模糊推进能力、协作方式风险
  - 阶段错配风险：候选人最擅长阶段 vs 公司当前阶段
  - 最大未验证风险：建议面试追问问题
  - 推荐倾向：强烈推荐/谨慎推荐/不推荐
  - 信息充分度置信度

- **分析历史记录**：
  - 可按岗位/候选人搜索
  - 支持一键复制“风险摘要”给内部讨论

## 信息架构与路由

| 路径 | 页面描述 | 访问权限 |
|------|----------|----------|
| / | 首页（产品介绍 + 入口） | 公开 |
| /jobs | 内推岗位广场 | 公开 |
| /jobs/[id] | 职位详情 | 公开 |
| /candidate/resume | 简历中心 | 求职者 |
| /candidate/applications | 投递记录 | 求职者 |
| /company/dashboard | 企业工作台 | 企业用户 |
| /company/jobs | 岗位管理 | 企业用户 |
| /company/jobs/new | 创建岗位 | 企业用户 |
| /company/jobs/[id]/candidates | 候选池与匹配 | 企业用户 |
| /company/candidates/[id] | 候选人详情 | 企业用户 |
| /company/analysis | 分析历史记录 | 企业用户 |
| /company/analysis/new | 新建分析 | 企业用户 |
| /company/analysis/[id] | 风险报告 | 企业用户 |
| /auth/login | 登录 | 公开 |
| /auth/register | 注册 | 公开 |

## 权限与角色体系

### 角色

- **求职者（Candidate）**：
  - 权限：浏览岗位、上传简历、投递
  - 入口：内推模块

- **企业用户**：
  - 细分角色：CEO / HR / CTO
  - 权限：创建岗位、管理候选池、查看风险分析报告
  - 入口：速招和分析模块

### 登录方式

- 邮箱+密码（MVP 版本）
- 邮箱+验证码（可选）

## LLM 接入点

以下功能模块需要调用 LLM API（当前使用 Mock 数据）：

1. **JD 生成**（B 模块）：输入业务目标 → 自动生成 JD
2. **简历解析**（A/B/C 模块）：上传简历 → 解析结构化数据
3. **岗位画像结构化**（B 模块）：澄清结果 → JSON 结构化
4. **匹配摘要**（A/B 模块）：岗位画像 + 简历画像 → 匹配摘要
5. **风险分析**（C 模块）：岗位画像 + 候选简历 → 风险报告

### API 示例

#### 1. 生成 JD
```json
POST /api/llm/generate-jd
Input: {
  "prompt": "请生成一个 Senior AI Engineer 的 JD，要求 3-5 年经验，精通 Python 和机器学习框架"
}
Output: {
  "success": true,
  "data": {
    "jd": "我们正在寻找一位优秀的 Senior AI Engineer..."
  }
}
```

#### 2. 解析简历
```json
POST /api/llm/parse-resume
Input: {
  "file": "<file_data>"
}
Output: {
  "success": true,
  "data": {
    "parsedData": {
      "name": "张三",
      "email": "zhangsan@example.com",
      "education": [...],
      "experience": [...],
      "skills": [...]
    }
  }
}
```

#### 3. 生成风险分析
```json
POST /api/llm/generate-risk-analysis
Input: {
  "jobProfile": {...},
  "resumeData": {...}
}
Output: {
  "success": true,
  "data": {
    "technicalRisk": {...},
    "roleRisk": {...},
    "stageMismatchRisk": {...},
    "keyRisks": [...],
    "recommendedQuestions": [...],
    "recommendation": "recommend",
    "confidence": 85
  }
}
```

## 数据安全

- 上传简历为敏感信息，必须有隐私提示与删除入口
- 企业用户只能看到自己公司的岗位与候选数据
- 分析模块结果仅企业内部可见

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

然后访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 启动生产服务器

```bash
npm start
# 或
yarn start
# 或
pnpm start
```

## 项目结构

```
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/      # React 组件
│   ├── lib/            # 工具函数和 LLM 接入点
│   ├── mock/           # Mock 数据
│   ├── styles/         # 全局样式
│   └── types/          # TypeScript 类型定义
├── public/             # 静态资源
├── next.config.js      # Next.js 配置
├── tailwind.config.js  # Tailwind CSS 配置
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目依赖
```

## 技术亮点

1. **响应式设计**：适配桌面端和移动端
2. **模块化架构**：清晰的功能模块划分
3. **TypeScript 支持**：全项目类型安全
4. **Tailwind CSS**：快速、灵活的样式开发
5. **Next.js 14**：现代化的 React 框架
6. **Mock 数据**：方便开发和测试
7. **LLM 接入点预留**：便于后续接入真实 LLM API

## 未来规划

1. 接入真实 LLM API
2. 实现实时聊天功能
3. 增加更多筛选和排序选项
4. 优化移动端体验
5. 增加数据分析和可视化
6. 支持更多简历格式
7. 实现面试日程管理

## 许可证

MIT
