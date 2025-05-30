"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TeamRectangle1 from "@/assets/img/TeamRectangle1.svg";
import TeamRectangle2 from "@/assets/img/TeamRectangle2.svg";
import TeamRectangle3 from "@/assets/img/TeamRectangle3.svg";
import TeamRectangle4 from "@/assets/img/TeamRectangle4.svg";
import TeamsMailIcon from "@/assets/img/TeamsMailIcon.svg";
import TeamsPhoneIcon from "@/assets/img/TeamsPhoneIcon.svg";
import PreSaleArrow from "@/assets/img/TeamArrow.svg";

import classes from "./Teams.module.scss";

interface Member {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
}

const Teams: React.FC = () => {
  const { t } = useTranslation("team");
  const members = t("members", { returnObjects: true }) as Member[];

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const upd = () => setIsDesktop(window.innerWidth >= 992);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const slidesToShow = 5;
  const sliderSettings = {
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (idx: number) => setCurrent(idx),
  };

  const progressPercent = Math.min(100, ((current + 2) / members.length) * 100);

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper} />

      <section id="team" className={classes.teams}>
        {/* HEADER */}
        <div className={classes.teams__header}>
          <h2 className={classes.heading}>{t("heading")}</h2>
          <button className={classes.ctaBtn}>
            {t("becomeMember")}{" "}
            <span className={classes.arrow}>
              <Image src={PreSaleArrow} alt="" width={7} />
            </span>
          </button>
        </div>

        {/* KARTY */}
        <div className={classes.teams__box}>
          {isDesktop ? (
            <>
              <Slider {...sliderSettings}>
                {members.map((m, idx) => (
                  <div key={idx}>
                    <div className={classes.teams__memberCard}>
                      <div className={classes.avatarWrapper}>
                        <Image
                          src={m.avatar}
                          alt={m.name}
                          width={100}
                          height={100}
                          className={classes.avatar}
                        />
                      </div>
                      <h3 className={classes.name}>{m.name}</h3>
                      <span className={classes.role}>{m.role}</span>
                      <div className={classes.contact}>
                        <a
                          href={`mailto:${m.email}`}
                          className={classes.contactItem}
                        >
                          <Image
                            src={TeamsMailIcon}
                            alt="Mail icon"
                            width={16}
                            height={16}
                            className={classes.icon}
                          />
                          <span>{m.email}</span>
                        </a>
                        <a
                          href={`tel:${m.phone}`}
                          className={classes.contactItem}
                        >
                          <Image
                            src={TeamsPhoneIcon}
                            alt="Phone icon"
                            width={16}
                            height={16}
                            className={classes.icon}
                          />
                          <span>{m.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              {/* PROGRESS BAR */}
              <div className={classes.progressBar}>
                <div className={classes.progressTrack}>
                  <div
                    className={classes.progressFill}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            members.map((m, idx) => (
              <div key={idx} className={classes.teams__memberCard}>
                <div className={classes.avatarWrapper}>
                  <Image
                    src={m.avatar}
                    alt={m.name}
                    width={100}
                    height={100}
                    className={classes.avatar}
                  />
                </div>
                <h3 className={classes.name}>{m.name}</h3>
                <span className={classes.role}>{m.role}</span>
                <div className={classes.contact}>
                  <a href={`mailto:${m.email}`} className={classes.contactItem}>
                    <Image
                      src={TeamsMailIcon}
                      alt="Mail icon"
                      width={16}
                      height={16}
                      className={classes.icon}
                    />
                    <span>{m.email}</span>
                  </a>
                  <a href={`tel:${m.phone}`} className={classes.contactItem}>
                    <Image
                      src={TeamsPhoneIcon}
                      alt="Phone icon"
                      width={16}
                      height={16}
                      className={classes.icon}
                    />
                    <span>{m.phone}</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        <Image
          src={TeamRectangle1}
          alt=""
          className={classes.rectangle1}
          priority
          width={isMobile ? 150 : undefined}
          height={isMobile ? 150 : undefined}
        />
        <Image
          src={TeamRectangle2}
          alt=""
          className={classes.rectangle2}
          priority
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />
        <Image
          src={TeamRectangle3}
          alt=""
          className={classes.rectangle3}
          priority
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />
        <Image
          src={TeamRectangle4}
          alt=""
          className={classes.rectangle4}
          priority
          width={isMobile ? 65 : undefined}
          height={isMobile ? 65 : undefined}
        />
      </section>
    </div>
  );
};

export default Teams;
