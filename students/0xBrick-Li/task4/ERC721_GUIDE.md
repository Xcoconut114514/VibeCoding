# ERC721 NFT 合约使用指南

## 合约概述

这是一个功能完整的 ERC721 NFT 合约实现，基于 OpenZeppelin 库开发，支持：

- ✅ NFT 铸造（付费和免费）
- ✅ NFT 转移（单个和批量）
- ✅ NFT 销毁
- ✅ 元数据管理（Token URI）
- ✅ 供应量限制
- ✅ 铸造价格设置
- ✅ 暂停/恢复功能
- ✅ 资金提取
- ✅ 所有权管理

## 合约特性

### 核心功能

#### 1. 铸造 NFT
```solidity
// 付费铸造
function mint(address _to, string memory _tokenURI) public payable

// 免费铸造（仅限所有者）
function mintFree(address _to, string memory _tokenURI) public onlyOwner

// 批量铸造（仅限所有者）
function batchMint(address _to, uint256 _count, string memory _baseURI) public onlyOwner
```

#### 2. 转移 NFT
```solidity
// 单个转移
function transferNFT(address _from, address _to, uint256 _tokenId) public

// 批量转移
function batchTransfer(address _from, address _to, uint256[] memory _tokenIds) public
```

#### 3. 销毁 NFT
```solidity
function burn(uint256 _tokenId) public
```

### 管理功能

```solidity
// 设置铸造价格
function setMintPrice(uint256 _newPrice) public onlyOwner

// 设置最大供应量
function setMaxSupply(uint256 _newMaxSupply) public onlyOwner

// 暂停/恢复铸造
function setPaused(bool _paused) public onlyOwner

// 提取合约余额
function withdraw() public onlyOwner
```

### 查询功能

```solidity
// 获取总供应量
function totalSupply() public view returns (uint256)

// 获取用户拥有的所有 Token ID
function tokensOfOwner(address _owner) public view returns (uint256[] memory)

// 检查 Token 是否存在
function exists(uint256 _tokenId) public view returns (bool)
```

## 部署指南

### 1. 编译合约

```bash
npx hardhat compile
```

### 2. 运行测试

```bash
npx hardhat test
npx hardhat test test/ERC721NFT.test.js
```

### 3. 部署到本地网络

```bash
# 启动本地节点
npx hardhat node

# 在新终端部署
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network localhost
```

### 4. 部署到测试网（Sepolia）

首先确保 `.env` 文件配置正确：

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY
PRIVATE_KEY=your-private-key-here
ETHERSCAN_API_KEY=your-etherscan-api-key
```

然后部署：

```bash
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network sepolia
```

### 5. 自定义部署参数

创建一个参数文件 `ignition/parameters.json`：

```json
{
  "ERC721NFTModule": {
    "name": "CoolNFT",
    "symbol": "CNFT",
    "maxSupply": 5000,
    "mintPrice": "50000000000000000"
  }
}
```

使用参数部署：

```bash
npx hardhat ignition deploy ./ignition/modules/ERC721NFT.js --network sepolia --parameters ignition/parameters.json
```

## 使用示例

### 通过 Hardhat Console 交互

```bash
npx hardhat console --network localhost
```

```javascript
// 获取合约实例
const nft = await ethers.getContractAt("ERC721NFT", "合约地址");

// 获取账户
const [owner, user1] = await ethers.getSigners();

// 铸造 NFT
const mintPrice = await nft.mintPrice();
await nft.connect(user1).mint(
  user1.address, 
  "ipfs://QmExample123",
  { value: mintPrice }
);

// 查询余额
const balance = await nft.balanceOf(user1.address);
console.log(`User1 拥有 ${balance} 个 NFT`);

// 转移 NFT
await nft.connect(user1).transferNFT(user1.address, owner.address, 0);

// 查询用户拥有的所有 Token
const tokens = await nft.tokensOfOwner(user1.address);
console.log("User1 的 Token IDs:", tokens);

// 所有者操作
await nft.setMintPrice(ethers.parseEther("0.02"));
await nft.withdraw();
```

### 通过 ethers.js 在前端使用

```javascript
import { ethers } from "ethers";

// 连接到提供者
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// 合约地址和 ABI
const contractAddress = "0x...";
const contractABI = [...]; // 从 artifacts 获取

// 创建合约实例
const nft = new ethers.Contract(contractAddress, contractABI, signer);

// 铸造 NFT
const mintPrice = await nft.mintPrice();
const tx = await nft.mint(
  await signer.getAddress(),
  "ipfs://QmYourTokenURI",
  { value: mintPrice }
);
await tx.wait();
console.log("NFT 铸造成功！");

// 监听事件
nft.on("NFTMinted", (to, tokenId, tokenURI) => {
  console.log(`新 NFT 铸造: Token ID ${tokenId}`);
});
```

## 元数据格式

Token URI 应该指向一个 JSON 文件，格式如下：

```json
{
  "name": "My NFT #1",
  "description": "这是我的第一个 NFT",
  "image": "ipfs://QmImageHash",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Blue"
    },
    {
      "trait_type": "Rarity",
      "value": "Rare"
    }
  ]
}
```

## 合约验证

部署后在 Etherscan 上验证合约：

```bash
npx hardhat verify --network sepolia 合约地址 "MyNFT" "MNFT" 10000 "10000000000000000"
```

## 安全建议

1. ⚠️ 在主网部署前务必进行全面测试
2. 🔐 不要在代码中硬编码私钥
3. 🔒 使用多签钱包管理重要合约
4. 📝 部署前进行安全审计
5. 🔄 考虑添加可升级性（使用代理模式）
6. ⏸️ 在紧急情况下使用暂停功能
7. 💰 定期提取合约资金到安全地址

## Gas 优化建议

1. 批量操作时使用 `batchMint` 和 `batchTransfer`
2. 考虑使用 ERC721A 来优化批量铸造的 gas 成本
3. 使用事件记录重要操作，而不是在链上存储所有数据
4. 元数据存储在 IPFS 而不是直接在合约中

## 常见问题

### Q: 如何获取测试网 ETH？
A: 访问 [Sepolia Faucet](https://sepoliafaucet.com/) 获取免费测试币

### Q: 如何上传元数据到 IPFS？
A: 使用 [Pinata](https://pinata.cloud/) 或 [NFT.Storage](https://nft.storage/)

### Q: 铸造价格可以设置为 0 吗？
A: 可以，设置为 0 即可免费铸造

### Q: 如何实现白名单功能？
A: 可以添加 Merkle Tree 白名单验证，或使用映射存储白名单地址

## 进阶功能建议

- [ ] 添加白名单功能（Merkle Tree）
- [ ] 添加版税功能（EIP-2981）
- [ ] 实现盲盒机制
- [ ] 添加 staking 功能
- [ ] 实现空投功能
- [ ] 添加可升级性（使用 UUPS 代理）

## 相关资源

- [OpenZeppelin 文档](https://docs.openzeppelin.com/contracts/)
- [ERC721 标准](https://eips.ethereum.org/EIPS/eip-721)
- [Hardhat 文档](https://hardhat.org/docs)
- [IPFS 文档](https://docs.ipfs.tech/)
