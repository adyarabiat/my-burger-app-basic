import React, { Component } from "react";

import styles from "./Model.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const Model = (props) => {
  // To improve the performance we should not update the Model everytime we change something in the UI

  // So becouse of this we use shouldComponentUpdate
  // So it will check if the props.checkShow !== to the current props.checkShow So by that it means that we clicked on it and it will show so it check here always if the next one not the same as the prev one
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.checkShow !== this.props.checkShow ||
  //     nextProps.children !== this.props.children
  //   );
  // }

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

// React.memo :

// React memo it allows us to optimize performance and only update the component when the props are component change.

// And it give us a second arrgument that we can pass to give our logic when to update

// Here we say check if that is true so it is the opposite to the one we use in the shouldComponentUpdate

export default React.memo(
  Model,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
