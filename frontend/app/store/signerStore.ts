import { create } from "zustand";
import { ethers } from "ethers";
import { useWalletStore } from "./walletStore";

interface SignerStore {
  getSigner: () => ethers.JsonRpcSigner | null;
  getReadOnlyProvider: () => ethers.JsonRpcProvider;
}

export const useSignerStore = create<SignerStore>()((set, get) => ({
  getSigner: () => {
    const { signer } = useWalletStore.getState();
    return signer;
  },
  getReadOnlyProvider: () => {
    // Return a read-only provider for Aurora testnet
    return new ethers.JsonRpcProvider("https://testnet.aurora.dev");
  }
})); 