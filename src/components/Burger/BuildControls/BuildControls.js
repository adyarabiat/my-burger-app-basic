import React from "react";

import styles from "./BulidControls.module.css";
import BuildControl from "../BuildControls/BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];

const bulidControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      {controls.map((ctrl) => {
        return <BuildControl key={ctrl.label} label={ctrl.label} />;
      })}
    </div>
  );
};

export default bulidControls;
