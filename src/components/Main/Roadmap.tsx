"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./Roadmap.module.scss";
import RoadmapBackground from "@/assets/img/RoadmapBackground.svg";
import RoadmapEllipse1 from "@/assets/img/RoadmapEllipse1.svg";
import LearnMoreArrow from "@/assets/img/PresaleArrow.svg";

type Phase = { label: string; items: string[]; goal: string };

const Roadmap: React.FC = () => {
  const { t } = useTranslation("roadmap");
  const phases = t("phases", { returnObjects: true }) as Phase[];
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const upd = () => setIsDesktop(window.innerWidth >= 992);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const desktopSettings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: true,
    afterChange: (i: number) => setCurrent(i),
  };

  const progressPercent = Math.min(100, ((current + 2) / phases.length) * 100);

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper}>
        <Image src={RoadmapBackground} alt="" fill className={classes.bg} />
      </div>
      <section className={classes.roadmap} id="roadmap">
        {/* --- HEADER --- */}
        <div className={classes.header}>
          <h2 className={classes.title}>{t("title")}</h2>
          <button className={classes.learnMore}>
            {t("learnMore")}
            <span className={classes.arrow}>
              <Image src={LearnMoreArrow} alt="" width={12} height={12} />
            </span>
          </button>
        </div>
        <div className={classes.text}>
          <span className={classes.subtitle}>{t("subtitle")}</span>
          <h3 className={classes.heading}>{t("heading")}</h3>
          <p className={classes.description}>{t("description")}</p>
        </div>

        {/* --- KARTY --- */}
        <div className={classes.cards}>
          {isDesktop ? (
            <>
              <Slider {...desktopSettings}>
                {phases.map((p, i) => (
                  <div key={i}>
                    <div className={classes.card}>
                      <h4 className={classes.cardTitle}>{p.label}</h4>
                      <ul className={classes.list}>
                        {p.items.map((it, j) => (
                          <li key={j}>{it}</li>
                        ))}
                      </ul>
                      <div className={classes.goal}>
                        <span className={classes.goalEmoji}>✅</span>
                        <span className={classes.goalLabel}>
                          {t("goalLabel")}
                        </span>
                        <span className={classes.goalText}>{p.goal}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
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
            phases.map((p, i) => (
              <div key={i} className={classes.card}>
                <h4 className={classes.cardTitle}>{p.label}</h4>
                <ul className={classes.list}>
                  {p.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
                <div className={classes.goal}>
                  <span className={classes.goalLabel}>{t("goalLabel")} </span>
                  <span className={classes.goalText}>{p.goal}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <Image
          src={RoadmapEllipse1}
          alt="Roadmap ellipse image"
          width={400}
          height={400}
          className={classes.ellipse}
        ></Image>
      </section>
    </div>
  );
};

export default Roadmap;
