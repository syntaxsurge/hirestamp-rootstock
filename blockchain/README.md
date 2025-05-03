# HireStamp Blockchain Package — Rootstock Edition

This folder is a **stand-alone Hardhat workspace** that compiles, tests and deploys the Solidity layer powering HireStamp on the Rootstock network.

- - -

## 📂 Folder Structure

| Path | Description |
| --- | --- |
| `contracts/` | Main contracts: `DIDRegistry`, `CredentialNFT`, `SubscriptionManager`. |
| `scripts/` | One idempotent deploy script per contract + shared helpers. |
| `.env.example` | Template listing every variable read by Hardhat & scripts. |
| `hardhat.config.ts` | Hardhat configuration for `rskTestnet`, `rskMainnet` and `localhost`. |

- - -

## 🛠 Prerequisites

```
pnpm install                 # install dependencies
cp .env.example .env         # create local env file
```

Edit `.env` and supply at minimum:

*   `ADMIN_ADDRESS`  — wallet granting `ADMIN_ROLE`.
*   `PLATFORM_ADDRESS`  — backend signer for platform-initiated mints.
*   `PRIVATE_KEY`  — matches `ADMIN_ADDRESS` (used by Hardhat CLI).
*   `SUBSCRIPTION_PRICE_WEI_BASE` / `PLUS`  — plan prices in wei.
*   `RSK_TESTNET_RPC_URL` or `RSK_MAINNET_RPC_URL`.
*   (optional) `BLOCKSCOUT_API_KEY` for explorer verification.

- - -

## 🔨 Compile & Type Generation

```
pnpm hardhat compile     # Solidity → bytecode / ABI
pnpm typechain           # (optional) generate TypeScript typings
```

- - -

## 🚀 Deployment Flow

Every script prints the deployed address and appends it to `deployment.log` so you can copy–paste the values into the main `.env`.

| #   | Script | Purpose |
| --- | --- | --- |
| 1   | `deployDIDRegistry.ts` | Deploys `DIDRegistry` and optionally pre-mints the platform DID. |
| 2   | `deployCredentialNFT.ts` | Deploys `CredentialNFT` and grants initial roles. |
| 3   | `deploySubscriptionManager.ts` | Deploys `SubscriptionManager` with plan prices. |

Example (Rootstock Testnet):

```
pnpm hardhat run scripts/deployDIDRegistry.ts          --network rskTestnet
pnpm hardhat run scripts/deployCredentialNFT.ts        --network rskTestnet
pnpm hardhat run scripts/deploySubscriptionManager.ts  --network rskTestnet
```

### Verification

If `BLOCKSCOUT_API_KEY` is set and you deploy to `rskMainnet` or `rskTestnet`, each script attempts automatic Blockscout verification.

- - -

## 📝 Environment Keys to Copy

| Purpose | Key |
| --- | --- |
| DID Registry address | `NEXT_PUBLIC_DID_REGISTRY_ADDRESS` |
| Credential NFT address | `NEXT_PUBLIC_CREDENTIAL_NFT_ADDRESS` |
| SubscriptionManager address | `NEXT_PUBLIC_SUBSCRIPTION_MANAGER_ADDRESS` |
| Platform DID (minted by script #1) | `NEXT_PUBLIC_PLATFORM_ISSUER_DID` |

- - -

## ❓ FAQ

*   **Which Rootstock chain IDs are pre-configured?** — Testnet `31` and Mainnet `30`.
*   **How do I change plan prices later?** — Call `SubscriptionManager.setPlanPrice()` from an `ADMIN_ROLE` address.
*   **How do I add a new issuer?** — Execute `CredentialNFT.grantRole(ISSUER_ROLE, )`.
*   **Want to test locally?** — Run `pnpm hardhat node`, then deploy scripts with `--network localhost`.

**Happy building on Rootstock 🚀**