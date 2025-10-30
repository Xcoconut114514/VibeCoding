# 前端项目故障排查指南

## 常见问题和解决方案

### ❌ 问题 1: 'next' 不是内部或外部命令

**原因**: Next.js 依赖未正确安装

**解决方案**:

```bash
# 方案 1: 重新安装依赖
cd front
npm install

# 方案 2: 清理并重新安装
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# 方案 3: 使用 yarn (如果 npm 有问题)
yarn install
```

### ❌ 问题 2: 找不到模块 "react" 或其相应的类型声明

**原因**: React 依赖未安装或 TypeScript 配置问题

**解决方案**:

```bash
# 安装 React 类型定义
npm install --save-dev @types/react @types/react-dom

# 或重新安装所有依赖
npm install
```

### ❌ 问题 3: npm install 速度很慢或失败

**解决方案**:

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 或使用 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install

# 或使用 yarn
npm install -g yarn
yarn install
```

### ❌ 问题 4: MetaMask 连接失败

**原因**: window.ethereum 未定义

**解决方案**:
1. 确保已安装 MetaMask 浏览器扩展
2. 刷新页面
3. 检查 `types/ethereum.d.ts` 文件是否存在

### ❌ 问题 5: 合约交互失败

**原因**: 合约地址未配置或配置错误

**解决方案**:

1. 检查 `utils/contract.ts` 中的合约地址
2. 确保合约已部署到相应网络
3. 验证合约地址格式正确（0x开头，42字符）

```typescript
// utils/contract.ts
const addresses: { [key: number]: string } = {
  31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // 替换为实际地址
  11155111: "0x...", // 替换为实际地址
};
```

### ❌ 问题 6: 编译错误 - JSX 元素隐式具有类型 "any"

**原因**: TypeScript 配置或依赖问题

**解决方案**:

```bash
# 确保安装了所有类型定义
npm install --save-dev @types/react @types/react-dom @types/node

# 删除 .next 目录并重新构建
Remove-Item -Recurse -Force .next
npm run dev
```

## 完整的安装和运行流程

### Step 1: 确保环境正确

```bash
# 检查 Node.js 版本 (需要 18.17 或更高)
node --version

# 检查 npm 版本
npm --version
```

### Step 2: 清理并安装

```powershell
# 进入前端目录
cd e:\web3projects\VibeCoding\students\0xBrick-Li\front

# 清理旧的安装
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 重新安装
npm install
```

### Step 3: 配置合约地址

编辑 `utils/contract.ts`:

```typescript
export function getContractAddress(chainId: number): string | null {
  const addresses: { [key: number]: string } = {
    31337: "YOUR_LOCAL_ADDRESS",  // 替换为实际地址
    11155111: "YOUR_SEPOLIA_ADDRESS",  // 替换为实际地址
  };
  return addresses[chainId] || null;
}
```

### Step 4: 启动开发服务器

```bash
npm run dev
```

应该看到:

```
> erc721-nft-frontend@0.1.0 dev
> next dev

   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.3s
```

### Step 5: 访问应用

打开浏览器访问: http://localhost:3000

## 验证清单

- [ ] Node.js 版本 >= 18.17
- [ ] npm 已安装
- [ ] node_modules 目录存在
- [ ] package-lock.json 文件存在
- [ ] 合约已部署
- [ ] 合约地址已配置在 `utils/contract.ts`
- [ ] MetaMask 已安装
- [ ] 开发服务器成功启动

## 如果以上都不行

### 使用备用方案 - 手动安装

```bash
# 1. 安装核心依赖
npm install next@14.2.0 react@18.3.0 react-dom@18.3.0

# 2. 安装 Web3 依赖
npm install ethers@6.13.0

# 3. 安装开发依赖
npm install --save-dev typescript @types/react @types/react-dom @types/node

# 4. 安装 Tailwind CSS
npm install --save-dev tailwindcss postcss autoprefixer

# 5. 安装 ESLint
npm install --save-dev eslint eslint-config-next

# 6. 运行
npm run dev
```

### 使用 Yarn 代替 npm

```bash
# 安装 Yarn
npm install -g yarn

# 清理
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
Remove-Item yarn.lock -ErrorAction SilentlyContinue

# 使用 Yarn 安装
yarn install

# 运行
yarn dev
```

## 调试技巧

### 查看详细日志

```bash
# 查看详细的安装日志
npm install --verbose

# 查看 Next.js 详细日志
npm run dev -- --verbose
```

### 检查依赖树

```bash
# 查看已安装的包
npm list --depth=0

# 检查特定包
npm list next
npm list react
npm list ethers
```

### 清理 npm 缓存

```bash
# 清理 npm 缓存
npm cache clean --force

# 重新安装
npm install
```

## 获取帮助

如果问题仍然存在:

1. 检查 Node.js 和 npm 版本
2. 查看控制台的完整错误信息
3. 检查 `package.json` 中的依赖版本
4. 尝试在新的终端窗口中运行
5. 重启计算机后再试

## 成功标志

当一切正常时，你应该看到:

1. ✅ `npm install` 成功完成，无错误
2. ✅ `node_modules` 目录包含所有依赖
3. ✅ `npm run dev` 启动成功
4. ✅ 浏览器可以访问 http://localhost:3000
5. ✅ 页面正常显示，无控制台错误

---

**记住**: 大多数问题都可以通过清理并重新安装依赖来解决！
