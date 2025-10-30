# Hardhat 网络配置说明

## 环境设置

1. **复制环境变量模板**
   ```bash
   cp .env.example .env
   ```

2. **配置 .env 文件**
   - 获取 RPC URL (推荐使用 Alchemy 或 Infura)
   - 添加你的私钥（从 MetaMask 导出）
   - 添加 Etherscan API Key（用于合约验证）

## 可用网络

### 本地网络
- **hardhat**: Hardhat 内置网络
- **localhost**: 本地节点 (需要先运行 `npx hardhat node`)

### 测试网络
- **sepolia**: Ethereum Sepolia 测试网
- **polygonMumbai**: Polygon Mumbai 测试网

### 主网
- **mainnet**: Ethereum 主网
- **polygon**: Polygon 主网

## 常用命令

### 启动本地节点
```bash
npx hardhat node
```

### 编译合约
```bash
npx hardhat compile
```

### 运行测试
```bash
npx hardhat test
```

### 部署合约
```bash
# 部署到本地网络
npx hardhat ignition deploy ./ignition/modules/Lock.js --network localhost

# 部署到 Sepolia 测试网
npx hardhat ignition deploy ./ignition/modules/Lock.js --network sepolia

# 部署到主网（谨慎操作！）
npx hardhat ignition deploy ./ignition/modules/Lock.js --network mainnet
```

### 验证合约
```bash
npx hardhat verify --network sepolia <合约地址> <构造函数参数>
```

### 查看账户
```bash
npx hardhat accounts --network localhost
```

### 清理
```bash
npx hardhat clean
```

## 安全提示

⚠️ **重要**: 
- 永远不要将 `.env` 文件提交到版本控制
- 不要在主网使用包含大量资金的私钥进行测试
- 建议为开发和生产使用不同的密钥
- 测试网的 ETH 可以从水龙头免费获取

## 测试网水龙头

- Sepolia: https://sepoliafaucet.com/
- Polygon Mumbai: https://faucet.polygon.technology/

## RPC 提供商

- Alchemy: https://www.alchemy.com/
- Infura: https://infura.io/
- QuickNode: https://www.quicknode.com/
