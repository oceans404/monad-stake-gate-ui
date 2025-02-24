'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import {
  useStakingContract,
  STAKING_CONTRACT_ADDRESS,
} from '@/hooks/useStakingContract';

export function StakingStatus() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const { isStaked, loading } = useStakingContract();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Staking Status</h2>
      <div className="prose max-w-none">
        {!isConnected ? (
          <p className="text-gray-600">
            Connect your wallet to check your staking status
          </p>
        ) : loading ? (
          <p className="text-gray-600">Checking your status...</p>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Your wallet has{' '}
              <span
                className={`font-medium ${
                  isStaked ? 'text-primary-600' : 'text-primary-400'
                }`}
              >
                {isStaked ? 'staked' : 'not staked'}
              </span>{' '}
              MON for this app
            </p>
            <p className="text-sm text-gray-500">
              Staking Contract:{' '}
              <a
                href={`https://testnet.monadexplorer.com/address/${STAKING_CONTRACT_ADDRESS}?tab=Contract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 underline"
              >
                {STAKING_CONTRACT_ADDRESS.slice(0, 6)}...
                {STAKING_CONTRACT_ADDRESS.slice(-4)}
              </a>
            </p>
            <div className="flex justify-center">
              <Link
                href={isStaked ? '/gated' : '/stake'}
                className="btn-primary"
              >
                {isStaked ? 'View Stake-gated Content' : 'Stake Now'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
