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

const Staking = () => {
  const { t } = useTranslation("staking");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
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
              <span className={classes.value}>{t("balanceAmount")}</span>

              <span className={classes.label}>{t("stakeableLabel")}</span>
              <span className={classes.value}>{t("stakeableAmount")}</span>

              <button className={classes.cta}>
                {t("purchaseBalanceCTA")}
                <Image src={PreSaleArrow} alt="" width={7} />
              </button>
            </div>
          </div>
          <div className={classes.staking_boxTwo}>
            <div className={classes.card}>
              <span className={classes.label}>{t("percentOfPoolLabel")}</span>
              <span className={classes.value}>{t("percentOfPoolAmount")}</span>

              <span className={classes.label}>{t("totalStakedLabel")}</span>
              <span className={classes.value}>{t("totalStakedAmount")}</span>

              <button className={classes.cta}>
                {t("withdrawTokensCTA")}
                <Image src={PreSaleArrow} alt="" width={7} />
              </button>
            </div>
          </div>
          <div className={classes.staking_boxThree}>
            {" "}
            <div className={classes.card}>
              <span className={classes.label}>
                {t("estimatedRewardsLabel")}
              </span>
              <span className={classes.value}>{t("estimatedRewardsRate")}</span>

              <ul className={classes.notes}>
                <li>{t("rewardsRateDynamic")}</li>
                <li>{t("monthlyNote")}</li>
                <li>{t("dailyNote")}</li>
              </ul>
            </div>
          </div>
          <div className={classes.staking_boxFour}>
            {" "}
            <div className={classes.card}>
              <span className={classes.label}>{t("currentRewardsLabel")}</span>
              <span className={classes.value}>
                {t("currentRewardsAmount")}{" "}
                <small>{t("perEthBlockLabel")}</small>
              </span>
              <div className={classes.logoWrapper}>
                <Image src={DogWalkerLogo} alt="DogWalker" width={160} />
              </div>
            </div>
          </div>
          <div className={classes.staking_boxFive}>
            <div className={classes.card}>
              <span className={classes.label}>{t("totalRewardsLabel")}</span>
              <span className={classes.value}>{t("totalRewardsAmount")}</span>

              <button className={classes.ctaClaim}>
                <Image
                  src={StakingClaimRewardsButton}
                  alt="Reward button"
                  width={30}
                />
                {t("claimRewardsCTA")}
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
