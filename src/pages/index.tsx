"use client";
import Footer from "@/components/Footer/Footer";
import Contact from "@/components/Main/Contact";
import Features from "@/components/Main/Features";
import Hero from "@/components/Main/Hero";
import Partners from "@/components/Main/Partners";
import Presale from "@/components/Main/Presale";
import PriceGrowth from "@/components/Main/PriceGrowth";
import ReferAFriend from "@/components/Main/ReferAFriend";
import Roadmap from "@/components/Main/Roadmap";
import Staking from "@/components/Main/Staking";
import Teams from "@/components/Main/Teams";
import Tech from "@/components/Main/Tech";
import Tokenomics from "@/components/Main/Tokenomics";
import TokenomicsEcosystem from "@/components/Main/TokenomicsEcosystem";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "nav",
        "hero",
        "presale",
        "staking",
        "refer",
        "tokenomics",
        "tokenomicsEcosystem",
        "priceGrowth",
        "roadmap",
        "features",
        "team",
        "tech",
        "partners",
        "contact",
        "footer",
      ])),
    },
  };
}

export default function Home() {
  const [hasMinimumPurchased, setHasMinimumPurchased] =
    useState<boolean>(false);
  const [balanceOf, setBalanceOf] = useState(0);
  const [referAddres, setReferAddress] = useState("");
  const [userSpendUsdc, setUserSpendUsdc] = useState("");
  return (
    <div>
      <div className="container">
        <Hero />
      </div>
      <Presale
        setHasMinimumPurchased={setHasMinimumPurchased}
        setBalanceOf={setBalanceOf}
        setReferAddress={setReferAddress}
        referAddres={referAddres}
        setUserSpendUsdc={setUserSpendUsdc}
      />
      <Staking
        setHasMinimumPurchased={setHasMinimumPurchased}
        hasMinimumPurchased={hasMinimumPurchased}
        setBalanceOf={setBalanceOf}
        balanceOf={balanceOf}
      />
      <ReferAFriend referAddres={userSpendUsdc} />
      <Tokenomics />
      <TokenomicsEcosystem />
      <PriceGrowth />
      <Roadmap />
      <Features />
      <Teams />
      <Tech />
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
}
