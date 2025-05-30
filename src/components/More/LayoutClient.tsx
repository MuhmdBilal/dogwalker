"use client";

import { ReactNode, useState, useEffect } from "react";
import Nav from "@/components/Nav/Nav";
import BurgerMenu from "@/components/Nav/BurgerMenu";
import Ellipse1 from "@/assets/img/Ellipse 1.svg";
import Image from "next/image";
import styles from "./LayoutClient.module.scss";

export default function LayoutClient({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) setIsOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {" "}
      <div className={styles.ellipseWrapper}>
        <Image src={Ellipse1} alt="" width={700} height={700} priority />
      </div>
      <BurgerMenu isOpen={isOpen} handleOpen={toggleNav} />
      <Nav isOpen={isOpen} toggleNav={toggleNav} />
      <main>{children}</main>
    </>
  );
}
