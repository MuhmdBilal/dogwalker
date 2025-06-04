import React from "react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./ReferAFriend.module.scss";
import ReferAFriendDogImage from "@/assets/img/ReferAFriendDogImage.svg";
import ReferAFriendRectangle1 from "@/assets/img/ReferAFriendRectangle1.svg";
import ReferAFriendRectangle2 from "@/assets/img/ReferAFriendRectangle2.svg";
import { useAccount } from "wagmi";
const ReferAFriend = ({ referAddres }: any) => {
  const { t } = useTranslation("refer");
  const [url, setUrl] = useState("");
  const { address } = useAccount();
const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [generateAddress, setGenerateAddress] = useState("");
  const handleGenerate = async () => {
    setGenerateAddress(`${url}?referr-address=${address}`);
  };
  

const copyToClipboard = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const handleCopy = () => {
  if (!generateAddress) return;
  try {
    copyToClipboard(generateAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  } catch (err) {
    console.error("Fallback copy failed:", err);
  }
};
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { protocol, host } = window.location;
      console.log("protocol", protocol);
      
      setUrl(`${protocol}//${host}`);
    }
  }, []);
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
                value={generateAddress}
              />
              <button
                className={classes.copyBtn}
                onClick={handleCopy}
                disabled={!generateAddress}
              >
               {copied ? t("copiedText") : t("copyCTA")}
              </button>
            </div>
            {referAddres > 0 && (
              <button className={classes.generateBtn} onClick={handleGenerate}>
                {t("generateCTA")}
              </button>
            )}
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
