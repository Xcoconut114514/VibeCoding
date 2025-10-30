'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContractAddress, getContractABI } from '@/utils/contract';

interface ContractInfoProps {
  provider: ethers.BrowserProvider | null;
  chainId: number;
}

export default function ContractInfo({ provider, chainId }: ContractInfoProps) {
  const [totalSupply, setTotalSupply] = useState('0');
  const [maxSupply, setMaxSupply] = useState('0');
  const [mintPrice, setMintPrice] = useState('0');
  const [loading, setLoading] = useState(false);

  const loadContractInfo = async () => {
    if (!provider) return;

    const contractAddress = getContractAddress(chainId);
    if (!contractAddress) return;

    try {
      setLoading(true);
      const contract = new ethers.Contract(contractAddress, getContractABI(), provider);
      
      const [supply, max, price] = await Promise.all([
        contract.totalSupply(),
        contract.maxSupply(),
        contract.mintPrice(),
      ]);

      setTotalSupply(supply.toString());
      setMaxSupply(max.toString());
      setMintPrice(ethers.formatEther(price));
    } catch (error) {
      console.error('加载合约信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContractInfo();
  }, [provider, chainId]);

  const contractAddress = getContractAddress(chainId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        合约信息
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-600 dark:text-gray-300">合约地址:</span>
          <span className="font-mono text-sm">
            {contractAddress ? (
              <a
                href={`https://sepolia.etherscan.io/address/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 underline"
              >
                {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
              </a>
            ) : (
              <span className="text-gray-400">未部署</span>
            )}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">已铸造</div>
            <div className="text-2xl font-bold text-purple-600">{loading ? '...' : totalSupply}</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">最大供应量</div>
            <div className="text-2xl font-bold text-blue-600">{loading ? '...' : maxSupply}</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">铸造价格</div>
            <div className="text-2xl font-bold text-pink-600">{loading ? '...' : `${mintPrice} ETH`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
