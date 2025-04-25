import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useSignerStore } from "@/app/store/signerStore";
import BettingABI from "@/abi/Betting.json";

// Use environment variable with fallback
const contractAddress = process.env.NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS || "0x930aE314a7285B7Cac2E5c7b1c59319837816D48";

export const useBettingService = () => {
  const { getSigner, getReadOnlyProvider } = useSignerStore();
  const { isConnected } = useAccount();

  const createBet = async (
    title: string,
    description: string,
    category: string,
    twitterHandle: string,
    endDate: number,
    joinAmount: number,
    initialPoolAmount: number,
    imageURL: string
  ) => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    console.log("Creating bet with parameters:", {
      title,
      description,
      category,
      twitterHandle,
      endDate,
      joinAmount,
      initialPoolAmount,
      imageURL,
    });

    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );
    const tx = await bettingContract.createBet(
      title,
      description,
      category,
      twitterHandle,
      endDate,
      ethers.parseEther(joinAmount.toString()),
      ethers.parseEther(initialPoolAmount.toString()),
      imageURL,
      {
        value:
          ethers.parseEther(joinAmount.toString()) +
          ethers.parseEther(initialPoolAmount.toString()),
      }
    );
    const receipt = await tx.wait();
    return receipt;
  };

  const joinBet = async (
    betId: number,
    support: boolean,
    betAmount: string = "1.0"
  ) => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    console.log("Joining bet with parameters:", {
      betId,
      support,
      betAmount,
    });

    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );

    const tx = await bettingContract.joinBet(betId, support, {
      value: ethers.parseEther(betAmount), // Use the provided bet amount
      gasLimit: 9000000,
    });
    const receipt = await tx.wait();
    return receipt;
  };

  const closeBet = async (betId: number, outcome: boolean) => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    
    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );
    const tx = await bettingContract.closeBet(betId, outcome);
    const receipt = await tx.wait();
    return receipt;
  };

  const withdraw = async () => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    
    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );
    const tx = await bettingContract.withdraw();
    const receipt = await tx.wait();
    return receipt;
  };

  const getAllBets = async () => {
    if (!isConnected || !getSigner()) {
      console.warn("Wallet not connected, using read-only provider...");

      // Try to use a read-only provider if wallet is not connected
      try {
        // Use the readOnlyProvider from signerStore
        const provider = getReadOnlyProvider();
        const bettingContract = new ethers.Contract(
          contractAddress,
          BettingABI,
          provider
        );
        const betCounter = await bettingContract.betCounter();
        // console.log("Bet counter (read-only mode):", betCounter);

        const bets = [];
        for (let i = 0; i < betCounter; i++) {
          const betDetails = await bettingContract.getBetDetailsAsStruct(i);
          bets.push({
            id: betDetails[0],
            creator: betDetails[1],
            amount: betDetails[2],
            title: betDetails[3],
            description: betDetails[4],
            category: betDetails[5],
            twitterHandle: betDetails[6],
            endDate: betDetails[7],
            initialPoolAmount: betDetails[8],
            imageURL: betDetails[9],
            isClosed: betDetails[10],
            supportCount: betDetails[11],
            againstCount: betDetails[12],
            outcome: betDetails[13],
          });
        }
        return bets;
      } catch (error) {
        console.error("Failed to use read-only provider:", error);
        return []; // Return empty array instead of throwing
      }
    }

    try {
      const bettingContract = new ethers.Contract(
        contractAddress,
        BettingABI,
        getSigner()
      );
      const betCounter = await bettingContract.betCounter();
      // console.log("Bet counter:", betCounter);
      const bets = [];
      for (let i = 0; i < betCounter; i++) {
        const betDetails = await bettingContract.getBetDetailsAsStruct(i);
        bets.push({
          id: betDetails[0],
          creator: betDetails[1],
          amount: betDetails[2],
          title: betDetails[3],
          description: betDetails[4],
          category: betDetails[5],
          twitterHandle: betDetails[6],
          endDate: betDetails[7],
          initialPoolAmount: betDetails[8],
          imageURL: betDetails[9],
          isClosed: betDetails[10],
          supportCount: betDetails[11],
          againstCount: betDetails[12],
          outcome: betDetails[13],
        });
      }
      return bets;
    } catch (error) {
      console.error("Error in getAllBets:", error);
      return []; // Return empty array on error rather than throwing
    }
  };

  const registerTwitterHandle = async (twitterHandle: string) => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    console.log("Registering Twitter handle:", twitterHandle);
    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );
    const tx = await bettingContract.registerTwitterHandle(twitterHandle);
    const receipt = await tx.wait();
    return receipt;
  };

  const buyBetCredits = async (amount: string) => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    if (parseFloat(amount) <= 0) {
      throw new Error("Must send some ether");
    }
    console.log("Buying bet credits with amount:", amount);
    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );
    const tx = await bettingContract.buyBetCredits({
      value: ethers.parseEther(amount),
    });
    const receipt = await tx.wait();
    return receipt;
  };

  const getUserBetCredits = async (user: string) => {
    if (!getSigner()) {
      console.warn("Wallet not connected, using read-only provider...");
      try {
        const provider = new ethers.JsonRpcProvider(
          "https://testnet.aurora.dev"
        );
        const bettingContract = new ethers.Contract(
          contractAddress,
          BettingABI,
          provider
        );
        const credits = await bettingContract.getUserBetCredits(user);
        return credits;
      } catch (error) {
        console.error("Failed to use read-only provider:", error);
        return BigInt(0); // Return 0 credits if we can't fetch
      }
    }

    console.log("Getting bet credits for user:", user);
    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      getSigner()
    );
    const userBetCredits = await bettingContract.getUserBetCredits(user);
    return userBetCredits;
  };

  const getTwitterHandleAddress = async (twitterHandle: string) => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    console.log("Getting address for Twitter handle:", twitterHandle);
    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );
    const address = await bettingContract.getTwitterHandleAddress(
      twitterHandle
    );
    return address;
  };

  const withdrawCredits = async (amount: string) => {
    const signer = getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    const userBetCredits = await getUserBetCredits(
      signer.address
    );
    if (parseFloat(userBetCredits) < parseFloat(amount)) {
      throw new Error("Insufficient bet credits");
    }
    console.log("Withdrawing bet credits with amount:", amount);
    const bettingContract = new ethers.Contract(
      contractAddress,
      BettingABI,
      signer
    );
    const tx = await bettingContract.withdrawCredits(ethers.parseEther(amount));
    const receipt = await tx.wait();
    return receipt;
  };

  return {
    createBet,
    joinBet,
    closeBet,
    withdraw,
    getAllBets,
    registerTwitterHandle,
    buyBetCredits,
    getUserBetCredits,
    getTwitterHandleAddress,
    withdrawCredits,
  };
};
