const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721NFT", function () {
  let nft;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const NAME = "MyNFT";
  const SYMBOL = "MNFT";
  const MAX_SUPPLY = 100;
  const MINT_PRICE = ethers.parseEther("0.01");

  beforeEach(async function () {
    // 获取测试账户
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // 部署合约
    const ERC721NFT = await ethers.getContractFactory("ERC721NFT");
    nft = await ERC721NFT.deploy(NAME, SYMBOL, MAX_SUPPLY, MINT_PRICE);
    await nft.waitForDeployment();
  });

  describe("部署", function () {
    it("应该设置正确的名称和符号", async function () {
      expect(await nft.name()).to.equal(NAME);
      expect(await nft.symbol()).to.equal(SYMBOL);
    });

    it("应该设置正确的所有者", async function () {
      expect(await nft.owner()).to.equal(owner.address);
    });

    it("应该设置正确的最大供应量", async function () {
      expect(await nft.maxSupply()).to.equal(MAX_SUPPLY);
    });

    it("应该设置正确的铸造价格", async function () {
      expect(await nft.mintPrice()).to.equal(MINT_PRICE);
    });

    it("初始总供应量应该为 0", async function () {
      expect(await nft.totalSupply()).to.equal(0);
    });
  });

  describe("铸造", function () {
    const TOKEN_URI = "ipfs://QmTest123";

    it("应该允许用户支付费用铸造 NFT", async function () {
      await expect(
        nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE })
      )
        .to.emit(nft, "NFTMinted")
        .withArgs(addr1.address, 0, TOKEN_URI);

      expect(await nft.ownerOf(0)).to.equal(addr1.address);
      expect(await nft.totalSupply()).to.equal(1);
      expect(await nft.tokenURI(0)).to.equal(TOKEN_URI);
    });

    it("支付不足时应该失败", async function () {
      const insufficientPrice = ethers.parseEther("0.005");
      await expect(
        nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: insufficientPrice })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("超过最大供应量时应该失败", async function () {
      // 将最大供应量设置为 1
      await nft.setMaxSupply(1);
      
      // 铸造第一个 NFT
      await nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE });
      
      // 尝试铸造第二个应该失败
      await expect(
        nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE })
      ).to.be.revertedWith("Max supply reached");
    });

    it("铸造到零地址应该失败", async function () {
      await expect(
        nft.connect(addr1).mint(ethers.ZeroAddress, TOKEN_URI, { value: MINT_PRICE })
      ).to.be.revertedWith("Cannot mint to zero address");
    });

    it("暂停时应该无法铸造", async function () {
      await nft.setPaused(true);
      
      await expect(
        nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE })
      ).to.be.revertedWith("Minting is paused");
    });
  });

  describe("免费铸造（仅限所有者）", function () {
    const TOKEN_URI = "ipfs://QmTest456";

    it("所有者应该可以免费铸造", async function () {
      await expect(nft.mintFree(addr1.address, TOKEN_URI))
        .to.emit(nft, "NFTMinted")
        .withArgs(addr1.address, 0, TOKEN_URI);

      expect(await nft.ownerOf(0)).to.equal(addr1.address);
    });

    it("非所有者不能免费铸造", async function () {
      await expect(
        nft.connect(addr1).mintFree(addr1.address, TOKEN_URI)
      ).to.be.reverted;
    });
  });

  describe("批量铸造", function () {
    const BASE_URI = "ipfs://QmTest/";

    it("所有者应该可以批量铸造", async function () {
      const count = 5;
      await nft.batchMint(addr1.address, count, BASE_URI);

      expect(await nft.balanceOf(addr1.address)).to.equal(count);
      expect(await nft.totalSupply()).to.equal(count);
      
      // 检查第一个和最后一个 token
      expect(await nft.ownerOf(0)).to.equal(addr1.address);
      expect(await nft.ownerOf(4)).to.equal(addr1.address);
    });

    it("超过最大供应量时应该失败", async function () {
      await expect(
        nft.batchMint(addr1.address, MAX_SUPPLY + 1, BASE_URI)
      ).to.be.revertedWith("Exceeds max supply");
    });

    it("非所有者不能批量铸造", async function () {
      await expect(
        nft.connect(addr1).batchMint(addr1.address, 5, BASE_URI)
      ).to.be.reverted;
    });
  });

  describe("转移 NFT", function () {
    const TOKEN_URI = "ipfs://QmTest789";

    beforeEach(async function () {
      // 先铸造一个 NFT
      await nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE });
    });

    it("应该允许所有者转移 NFT", async function () {
      await nft.connect(addr1).transferNFT(addr1.address, addr2.address, 0);
      expect(await nft.ownerOf(0)).to.equal(addr2.address);
    });

    it("不是所有者时转移应该失败", async function () {
      await expect(
        nft.connect(addr2).transferNFT(addr1.address, addr2.address, 0)
      ).to.be.reverted;
    });

    it("转移到零地址应该失败", async function () {
      await expect(
        nft.connect(addr1).transferNFT(addr1.address, ethers.ZeroAddress, 0)
      ).to.be.revertedWith("Cannot transfer to zero address");
    });

    it("应该允许批量转移", async function () {
      // 铸造更多 NFT
      await nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE });
      await nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE });

      // 批量转移
      await nft.connect(addr1).batchTransfer(addr1.address, addr2.address, [0, 1, 2]);

      expect(await nft.ownerOf(0)).to.equal(addr2.address);
      expect(await nft.ownerOf(1)).to.equal(addr2.address);
      expect(await nft.ownerOf(2)).to.equal(addr2.address);
      expect(await nft.balanceOf(addr2.address)).to.equal(3);
    });
  });

  describe("销毁 NFT", function () {
    const TOKEN_URI = "ipfs://QmTestBurn";

    beforeEach(async function () {
      await nft.connect(addr1).mint(addr1.address, TOKEN_URI, { value: MINT_PRICE });
    });

    it("所有者应该可以销毁 NFT", async function () {
      await nft.connect(addr1).burn(0);
      expect(await nft.exists(0)).to.equal(false);
    });

    it("非所有者不能销毁 NFT", async function () {
      await expect(
        nft.connect(addr2).burn(0)
      ).to.be.revertedWith("Not the owner");
    });
  });

  describe("管理功能", function () {
    it("所有者应该可以更新铸造价格", async function () {
      const newPrice = ethers.parseEther("0.02");
      await expect(nft.setMintPrice(newPrice))
        .to.emit(nft, "MintPriceUpdated")
        .withArgs(newPrice);
      
      expect(await nft.mintPrice()).to.equal(newPrice);
    });

    it("所有者应该可以更新最大供应量", async function () {
      const newMaxSupply = 200;
      await expect(nft.setMaxSupply(newMaxSupply))
        .to.emit(nft, "MaxSupplyUpdated")
        .withArgs(newMaxSupply);
      
      expect(await nft.maxSupply()).to.equal(newMaxSupply);
    });

    it("不能将最大供应量设置为小于当前供应量", async function () {
      await nft.mintFree(addr1.address, "ipfs://test");
      await expect(
        nft.setMaxSupply(0)
      ).to.be.revertedWith("Cannot set below current supply");
    });

    it("所有者应该可以暂停/恢复铸造", async function () {
      await expect(nft.setPaused(true))
        .to.emit(nft, "ContractPaused")
        .withArgs(true);
      
      expect(await nft.isPaused()).to.equal(true);
      
      await nft.setPaused(false);
      expect(await nft.isPaused()).to.equal(false);
    });

    it("非所有者不能更新设置", async function () {
      await expect(
        nft.connect(addr1).setMintPrice(ethers.parseEther("0.02"))
      ).to.be.reverted;

      await expect(
        nft.connect(addr1).setMaxSupply(200)
      ).to.be.reverted;

      await expect(
        nft.connect(addr1).setPaused(true)
      ).to.be.reverted;
    });
  });

  describe("提取资金", function () {
    beforeEach(async function () {
      // 铸造一些 NFT 以积累资金
      await nft.connect(addr1).mint(addr1.address, "ipfs://test1", { value: MINT_PRICE });
      await nft.connect(addr2).mint(addr2.address, "ipfs://test2", { value: MINT_PRICE });
    });

    it("所有者应该可以提取资金", async function () {
      const contractBalance = await ethers.provider.getBalance(await nft.getAddress());
      expect(contractBalance).to.equal(MINT_PRICE * 2n);

      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      
      const tx = await nft.withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      
      expect(ownerBalanceAfter).to.be.closeTo(
        ownerBalanceBefore + contractBalance - gasUsed,
        ethers.parseEther("0.001") // 允许少量误差
      );
    });

    it("非所有者不能提取资金", async function () {
      await expect(
        nft.connect(addr1).withdraw()
      ).to.be.reverted;
    });

    it("余额为零时提取应该失败", async function () {
      await nft.withdraw();
      await expect(
        nft.withdraw()
      ).to.be.revertedWith("No funds to withdraw");
    });
  });

  describe("查询功能", function () {
    beforeEach(async function () {
      // 给 addr1 铸造 3 个 NFT
      await nft.mintFree(addr1.address, "ipfs://test1");
      await nft.mintFree(addr1.address, "ipfs://test2");
      await nft.mintFree(addr1.address, "ipfs://test3");
      // 给 addr2 铸造 1 个 NFT
      await nft.mintFree(addr2.address, "ipfs://test4");
    });

    it("应该返回正确的总供应量", async function () {
      expect(await nft.totalSupply()).to.equal(4);
    });

    it("应该返回用户拥有的所有 Token ID", async function () {
      const addr1Tokens = await nft.tokensOfOwner(addr1.address);
      expect(addr1Tokens.length).to.equal(3);
      expect(addr1Tokens[0]).to.equal(0);
      expect(addr1Tokens[1]).to.equal(1);
      expect(addr1Tokens[2]).to.equal(2);

      const addr2Tokens = await nft.tokensOfOwner(addr2.address);
      expect(addr2Tokens.length).to.equal(1);
      expect(addr2Tokens[0]).to.equal(3);
    });

    it("应该正确检查 Token 是否存在", async function () {
      expect(await nft.exists(0)).to.equal(true);
      expect(await nft.exists(3)).to.equal(true);
      expect(await nft.exists(999)).to.equal(false);
    });
  });
});
