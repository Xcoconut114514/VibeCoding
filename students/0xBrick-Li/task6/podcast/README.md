# 思目咖啡厅 - 播客独立站

这是一个基于 Next.js 14 构建的现代化播客网站，采用 App Router 架构，支持音频播放、时间轴导航、搜索过滤等功能。

## ✨ 功能特性

### 📱 核心功能
- **播客列表页**: 展示所有节目，支持搜索和排序
- **节目详情页**: 完整的节目信息、时间轴和音频播放
- **音频播放器**: 功能完整的底部播放器，支持播放控制、速度调节、音量控制
- **时间轴导航**: 解析节目描述中的时间戳，快速跳转到指定位置
- **响应式设计**: 完美适配桌面端和移动端

### 🎨 设计特色
- **现代化 UI**: 采用卡片式设计，流畅的动画效果
- **温馨配色**: 使用 #FF9A62 橙色主题，营造咖啡厅氛围
- **优雅交互**: 悬浮效果、过渡动画、加载状态
- **细节打磨**: 渐变背景、毛玻璃效果、自定义滚动条

## 📁 项目结构

\`\`\`
podcast/
├── app/                      # Next.js App Router
│   ├── episode/
│   │   └── [eid]/
│   │       └── page.tsx     # 节目详情页
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 首页（列表页）
├── components/              # React 组件
│   ├── AudioPlayer.tsx      # 音频播放器
│   └── EpisodeCard.tsx      # 节目卡片
├── types/                   # TypeScript 类型定义
│   └── podcast.ts           # 播客数据类型
├── public/                  # 静态资源
├── podcast.json             # 播客数据源
├── package.json             # 项目配置
├── next.config.js           # Next.js 配置
├── tailwind.config.ts       # Tailwind CSS 配置
└── tsconfig.json            # TypeScript 配置
\`\`\`

## 🚀 快速开始

### 环境要求
- Node.js 18.x 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

\`\`\`bash
cd students/0xBrick-Li/task6/podcast
npm install
\`\`\`

### 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

打开浏览器访问 [http://localhost:3002](http://localhost:3002)

### 构建生产版本

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎯 技术栈

### 核心框架
- **Next.js 14**: React 框架，使用 App Router
- **React 18**: UI 库
- **TypeScript**: 类型安全

### 样式方案
- **Tailwind CSS 3**: 原子化 CSS 框架
- **自定义 CSS**: 特殊效果和动画

### UI 组件
- **Lucide React**: 图标库
- **Framer Motion**: 动画库（可选）

### 音频功能
- **HTML5 Audio API**: 原生音频播放
- **自定义播放器**: 完全控制的播放体验

## 📖 主要页面

### 1. 首页（列表页）
- **路由**: `/`
- **功能**:
  - 显示播客头部信息（封面、标题、描述、统计）
  - 搜索框：实时搜索节目标题和描述
  - 排序：按最新发布或最多播放排序
  - 节目卡片列表：显示所有节目
  - 响应式布局

### 2. 详情页
- **路由**: `/episode/[eid]`
- **功能**:
  - 节目完整信息
  - 时间轴：自动解析描述中的时间戳
  - 音频播放器
  - 相关推荐
  - 分享和互动按钮

### 3. 音频播放器
- **位置**: 全局底部固定
- **功能**:
  - 播放/暂停
  - 进度条拖动
  - 快进/快退（15秒/30秒）
  - 播放速度调节（0.5x - 2x）
  - 音量控制
  - 时间显示

## 🎨 设计系统

### 颜色主题
\`\`\`css
--primary: #FF9A62    /* 主色 - 橙色 */
--secondary: #FAF8F7  /* 背景色 - 米白色 */
--accent: #FFB88C     /* 强调色 - 浅橙 */
--dark: #2C2C2C       /* 深色文本 */
\`\`\`

### 组件样式
- **卡片**: `card`, `card-hover` - 带悬浮效果的卡片
- **按钮**: `btn-primary`, `btn-secondary` - 主要和次要按钮
- **标签**: `tag` - 圆角标签
- **输入框**: `input` - 统一样式的输入框

### 动画效果
- **淡入**: `animate-fade-in` - 页面元素渐显
- **上滑**: `animate-slide-up` - 从下方滑入
- **缩放**: `animate-scale-in` - 缩放进入
- **脉动**: `animate-pulse-slow` - 慢速脉动

## 📦 数据结构

播客数据来自 `podcast.json`，结构如下：

\`\`\`json
{
  "props": {
    "pageProps": {
      "podcast": {
        "pid": "播客ID",
        "title": "播客标题",
        "author": "主播名称",
        "description": "播客描述",
        "image": {
          "largePicUrl": "封面大图URL"
        },
        "episodeCount": 41,
        "subscriptionCount": 903,
        "episodes": [
          {
            "eid": "节目ID",
            "title": "节目标题",
            "description": "节目描述（含时间戳）",
            "enclosure": {
              "url": "音频URL",
              "duration": 3600
            },
            "pubDate": "2025-01-15",
            "playCount": 1234
          }
        ]
      }
    }
  }
}
\`\`\`

## 🔧 自定义配置

### 修改端口
在 `package.json` 中修改开发脚本：
\`\`\`json
"scripts": {
  "dev": "next dev -p 3002"
}
\`\`\`

### 添加环境变量
创建 `.env.local` 文件：
\`\`\`
NEXT_PUBLIC_API_URL=your_api_url
\`\`\`

### 修改主题色
编辑 `tailwind.config.ts` 中的颜色配置

## 🐛 已知问题

- TypeScript 错误是正常的，需要安装依赖后才会消失
- 图片需要配置 Next.js 远程图片域名
- 音频 URL 需要支持 CORS

## 📝 待办事项

- [ ] 添加播放进度本地存储
- [ ] 实现深色模式
- [ ] 添加评论功能
- [ ] 集成分享 API
- [ ] 性能优化（图片懒加载、虚拟滚动）
- [ ] PWA 支持
- [ ] SEO 优化

## 📄 许可证

MIT License

## 👤 作者

Connie康妮大哥 - 思目咖啡厅

---

**享受你的播客之旅！☕️🎙️**
