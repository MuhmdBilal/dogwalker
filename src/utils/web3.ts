import { icoAbi, icoAddress } from "@/contract/ico";
import { usdcAbi, usdcAddress } from "@/contract/usdc";
import { usdtAbi, usdtAddress } from "@/contract/usdt";
import  {dwtTokenAbi,dwtTokenAddress} from "@/contract/dwtToken"
import { stakingAbi, stakingAddress } from "@/contract/staking";
import Web3 from "web3";
const fallbackRPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";
let web3Instance: Web3 | null = null;

// export const getWeb3 = async (): Promise<Web3> => {
//   if (web3Instance) return web3Instance;

//   // Check for MetaMask or mobile providers
//   if (typeof window !== "undefined" && (window as any).ethereum) {
//     try {
//       // Request account access
//       await (window as any).ethereum.request({ method: "eth_requestAccounts" });

//       // Mobile-specific check (MetaMask injects differently on mobile)
//       if ((window as any).ethereum.isMetaMask) {
//         web3Instance = new Web3((window as any).ethereum);

//         // Mobile workaround: Listen for provider changes
//         (window as any).ethereum.on("chainChanged", () =>
//           window.location.reload()
//         );
//         (window as any).ethereum.on("accountsChanged", () =>
//           window.location.reload()
//         );

//         return web3Instance;
//       }
//     } catch (error) {
//       console.warn("MetaMask connection failed:", error);
//     }
//   }

//   // Fallback to BSC Testnet RPC
//   console.warn("Using fallback BSC Testnet provider");
//   web3Instance = new Web3(new Web3.providers.HttpProvider(fallbackRPC));
//   return web3Instance;
// };

export const getWeb3 = async (): Promise<Web3> => {
  if (web3Instance) return web3Instance;

  // Check for any Ethereum provider
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      const provider = (window as any).ethereum;
      
      // Handle both desktop and mobile providers
      await provider.request({ method: "eth_requestAccounts" });
      
      web3Instance = new Web3(provider);

      // Add event listeners for changes
      provider.on("chainChanged", () => window.location.reload());
      provider.on("accountsChanged", () => window.location.reload());

      return web3Instance;
    } catch (error) {
      console.warn("Ethereum provider connection failed:", error);
      // Fall through to fallback
    }
  }

  // For mobile browsers that don't inject window.ethereum automatically
  if (typeof window !== "undefined" && (window as any).web3) {
    web3Instance = new Web3((window as any).web3.currentProvider);
    return web3Instance;
  }

  // Fallback to BSC Testnet RPC
  console.warn("Using fallback BSC Testnet provider");
  web3Instance = new Web3(new Web3.providers.HttpProvider(fallbackRPC));
  return web3Instance;
};

export const isMobile = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};
// Helper function for mobile deep linking
// web.ts (updated version)
export const openInMetaMaskMobile = (specificPath?: string) => {
  // Get the clean base URL without protocol
  let baseUrl = window.location.hostname;
  
  // Add path if needed (remove leading/trailing slashes)
  const path = specificPath 
    ? specificPath.replace(/^\/|\/$/g, '') 
    : window.location.pathname.replace(/^\/|\/$/g, '');
  
  // Construct the clean URL (without https:// and without encoded slashes)
  const cleanUrl = path ? `${baseUrl}/${path}` : baseUrl;
  
  // Create the proper deeplink
  const metamaskDeepLink = `https://metamask.app.link/dapp/${cleanUrl}`;
  
  console.log('MetaMask deeplink:', metamaskDeepLink); // For debugging
  
  // Try to open in app first
  window.location.href = metamaskDeepLink;
  
  // Fallback after a short delay
  setTimeout(() => {
    window.open(metamaskDeepLink, '_blank');
  }, 500);
};
export const isMetaMaskMobile = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && 
         !/MetaMaskMobile|FBAV|FBAN|FBIOS|Twitter/i.test(navigator.userAgent);
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