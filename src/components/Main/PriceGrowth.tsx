import React from "react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./PriceGrowth.module.scss";
import PriceGrowthBackground from "@/assets/img/PriceGrowthBackground.png";
import PriceGrowthRocketIcon from "@/assets/img/PriceGrowthRocketIcon.svg";
import PriceGrowthDogIcon from "@/assets/img/PriceGrowthDogIcon.svg";
import PriceGrowthDogTracesImage from "@/assets/img/PriceGrowthDogTracesImage.svg";
import PriceGrowthRectangle1 from "@/assets/img/PriceGrowthRectangle1.svg";
import PriceGrowthRectangle2 from "@/assets/img/PriceGrowthRectangle2.svg";
import PriceGrowthRectangle3 from "@/assets/img/PriceGrowthRectangle3.svg";
import PriceGrowthRectangle4 from "@/assets/img/PriceGrowthRectangle4.svg";

const data = [
  {
    round: 1,
    price: "0.001",
    increase: "-",
    allocation: "5%",
    capital: "$500 000",
  },
  {
    round: 2,
    price: "0.012",
    increase: "+20%",
    allocation: "5%",
    capital: "$600 000",
  },
  {
    round: 3,
    price: "0.0144",
    increase: "+20%",
    allocation: "4%",
    capital: "$576 000",
  },
  {
    round: 4,
    price: "0.01728",
    increase: "+20%",
    allocation: "4%",
    capital: "$691 200",
  },
  {
    round: 5,
    price: "0.02074",
    increase: "+20%",
    allocation: "4%",
    capital: "$829 440",
  },
  {
    round: 6,
    price: "0.02489",
    increase: "+20%",
    allocation: "4%",
    capital: "$995 520",
  },
  {
    round: 7,
    price: "0.02987",
    increase: "+20%",
    allocation: "4%",
    capital: "$1 194 624",
  },
  {
    round: 8,
    price: "0.03585",
    increase: "+20%",
    allocation: "4%",
    capital: "$1 433 548",
  },
  {
    round: 9,
    price: "0.04302",
    increase: "+20%",
    allocation: "3%",
    capital: "$1 290 600",
  },
  {
    round: 10,
    price: "0.05162",
    increase: "+20%",
    allocation: "3%",
    capital: "$1 548 600",
  },
];

const PriceGrowth = () => {
  const { t } = useTranslation("priceGrowth");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalAllocation = data.reduce(
    (sum, row) => sum + parseInt(row.allocation),
    0
  );
  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper}>
        <Image
          src={PriceGrowthBackground}
          alt={t("alts.background")}
          fill
          className={classes.bg}
          priority
        />
      </div>

      <section id="token-price-growth" className={classes.growthSection}>
        <div className={classes.content}>
          <div className={classes.verticalLabel}>{t("verticalLabel")}</div>
          <div className={classes.headerText}>
            <h3 className={classes.label}>{t("label")}</h3>
            <p className={classes.subtitle}>{t("subtitle")}</p>
          </div>
          <div className={classes.tableWrapper}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>{t("headers.round")}</th>
                  <th>{t("headers.price")}</th>
                  <th>{t("headers.increase")}</th>
                  <th>{t("headers.allocation")}</th>
                  <th>{t("headers.capital")}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.round}>
                    <td>{t("row.round", { round: row.round })}</td>
                    <td>{row.price}</td>
                    <td>{row.increase}</td>
                    <td>{row.allocation}</td>
                    <td>{row.capital}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className={classes.totalRow}>
                  <td>{t("footer.allocationLabel")}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{totalAllocation}%</td>
                  <td>{t("footer.capitalTotal")}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <Image
          src={PriceGrowthRectangle1}
          alt={t("alts.rectangle1")}
          className={classes.rect1}
          width={isMobile ? 150 : undefined}
          height={isMobile ? 150 : undefined}
        />
        <Image
          src={PriceGrowthRectangle2}
          alt={t("alts.rectangle2")}
          className={classes.rect2}
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />
        <Image
          src={PriceGrowthRectangle3}
          alt={t("alts.rectangle3")}
          className={classes.rect3}
          width={isMobile ? 150 : undefined}
          height={isMobile ? 150 : undefined}
        />
        <Image
          src={PriceGrowthRectangle4}
          alt={t("alts.rectangle4")}
          className={classes.rect4}
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />
        <Image
          src={PriceGrowthDogIcon}
          alt={t("alts.dogIcon")}
          className={classes.dogIcon}
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />
        <Image
          src={PriceGrowthRocketIcon}
          alt={t("alts.rocketIcon")}
          className={classes.rocketIcon}
          width={isMobile ? 50 : undefined}
          height={isMobile ? 50 : undefined}
        />
        <Image
          src={PriceGrowthDogTracesImage}
          alt={t("alts.dogTraces")}
          className={classes.dogTraces}
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />
      </section>
    </div>
  );
};

export default PriceGrowth;
