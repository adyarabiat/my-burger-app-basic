import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

// We change it to class based component to check the performance
// So to do so
// First we add componentDidUpdate to check when it is updating

const OrderSummary = (props) => {
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

export default OrderSummary;

// importing orderSummary in the Burger builder
