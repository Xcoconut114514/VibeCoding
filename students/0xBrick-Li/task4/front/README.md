# ERC721 NFT Frontend

这是一个用 Next.js 14 + TypeScript + Tailwind CSS 构建的 ERC721 NFT 铸造前端应用。

## 功能特性

- ✅ 连接 MetaMask 钱包
- ✅ 网络切换（本地网络 / Sepolia 测试网）
- ✅ 查看合约信息（总供应量、最大供应量、铸造价格）
- ✅ 铸造 NFT
- ✅ 查看用户拥有的 NFT 画廊
- ✅ 响应式设计，支持亮色/暗色主题
- ✅ 实时交易状态反馈

## 技术栈

- **Next.js 14** - React 框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **ethers.js v6** - 以太坊交互库

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置合约地址

在 `utils/contract.ts` 文件中更新合约地址：

```typescript
const addresses: { [key: number]: string } = {
  // 本地网络
  31337: "YOUR_LOCAL_CONTRACT_ADDRESS",
  // Sepolia 测试网
  11155111: "YOUR_SEPOLIA_CONTRACT_ADDRESS",
};
```

**如何获取合约地址：**

1. 部署合约后，查看 `ignition/deployments/chain-xxxxx/deployed_addresses.json`
2. 复制 `ERC721NFTModule#ERC721NFT` 对应的地址
3. 更新到 `utils/contract.ts` 中

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 4. 连接钱包

- 确保已安装 MetaMask 浏览器扩展
- 点击"连接钱包"按钮
- 在 MetaMask 中批准连接请求

### 5. 切换网络

根据您部署合约的网络，切换到相应的网络：

- **本地网络**: 需要先运行 `npx hardhat node`
- **Sepolia 测试网**: 需要在 MetaMask 中添加 Sepolia 网络

## 项目结构

```
front/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
├── components/
│   ├── NFTMinter.tsx       # NFT 铸造组件
│   ├── NFTGallery.tsx      # NFT 画廊组件
│   └── ContractInfo.tsx    # 合约信息组件
├── utils/
│   └── contract.ts         # 合约配置和 ABI
├── types/
│   └── ethereum.d.ts       # TypeScript 类型定义
├── public/                 # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 使用指南

### 铸造 NFT

1. 在"铸造 NFT"卡片中填写：
   - **接收地址**: NFT 将发送到的地址（默认为当前钱包地址）
   - **Token URI**: NFT 元数据的 URI（IPFS 或 HTTP URL）

2. 点击"铸造 NFT"按钮

3. 在 MetaMask 中确认交易（需要支付铸造费用 + Gas 费）

4. 等待交易确认

### 查看 NFT

在"我的 NFT 画廊"中可以看到：
- 您拥有的所有 NFT
- Token ID
- Token URI
- 点击"查看元数据"可以访问元数据链接

### Token URI 格式

Token URI 应该指向一个 JSON 文件，标准格式：

```json
{
  "name": "My NFT #1",
  "description": "NFT 描述",
  "image": "ipfs://QmImageHash",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Blue"
    }
  ]
}
```

**推荐的元数据托管服务：**
- [Pinata](https://pinata.cloud/) - IPFS 托管
- [NFT.Storage](https://nft.storage/) - 免费 IPFS 存储
- [Filebase](https://filebase.com/) - IPFS 存储

### 示例 Token URI

```
ipfs://QmExample123/metadata.json
https://gateway.pinata.cloud/ipfs/QmExample123/1.json
```

## 构建生产版本

```bash
npm run build
npm start
```

## 部署

### Vercel（推荐）

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com/) 中导入项目
3. 自动部署完成

### 其他平台

- **Netlify**: 支持 Next.js
- **AWS Amplify**: 支持 SSR
- **自托管**: 使用 `npm run build && npm start`

## 环境变量（可选）

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_DEFAULT_CHAIN_ID=31337
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## 常见问题

### Q: MetaMask 无法连接？
A: 确保已安装 MetaMask 扩展，并刷新页面重试。

### Q: 铸造失败？
A: 检查：
1. 钱包余额是否足够（需要支付铸造价格 + Gas）
2. 是否连接到正确的网络
3. 合约地址是否正确配置

### Q: 看不到我的 NFT？
A: 点击"刷新"按钮，或检查网络是否正确。

### Q: 如何获取测试网 ETH？
A: 访问 [Sepolia Faucet](https://sepoliafaucet.com/) 获取免费测试币。

## 开发建议

### 添加新功能

1. **NFT 转移功能**
   - 创建 `components/NFTTransfer.tsx`
   - 调用合约的 `transferNFT` 函数

2. **批量铸造**
   - 添加批量铸造表单
   - 调用 `batchMint` 函数（仅所有者）

3. **NFT 销毁**
   - 添加销毁按钮
   - 调用 `burn` 函数

### 优化建议

1. **添加 React Query** - 缓存和自动刷新数据
2. **添加 Wagmi** - 更好的 Web3 hooks
3. **添加 IPFS 上传** - 直接上传元数据和图片
4. **添加错误边界** - 更好的错误处理
5. **添加单元测试** - 使用 Jest 和 React Testing Library

## License

MIT

## 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [ethers.js 文档](https://docs.ethers.org/v6/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [MetaMask 文档](https://docs.metamask.io/)
