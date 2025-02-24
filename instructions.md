# App Template with Staking Gate - Project Instructions

## Overview

I need a template for a Next.js application that integrates with my Monad staking contracts. This template should allow any app developer to easily:

1. Configure their specific staking contract address
2. Provide a staking/withdrawal interface
3. Gate access to certain content based on whether a user has staked

## Template Requirements

### Configuration Page

Create a simple configuration page that allows:

- Input for Factory Contract address (default: `0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3`)
- Input for Staking Contract address (no default, must be provided)
- Save these values to local storage for persistence
- Option to reset to default values

### Staking Interface Page

Create a staking interface that:

- Shows the name of the staking contract and required stake amount
- Displays whether the connected user has staked or not
- Provides a button to stake the required amount (if not staked)
- Provides a button to withdraw (if already staked)
- Shows current number of stakers
- Handles all errors gracefully with user-friendly messages

### Gated Content Page

Create a page that:

- Checks if the user has staked using `isStaker(userAddress)`
- If staked, shows the protected content
- If not staked, shows a message explaining they need to stake to access
- Includes a link to the staking page if they haven't staked

### Navigation and Layout

- Create a simple navbar that shows connection status and links to all pages
- Make all pages responsive for mobile and desktop
- Use a clean, minimal design with Tailwind CSS

## Technical Details

### Contract Interaction

The template should use these functions from the staking contract:

```solidity
// Key functions from StakingGate contracts
function isStaker(address staker) external view returns (bool);
function stake() external payable;
function withdraw() external;
function REQUIRED_STAKE_AMOUNT() external view returns (uint256);
function name() external view returns (string);
function getTotalStakers() external view returns (uint256);
```

### State Management

- Use React context to manage wallet connection and contract state
- Create a custom hook for staking contract interactions
- Store configuration in local storage

### Wallet Connection

- Support MetaMask and WalletConnect
- Configure for Monad Testnet (RPC: https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6)
- Handle connection errors gracefully

## Example Content for Gated Page

For demonstration purposes, the gated content page could show:

- A congratulatory message for being a staker
- The user's address and staking status
- Timestamp of when they first accessed the content
- Some placeholder "premium" content (images, text, etc.)

## Developer Experience

Make this template easy for other developers to use:

- Include clear comments throughout the code
- Provide a simple .env file for configuration
- Document how to customize the gated content
- Make the UI elements easily customizable via Tailwind classes

## Deployment Instructions

Include instructions for how to:

- Configure for production
- Deploy to Vercel or Netlify
- Update the staking contract address if needed

This template should serve as a starting point for any developer who wants to add staking-based access control to their Monad application.
