"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import classes from "./Footer.module.scss";

import DogWalkerLogo from "@/assets/img/FooterDogWalkerLogo.svg";
import XIcon from "@/assets/img/FooterXIcon.svg";
import TelegramIcon from "@/assets/img/FooterTelegramIcon.svg";
import LinkedInIcon from "@/assets/img/FooterLinkedinIcon.svg";

const Footer: React.FC = () => {
  const { t } = useTranslation("footer");

  const social = [
    { Icon: XIcon, label: "X", href: "https://twitter.com/DogWalker" },
    { Icon: TelegramIcon, label: "Telegram", href: "https://t.me/DogWalker" },
    {
      Icon: LinkedInIcon,
      label: "LinkedIn",
      href: "https://linkedin.com/company/DogWalker",
    },
  ];

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper} />
      <section id="footer" className={classes.footer}>
        <div className={classes.footer__box}>
          <div className={classes.logo}>
            <Image src={DogWalkerLogo} alt="DogWalker Logo" priority />
          </div>
          <div className={classes.social}>
            {social.map(({ Icon, label, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialLink}
              >
                <Image src={Icon} alt={label} />
              </a>
            ))}
          </div>
          <div
            className={classes.reserved}
            dangerouslySetInnerHTML={{ __html: t("reservedText") }}
          />
        </div>
      </section>
    </div>
  );
};

export default Footer;
