# 李天宇 - 个人简历网站
部署后链接:https://vibe-coding-lovat.vercel.app/

一个现代化、响应式的个人简历网站，使用 Next.js 14 + TypeScript + Tailwind CSS 构建。


## ✨ 特性

- 🎨 **现代化设计** - 精美的渐变色和卡片式布局
- 📱 **完全响应式** - 完美适配移动端、平板和桌面
- 🌓 **深色模式支持** - 自动适应系统主题
- ⚡ **性能优化** - 使用 Next.js 14 的最新特性
- 🎭 **流畅动画** - 优雅的过渡和悬停效果
- 🎯 **SEO 优化** - 完整的元数据配置

## 📦 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **动画**: Framer Motion (可选)

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3001](http://localhost:3001) 查看网站。

注意：本项目使用端口 3001，避免与其他项目冲突。

### 构建生产版本

```bash
npm run build
npm start
```

## 📂 项目结构

```
introductionOfMe/
├── app/
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页面(简历内容)
├── public/              # 静态资源
├── package.json         # 依赖配置
├── tsconfig.json        # TypeScript 配置
├── tailwind.config.ts   # Tailwind 配置
├── postcss.config.js    # PostCSS 配置
└── next.config.js       # Next.js 配置
```

## 🎨 页面内容

### 包含的模块

1. **个人信息** - 头部卡片展示基本信息
2. **教育经历** - 学历、GPA、主修课程
3. **技能专长** - 分类展示技术技能
4. **项目经历** - 详细的项目经验
5. **实习经历** - 实习公司和工作内容
6. **自我评价** - 个人优势和特点

### 数据定制

所有简历数据都在 `app/page.tsx` 中定义，你可以轻松修改：

```typescript
const personalInfo = {
  name: "李天宇",
  title: "后端开发工程师 | 大数据方向",
  // ... 其他信息
};
```

## 🎯 功能特点

### 响应式设计

- **移动端**: 单列布局，优化触摸交互
- **平板**: 双列布局
- **桌面**: 完整布局，最佳视觉效果

### 动画效果

- 淡入动画 (`animate-fade-in`)
- 滑动动画 (`animate-slide-up`)
- 悬停效果 (`card-hover`)
- 浮动效果 (`animate-float`)

### 颜色方案

- **主色**: 蓝色 (`#3b82f6`)
- **辅色**: 紫色 (`#8b5cf6`)
- **渐变**: 多种渐变组合
- **深色模式**: 自动适配

## 🛠 自定义指南

### 修改个人信息

编辑 `app/page.tsx` 中的数据对象：

```typescript
const personalInfo = { ... }
const education = { ... }
const skills = [ ... ]
const projects = [ ... ]
const internship = { ... }
const strengths = [ ... ]
```

### 修改颜色主题

编辑 `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',  // 修改主色
      secondary: '#8b5cf6', // 修改辅色
    },
  },
}
```

### 添加新模块

在 `app/page.tsx` 中添加新的 section：

```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
  <h2 className="section-title">新模块标题</h2>
  {/* 你的内容 */}
</div>
```

## 📱 部署

### Vercel (推荐)

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com/) 导入项目
3. 自动部署完成

### 其他平台

- **Netlify**: 支持 Next.js
- **AWS Amplify**: 支持 SSR
- **自托管**: 使用 `npm run build && npm start`

## 🎨 设计灵感

本简历网站设计参考了：
- 现代 UI/UX 设计趋势
- Material Design 设计语言
- Glassmorphism 风格
- 卡片式布局

## 📝 待优化项

- [ ] 添加打印样式
- [ ] 添加 PDF 导出功能
- [ ] 添加多语言支持
- [ ] 添加更多动画效果
- [ ] 添加项目详情弹窗
- [ ] 添加联系表单

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 License

MIT License

## 📞 联系方式

- **邮箱**: ltianyu0310@hotmail.com
- **手机**: 18871566566

---

**Made with ❤️ by 李天宇**
