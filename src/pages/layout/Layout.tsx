import { Outlet, NavLink, Link } from "react-router-dom";

import styles from "./Layout.module.scss";
import { NavBar } from "../../components/NavBar/NavBar";
import { Hero } from "../../components/Hero/Hero";

const Layout = () => {
  return (
    <>
    
      {/* <Hero /> */}
      <div className="flex flex-col h-full">
            <NavBar className={styles.header}/>
            <Hero />
        {/* <header className={styles.header} role={"banner"}>
          <div className={styles.headerContainer}>
            <Link to="/" className={styles.headerTitleContainer}>
              <img
                src={porscheLogo}
                alt="Porsche logo"
                aria-label="Porsche logo"
                width="50rem"
              />
              <h3 className={styles.headerTitle}>Porsche Co-Driver</h3>
            </Link>
            <Link to="/" className={styles.headerTitleContainer}>
              <img
                src={porsche}
                alt="Porsche title"
                aria-label="Porsche title"
                width="200rem"
              />
            </Link>
            <nav>
              <ul className={styles.headerNavList}>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? styles.headerNavPageLinkActive
                        : styles.headerNavPageLink
                    }
                  >
                    Chat
                  </NavLink>
                </li>
                <li className={styles.headerNavLeftMargin}>
                  <NavLink
                    to="/qa"
                    className={({ isActive }) =>
                      isActive
                        ? styles.headerNavPageLinkActive
                        : styles.headerNavPageLink
                    }
                  >
                    Ask a question
                  </NavLink>
                </li>
                <li className={styles.headerNavLeftMargin}>
                  <a
                    href="https://github.com/ttrojanowski/co-driver-fe"
                    target={"_blank"}
                    title="Github repository link"
                  >
                    <img
                      src={github}
                      alt="Github logo"
                      aria-label="Link to github repository"
                      width="20px"
                      height="20px"
                      className={styles.githubLogo}
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header> */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
