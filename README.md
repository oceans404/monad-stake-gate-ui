# Monad Staking-Gated App Template

A customizable template for building applications where content is gated behind MON token staking on the Monad blockchain.

> **Note:** This frontend template works with the [StakingGateFactory](https://github.com/oceans404/monad-app-stake-gate) smart contract.

![Monad Staking Gate Template](https://via.placeholder.com/800x400?text=Monad+Staking+Gate+Template)

## 🚀 Quickstart

### 1. Create Your Staking Contract

- Visit the [StakingGateFactory contract](https://testnet.monadexplorer.com/address/0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3?tab=Contract) on Monad Explorer
- Connect your wallet
- Select **Write Contract** → **createStakingGate**
- Enter your parameters:
  - `requiredStakeAmount`: Your desired MON amount (e.g., 0.0069)
  - `name`: A name for your app (e.g., "MyAwesomeApp")
- Execute the transaction and save your new contract address

Alternative methods:

**Using Forge/Cast (Command Line):**

```bash
cast send 0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3 "createStakingGate(uint256,string)" YOUR_STAKE_AMOUNT_IN_WEI "YOUR_APP_NAME" --account YOUR_ACCOUNT_NAME
```

Example (Creating a contract requiring 0.01 MON):

```bash
cast send 0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3 "createStakingGate(uint256,string)" 10000000000000000 "MyNewApp" --account monad
```

**Using Web3 JS/Ethers:**

```javascript
const factory = new ethers.Contract(
  '0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3',
  factoryAbi,
  signer
);

const tx = await factory.createStakingGate(
  ethers.utils.parseEther('0.01'),
  'MyNewApp'
);

const receipt = await tx.wait();
console.log(
  'New contract created at:',
  receipt.events[0].args.stakingGateAddress
);
```

### 2. Fork This Template

- Fork this repository to your GitHub account
- Clone to your local machine:

```bash
git clone [this repo]
cd [repo name]
npm install
```

### 3. Update Contract Address

- Open `src/hooks/useStakingContract.ts`
- Replace the `STAKING_CONTRACT_ADDRESS` value with your new contract address:

```typescript
// 🎯🎯🎯🎯 UPDATE ME!!!!!!!!
// update this to your app's staking contract, created with the above factory
export const STAKING_CONTRACT_ADDRESS = '0xYourNewContractAddressHere';
```

### 4. Customize Content

- Update public content in `src/components/PublicContent.tsx`
- Update gated content in `src/components/GatedContent.tsx`
- Modify app name, colors, and other branding elements

### 5. Deploy Your App

```bash
npm run build
```

Deploy the `out` directory to Vercel, Netlify, or your preferred hosting platform.

## ✨ Features

- **Wallet Connection**: Easy integration with Web3 wallets
- **Monad Integration**: Built specifically for Monad blockchain
- **Customizable Staking**: Set your own MON staking requirements
- **Public/Gated Content**: Clear separation between public and staker-only content
- **Responsive Design**: Works on all devices

## 📋 Template Structure

- `src/hooks/useStakingContract.ts` - Configure your staking contract address
- `src/components/PublicContent.tsx` - Content visible to everyone
- `src/components/GatedContent.tsx` - Content only visible to stakers
- `src/components/StakingInterface.tsx` - Interface for staking tokens
- `src/components/Header.tsx` - App header with wallet connection

## 🧰 Customization

### Multiple Staking Tiers

You could hypothetically create multiple staking contracts with different requirements and implement a tiered access system:

```typescript
// Example implementation for tiered access
const tierAccess = {
  basic: '0xContractAddress1', // 0.0069 MON
  premium: '0xContractAddress2', // 0.42 MON
  vip: '0xContractAddress3', // 1.0 MON
};
```

### Custom Styling

This template uses Tailwind CSS. Customize the styling by modifying the Tailwind configuration in `tailwind.config.js`.

## 🧪 Contract Information

This frontend template works with staking contracts created by the [StakingGateFactory](https://github.com/oceans404/monad-app-stake-gate).

### Factory Contract

- **Address**: `0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3`
- **Network**: Monad Testnet
- **Purpose**: Creates new staking contracts with customizable parameters

### Example Staking Contract

(you'll deploy your own using the factory above)

- **Address**: `0x22c453f438085008a9b9dbf4b418f7fd73df4350`
- **Name**: TestApp
- **Required Stake**: 0.0069 MON (6,900,000,000,000,000 wei)

### Finding Your Created Contracts

To get all contracts you've created:

```bash
cast call 0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3 "getStakingGatesByCreator(address)(address[])" YOUR_ADDRESS
```

### Interacting with Staking Contracts

To stake (exactly the required amount):

```bash
cast send YOUR_STAKING_CONTRACT_ADDRESS "stake()" --value YOUR_STAKE_AMOUNT_IN_WEI --account YOUR_ACCOUNT_NAME
```

To check if an address is a staker:

```bash
cast call YOUR_STAKING_CONTRACT_ADDRESS "isStaker(address)(bool)" ADDRESS_TO_CHECK
```

To withdraw your stake:

```bash
cast send YOUR_STAKING_CONTRACT_ADDRESS "withdraw()" --account YOUR_ACCOUNT_NAME
```

### Contract Information

To get information about a contract created by the factory:

```bash
cast call 0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3 "getContractInfo(address)(bool,uint256,string,address)" CONTRACT_ADDRESS
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

---

Made with ❤️ by [Steph](https://github.com/oceans404) for the Monad developer community
