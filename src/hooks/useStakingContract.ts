import { useState, useEffect } from 'react';
import { parseEther, formatEther } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

// 🎯🎯🎯🎯 UPDATE ME!!!!!!!!
// UPDATE THIS TO THE ADDRESS OF THE STAKING CONTRACT YOU WANT TO USE, which you can create using the factory contract below
// Example StakingGate for "TestApp": https://testnet.monadexplorer.com/address/0x22C453f438085008A9B9dBf4b418F7Fd73DF4350?tab=Contract
export const STAKING_CONTRACT_ADDRESS =
  '0x22c453f438085008a9b9dbf4b418f7fd73df4350';

// No need to update this
// StakingGateFactory: https://testnet.monadexplorer.com/address/0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3?tab=Contract
// Use this factory to create a new StakingGate contract for your application
export const FACTORY_ADDRESS = '0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3';

// Basic ABI for the staking functions we need
const STAKING_ABI = [
  {
    name: 'isStaker',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'staker', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'stake',
    type: 'function',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'REQUIRED_STAKE_AMOUNT',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'getTotalStakers',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

export function useStakingContract(
  contractAddress: string = STAKING_CONTRACT_ADDRESS
) {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [isStaked, setIsStaked] = useState(false);
  const [requiredAmount, setRequiredAmount] = useState<string>('0');
  const [contractName, setContractName] = useState<string>('');
  const [totalStakers, setTotalStakers] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const contract = {
    address: contractAddress as `0x${string}`,
    abi: STAKING_ABI,
  };

  // Separate effect for public data
  useEffect(() => {
    async function fetchPublicData() {
      if (!publicClient || !contractAddress) return;
      try {
        const [amount, name] = await Promise.all([
          publicClient.readContract({
            address: contractAddress as `0x${string}`,
            abi: STAKING_ABI,
            functionName: 'REQUIRED_STAKE_AMOUNT',
          }),
          publicClient.readContract({
            address: contractAddress as `0x${string}`,
            abi: STAKING_ABI,
            functionName: 'name',
          }),
        ]);
        setRequiredAmount(formatEther(amount as bigint));
        setContractName(name as string);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching public data:', err);
        setError('Failed to load contract data');
        setLoading(false);
      }
    }
    fetchPublicData();
  }, [publicClient, contractAddress]);

  const refreshData = async () => {
    if (!contractAddress || !address || !publicClient) return;

    try {
      setLoading(true);
      setError(null);

      // First verify the contract exists
      const code = await publicClient.getBytecode({
        address: contractAddress as `0x${string}`,
      });

      if (!code) {
        setError('Contract not found at this address');
        return;
      }

      const [isUserStaked, amount, name, stakers] = await Promise.all([
        publicClient.readContract({
          ...contract,
          functionName: 'isStaker',
          args: [address],
        }),
        publicClient.readContract({
          ...contract,
          functionName: 'REQUIRED_STAKE_AMOUNT',
        }),
        publicClient.readContract({
          ...contract,
          functionName: 'name',
        }),
        publicClient.readContract({
          ...contract,
          functionName: 'getTotalStakers',
        }),
      ]);

      setIsStaked(isUserStaked as boolean);
      setRequiredAmount(formatEther(amount as bigint));
      setContractName(name as string);
      setTotalStakers(Number(stakers));
    } catch (err: any) {
      console.error('Contract interaction error:', err);
      setError(err.message || 'Failed to load staking data');
    } finally {
      setLoading(false);
    }
  };

  const stake = async () => {
    if (!walletClient || !address || !contractAddress || !publicClient) return;
    try {
      setLoading(true);
      setError(null);

      const tx = await walletClient.writeContract({
        ...contract,
        functionName: 'stake',
        value: parseEther(requiredAmount),
      });

      await publicClient.waitForTransactionReceipt({ hash: tx });
      await refreshData();
    } catch (err: any) {
      setError(err.message || 'Failed to stake');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async () => {
    if (!walletClient || !address || !contractAddress || !publicClient) return;
    try {
      setLoading(true);
      setError(null);

      const tx = await walletClient.writeContract({
        ...contract,
        functionName: 'withdraw',
      });

      await publicClient.waitForTransactionReceipt({ hash: tx });
      await refreshData();
    } catch (err: any) {
      setError(err.message || 'Failed to withdraw');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [contractAddress, address, publicClient]);

  return {
    isStaked,
    requiredAmount,
    contractName,
    totalStakers,
    loading,
    error,
    stake,
    withdraw,
    refreshData,
  };
}
