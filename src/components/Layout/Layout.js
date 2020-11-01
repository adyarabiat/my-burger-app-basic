import React from "react";

import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../Toolbar/Toolbar";

const layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
