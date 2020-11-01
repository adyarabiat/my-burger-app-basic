import React from "react";

import Logo from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

const logo = () => {
  return (
    <div className={styles.Logo}>
      <img alt="Logo" src={Logo} />
    </div>
  );
};

export default logo;
