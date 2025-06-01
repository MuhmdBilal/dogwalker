import { icoAbi, icoAddress } from "@/contract/ico";
import { usdcAbi, usdcAddress } from "@/contract/usdc";
import { usdtAbi, usdtAddress } from "@/contract/usdt";
import  {dwtTokenAbi,dwtTokenAddress} from "@/contract/dwtToken"
import { stakingAbi, stakingAddress } from "@/contract/staking";
import Web3 from "web3";
// import Web3 from 'web3';

// // ✅ BSC Testnet RPC
// const fallbackRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
// let web3Instance: Web3 | null = null;

// export const getWeb3 = async (): Promise<Web3> => {
//   if (web3Instance) return web3Instance;

//   if (typeof window !== 'undefined' && (window as any).ethereum) {
//     try {
//       await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
//       web3Instance = new Web3((window as any).ethereum);
//       return web3Instance;
//     } catch (error) {
//       console.warn('MetaMask not connected. Using BSC Testnet fallback provider.');
//     }
//   }

//   web3Instance = new Web3(new Web3.providers.HttpProvider(fallbackRPC));
//   return web3Instance;
// };


// ✅ BSC Testnet RPC
const fallbackRPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";
let web3Instance: Web3 | null = null;

export const getWeb3 = async (): Promise<Web3> => {
  if (web3Instance) return web3Instance;

  // Check for MetaMask or mobile providers
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      // Request account access
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      // Mobile-specific check (MetaMask injects differently on mobile)
      if ((window as any).ethereum.isMetaMask) {
        web3Instance = new Web3((window as any).ethereum);

        // Mobile workaround: Listen for provider changes
        (window as any).ethereum.on("chainChanged", () =>
          window.location.reload()
        );
        (window as any).ethereum.on("accountsChanged", () =>
          window.location.reload()
        );

        return web3Instance;
      }
    } catch (error) {
      console.warn("MetaMask connection failed:", error);
    }
  }

  // Fallback to BSC Testnet RPC
  console.warn("Using fallback BSC Testnet provider");
  web3Instance = new Web3(new Web3.providers.HttpProvider(fallbackRPC));
  return web3Instance;
};

// Helper function for mobile deep linking
export const openInMetaMaskMobile = () => {
  const dappUrl = window.location.href;
  const metamaskAppDeepLink = `https://metamask.app.link/dapp/${encodeURIComponent(
    dappUrl
  )}`;
  window.open(metamaskAppDeepLink, "_blank");
};
export const getICOContract = async (): Promise<any | null> => {
  const web3 = await getWeb3();
  if (web3) {
    return new web3.eth.Contract(icoAbi as any, icoAddress);
  }
  return null;
};

export const getUSDCContract = async (): Promise<any | null> => {
  const web3 = await getWeb3();
  if (!web3) return null;
  return new web3.eth.Contract(usdcAbi as any, usdcAddress);
};

export const getUSDTContract = async (): Promise<any | null> => {
  const web3 = await getWeb3();
  if (!web3) return null;
  return new web3.eth.Contract(usdtAbi as any, usdtAddress);
};

export const getDwtToken = async (): Promise<any | null> => {
  const web3 = await getWeb3();
  if (!web3) return null;
  return new web3.eth.Contract(dwtTokenAbi as any, dwtTokenAddress);
};
export const getStaking = async (): Promise<any | null> => {
  const web3 = await getWeb3();
  if (!web3) return null;
  return new web3.eth.Contract(stakingAbi as any, stakingAddress);
};