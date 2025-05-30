// components/Main/TokenomicsEcosystem.tsx
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import classes from "./TokenomicsEcosystem.module.scss";

import TokenomicsEcosystemBackground from "@/assets/img/TokenomicsEcosystemBackground.svg";
import TokenomicEcosystemDogImage from "@/assets/img/TokenomicEcosystemDogImage.svg";

const TokenomicsEcosystem: React.FC = () => {
  const { t } = useTranslation("tokenomicsEcosystem");

  return (
    <div className={classes.ecoBackground}>
      <div className={classes.bgWrapper}>
        <Image
          src={TokenomicsEcosystemBackground}
          alt="Background pattern"
          fill
          className={classes.bg}
          priority
        />
      </div>

      <section id="tokenomics-ecosystem" className={classes.eco}>
        <div className={classes.content}>
          <div className={classes.text}>
            <h3 className={classes.label}>{t("tokenomicsEcosystemLabel")}</h3>
            <h2 className={classes.heading}>{t("characteristicsHeading")}</h2>
            <p
              className={classes.description}
              dangerouslySetInnerHTML={{
                __html: t("characteristicsDescription"),
              }}
            />
            <p className={classes.subheading}>{t("thisSolutionLabel")}</p>
            <ul className={classes.list}>
              <li>{t("solutionItem1")}</li>
              <li>{t("solutionItem2")}</li>
              <li>{t("solutionItem3")}</li>
              <li>{t("solutionItem4")}</li>
            </ul>
          </div>
          <div className={classes.imageWrapper}>
            <Image
              src={TokenomicEcosystemDogImage}
              alt="Dog with ecosystem icons"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokenomicsEcosystem;
