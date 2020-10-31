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
      <p>
        Current Price: <strong>{props.price.toFixed(2)} $</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            add={() => props.ingredientsAdd(ctrl.type)}
            remove={() => props.ingredientsRemove(ctrl.type)}
            disable={props.disable[ctrl.type]}
          />
        );
      })}
    </div>
  );
};

export default bulidControls;
