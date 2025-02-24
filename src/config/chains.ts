import { defineChain } from 'viem';

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MONAD',
    symbol: 'MONAD',
  },
  rpcUrls: {
    default: {
      http: [
        'https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6',
      ],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.monad.xyz/' },
  },
  testnet: true,
});
