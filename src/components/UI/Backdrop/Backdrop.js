import React from "react";

import styles from "./Backdrop.module.css";

const backdrop = (props) => {
  return props.show ? (
    <div className={styles.Backdrop} onClick={props.click}></div>
  ) : null;
};

export default backdrop;

// I will import it in the Model becouse they always show up together
