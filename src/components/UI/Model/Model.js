import React from "react";

import styles from "./Model.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const model = (props) => {
  return (
    <Aux>
      <Backdrop show={props.checkShow} click={props.modelClose} />
      <div
        className={styles.Modal}
        style={{
          transform: props.checkShow ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.checkShow ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default model;
