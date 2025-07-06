import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import "dotenv/config";

const config: HardhatUserConfig = {
  /*
   * In Hardhat 3, plugins are defined as part of the Hardhat config instead of
   * being based on the side-effect of imports.
   *
   * Note: A `hardhat-toolbox` like plugin for Hardhat 3 hasn't been defined yet,
   * so this list is larger than what you would normally have.
   */
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    /*
     * Hardhat 3 supports different build profiles, allowing you to configure
     * different versions of `solc` and its settings for various use cases.
     *
     * Note: Using profiles is optional, and any Hardhat 2 `solidity` config
     * is still valid in Hardhat 3.
     */
    profiles: {
      /*
       * The default profile is used when no profile is defined or specified
       * in the CLI or by the tasks you are running.
       */
      default: {
        version: "0.8.28",
      },
      /*
       * The production profile is meant to be used for deployments, providing
       * more control over settings for production builds and taking some extra
       * steps to simplify the process of verifying your contracts.
       */
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  /*
   * The `networks` configuration is mostly compatible with Hardhat 2.
   * The key differences right now are:
   *
   * - You must set a `type` for each network, which is either `edr` or `http`,
   *   allowing you to have multiple simulated networks.
   *
   * - You can set a `chainType` for each network, which is either `generic`,
   *   `l1`, or `optimism`. This has two uses. It ensures that you always
   *   connect to the network with the right Chain Type. And, on `edr`
   *   networks, it makes sure that the simulated chain behaves exactly like the
   *   real one. More information about this can be found in the test files.
   *
   * - The `accounts` field of `http` networks can also receive Configuration
   *   Variables, which are values that only get loaded when needed. This allows
   *   Hardhat to still run despite some of its config not being available
   *   (e.g., a missing private key or API key). More info about this can be
   *   found in the "Sending a Transaction to Optimism Sepolia" of the README.
   */
networks: {
    worldSepolia: {
      type: "http",
      chainType: "generic",
      url: "https://worldchain-sepolia.g.alchemy.com/public",
      accounts: [configVariable("PRIVATE_KEY")],
      chainId: 4801,
      gas: 2100000,
      gasPrice: 1000000000,
    },
    worldMainnet: {
      type: "http",
      chainType: "generic",
      url: "https://worldchain-mainnet.g.alchemy.com/public",
      accounts: [configVariable("PRIVATE_KEY")],
      chainId: 480,
      gas: 2100000,
      gasPrice: 1000000000,
    },
  },
  verify: {
    etherscan: {
      apiKey: configVariable("ETHERSCAN_API_KEY"),
      enabled: true,
    },
  },
  chainDescriptors: {
    4801: {
      name: "World Testnet",
      blockExplorers: {
        etherscan: {
          url: "https://sepolia.worldscan.org/",
          apiUrl: "https://api.etherscan.io/v2/api",
        },
      },
    },
    480: {
      name: "World Chain",
      blockExplorers: {
        etherscan: {
          url: "https://worldscan.org/",
          apiUrl: "https://api.etherscan.io/v2/api",
        },
      },
    },
  },
};

export default config;
