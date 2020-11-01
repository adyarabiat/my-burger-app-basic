import React from "react";

import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  return (
    <Aux>
      <SideDrawer />
      <Toolbar />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
