import { Outlet } from "react-router-dom";
import { useCallback, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./Layout.module.scss";
import Hero from "../../components/Hero/Hero";

const Layout = () => {
  const [shortHero, setShortHero] = useState<boolean>(false);

  const changeHeroSection: (short: boolean) => void = useCallback((short: boolean) => {
    setShortHero(short);
  }, [shortHero]);

  return (
    <>
      <div className="flex flex-col h-full">
        <NavBar className={styles.header} />
        <Hero short={shortHero} />
        <Outlet context={changeHeroSection}/>
      </div>
    </>
  );
};

export default Layout;
