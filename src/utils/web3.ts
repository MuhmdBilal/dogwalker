import { icoAbi, icoAddress } from '@/contract/ico';
import { usdcAbi, usdcAddress } from '@/contract/usdc';
import { usdtAbi, usdtAddress } from '@/contract/usdt';
import Web3 from 'web3';

// ✅ BSC Testnet RPC
const fallbackRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
let web3Instance: Web3 | null = null;

export const getWeb3 = async (): Promise<Web3> => {
  if (web3Instance) return web3Instance;

  if (typeof window !== 'undefined' && (window as any).ethereum) {
    try {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      web3Instance = new Web3((window as any).ethereum);
      return web3Instance;
    } catch (error) {
      console.warn('MetaMask not connected. Using BSC Testnet fallback provider.');
    }
  }

  web3Instance = new Web3(new Web3.providers.HttpProvider(fallbackRPC));
  return web3Instance;
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