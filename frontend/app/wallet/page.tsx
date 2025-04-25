"use client";

import { motion } from "framer-motion";
import { AppLayout } from "../components/app-layout";
import GridBackground from "../components/GridBackground";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { useWallet } from "../providers/WalletProvider";

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { chain } = useNetwork();
  const { disconnect } = useWallet();

  return (
    <AppLayout showFooter={false}>
      <GridBackground />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container py-8"
        >
          <h1 className="mb-2 text-4xl font-bold">
            Wallet <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Dashboard</span>
          </h1>
          <p className="mb-8 text-muted-foreground">
            Manage your wallet and view your balances
          </p>

          <div className="space-y-6">
            {/* Network and Balance Info */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg text-card-foreground">
                {chain?.name || 'Aurora Testnet'}
              </div>
              <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg text-card-foreground">
                {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '0 ETH'}
              </div>
              {address && (
                <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg text-card-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  {`${address.slice(0, 6)}...${address.slice(-4)}`}
                </div>
              )}
            </div>

            {/* Wallet Details */}
            <div className="grid gap-6">
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <h3 className="text-lg font-semibold mb-2">Wallet Address</h3>
                <p className="font-mono text-sm text-muted-foreground break-all">
                  {address || 'Not Connected'}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <h3 className="text-lg font-semibold mb-2">Balance</h3>
                <p className="text-2xl font-bold">
                  {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '0 ETH'}
                </p>
              </div>

              <button 
                onClick={() => disconnect()}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors font-semibold"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
} 