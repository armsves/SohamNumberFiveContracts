# Soham N5 Contracts

A Hardhat project configured for deploying smart contracts to World Chain networks.

## Features

- **Hardhat 3** with Viem toolbox integration
- **World Chain Support** - Both testnet (Sepolia) and mainnet
- **TypeScript** configuration
- **Multiple Solidity profiles** for development and production
- **Contract verification** with Etherscan integration

## Networks

### World Chain Sepolia (Testnet)
- **Chain ID**: 4801
- **RPC URL**: https://worldchain-sepolia.g.alchemy.com/public
- **Block Explorer**: https://sepolia.worldscan.org/

### World Chain Mainnet
- **Chain ID**: 480
- **RPC URL**: https://worldchain-mainnet.g.alchemy.com/public
- **Block Explorer**: https://worldscan.org/

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your configuration:
```bash
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

## Usage

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Deploy to World Chain Sepolia
```bash
npx hardhat deploy --network worldSepolia
```

### Deploy to World Chain Mainnet
```bash
npx hardhat deploy --network worldMainnet
```

### Verify Contracts
```bash
npx hardhat verify --network worldSepolia <contract-address> <constructor-args>
```

## Solidity Profiles

- **Default**: Development profile with Solidity 0.8.28
- **Production**: Optimized build for deployments with 200 optimizer runs

To use production profile:
```bash
npx hardhat compile --solidity-profile production
```

## Project Structure

```
├── contracts/          # Smart contracts
├── scripts/            # Deployment scripts
├── test/               # Test files
├── hardhat.config.ts   # Hardhat configuration
└── README.md          # This file
```

## Environment Variables

- `PRIVATE_KEY`: Your wallet private key for deployments
- `ETHERSCAN_API_KEY`: API key for contract verification

## Security

- Never commit your `.env` file
- Use hardware wallets for mainnet deployments
- Always test on testnet before mainnet deployment

## Resources

- [World Chain Documentation](https://worldchain.org/docs)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Viem Documentation](https://viem.sh/)
