"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import classes from "./Presale.module.scss";
import { useEffect, useState } from "react";
import PresaleBackground from "@/assets/img/PresaleBackground.svg";
import PresaleDogTraces from "@/assets/img/PresaleDogTraces.svg";
import Vector from "@/assets/img/PreSaleVector.svg";
import TokenIcon from "@/assets/img/TokenIcon1.svg";
import RocketIcon from "@/assets/img/PresaleRocket.svg";
import PresaleDogLogo from "@/assets/img/PresaleDogLogo.svg";
import Ellipse from "@/assets/img/Ellipse 3.svg";
import Ellipse2 from "@/assets/img/Ellipse 4.svg";
import PreSaleArrow from "@/assets/img/PresaleArrow.svg";
import PreSaleRectangleRight from "@/assets/img/PreSaleRectangleRight.svg";
import PreSaleRectangleRightTwo from "@/assets/img/PreSaleRectangleRightTwo.svg";

const Presale: React.FC = () => {
  const { t } = useTranslation("presale");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper}>
        <Image
          src={PresaleBackground}
          alt=""
          fill
          className={classes.bg}
          priority
        />
      </div>

      <section className={classes.presale} id="pre-sale">
        <div className={classes.header}>
          <h2 className={classes.heading}>{t("heading")}</h2>
          <button className={classes.howToBuy}>
            {t("howToBuy")}
            <span className={classes.arrow}>
              <Image src={PreSaleArrow} alt="pre-sale arrow" width={7} />
            </span>
          </button>
        </div>
        <Image
          src={PresaleDogTraces}
          alt="Ślady psa w tle sekcji Pre-sale"
          className={classes.dogTraces}
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />

        <Image
          src={PreSaleRectangleRight}
          alt="Dekoracyjny prostokąt po prawej stronie"
          className={classes.rectangle}
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />

        <Image
          src={PreSaleRectangleRightTwo}
          alt="Drugi dekoracyjny prostokąt po prawej stronie"
          className={classes.rectangleSecond}
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
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

        <div className={classes.presale__box}>
          <div className={classes.presale__boxOne}>
            <div className={classes.priceBox}>
              <span className={classes.label}>{t("launchPriceLabel")}</span>
              <span className={classes.price}>{t("price")}</span>
              <span className={classes.listing}>
                {t("listingPriceLabel")}:{t("listingPrice")}
              </span>
              <Image
                src={Vector}
                alt="Dekoracyjny element wektorowy w tle sekcji Presale"
                className={classes.vector}
              />
              <Image
                src={PresaleDogLogo}
                alt="Logo psa w sekcji Presale"
                className={classes.dogLogo}
              />
            </div>
          </div>

          <div className={classes.presale__boxThree}>
            <div className={classes.progress}>
              <div className={classes.bar}>
                <div className={classes.filled} style={{ width: "20%" }} />
                <span className={classes.percentage}>10%</span>
              </div>
              <div className={classes.infoRow}>
                <span className={classes.sold}>
                  {t("soldLabel")} {t("soldAmount")}
                </span>
                <span className={classes.total}>
                  {t("totalLabel")} {t("totalAmount")}
                </span>
              </div>
            </div>
          </div>

          <div className={classes.presale__boxFour}>
            <div className={classes.timer}>
              <div className={classes.timerRow}>
                {["days", "hours", "mins", "secs"].map((u, i, arr) => (
                  <React.Fragment key={u}>
                    {/* wrapper dla liczby + etykiety */}
                    <div className={classes.unitGroup}>
                      <div className={classes.unitBox}>
                        {u === "days"
                          ? "3"
                          : u === "hours"
                          ? "12"
                          : u === "mins"
                          ? "28"
                          : "37"}
                      </div>
                      <div className={classes.unitLabel}>{t(u)}</div>
                    </div>
                    {/* dwukropek, poza ostatnim */}
                    {i < arr.length - 1 && (
                      <div className={classes.colon}>:</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <small className={classes.until}>
                <Image src={RocketIcon} alt="" />
                {t("until")}
              </small>
            </div>
          </div>

          <div className={classes.presale__boxFive}>
            <button className={classes.cta}>
              <span> {t("purchaseCTA")}</span>
            </button>
          </div>
        </div>

        <div className={classes.presale__foot}>
          <p className={classes.powered}>
            <span> {t("poweredPrefix")}</span>
            <span className={classes.poweredStrong}>
              <Image
                src={TokenIcon}
                alt="Ikona Tokenu"
                width={isMobile ? 24 : undefined}
                height={isMobile ? 24 : undefined}
              />
              TOKENUJ
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Presale;
