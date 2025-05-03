import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-truffle5";
require("dotenv").config();

/* -------------------------------------------------------------------------- */
/*                               E N V  V A R S                               */
/* -------------------------------------------------------------------------- */

const PRIVATE_KEY            = process.env.PRIVATE_KEY            ?? "";
const RSK_MAINNET_RPC_URL    = process.env.RSK_MAINNET_RPC_URL    ?? "";
const RSK_TESTNET_RPC_URL    = process.env.RSK_TESTNET_RPC_URL    ?? "";
const BLOCKSCOUT_API_KEY     = process.env.BLOCKSCOUT_API_KEY     ?? "";

/* -------------------------------------------------------------------------- */
/*                               H A R D H A T                                */
/* -------------------------------------------------------------------------- */

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.25",
    settings: {
      evmVersion: "london",
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    /** Rootstock main-net */
    rsk: {
      url: RSK_MAINNET_RPC_URL,
      chainId: 30,
      accounts: [PRIVATE_KEY],
    },
    /** Rootstock test-net */
    rskTestnet: {
      url: RSK_TESTNET_RPC_URL,
      chainId: 31,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      rsk: BLOCKSCOUT_API_KEY,
      rskTestnet: BLOCKSCOUT_API_KEY,
    },
    customChains: [
      {
        network: "rsk",
        chainId: 30,
        urls: {
          apiURL: "https://blockscout.com/rsk/mainnet/api",
          browserURL: "https://blockscout.com/rsk/mainnet",
        },
      },
      {
        network: "rskTestnet",
        chainId: 31,
        urls: {
          apiURL: "https://blockscout.com/rsk/testnet/api",
          browserURL: "https://blockscout.com/rsk/testnet",
        },
      },
    ],
  },
  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },
  typechain: { target: "truffle-v5" },
};

export default config;