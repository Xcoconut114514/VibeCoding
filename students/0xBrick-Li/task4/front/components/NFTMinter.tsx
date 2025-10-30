'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { getContractAddress, getContractABI } from '@/utils/contract';

interface NFTMinterProps {
  signer: ethers.JsonRpcSigner | null;
  account: string;
  chainId: number;
}

export default function NFTMinter({ signer, account, chainId }: NFTMinterProps) {
  const [recipient, setRecipient] = useState(account);
  const [tokenURI, setTokenURI] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');

  const mintNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signer) {
      alert('请先连接钱包');
      return;
    }

    const contractAddress = getContractAddress(chainId);
    if (!contractAddress) {
      alert('当前网络暂不支持，请切换到本地网络或 Sepolia 测试网');
      return;
    }

    try {
      setLoading(true);
      setTxHash('');

      const contract = new ethers.Contract(contractAddress, getContractABI(), signer);
      
      // 获取铸造价格
      const mintPrice = await contract.mintPrice();
      
      console.log('开始铸造 NFT...');
      console.log('接收地址:', recipient);
      console.log('Token URI:', tokenURI);
      console.log('铸造价格:', ethers.formatEther(mintPrice), 'ETH');

      // 调用 mint 函数
      const tx = await contract.mint(recipient, tokenURI, { value: mintPrice });
      
      console.log('交易已发送:', tx.hash);
      setTxHash(tx.hash);

      // 等待交易确认
      const receipt = await tx.wait();
      console.log('交易已确认:', receipt);

      alert('NFT 铸造成功! 🎉');
      
      // 清空表单
      setTokenURI('');
      setRecipient(account);
    } catch (error: any) {
      console.error('铸造失败:', error);
      alert(`铸造失败: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        铸造 NFT
      </h2>

      <form onSubmit={mintNFT} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            接收地址
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Token URI (IPFS 或 HTTP URL)
          </label>
          <input
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="ipfs://QmExample123 或 https://..."
            required
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            NFT 元数据的 URI，通常指向 IPFS 上的 JSON 文件
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-all transform hover:scale-105 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg'
          }`}
        >
          {loading ? '铸造中...' : '铸造 NFT'}
        </button>
      </form>

      {txHash && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-200">
            交易哈希: 
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 underline hover:text-green-600"
            >
              {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
