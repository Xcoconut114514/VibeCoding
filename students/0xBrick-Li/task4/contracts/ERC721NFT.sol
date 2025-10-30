// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ERC721NFT
 * @dev 标准的 ERC721 NFT 合约实现
 * @notice 这个合约支持 NFT 的铸造、转移和元数据管理
 */
contract ERC721NFT is ERC721, ERC721URIStorage, Ownable {
    // Token ID 计数器
    uint256 private _nextTokenId;
    
    // 最大供应量
    uint256 public maxSupply;
    
    // 铸造价格
    uint256 public mintPrice;
    
    // 是否暂停铸造
    bool public isPaused;
    
    // 事件
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event MintPriceUpdated(uint256 newPrice);
    event MaxSupplyUpdated(uint256 newMaxSupply);
    event ContractPaused(bool isPaused);
    event Withdrawn(address indexed owner, uint256 amount);
    
    /**
     * @dev 构造函数
     * @param _name NFT 集合名称
     * @param _symbol NFT 集合符号
     * @param _maxSupply 最大供应量
     * @param _mintPrice 铸造价格 (wei)
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        uint256 _mintPrice
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        maxSupply = _maxSupply;
        mintPrice = _mintPrice;
        isPaused = false;
        _nextTokenId = 0;
    }
    
    /**
     * @dev 铸造 NFT（需要支付费用）
     * @param _to 接收者地址
     * @param _tokenURI Token 元数据 URI
     */
    function mint(address _to, string memory _tokenURI) public payable {
        require(!isPaused, "Minting is paused");
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_nextTokenId < maxSupply, "Max supply reached");
        require(_to != address(0), "Cannot mint to zero address");
        
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        emit NFTMinted(_to, tokenId, _tokenURI);
    }
    
    /**
     * @dev 免费铸造 NFT（仅限所有者）
     * @param _to 接收者地址
     * @param _tokenURI Token 元数据 URI
     */
    function mintFree(address _to, string memory _tokenURI) public onlyOwner {
        require(_nextTokenId < maxSupply, "Max supply reached");
        require(_to != address(0), "Cannot mint to zero address");
        
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        emit NFTMinted(_to, tokenId, _tokenURI);
    }
    
    /**
     * @dev 批量铸造 NFT（仅限所有者）
     * @param _to 接收者地址
     * @param _count 铸造数量
     * @param _baseURI 基础 URI（会自动添加 tokenId）
     */
    function batchMint(address _to, uint256 _count, string memory _baseURI) public onlyOwner {
        require(_to != address(0), "Cannot mint to zero address");
        require(_nextTokenId + _count <= maxSupply, "Exceeds max supply");
        
        for (uint256 i = 0; i < _count; i++) {
            uint256 tokenId = _nextTokenId;
            _nextTokenId++;
            
            _safeMint(_to, tokenId);
            _setTokenURI(tokenId, string(abi.encodePacked(_baseURI, Strings.toString(tokenId), ".json")));
            
            emit NFTMinted(_to, tokenId, string(abi.encodePacked(_baseURI, Strings.toString(tokenId), ".json")));
        }
    }
    
    /**
     * @dev 转移 NFT
     * @param _from 发送者地址
     * @param _to 接收者地址
     * @param _tokenId Token ID
     */
    function transferNFT(address _from, address _to, uint256 _tokenId) public {
        require(ownerOf(_tokenId) == _from, "Not the owner");
        require(_to != address(0), "Cannot transfer to zero address");
        
        safeTransferFrom(_from, _to, _tokenId);
    }
    
    /**
     * @dev 批量转移 NFT
     * @param _from 发送者地址
     * @param _to 接收者地址
     * @param _tokenIds Token ID 数组
     */
    function batchTransfer(address _from, address _to, uint256[] memory _tokenIds) public {
        require(_to != address(0), "Cannot transfer to zero address");
        
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(ownerOf(_tokenIds[i]) == _from, "Not the owner of all tokens");
            safeTransferFrom(_from, _to, _tokenIds[i]);
        }
    }
    
    /**
     * @dev 销毁 NFT
     * @param _tokenId Token ID
     */
    function burn(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        _burn(_tokenId);
    }
    
    /**
     * @dev 更新铸造价格（仅限所有者）
     * @param _newPrice 新价格
     */
    function setMintPrice(uint256 _newPrice) public onlyOwner {
        mintPrice = _newPrice;
        emit MintPriceUpdated(_newPrice);
    }
    
    /**
     * @dev 更新最大供应量（仅限所有者）
     * @param _newMaxSupply 新的最大供应量
     */
    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        require(_newMaxSupply >= _nextTokenId, "Cannot set below current supply");
        maxSupply = _newMaxSupply;
        emit MaxSupplyUpdated(_newMaxSupply);
    }
    
    /**
     * @dev 暂停/恢复铸造（仅限所有者）
     * @param _paused 是否暂停
     */
    function setPaused(bool _paused) public onlyOwner {
        isPaused = _paused;
        emit ContractPaused(_paused);
    }
    
    /**
     * @dev 提取合约余额（仅限所有者）
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit Withdrawn(owner(), balance);
    }
    
    /**
     * @dev 获取当前已铸造的 NFT 数量
     */
    function totalSupply() public view returns (uint256) {
        return _nextTokenId;
    }
    
    /**
     * @dev 获取指定地址拥有的所有 Token ID
     * @param _owner 地址
     */
    function tokensOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < _nextTokenId; i++) {
            if (_ownerOf(i) == _owner) {
                tokenIds[index] = i;
                index++;
            }
        }
        
        return tokenIds;
    }
    
    /**
     * @dev 检查 Token 是否存在
     * @param _tokenId Token ID
     */
    function exists(uint256 _tokenId) public view returns (bool) {
        return _ownerOf(_tokenId) != address(0);
    }
    
    // 以下函数需要重写以解决多重继承冲突
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
