import { icoAbi, icoAddress } from "@/contract/ico";
import { usdcAbi, usdcAddress } from "@/contract/usdc";
import { usdtAbi, usdtAddress } from "@/contract/usdt";
import  {dwtTokenAbi,dwtTokenAddress} from "@/contract/dwtToken"
import { stakingAbi, stakingAddress } from "@/contract/staking";
import Web3 from "web3";
const fallbackRPC = ["https://data-seed-prebsc-1-s1.binance.org:8545/", "https://bsc-testnet.public.blastapi.io", "https://bsc-testnet.drpc.org", "https://api.zan.top/bsc-testnet"];
let web3Instance: Web3 | null = null;

export const getWeb3 = async (): Promise<Web3> => {
  if (web3Instance) return web3Instance;

  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      const provider = (window as any).ethereum;
      await provider.request({ method: "eth_requestAccounts" });

      web3Instance = new Web3(provider);
      provider.on("chainChanged", () => window.location.reload());
      provider.on("accountsChanged", () => window.location.reload());

      return web3Instance;
    } catch (error) {
      console.warn("Ethereum provider connection failed:", error);
    }
  }

  // Fallback to BSC Testnet RPCs
  for (const rpcUrl of fallbackRPC) {
    try {
      const tempWeb3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
      const isListening = await tempWeb3.eth.net.isListening();
      if (isListening) {
        console.warn(`Connected to fallback RPC: ${rpcUrl}`);
        web3Instance = tempWeb3;
        return web3Instance;
      }
    } catch (err) {
      console.warn(`RPC failed: ${rpcUrl}`, err);
    }
  }

  throw new Error("All fallback RPCs failed.");
};

export const isMobile = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

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

export const isMetaMaskMobile = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && 
         !/MetaMaskMobile|FBAV|FBAN|FBIOS|Twitter/i.test(navigator.userAgent);
};


// Contract
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