import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.scss";
import DogWalkerLogo from "@/assets/img/DogWalkerLogo.svg";

const Logo = () => (
  <div className={styles.logo}>
    <Link href="#home">
      <Image src={DogWalkerLogo} alt="DogWalker Logo" width={157} height={40} />
    </Link>
  </div>
);

export default Logo;
