import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary";

const checkoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1 style={{ width: "100%", textAlign: "center" }}>
        We hope it tastes well!
      </h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button btnType="Danger" click={props.checkoutCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" click={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
