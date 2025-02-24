'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { monadTestnet } from '@/config/chains';

const queryClient = new QueryClient();

const config = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0]),
  },
  batch: {
    multicall: true,
  },
  // Add Monad Testnet to MetaMask if it doesn't exist
  chainMetadata: {
    [monadTestnet.id]: {
      chainId: monadTestnet.id,
      name: monadTestnet.name,
      nativeCurrency: monadTestnet.nativeCurrency,
      rpcUrls: monadTestnet.rpcUrls,
      blockExplorers: monadTestnet.blockExplorers,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
