"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import TechBackgroundMain from "@/assets/img/TechBackgroundMain.png";
import TechBackgroundImage1 from "@/assets/img/TechBackgroundImage1.svg";
import TechBackgroundImage2 from "@/assets/img/TechBackgroundImage2.svg";
import TechRectangle1 from "@/assets/img/TechRectangle1.svg";
import TechRectangle2 from "@/assets/img/TechRectangle2.svg";
import TechRectangle3 from "@/assets/img/TechRectangle3.svg";
import TechRectangle4 from "@/assets/img/TechRectangle4.svg";
import TechMain1 from "@/assets/img/TechMain1.svg";
import TechMain2 from "@/assets/img/TechMain2.svg";
import PreSaleArrow from "@/assets/img/PresaleArrow.svg";

import TechLowTransactionFeesIcon from "@/assets/img/TechLowTransactionFeesIcon.svg";
import TechSpeedOfOperationIcon from "@/assets/img/TechSpeedOfOperationIcon.svg";
import TechHugecommunityIcon from "@/assets/img/TechHugecommunityIcon.svg";
import TechSecurityIcon from "@/assets/img/TechSecurityIcon.svg";
import TechBalanceIcon from "@/assets/img/TechBalanceIcon.svg";
import TechEVMIcon from "@/assets/img/TechEVMIcon.png";

import classes from "./Tech.module.scss";

interface Reason {
  title: string;
  description: string;
}

const Tech: React.FC = () => {
  const { t } = useTranslation("tech");
  const reasons = t("reasons", { returnObjects: true }) as Reason[];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const icons = [
    TechLowTransactionFeesIcon,
    TechSpeedOfOperationIcon,
    TechEVMIcon,
    TechHugecommunityIcon,
    TechSecurityIcon,
    TechBalanceIcon,
  ];

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper}>
        <Image
          src={TechBackgroundMain}
          alt="Background pattern"
          fill
          className={classes.bg}
          priority
        />
      </div>

      <section id="tech" className={classes.tech}>
        <Image
          src={TechBackgroundImage1}
          alt=""
          className={classes.bgImage1}
          priority
        />
        <Image
          src={TechBackgroundImage2}
          alt=""
          className={classes.bgImage2}
          priority
        />

        <div className={classes.header}>
          <h2 className={classes.title}>{t("title")}</h2>
          <button className={classes.learnMore}>
            {t("learnMore")}
            <span className={classes.arrow}>
              <Image src={PreSaleArrow} alt="" width={12} height={12} />
            </span>
          </button>
        </div>

        <div className={classes.row}>
          <div className={classes.textBlock}>
            <h3 className={classes.label}>{t("blockchainLabel")}</h3>
            <h2 className={classes.heading}>{t("blockchainHeading")}</h2>

            <div
              className={classes.subheading}
              dangerouslySetInnerHTML={{ __html: t("blockchainSubheading") }}
            />

            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: t("blockchainDescription") }}
            />
          </div>
          <div className={classes.imageBlock}>
            <Image src={TechMain1} alt="" priority />
          </div>
        </div>

        <div className={classes.rowReverse}>
          <div className={classes.imageBlock}>
            <Image src={TechMain2} alt="" priority />
          </div>
          <div className={classes.textBlock}>
            <h3 className={classes.label}>{t("bscLabel")}</h3>
            <h4 className={classes.heading}>{t("bscHeading")}</h4>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: t("bscDescription") }}
            />
            <button className={classes.learnMoreSmall}>
              {t("learnMore")}
              <span className={classes.arrow}>
                <Image src={PreSaleArrow} alt="" width={12} height={12} />
              </span>
            </button>
          </div>
        </div>

        <h3 className={classes.reasonsTitle}>{t("reasonsHeading")}</h3>
        <div className={classes.reasonsGrid}>
          {reasons.map((r, i) => (
            <div key={i} className={classes.reasonCard}>
              <div className={classes.iconWrapper}>
                <Image
                  src={icons[i]}
                  alt={`${r.title} icon`}
                  width={32}
                  height={32}
                  className={classes.icon}
                />
              </div>
              <h4 className={classes.reasonTitle}>{r.title}</h4>
              <p className={classes.reasonDesc}>{r.description}</p>
            </div>
          ))}
        </div>

        <Image
          src={TechRectangle1}
          alt=""
          className={classes.rect1}
          priority
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />
        <Image
          src={TechRectangle2}
          alt=""
          className={classes.rect2}
          priority
          width={isMobile ? 30 : undefined}
          height={isMobile ? 30 : undefined}
        />
        <Image
          src={TechRectangle3}
          alt=""
          className={classes.rect3}
          priority
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />
        <Image
          src={TechRectangle4}
          alt=""
          className={classes.rect4}
          priority
          width={isMobile ? 30 : undefined}
          height={isMobile ? 30 : undefined}
        />
      </section>
    </div>
  );
};

export default Tech;
