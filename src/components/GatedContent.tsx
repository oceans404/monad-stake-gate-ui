'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useStakingContract } from '@/hooks/useStakingContract';
import { formatEther } from 'viem';

export function GatedContent() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const { isStaked, loading, requiredAmount, contractName } =
    useStakingContract();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          Connect to Access Gated Content
        </h2>
        <p className="text-gray-600 mb-4">
          Please connect your wallet to check if you have access to the gated
          content.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Checking Access...</h2>
        <p className="text-gray-600">Verifying your staking status...</p>
      </div>
    );
  }

  if (!isStaked) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Gated Content Locked</h2>
        <p className="text-gray-600 mb-6">
          This content is only available to users who have staked{' '}
          {requiredAmount} MON tokens.
        </p>
        <Link
          href="/stake"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg inline-block"
        >
          Stake to Access
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gated Content</h2>
        <span className="badge-primary">Staker Only</span>
      </div>

      <div className="prose max-w-none">
        <h3>Welcome, {contractName} Staker!</h3>

        <div className="my-6 p-4 bg-purple-50 rounded-lg info-box">
          <h4 className="text-lg font-semibold mb-2 text-purple-900 info-heading">
            Staker-Only Content
          </h4>
          <p>
            This area only appears for users who have staked the required MON.
            Replace with your exclusive content, features, or tools.
          </p>
        </div>
      </div>
    </div>
  );
}
