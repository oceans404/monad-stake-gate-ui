'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  useStakingContract,
  STAKING_CONTRACT_ADDRESS,
} from '@/hooks/useStakingContract';

export default function StakingPage() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const {
    requiredAmount,
    contractName,
    totalStakers,
    loading,
    error,
    isStaked,
    stake,
    withdraw,
  } = useStakingContract(STAKING_CONTRACT_ADDRESS);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Stake to use {contractName}</h1>

        {error && (
          <div className="bg-purple-50 border border-purple-200 text-purple-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!isConnected && (
          <div className="bg-primary-50 border border-primary-200 text-primary-700 px-4 py-3 rounded mb-4">
            Connect your wallet to start staking MON
          </div>
        )}

        <div className="space-y-4 mb-8 mt-50">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Status</span>
            <span
              className={`font-medium ${
                isConnected
                  ? isStaked
                    ? 'text-primary-600'
                    : 'text-primary-400'
                  : 'text-gray-400'
              }`}
            >
              {isConnected
                ? isStaked
                  ? 'Staked'
                  : 'Not Staked'
                : 'Wallet Not Connected'}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Required Amount</span>
            <span className="font-medium">{requiredAmount} MON</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Total Stakers</span>
            <span className="font-medium">{totalStakers}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Contract Address</span>
            <a
              href={`https://testnet.monadexplorer.com/address/${STAKING_CONTRACT_ADDRESS}?tab=Contract`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-800 underline"
            >
              {STAKING_CONTRACT_ADDRESS.slice(0, 6)}...
              {STAKING_CONTRACT_ADDRESS.slice(-4)}
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          {isStaked ? (
            <button
              onClick={withdraw}
              disabled={loading || !isConnected}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Withdraw Stake'}
            </button>
          ) : (
            <button
              onClick={stake}
              disabled={loading || !isConnected}
              className="btn-primary"
            >
              {loading ? 'Processing...' : 'Stake Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
