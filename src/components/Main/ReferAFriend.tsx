import React from "react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./ReferAFriend.module.scss";
import ReferAFriendDogImage from "@/assets/img/ReferAFriendDogImage.svg";
import ReferAFriendRectangle1 from "@/assets/img/ReferAFriendRectangle1.svg";
import ReferAFriendRectangle2 from "@/assets/img/ReferAFriendRectangle2.svg";

const ReferAFriend = () => {
  const { t } = useTranslation("refer");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper} />
      <section className={classes.refer} id="refer-a-friend">
        <div className={classes.refer__box}>
          <div className={classes.refer__boxOne}>
            <div className={classes.refer__text}>
              <h2 className={classes.heading}>{t("heading")}</h2>
              <p className={classes.subheading}>{t("subheading")}</p>
            </div>
            <div className={classes.dogWrapper}>
              <Image
                src={ReferAFriendDogImage}
                alt=""
                className={classes.image}
                priority
              />
            </div>
          </div>

          <div className={classes.refer__boxTwo}>
            <div className={classes.inputGroup}>
              <input
                type="text"
                readOnly
                placeholder={t("inputPlaceholder")}
                className={classes.input}
              />
              <button className={classes.copyBtn}>{t("copyCTA")}</button>
            </div>
            <button className={classes.generateBtn}>{t("generateCTA")}</button>
          </div>
        </div>

        <Image
          src={ReferAFriendRectangle1}
          alt=""
          className={classes.rectangle}
          priority
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />
        <Image
          src={ReferAFriendRectangle2}
          alt=""
          className={classes.rectangleTwo}
          priority
          width={isMobile ? 70 : undefined}
          height={isMobile ? 70 : undefined}
        />
      </section>
    </div>
  );
};

export default ReferAFriend;
