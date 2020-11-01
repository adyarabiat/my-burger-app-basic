import React from "react";

import Logo from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

const logo = (props) => {
  // So here we receive a props in the style of the div, that is because we want to give the fit height depends where we are using the Logo So in general we can overwrite the css styling

  // so now it is the same as there is no height in the file
  return (
    <div className={styles.Logo} style={{ height: props.height }}>
      <img alt="Logo" src={Logo} />
    </div>
  );
};

export default logo;
