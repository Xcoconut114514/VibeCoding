'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFTMinter from '@/components/NFTMinter';
import NFTGallery from '@/components/NFTGallery';
import ContractInfo from '@/components/ContractInfo';

export default function Home() {
  const [account, setAccount] = useState<string>('');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [chainId, setChainId] = useState<number>(0);

  useEffect(() => {
    // 检查是否安装了 MetaMask
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert('请先安装 MetaMask!');
      return;
    }

    try {
      // 请求连接钱包
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);

      // 获取 signer
      const signer = await provider.getSigner();
      setSigner(signer);

      // 获取链 ID
      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));

      console.log('已连接账户:', accounts[0]);
      console.log('当前网络:', network.chainId);
    } catch (error) {
      console.error('连接钱包失败:', error);
      alert('连接钱包失败，请重试');
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setSigner(null);
    setChainId(0);
  };

  const switchNetwork = async (targetChainId: number) => {
    if (!provider) return;

    try {
      await provider.send('wallet_switchEthereumChain', [
        { chainId: `0x${targetChainId.toString(16)}` },
      ]);
      
      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));
    } catch (error: any) {
      // 如果网络不存在，添加网络
      if (error.code === 4902) {
        try {
          await provider.send('wallet_addEthereumChain', [getNetworkConfig(targetChainId)]);
        } catch (addError) {
          console.error('添加网络失败:', addError);
        }
      } else {
        console.error('切换网络失败:', error);
      }
    }
  };

  const getNetworkConfig = (chainId: number) => {
    const configs: { [key: number]: any } = {
      11155111: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Test Network',
        nativeCurrency: {
          name: 'SepoliaETH',
          symbol: 'SEP',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.sepolia.org'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
      },
      31337: {
        chainId: '0x7a69',
        chainName: 'Localhost 8545',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ['http://127.0.0.1:8545'],
        blockExplorerUrls: [],
      },
    };
    return configs[chainId];
  };

  const getNetworkName = (chainId: number) => {
    const networks: { [key: number]: string } = {
      1: 'Ethereum 主网',
      11155111: 'Sepolia 测试网',
      31337: '本地网络',
      137: 'Polygon 主网',
      80001: 'Mumbai 测试网',
    };
    return networks[chainId] || `未知网络 (${chainId})`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* 导航栏 */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎨 ERC721 NFT Minter
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {account ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getNetworkName(chainId)}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm font-medium">
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    断开连接
                  </button>
                </>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  连接钱包
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!account ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <svg
                className="mx-auto h-24 w-24 text-purple-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                欢迎使用 ERC721 NFT Minter
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                请连接您的钱包以开始铸造和管理您的 NFT
              </p>
              <button
                onClick={connectWallet}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                连接 MetaMask 钱包
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 网络切换 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">网络切换</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => switchNetwork(31337)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    chainId === 31337
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  本地网络
                </button>
                <button
                  onClick={() => switchNetwork(11155111)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    chainId === 11155111
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Sepolia 测试网
                </button>
              </div>
            </div>

            {/* 合约信息 */}
            <ContractInfo provider={provider} chainId={chainId} />

            {/* NFT 铸造 */}
            <NFTMinter signer={signer} account={account} chainId={chainId} />

            {/* NFT 画廊 */}
            <NFTGallery provider={provider} account={account} chainId={chainId} />
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © 2025 ERC721 NFT Minter. Built with Next.js & ethers.js
          </p>
        </div>
      </footer>
    </div>
  );
}
