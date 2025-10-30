// 合约 ABI (Application Binary Interface)
export function getContractABI() {
  return [
    "function mint(address _to, string memory _tokenURI) public payable",
    "function mintFree(address _to, string memory _tokenURI) public",
    "function transferNFT(address _from, address _to, uint256 _tokenId) public",
    "function burn(uint256 _tokenId) public",
    "function totalSupply() public view returns (uint256)",
    "function maxSupply() public view returns (uint256)",
    "function mintPrice() public view returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function ownerOf(uint256 tokenId) public view returns (address)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function tokensOfOwner(address _owner) public view returns (uint256[] memory)",
    "function exists(uint256 _tokenId) public view returns (bool)",
    "event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI)"
  ];
}

// 根据链 ID 获取合约地址
export function getContractAddress(chainId: number): string | null {
  const addresses: { [key: number]: string } = {
    // 本地网络
    31337: "YOUR_LOCAL_CONTRACT_ADDRESS",
    // Sepolia 测试网
    11155111: "0x8271F95FaAB2F7eBe3D68B47B8e1e65EFc29F351",
  };

  return addresses[chainId] || null;
}

// 配置合约地址（需要在部署后更新）
export function updateContractAddress(chainId: number, address: string) {
  console.log(`请在 utils/contract.ts 中更新链 ${chainId} 的合约地址为: ${address}`);
}
