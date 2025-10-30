# ERC721 NFT 前端项目配置指南

## 📋 配置步骤

### 第一步：安装依赖

在 `front` 目录下运行：

```bash
cd front
npm install
```

### 第二步：部署合约并获取地址

1. 返回项目根目录
2. 部署合约到本地网络或测试网

**部署到本地网络：**
```bash
# 终端 1: 启动本地节点
npx hardhat node

# 终端 2: 部署合约
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network localhost
```

**部署到 Sepolia 测试网：**
```bash
# 确保 .env 文件配置了 SEPOLIA_RPC_URL 和 PRIVATE_KEY
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network sepolia
```

3. 记录部署后的合约地址

合约地址可以在以下位置找到：
- 控制台输出
- `ignition/deployments/chain-31337/deployed_addresses.json` (本地)
- `ignition/deployments/chain-11155111/deployed_addresses.json` (Sepolia)

### 第三步：配置合约地址

编辑 `front/utils/contract.ts` 文件：

```typescript
const addresses: { [key: number]: string } = {
  // 本地网络 - 替换为你的地址
  31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // Sepolia 测试网 - 替换为你的地址
  11155111: "0x1234567890123456789012345678901234567890",
};
```

### 第四步：启动开发服务器

```bash
cd front
npm run dev
```

访问 http://localhost:3000

## 🔧 完整的开发流程

### 方案 A：使用本地网络（推荐开发测试）

```bash
# 1. 启动本地 Hardhat 网络
npx hardhat node

# 2. 部署合约（新终端）
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network localhost

# 3. 复制合约地址到 front/utils/contract.ts

# 4. 配置 MetaMask
# - 添加网络: Localhost 8545
# - RPC URL: http://127.0.0.1:8545
# - Chain ID: 31337
# - Currency: ETH
# - 导入 Hardhat 提供的测试账户私钥

# 5. 启动前端
cd front
npm run dev
```

### 方案 B：使用 Sepolia 测试网（推荐生产预览）

```bash
# 1. 配置 .env 文件
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY
PRIVATE_KEY=your-private-key
ETHERSCAN_API_KEY=your-etherscan-key

# 2. 确保钱包有测试 ETH
# 访问 https://sepoliafaucet.com/ 获取

# 3. 部署合约
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network sepolia

# 4. 复制合约地址到 front/utils/contract.ts

# 5. 启动前端
cd front
npm run dev

# 6. 在 MetaMask 中切换到 Sepolia 网络
```

## 📝 配置文件详解

### 合约 ABI 配置 (front/utils/contract.ts)

```typescript
export function getContractABI() {
  return [
    // 主要函数
    "function mint(address _to, string memory _tokenURI) public payable",
    "function totalSupply() public view returns (uint256)",
    "function mintPrice() public view returns (uint256)",
    // ... 其他函数
  ];
}
```

这些是合约的函数签名，前端通过这些接口与合约交互。

### 合约地址配置

```typescript
export function getContractAddress(chainId: number): string | null {
  const addresses: { [key: number]: string } = {
    31337: "本地网络合约地址",
    11155111: "Sepolia 测试网合约地址",
  };
  return addresses[chainId] || null;
}
```

## 🚀 快速部署和测试

创建一个自动化脚本 `scripts/deploy-and-setup.sh`:

```bash
#!/bin/bash

# 编译合约
echo "📦 编译合约..."
npx hardhat compile

# 部署到本地网络
echo "🚀 部署合约到本地网络..."
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network localhost

# 读取部署地址
ADDRESS=$(cat ignition/deployments/chain-31337/deployed_addresses.json | grep "ERC721NFT" | cut -d'"' -f4)

echo "✅ 合约已部署到: $ADDRESS"
echo "📝 请更新 front/utils/contract.ts 中的地址"
```

## 🔍 验证配置

启动前端后，检查：

1. ✅ 能否连接 MetaMask
2. ✅ 网络是否正确显示
3. ✅ 合约信息是否正确加载（总供应量、最大供应量、价格）
4. ✅ 能否成功铸造 NFT

## 💡 调试技巧

### 查看控制台日志

浏览器开发者工具 (F12) -> Console 标签

常见日志：
- "已连接账户: 0x..."
- "开始铸造 NFT..."
- "交易已发送: 0x..."

### 常见错误

1. **"Contract not found"**
   - 检查合约地址是否正确
   - 确认部署到了正确的网络

2. **"Insufficient payment"**
   - 铸造 NFT 需要支付费用
   - 检查钱包余额

3. **"User rejected"**
   - 用户在 MetaMask 中拒绝了交易
   - 重新尝试并确认

## 📚 下一步

配置完成后，你可以：

1. 🎨 自定义 UI 样式
2. ➕ 添加更多功能（转移、销毁等）
3. 📊 集成 NFT 市场 API
4. 🔄 添加自动刷新功能
5. 📱 优化移动端体验

## 🆘 需要帮助？

- 查看 `front/README.md` 了解更多
- 查看 `ERC721_GUIDE.md` 了解合约详情
- 检查浏览器控制台的错误信息
