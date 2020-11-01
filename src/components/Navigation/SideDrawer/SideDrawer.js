import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";

const sideDrawer = () => {
  return (
    <div className={styles.SideDrawer}>
      <Logo height="11%" />

      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
// we importing it in the layout component
