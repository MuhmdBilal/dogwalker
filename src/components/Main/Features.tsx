"use client";
import React from "react";
import Image from "next/image";
import classes from "./Feature.module.scss";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Link from "next/link";
import FeaturesBackground from "@/assets/img/FeaturesWorldBackground.png";
import FeaturesPhoneImage from "@/assets/img/FeaturesPhoneImage.svg";
import FeaturesAppStoreIcon from "@/assets/img/FeaturesAppStoreIcon.svg";
import FeaturesGooglePlayIcon from "@/assets/img/FeaturesGooglePlayIcon.svg";
import FeaturesPhoneHandsImage from "@/assets/img/FeaturesPhoneHandsImage.svg";
import FeaturesEllipse1 from "@/assets/img/FeaturesEllipse1.svg";
import FeaturesEllipse2 from "@/assets/img/FeaturesEllipse2.svg";

const Features = () => {
  const { t } = useTranslation("features");
  const [isMobile, setIsMobile] = useState(false);

  const features = t("features", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="features" className={classes.features}>
      <div className={classes.bgWrapper}>
        <Image
          src={FeaturesBackground}
          alt=""
          className={classes.bg}
          width={isMobile ? 500 : 1000}
          height={isMobile ? 500 : 1000}
        />
      </div>

      <div className={classes.header}>
        <h2 className={classes.title}>
          {t("title")} <span>{t("highlight")}</span>
        </h2>
      </div>

      <div className={classes.features__box}>
        <div className={classes.features__boxOne}>
          <h3 className={classes.sectionTitle}>{t("sectionTitle")}</h3>
          <ul className={classes.featureList}>
            {features.map((feature, index) => (
              <li
                key={index}
                className={`${classes.featureItem} ${
                  selected === index ? classes.active : ""
                }`}
                onClick={() => setSelected(index)}
              >
                <span>{feature.title}</span>
                <span className={classes.arrow}>→</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.features__boxTwo}>
          <Image
            src={FeaturesPhoneImage}
            alt="Phone Icon"
            className={classes.phone}
          />
          <div className={classes.featureText}>
            <div className={classes.textContent}>
              <h4>{features[selected].title}</h4>
              <p>{features[selected].description}</p>
            </div>
            <div className={classes.storeSection}>
              <p className={classes.storeLabel}>{t("googlePlay")}</p>
              <div className={classes.storeIcons}>
                <Link
                  href="https://apps.apple.com/app/idXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={FeaturesAppStoreIcon} alt="App Store" />
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={FeaturesGooglePlayIcon} alt="Google Play" />
                </Link>
              </div>
            </div>
          </div>
          <Image
            src={FeaturesPhoneHandsImage}
            alt="Phone Hands"
            className={classes.phoneHands}
          />
        </div>
      </div>

      <Image
        src={FeaturesEllipse1}
        alt=""
        className={classes.ellipse1}
        width={isMobile ? 300 : 550}
        height={isMobile ? 300 : 550}
      />
      <Image
        src={FeaturesEllipse2}
        alt=""
        className={classes.ellipse2}
        width={isMobile ? 300 : 450}
        height={isMobile ? 300 : 450}
      />
    </section>
  );
};

export default Features;
