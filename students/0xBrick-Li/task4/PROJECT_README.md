# 🎨 ERC721 NFT 完整项目

一个功能完整的 NFT 项目，包含智能合约和 Web 前端。

## 📦 项目结构

```
0xBrick-Li/
├── contracts/              # 智能合约
│   ├── ERC721NFT.sol      # 主合约
│   └── Lock.sol           # 示例合约
├── ignition/              # 部署脚本
│   └── modules/
│       └── ERC721NFT.js   # NFT 合约部署模块
├── test/                  # 测试文件
│   └── ERC721NFT.test.js  # 合约测试
├── front/                 # Next.js 前端
│   ├── app/              # Next.js 页面
│   ├── components/       # React 组件
│   ├── utils/            # 工具函数
│   └── types/            # TypeScript 类型
├── artifacts/            # 编译产物
├── cache/                # 编译缓存
├── hardhat.config.js     # Hardhat 配置
├── package.json          # 项目依赖
├── .env.example          # 环境变量示例
└── README.md            # 项目说明
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装合约项目依赖
npm install

# 安装前端依赖
cd front
npm install
cd ..
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的配置：
- `SEPOLIA_RPC_URL`: Alchemy 或 Infura 的 RPC URL
- `PRIVATE_KEY`: 你的钱包私钥
- `ETHERSCAN_API_KEY`: Etherscan API Key

### 3. 编译和测试合约

```bash
# 编译合约
npx hardhat compile

# 运行测试
npx hardhat test

# 查看测试覆盖率
npx hardhat coverage
```

### 4. 部署合约

**部署到本地网络：**
```bash
# 终端 1: 启动本地节点
npx hardhat node

# 终端 2: 部署
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network localhost
```

**部署到 Sepolia 测试网：**
```bash
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network sepolia
```

### 5. 配置前端

复制部署后的合约地址，更新 `front/utils/contract.ts`:

```typescript
const addresses: { [key: number]: string } = {
  31337: "你的本地合约地址",
  11155111: "你的Sepolia合约地址",
};
```

### 6. 启动前端

```bash
cd front
npm run dev
```

访问 http://localhost:3000

## 📚 详细文档

- **[ERC721_GUIDE.md](./ERC721_GUIDE.md)** - 合约使用指南
- **[NETWORK_CONFIG.md](./NETWORK_CONFIG.md)** - 网络配置说明  
- **[FRONTEND_SETUP.md](./FRONTEND_SETUP.md)** - 前端配置详解
- **[front/README.md](./front/README.md)** - 前端项目文档

## ✨ 功能特性

### 智能合约功能

- ✅ NFT 铸造（付费/免费/批量）
- ✅ NFT 转移（单个/批量）
- ✅ NFT 销毁
- ✅ 元数据管理（Token URI）
- ✅ 供应量控制
- ✅ 价格设置
- ✅ 暂停/恢复功能
- ✅ 资金管理
- ✅ 完整测试覆盖

### 前端功能

- ✅ 连接 MetaMask 钱包
- ✅ 网络切换
- ✅ 查看合约信息
- ✅ 铸造 NFT
- ✅ 查看 NFT 画廊
- ✅ 响应式设计
- ✅ 暗色模式支持
- ✅ 实时交易反馈

## 🛠 技术栈

### 后端/合约
- **Solidity** ^0.8.28
- **Hardhat** - 开发环境
- **OpenZeppelin** - 合约库
- **ethers.js** - 以太坊交互
- **Chai** - 测试框架

### 前端
- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **ethers.js v6** - Web3 库

## 📖 使用示例

### 通过 Hardhat Console

```javascript
const nft = await ethers.getContractAt("ERC721NFT", "合约地址");

// 铸造 NFT
await nft.mint("0x...", "ipfs://...", { value: ethers.parseEther("0.01") });

// 查询
await nft.totalSupply();
await nft.balanceOf("0x...");
await nft.tokensOfOwner("0x...");
```

### 通过 Web 界面

1. 连接 MetaMask 钱包
2. 确保连接到正确网络
3. 在"铸造 NFT"卡片中填写信息
4. 点击"铸造 NFT"并在 MetaMask 中确认
5. 在"我的 NFT 画廊"查看铸造的 NFT

## 🧪 测试

运行完整测试套件：

```bash
npx hardhat test
```

运行特定测试：

```bash
npx hardhat test test/ERC721NFT.test.js
```

查看 gas 报告：

```bash
REPORT_GAS=true npx hardhat test
```

测试覆盖率：

```bash
npx hardhat coverage
```

## 🌐 网络配置

### 支持的网络

- **Hardhat (本地)** - Chain ID: 31337
- **Localhost** - Chain ID: 31337  
- **Sepolia** - Chain ID: 11155111
- **Ethereum 主网** - Chain ID: 1
- **Polygon** - Chain ID: 137
- **Polygon Mumbai** - Chain ID: 80001

### 添加网络到 MetaMask

**Sepolia 测试网：**
- Network Name: Sepolia
- RPC URL: https://rpc.sepolia.org
- Chain ID: 11155111
- Currency Symbol: SEP
- Explorer: https://sepolia.etherscan.io

**本地网络：**
- Network Name: Localhost 8545
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH

## 🔐 安全建议

1. ⚠️ **永远不要提交 `.env` 文件**
2. 🔑 **使用测试账户进行开发**
3. 💰 **主网部署前进行全面审计**
4. 🔒 **使用硬件钱包管理主网资金**
5. ✅ **确保所有测试通过**
6. 📝 **在 Etherscan 上验证合约**

## 📦 部署检查清单

- [ ] 编译合约成功
- [ ] 所有测试通过
- [ ] 配置正确的网络参数
- [ ] 钱包有足够的 ETH (测试网/主网)
- [ ] 环境变量配置正确
- [ ] 部署后验证合约
- [ ] 前端配置了正确的合约地址
- [ ] 测试所有前端功能

## 🎯 常见任务

### 编译合约
```bash
npx hardhat compile
```

### 运行本地节点
```bash
npx hardhat node
```

### 部署合约
```bash
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network <network>
```

### 验证合约
```bash
npx hardhat verify --network sepolia <合约地址> "NFT名称" "符号" 10000 "10000000000000000"
```

### 清理缓存
```bash
npx hardhat clean
```

### 启动前端开发服务器
```bash
cd front && npm run dev
```

### 构建前端生产版本
```bash
cd front && npm run build
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT License

## 🔗 相关资源

### 学习资源
- [Solidity 文档](https://docs.soliditylang.org/)
- [OpenZeppelin 文档](https://docs.openzeppelin.com/)
- [Hardhat 文档](https://hardhat.org/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [ethers.js 文档](https://docs.ethers.org/)

### 工具
- [Remix IDE](https://remix.ethereum.org/) - 在线 Solidity IDE
- [Alchemy](https://www.alchemy.com/) - 区块链 API
- [Infura](https://infura.io/) - 以太坊节点服务
- [Pinata](https://pinata.cloud/) - IPFS 托管
- [NFT.Storage](https://nft.storage/) - 免费 NFT 存储

### 水龙头
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)

## 💬 联系方式

如有问题，请查看文档或提交 Issue。

---

**祝你使用愉快！** 🎉
