import React from "react";

import styles from "./Button.module.css";

const button = (props) => {
  return (
    <button
      onClick={props.click}
      className={[styles.Button, styles[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default button;
