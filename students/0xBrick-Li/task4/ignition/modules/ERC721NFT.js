const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ERC721NFTModule", (m) => {
  // 配置参数
  const name = m.getParameter("name", "MyNFT");
  const symbol = m.getParameter("symbol", "MNFT");
  const maxSupply = m.getParameter("maxSupply", 10000);
  const mintPrice = m.getParameter("mintPrice", "10000000000000000"); // 0.01 ETH in wei

  // 部署合约
  const nft = m.contract("ERC721NFT", [name, symbol, maxSupply, mintPrice]);

  return { nft };
});
