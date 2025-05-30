"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Logo from "@/components/Nav/Logo";
import classes from "./Nav.module.scss";

import walletIcon from "@/assets/img/walletIcon.svg";
import languageIcon from "@/assets/img/languageIcon.svg";
import burgerIcon from "@/assets/img/burgerIcon.svg";
import { modal } from "@reown/appkit/react";
import { useAccount } from "wagmi";
type MenuItem = {
  href?: string;
  key: string;
  dropdown?: { href: string; key: string }[];
};

type NavProps = {
  isOpen: boolean;
  toggleNav: () => void;
};

const LANGUAGES = [
  { code: "en", labelKey: "language", label: "English" },
  { code: "pl", labelKey: "language", label: "Polski" },
];

export default function Nav({ isOpen, toggleNav }: NavProps) {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const { address, isConnected } = useAccount();
  // i18n hooks
  const { t: tc } = useTranslation("common");
  const { t: tn } = useTranslation("nav");

  // track desktop vs mobile
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 992);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // reset open submenu state when nav closes
  useEffect(() => {
    if (!isOpen) {
      setOpenModal(null);
      setOpenDropdown(null);
    }
  }, [isOpen]);

  // wrapper to toggle nav and clear submenu state
  const handleNavToggle = () => {
    toggleNav();
    setOpenModal(null);
    setOpenDropdown(null);
  };

  const currentPath = router.asPath;

  const menuItems: MenuItem[] = [
    {
      key: "invest.label",
      dropdown: [
        { href: "#pre-sale", key: "invest.items.presale" },
        { href: "#staking", key: "invest.items.staking" },
        { href: "#refer-a-friend", key: "invest.items.refer" },
      ],
    },
    {
      key: "about.label",
      dropdown: [
        { href: "#tokenomics", key: "about.items.tokenomics" },
        {
          href: "#tokenomics-ecosystem",
          key: "about.items.tokenomicsEcosystem",
        },
        {
          href: "#roadmap",
          key: "about.items.roadmap",
        },
        { href: "#features", key: "about.items.features" },
      ],
    },
    {
      key: "company.label",
      dropdown: [
        { href: "#team", key: "company.items.team" },
        { href: "#tech", key: "company.items.tech" },
        { href: "#partners", key: "company.items.partners" },
        { href: "#contact", key: "company.items.contact" },
      ],
    },
  ];

  const handleLinkClick = () => {
    handleNavToggle();
  };

  const switchLanguage = (code: string) => {
    setLangOpen(false);
    router.push(currentPath, currentPath, { locale: code });
  };

  const currentLang =
    LANGUAGES.find((l) => l.code === router.locale)?.label || tc("language");

  return (
    <>
      <header className={classes.header}>
        <Logo />
        <div className={classes.actions}>
          {/* Language selector */}
          <div className={classes.langWrapper}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className={classes.langBtn}
              aria-label={tc("language")}
            >
              <Image
                src={languageIcon}
                alt={tc("language")}
                width={20}
                height={20}
              />
              <span>{currentLang} ▾</span>
            </button>
            {langOpen && (
              <ul className={classes.langDropdown}>
                {LANGUAGES.map(({ code, label }) => (
                  <li key={code}>
                    <button
                      onClick={() => switchLanguage(code)}
                      className={router.locale === code ? classes.active : ""}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Connect Wallet */}
          <button className={classes.walletBtn} onClick={() => modal?.open()}>
            <Image src={walletIcon} alt="Wallet" width={16} height={16} />
            <span>
              {isConnected && address
                ? `${address.slice(0, 4)}...${address.slice(-4)}`
                : tc("connectWallet")}
            </span>
          </button>

          {/* Burger */}
          <button
            className={classes.menuBtn}
            onClick={handleNavToggle}
            aria-label={tc("menu")}
          >
            <Image src={burgerIcon} alt={tc("menu")} width={16} height={16} />
            <span>{tc("menu")}</span>
          </button>
        </div>
      </header>

      {/* Desktop dropdown */}
      {isDesktop && isOpen && (
        <div className={classes.desktopMenu}>
          <ul className={classes.menuDesktop}>
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className={classes.menuDesktopItem}
                onMouseEnter={() => setOpenDropdown(idx)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button>{tn(item.key)} ▾</button>
                {item.dropdown && openDropdown === idx && (
                  <ul className={classes.desktopDropdown}>
                    {item.dropdown.map((sub, sidx) => (
                      <li key={sidx} onClick={handleLinkClick}>
                        <Link href={sub.href}>{tn(sub.key)}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile inline submenu */}
      {!isDesktop && isOpen && (
        <nav className={`${classes.nav} ${classes.nav__show}`}>
          <div className={classes.nav__container}>
            <ul className={classes.menu}>
              {menuItems.map((item, idx) => (
                <li
                  key={idx}
                  className={`${classes.nav__item} ${
                    item.dropdown ? classes.menuItem : ""
                  }`}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className={classes.menuItemLabel}
                        onClick={() =>
                          setOpenModal(openModal === idx ? null : idx)
                        }
                      >
                        {tn(item.key)}
                      </button>
                      {openModal === idx && (
                        <ul className={classes.fullScreenModal}>
                          <button
                            className={classes.closeButton}
                            onClick={() => setOpenModal(null)}
                            aria-label={tc("closeSubmenu")}
                          >
                            ×
                          </button>
                          <h3 className={classes.modalTitle}>{tn(item.key)}</h3>
                          {item.dropdown.map((svc, j) => (
                            <li key={j}>
                              <Link href={svc.href} onClick={handleNavToggle}>
                                {tn(svc.key)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href!} onClick={handleNavToggle}>
                      {tn(item.key)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
