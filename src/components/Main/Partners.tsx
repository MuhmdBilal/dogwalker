"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import classes from "./Partners.module.scss";

import PartnersImage1 from "@/assets/img/PartnersImage1.svg";

const Partners: React.FC = () => {
  const { t } = useTranslation("partners");

  const logos = Array(5).fill(PartnersImage1);

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper} />

      <section id="partners" className={classes.partners}>
        <h2 className={classes.heading}>{t("heading")}</h2>

        <div className={classes.partners__box}>
          {logos.map((Logo, idx) => (
            <div key={idx} className={classes.logoWrapper}>
              <Image src={Logo} alt={`${t("heading")} ${idx + 1}`} priority />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Partners;
