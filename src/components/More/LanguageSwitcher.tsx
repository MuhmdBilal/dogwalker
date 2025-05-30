"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchTo = (lng: string) => {
    if (lng !== currentLocale) {
      router.push(`/${lng}${pathname}`);
    }
  };

  return (
    <div>
      <button onClick={() => switchTo("pl")}>PL</button>
      <button onClick={() => switchTo("en")}>EN</button>
    </div>
  );
};

export default LanguageSwitcher;
