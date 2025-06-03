import { icoAbi, icoAddress } from "@/contract/ico";
import { usdcAbi, usdcAddress } from "@/contract/usdc";
import { usdtAbi, usdtAddress } from "@/contract/usdt";
import  {dwtTokenAbi,dwtTokenAddress} from "@/contract/dwtToken"
import { stakingAbi, stakingAddress } from "@/contract/staking";
import Web3 from "web3";
const fallbackRPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";
let web3Instance: Web3 | null = null;


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
export const openInMetaMaskMobile = (path = '') => {
  try {
    if (typeof window === 'undefined') {
      console.warn('Window object not available');
      return;
    }

    // Clean the path and URL
    const cleanPath = path.replace(/^\/|\/$/g, '');
    const cleanHost = window.location.hostname;
    const cleanUrl = cleanPath ? `${cleanHost}/${cleanPath}` : cleanHost;

    // Validate URL
    if (!cleanHost || !/^[a-zA-Z0-9.-]+$/.test(cleanHost)) {
      throw new Error(`Invalid hostname: ${cleanHost}`);
    }

    const metamaskDeepLink = `https://metamask.app.link/dapp/${cleanUrl}`;
    
    // Verify the link looks correct
    if (!metamaskDeepLink.startsWith('https://metamask.app.link/dapp/')) {
      throw new Error(`Generated invalid deeplink: ${metamaskDeepLink}`);
    }

    console.log('Attempting to open:', metamaskDeepLink);
    
    // Try to open the app
    window.location.assign(metamaskDeepLink);

    // Fallback with timeout
    setTimeout(() => {
      window.open(metamaskDeepLink, '_blank', 'noopener,noreferrer');
    }, 500);

  } catch (error: any) {
    console.error('Deeplink error:', error);
    throw new Error(`Failed to create MetaMask deeplink: ${error.message}`);
  }
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