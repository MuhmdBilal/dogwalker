// config/index.tsx

import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { Chain } from "wagmi/chains"; // ✅ Correct import

// Define BSC Testnet
export const bscTestnet: Chain = {
  id: 56,
  name: "BNB Smart Chain",
  // network: "bsc",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: {
      http: ["https://bsc-dataseed.binance.org/"],
    },
    public: {
      http: ["https://bsc-dataseed1.binance.org/"],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
    },
  },
};

export const projectId = "b393768fdcb069b24001e1a01b396221";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [bscTestnet];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
