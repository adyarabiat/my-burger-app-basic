import React from "react";

import styles from "./Toolbar.module.css";
import Logo from "../../components/Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
  // there is an alternative way to pass a specifice height to Logo, which is by adding a div around it and then here in toolbar.css file add .logo{height="80%"} !! so that is another way of adding a css file
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle click={props.clicked} />
      <Logo height="80%" />
      <nav className={styles.DisktopOnley}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;

// we importing toolbar in the layout
