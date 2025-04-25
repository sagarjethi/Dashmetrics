"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "./providers/WalletProvider";
import { AuthGuard } from "./providers/AuthGuard";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { Chain } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";

// Configure custom Aurora Testnet
const auroraTestnet: Chain = {
  id: 1313161555,
  name: "Aurora Testnet",
  network: "aurora-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://testnet.aurora.dev"] },
    default: { http: ["https://testnet.aurora.dev"] },
  },
  blockExplorers: {
    default: {
      name: "Aurora Explorer",
      url: "https://explorer.testnet.aurora.dev",
    },
  },
  testnet: true,
};

// Configure custom Sonic Blaze Testnet
const sonicBlazeTestnet: Chain = {
  id: 57054,
  name: "Sonic Blaze Testnet",
  network: "sonic-blaze-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "S",
    symbol: "S",
  },
  rpcUrls: {
    public: { http: ["https://rpc.blaze.soniclabs.com"] },
    default: { http: ["https://rpc.blaze.soniclabs.com"] },
  },
  blockExplorers: {
    default: {
      name: "Sonic Blaze Explorer",
      url: "https://explorer.blaze.soniclabs.com",
    },
  },
  testnet: true,
};

// Configure chains & providers
const { chains, publicClient } = configureChains(
  [auroraTestnet, sonicBlazeTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === auroraTestnet.id) {
          return { http: "https://testnet.aurora.dev" };
        }
        if (chain.id === sonicBlazeTestnet.id) {
          return { http: "https://rpc.blaze.soniclabs.com" };
        }
        return null;
      },
    }),
    publicProvider(),
  ]
);

// Configure wallets with MetaMask only
const { wallets } = getDefaultWallets({
  appName: 'Dashmetrics',
  projectId: 'dashmetrics-project',
  chains,
});

const connectors = connectorsForWallets([
  ...wallets
]);

// Create wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <WalletProvider>
              <AuthGuard>{children}</AuthGuard>
            </WalletProvider>
          </NextThemesProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
