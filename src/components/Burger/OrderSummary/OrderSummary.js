import React from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A deliciouse burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)} $</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Success" click={props.continue}>
        Continue
      </Button>
      <Button btnType="Danger" click={props.cancel}>
        Cancel
      </Button>
    </Aux>
  );
};

export default orderSummary;

// importing orderSummary in the Burger builder
