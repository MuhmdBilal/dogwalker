// pages/_app.tsx
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config";
import LayoutClient from "../components/More/LayoutClient";
import ContextProvider from "../context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// ✅ Wagmi & viem
import { WagmiConfig, createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Define BSC Testnet chain manually
const bscTestnet = {
  id: 97,
  name: "BSC Testnet",
  network: "bsc-testnet",
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    },
    public: {
      http: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
    },
  },
  testnet: true,
};

// ✅ Wagmi config
const queryClient = new QueryClient();

const config = createConfig({
  connectors: [
    injected(), // MetaMask, TrustWallet, etc.
  ],
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  ssr: true,
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MyApp({
  Component,
  pageProps,
}: AppProps & { pageProps: { cookies?: string } }) {
  const { cookies = null, ...restProps } = pageProps;

  return (
    <>
      <Head>
        <title>DogWalker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="container">
              <ContextProvider cookies={cookies}>
                <LayoutClient>
                  <Component {...restProps} />
                  <ToastContainer />
                </LayoutClient>
              </ContextProvider>
            </div>
          </div>
        </QueryClientProvider>
      </WagmiConfig>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }: any) => {
  const cookies = ctx.req?.headers?.cookie || null;
  return {
    pageProps: {
      cookies,
    },
  };
};

export default appWithTranslation(MyApp, nextI18NextConfig);
