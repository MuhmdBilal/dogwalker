"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import classes from "./Staking.module.scss";
import Image from "next/image";
import StakingBackgroundImage from "@/assets/img/StakingBackground.svg";
import StakingWykresImage from "@/assets/img/StakingWykres.svg";
import PreSaleArrow from "@/assets/img/PresaleArrow.svg";
import StakingRectangleBig from "@/assets/img/StakingRectangleBig.svg";
import StakingRectangleSmall from "@/assets/img/StakingRectangleSmall.svg";
import StakingDogLockImage from "@/assets/img/StakingDogLockImage.svg";
import StakingCircleLines from "@/assets/img/StakingCircleLines.svg";
import Ellipse from "@/assets/img/Ellipse 5.svg";
import Ellipse2 from "@/assets/img/Ellipse 6.svg";
import DogWalkerLogo from "@/assets/img/DogLogoWhite.svg";
import StakingClaimRewardsButton from "@/assets/img/StakingClaimRewardsButton.svg";
import { getDwtToken, getStaking, getWeb3, isMetaMaskMobile, openInMetaMaskMobile } from "@/utils/web3";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import Link from "next/link";
import { stakingAddress } from "@/contract/staking";
import { error } from "console";
const Staking = ({
  setHasMinimumPurchased,
  hasMinimumPurchased,
  setBalanceOf,
  balanceOf,
}: any) => {
  const { t } = useTranslation("staking");
  const [isMobile, setIsMobile] = useState(false);
  const [stakingContract, setStakingContract] = useState<any>("");
  const [dwtTokenContract, setDwtTokenContract] = useState<any>("");
  const [web3, setWeb3] = useState<any>(null);
  const [stakeData, setStakeData] = useState<any>(null);
  const [userPoolInfo, setUserPoolInfo] = useState<any>(null);
  const [rewardRate, setRewardRate] = useState<any>(null);
  const [rewardsRemaining, setRewardsRemaining] = useState(0);
  const { address, isConnected } = useAccount();
  const [accruedReward, setAccruedReward] = useState(0);
  const [isLockPeriodOver, setIsLockPeriodOver] = useState<boolean>(false);
  const [claimloading, setIsClaimLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);
  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const getTokenBalance = async () => {
    try {
      if (isConnected) {
        const balanceOf = await dwtTokenContract.methods
          .balanceOf(address)
          .call();
        const balanceOfFromWei = web3.utils.fromWei(Number(balanceOf), "ether");
        setBalanceOf(balanceOfFromWei);
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const getStakingValue = async () => {
    try {
      if (isConnected) {
        const getStakeData = await stakingContract.methods
          .getStakeData(address)
          .call();
        const amountFromWei = web3.utils.fromWei(
          Number(getStakeData.amount),
          "ether"
        );
        const claimableRewardFromWei = web3.utils.fromWei(
          Number(getStakeData.claimableReward),
          "ether"
        );
        setStakeData({
          totalStaked: amountFromWei,
          claimableReward: claimableRewardFromWei,
          claimed: getStakeData.claimed,
        });
        const getUserPoolInfo = await stakingContract.methods
          .getUserPoolInfo(address)
          .call();
        const userBalanceFromWei = web3.utils.fromWei(
          Number(getStakeData.userBalance),
          "ether"
        );
        const pctOfPoolFromWei = web3.utils.fromWei(
          Number(getUserPoolInfo.pctOfPool),
          "ether"
        );

        setUserPoolInfo({
          pctOfPool: pctOfPoolFromWei * 100,
          userBalance: userBalanceFromWei,
        });
        const getAccruedReward = await stakingContract.methods
          .getAccruedReward(address)
          .call();
        const accruedRewardFromWei = web3.utils.fromWei(
          Number(getAccruedReward),
          "ether"
        );
        setAccruedReward(accruedRewardFromWei);
        const isLockPeriodOver = await stakingContract.methods
          .isLockPeriodOver(address)
          .call();
        setIsLockPeriodOver(isLockPeriodOver);
        const hasMinimumPurchased = await stakingContract.methods
          .hasMinimumPurchased(address)
          .call();
        setHasMinimumPurchased(hasMinimumPurchased);
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const getRewardRatesHanlde = async () => {
    try {
      const getRewardRates = await stakingContract.methods
        .getRewardRates()
        .call();

      setRewardRate({
        apr: Number(getRewardRates.apr),
        dailyRate: Number(getRewardRates.dailyRate),
        monthlyRate: Number(getRewardRates.monthlyRate),
      });
      const rewardsRemaining = await stakingContract.methods
        .rewardsRemaining()
        .call();
      const amountFromWei = web3.utils.fromWei(
        Number(rewardsRemaining),
        "ether"
      );
      setRewardsRemaining(amountFromWei);
    } catch (e) {
      console.log("e", e);
    }
  };

  const handleClaim = async () => {
    try {
      if (!isConnected) {
        toast.error("Please connect MetaMask first");
        return;
      }
      if (!isLockPeriodOver) {
        toast.error(
          "Staking is still in progress. Please wait until the period ends."
        );
        return;
      }
      setIsClaimLoading(true);
      const claimReward = await stakingContract.methods
        .claimReward()
        .send({ from: address });
      if (claimReward) {
        getStakingValue();
        getTokenBalance();
        getRewardRatesHanlde();
        toast.success("Stake reward claimed successfully!");
      }
    } catch (e) {
      console.log("e", e);
      toast.error("SomeTing want wrong.Please try again");
    } finally {
      setIsClaimLoading(false);
    }
  };

  const handleUnstake = async () => {
    try {
      if (!isConnected) {
        toast.error("Please connect MetaMask first");
        return;
      }

      if (stakeData?.totalStaked <= 0) {
        toast.error("Unable to unstake: staked token amount is 0.");
        return;
      }
      setUnstakeLoading(true);
      const unstake = await stakingContract.methods
        .unstake()
        .send({ from: address });
      if (unstake) {
        getStakingValue();
        getTokenBalance();
        getRewardRatesHanlde();
        toast.success("Token unstaked successfully!");
      }
    } catch (e) {
      console.log("e", e);
      alert(e)
      toast.error("SomeTing want wrong.Please try again");
    } finally {
      setUnstakeLoading(false);
    }
  };
 
const handleStaking = async () => {
  try {
    if (!isConnected) {
      toast.error("Please connect MetaMask first");
      if (isMetaMaskMobile()) {
        openInMetaMaskMobile('staking');
      }
      return;
    }
      const web3 = await getWeb3();
    if (stakeData.totalStaked > 0) {
      toast.error(
        "You have already staked an amount. Additional staking is not allowed."
      );
      return;
    }

    setStakeLoading(true);
    
    // First check if we have a provider that can send transactions
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      toast.error("Please use MetaMask to perform this transaction");
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        openInMetaMaskMobile('staking');
      }
      return;
    }

    const allowance = await dwtTokenContract.methods
      .allowance(address, stakingAddress)
      .call();
    
    const readableBalance = web3.utils.toWei(
      Math.floor(balanceOf).toString(),
      "ether"
    );
    
    const amountFromWei = web3.utils.fromWei(
      Number(allowance),
      "ether"
    );

    if (amountFromWei < balanceOf) {
      await dwtTokenContract.methods
        .approve(stakingAddress, readableBalance)
        .send({
          from: address,
        });
    }

    const stakes = await stakingContract.methods
      .stake(readableBalance)
      .send({ from: address });
      
    if (stakes) {
      toast.success("Token staked successfully!");
      getStakingValue();
      getTokenBalance();
      getRewardRatesHanlde();
    }
  } catch (e: any) {
    console.error("Staking error:", e);
    
    // Special handling for mobile errors
    if (e.message.includes("eth_sendTransaction") && isMetaMaskMobile()) {
      toast.error("Please open in MetaMask Mobile to complete transaction");
      openInMetaMaskMobile('staking');
    } else {
      toast.error("Something went wrong. Please try again");
    }
  } finally {
    setStakeLoading(false);
  }
};










  // const handleStaking = async () => {
  //   try {
  //     if (!isConnected) {
  //       toast.error("Please connect MetaMask first");
  //       return;
  //     }
  //     if (stakeData.totalStaked > 0) {
  //       toast.error(
  //         "You have already staked an amount. Additional staking is not allowed."
  //       );
  //       return;
  //     }
  //     setStakeLoading(true);
  //     const allowance = await dwtTokenContract.methods
  //       .allowance(address, stakingAddress)
  //       .call();
      
  //     const readableBalance = web3.utils.toWei(
  //       Math.floor(balanceOf).toString(),
  //       "ether"
  //     );
  //     const amountFromWei = web3.utils.fromWei(
  //       Number(allowance),
  //       "ether"
  //     );
  //     if (amountFromWei < balanceOf) {
  //       await dwtTokenContract.methods
  //         .approve(stakingAddress, readableBalance)
  //         .send({
  //           from: address,
  //         });
  //     }

  //     // if (approve) {
  //     const stakes = await stakingContract.methods
  //       .stake(readableBalance)
  //       .send({ from: address });
  //     if (stakes) {
  //       toast.success("Token staked successfully!");
  //       getStakingValue();
  //       getTokenBalance();
  //       getRewardRatesHanlde();
  //     }
  //     // }
  //   } catch (e) {
  //     console.log("e", e);
  //     alert(e)
  //     toast.error("SomeTing want wrong.Please try again");
  //   } finally {
  //     setStakeLoading(false);
  //   }
  // };
  useEffect(() => {
    if (stakingContract) {
      getRewardRatesHanlde();
    }
  }, [stakingContract]);
  useEffect(() => {
    if (stakingContract) {
      getStakingValue();
    }
  }, [stakingContract, isConnected]);
  useEffect(() => {
    if (dwtTokenContract) {
      getTokenBalance();
    }
  }, [dwtTokenContract, isConnected]);
const loadContracts = async () => {
      const dwtToken = await getDwtToken();
      const staking = await getStaking();
      const web3 = await getWeb3();
      setStakingContract(staking);
      setDwtTokenContract(dwtToken);
      setWeb3(web3);
    };
  useEffect(() => {
    if(isConnected){
      loadContracts();
    }
  }, [isConnected]);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // console.log("hasMinimumPurchased", hasMinimumPurchased);
  // console.log("balanceOf", balanceOf);

  return (
    <div className={classes.background}>
      <div className={classes.circleWrapper}>
        <Image src={StakingCircleLines} alt="Dekoracyjne okręgi" priority />
      </div>

      <div className={classes.bgWrapper}>
        <Image
          src={StakingBackgroundImage}
          alt=""
          fill
          className={classes.bg}
          priority
        />
      </div>

      <section className={classes.staking} id="staking">
        <div className={classes.header}>
          <h2 className={classes.heading}>{t("heading")}</h2>
          <button className={classes.howItWorks}>
            {t("howItWorks")}
            <span className={classes.arrow}>
              <Image src={PreSaleArrow} alt="" width={7} />
            </span>
          </button>
        </div>

        <Image
          src={StakingRectangleSmall}
          alt="Mały dekoracyjny prostokąt w tle sekcji staking"
          className={classes.rectangle}
        />

        <Image
          src={StakingRectangleBig}
          alt="Duży dekoracyjny prostokąt w tle sekcji staking"
          className={classes.rectangleSecond}
        />

        <Image
          src={Ellipse}
          alt="Dekoracyjna elipsa"
          className={classes.ellipse}
        />

        <Image
          src={Ellipse2}
          alt="Druga dekoracyjna elipsa"
          className={classes.ellipseTwo}
        />

        <div className={classes.staking__box}>
          <div className={classes.staking_boxOne}>
            <div className={classes.card}>
              <span className={classes.label}>{t("balanceLabel")}</span>
              <span className={classes.value}>
                {Number(balanceOf).toFixed(2)} DWT
              </span>

              <span className={classes.label}>{t("stakeableLabel")}</span>
              <span className={classes.value}>
                {Number(balanceOf).toFixed(2)} DWT
              </span>
              {hasMinimumPurchased ? (
                <button
                  className={classes.cta}
                  disabled={claimloading || unstakeLoading || stakeLoading}
                  onClick={handleStaking}
                >
                  {stakeLoading ? "Loading..." : "Stake"}
                </button>
              ) : (
                <button
                  className={classes.cta}
                  disabled={claimloading || unstakeLoading}
                >
                  <Link
                    href="#pre-sale"
                    style={{ display: "flex", gap: "8px" }}
                  >
                    {t("purchaseBalanceCTA")}
                    <Image src={PreSaleArrow} alt="" width={7} />
                  </Link>
                </button>
              )}
            </div>
          </div>
          <div className={classes.staking_boxTwo}>
            <div className={classes.card}>
              <span className={classes.label}>{t("percentOfPoolLabel")}</span>
              <span className={classes.value}>
                {userPoolInfo ? Number(userPoolInfo?.pctOfPool).toFixed(2) : "0.00"}%
                DWT
              </span>

              <span className={classes.label}>{t("totalStakedLabel")}</span>
              <span className={classes.value}>
                {stakeData ? Number(stakeData?.totalStaked).toFixed(2) : "0.00"} DWT
              </span>

              <button
                className={classes.cta}
                disabled={claimloading || unstakeLoading}
                onClick={handleUnstake}
              >
                {unstakeLoading ? "Loading..." : t("withdrawTokensCTA")}
              </button>
            </div>
          </div>
          <div className={classes.staking_boxThree}>
            {" "}
            <div className={classes.card}>
              <span className={classes.label}>
                {t("estimatedRewardsLabel")}
              </span>
              <span className={classes.value}>
                {rewardRate ? rewardRate.apr: "0.00"}% P/a
              </span>

              <ul className={classes.notes}>
                <li>{t("rewardsRateDynamic")}</li>
                <li>
                  {t("monthlyNote")} 1.25% &nbsp;{t("reward")}{" "}
                </li>
                <li>
                  {t("dailyNote")} 0.041% &nbsp;{t("reward")}
                </li>
              </ul>
            </div>
          </div>
          <div className={classes.staking_boxFour}>
            {" "}
            <div className={classes.card}>
              <span className={classes.label}>{t("currentRewardsLabel")}</span>
              <span className={classes.value}>
                {Number(rewardsRemaining).toFixed(2)}{" "}
              </span>
              <div className={classes.logoWrapper}>
                <Image src={DogWalkerLogo} alt="DogWalker" width={160} />
              </div>
            </div>
          </div>
          <div className={classes.staking_boxFive}>
            <div className={classes.card}>
              <span className={classes.label}>{t("totalRewardsLabel")}</span>
              <span className={classes.value}>
                {accruedReward && Number(accruedReward).toFixed(2)} DWT
              </span>

              <button
                className={classes.ctaClaim}
                onClick={handleClaim}
                disabled={claimloading || unstakeLoading}
              >
                {claimloading ? (
                  "Loading..."
                ) : (
                  <>
                    <Image
                      src={StakingClaimRewardsButton}
                      alt="Reward button"
                      width={30}
                    />
                    {t("claimRewardsCTA")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={classes.staking__supplyFlex}>
          <div className={classes.staking__supply}>
            <div className={classes.staking__supplyLabel}>
              {t("totalSupplyLabel")}
            </div>
            <div className={classes.staking__supplyInside}>
              <Image src={StakingWykresImage} alt="wykres" />
            </div>
          </div>

          <div className={classes.staking__dogLock}>
            <Image
              src={StakingDogLockImage}
              alt="Ikona psa z kłódką symbolizująca staking"
              width={isMobile ? 200 : undefined}
              height={isMobile ? 200 : undefined}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staking;
