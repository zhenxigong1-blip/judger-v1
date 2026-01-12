# Judger V1.0 部署指南

## 🚀 快速部署到 Vercel（推荐）

### 方法一：通过 Vercel CLI（最快）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
cd /Users/gary/Desktop/Project11/project11
vercel
```

4. **按提示操作**：
   - 第一次会问：Set up and deploy? → 选择 `Y`
   - Project name? → 回车使用默认名称或输入自定义名称
   - Which scope? → 选择你的账户
   - Link to existing project? → 选择 `N`
   - In which directory is your code located? → 回车（当前目录）
   - Want to override the settings? → 选择 `N`

5. **部署完成**：会显示类似这样的链接
```
✅ Production: https://judger-xxx.vercel.app
```

6. **后续更新**：只需运行
```bash
vercel --prod
```

---

### 方法二：通过 GitHub + Vercel（推荐用于持续部署）

#### 步骤 1：初始化 Git 仓库

**注意**：如果遇到 Xcode 许可问题，先运行：
```bash
sudo xcodebuild -license
```
按空格键查看许可，输入 `agree` 同意。

然后初始化 Git：
```bash
cd /Users/gary/Desktop/Project11/project11
git init
git add .
git commit -m "Initial commit: Judger V1.0"
```

#### 步骤 2：推送到 GitHub

1. 在 GitHub 创建新仓库：https://github.com/new
   - 仓库名：`judger-v1`
   - 选择 Public（公开）
   - 不要勾选任何初始化选项

2. 推送代码：
```bash
git remote add origin https://github.com/你的用户名/judger-v1.git
git branch -M main
git push -u origin main
```

#### 步骤 3：连接 Vercel

1. 访问：https://vercel.com/new
2. 选择 "Import Git Repository"
3. 选择你的 GitHub 仓库 `judger-v1`
4. 点击 "Deploy"

完成！每次推送到 GitHub，Vercel 会自动重新部署。

---

## 📝 部署后注意事项

### 1. 环境变量（如果集成了 LLM API）

如果你集成了通义千问 API，需要在 Vercel 设置环境变量：

1. 进入项目设置：https://vercel.com/你的用户名/judger-v1/settings/environment-variables
2. 添加：
   - Name: `NEXT_PUBLIC_TONGYI_API_KEY`
   - Value: `你的API密钥`
   - Environment: Production

### 2. 自定义域名（可选）

1. 进入项目设置：Domains
2. 添加你的域名
3. 按照提示配置 DNS

---

## 🔍 验证部署

部署成功后，访问你的 Vercel 链接，你应该能看到：
- ✅ 首页正常显示
- ✅ Demo 数据自动初始化
- ✅ 可以访问 `/demo` 查看产品演示
- ✅ 可以访问 `/judger/positions` 开始使用

---

## 🐛 常见问题

### Q: localStorage 在部署环境中工作吗？
A: 是的，localStorage 是浏览器端存储，不受部署环境影响。但每个用户的数据是独立的。

### Q: 部署后性能如何？
A: Vercel 提供全球 CDN，首次加载和后续导航都非常快。

### Q: 可以部署多个版本吗？
A: 可以！每次部署都会生成一个预览链接，生产环境需要手动升级或自动合并。

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台错误
3. 联系技术支持
