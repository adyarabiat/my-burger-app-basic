import React, { Component } from "react";

import styles from "./Model.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

class Model extends Component {
  // To improve the performance we should not update the Model everytime we change something in the UI

  // So becouse of this we use shouldComponentUpdate
  // So it will check if the props.checkShow !== to the current props.checkShow So by that it means that we clicked on it and it will show so it check here always if the next one not the same as the prev one
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.checkShow !== this.props.checkShow ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.checkShow} click={this.props.modelClose} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.checkShow
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.checkShow ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Model;
