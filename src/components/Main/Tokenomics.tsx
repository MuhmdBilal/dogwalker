"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import classes from "./Tokenomics.module.scss";
import TokenomicsBackground from "@/assets/img/TokenomicsBackground.png";
import TokenomicsBackgroundInside1 from "@/assets/img/TokenomicsBackgroundInside1.svg";
import TokenomicsBackgroundInside2 from "@/assets/img/TokenomicsBackgroundInside2.svg";
import TokenomicsBackgroundInside3 from "@/assets/img/TokenomicsBackgroundInside3.svg";
import TokenomicsBackgroundInside4 from "@/assets/img/TokenomicsBackgroundInside4.svg";

const Tokenomics: React.FC = () => {
  const { t } = useTranslation("tokenomics");

  return (
    <section className={classes.tokenomics} id="tokenomics">
      <div className={classes.header}>
        <h2 className={classes.heading}>{t("heading")}</h2>
        <p className={classes.subheading}>{t("subheading")}</p>
      </div>

      <div className={classes.chartWrapper}>
        <div className={classes.ringsContainer}>
          {/* pełne tło */}
          <Image
            src={TokenomicsBackground}
            alt="Grid background behind tokenomics chart"
            className={classes.bg}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside1}
            alt="Tokenomics chart outer ring"
            className={classes.inner1}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside2}
            alt="Tokenomics chart middle ring"
            className={classes.inner2}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside3}
            alt="Tokenomics chart inner ring"
            className={classes.inner3}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside4}
            alt="Tokenomics chart centre gradient"
            className={classes.inner4}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
