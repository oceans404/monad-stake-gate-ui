'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { monadTestnet } from '@/config/chains';
import { useEffect, useState } from 'react';

export function ConnectButton() {
  const { address, isConnected, chain } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <button
        className="bg-gray-500 text-white text-sm font-medium py-2 px-4 rounded opacity-50"
        disabled
      >
        Loading...
      </button>
    );
  }

  const isWrongNetwork = chain?.id !== monadTestnet.id;

  if (isConnected) {
    if (isWrongNetwork) {
      return (
        <button
          onClick={() => switchChain({ chainId: monadTestnet.id })}
          className="btn-primary-sm"
        >
          Switch to Monad Testnet
        </button>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        connect({
          connector: injected(),
          chainId: monadTestnet.id,
        });
      }}
      className="btn-primary-sm"
    >
      Connect Wallet
    </button>
  );
}
