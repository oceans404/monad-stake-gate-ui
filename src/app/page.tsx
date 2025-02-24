'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GatedContent } from '@/components/GatedContent';
import {
  useStakingContract,
  STAKING_CONTRACT_ADDRESS,
} from '@/hooks/useStakingContract';
import { StakingStatus } from '@/components/StakingStatus';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { requiredAmount, loading, contractName } = useStakingContract();

  useEffect(() => {
    setMounted(true);
  }, []);

  const stakeAmount = loading ? '' : `Stake ${requiredAmount} MON`;
  const appName = loading ? '' : contractName;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">
          BUILDER TEMPLATE: Monad Staking-gated App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is a plug-and-play template to help developers to build MON-gated
          applications
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Public Content</h2>
          <p className="text-gray-600 mb-4">
            This section is public. Customize this to explain your application's
            value proposition. Show visitors why staking MON tokens will be
            worth their while.
          </p>
          <div className="prose max-w-none">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Customizable Staking Threshold
              </h3>
              <p className="text-purple-800 mb-2">
                {stakeAmount} to unlock this app's gated content
              </p>
              <a
                href={`https://testnet.monadexplorer.com/address/${STAKING_CONTRACT_ADDRESS}?tab=Contract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                View {appName} Contract on Explorer
              </a>
            </div>
            <div className="flex justify-center">
              <Link href="/stake" className="btn-primary">
                Go to Staking Interface
              </Link>
            </div>
          </div>
        </div>
        <StakingStatus />
      </div>

      <footer className="text-center text-gray-600 text-sm mt-12">
        Made with 💜 by{' '}
        <a
          href="https://github.com/oceans404"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700"
        >
          Steph
        </a>
      </footer>
    </main>
  );
}
