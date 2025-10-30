'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContractAddress, getContractABI } from '@/utils/contract';

interface NFTGalleryProps {
  provider: ethers.BrowserProvider | null;
  account: string;
  chainId: number;
}

interface NFT {
  tokenId: number;
  tokenURI: string;
  owner: string;
}

export default function NFTGallery({ provider, account, chainId }: NFTGalleryProps) {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNFTs = async () => {
    if (!provider || !account) return;

    const contractAddress = getContractAddress(chainId);
    if (!contractAddress) return;

    try {
      setLoading(true);
      const contract = new ethers.Contract(contractAddress, getContractABI(), provider);
      
      // 获取用户拥有的所有 Token ID
      const tokenIds = await contract.tokensOfOwner(account);
      
      const nftList: NFT[] = [];
      for (const tokenId of tokenIds) {
        const tokenURI = await contract.tokenURI(tokenId);
        nftList.push({
          tokenId: Number(tokenId),
          tokenURI,
          owner: account,
        });
      }
      
      setNfts(nftList);
    } catch (error) {
      console.error('加载 NFT 失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNFTs();
  }, [provider, account, chainId]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          我的 NFT 画廊
        </h2>
        <button
          onClick={loadNFTs}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:bg-gray-400"
        >
          {loading ? '加载中...' : '刷新'}
        </button>
      </div>

      {loading && nfts.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      ) : nfts.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            您还没有任何 NFT
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.tokenId}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">#{nft.tokenId}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">NFT #{nft.tokenId}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                {nft.tokenURI}
              </p>
              <a
                href={nft.tokenURI}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                查看元数据 →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
