import React from "react";

import styles from "./Button.module.css";

const button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.click}
      className={[styles.Button, styles[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default button;

// styles[props.btnType]

// it is the same as styles["Sucess"] or styles["Danger"] Becouse the value that we return from props.btnType it will be "Sucess" or "Danger" but we can not access it by saying style.'Danger' we have to change it to .Danger so the way we aceess by ["Sucess"] is better and dynamic ,which is the same as saying styles.Sucess or styles.Danger

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
