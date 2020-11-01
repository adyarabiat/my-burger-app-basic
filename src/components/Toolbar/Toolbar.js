import React from "react";

import styles from "./Toolbar.module.css";
import Logo from "../../components/Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <div>Menu</div>
      <Logo height="80%" />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;

// we importing toolbar in the layout
