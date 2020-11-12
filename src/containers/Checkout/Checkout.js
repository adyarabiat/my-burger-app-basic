import React, { Component } from "react";
import { Route } from "react-router";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };
  componentDidMount() {
    // This all here just to change what we pass in the BurgerBuilder  => continueModel in the URL to be valid data and to pass all this thrrgh it to the chechout page

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        //['salad' , '1']
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  canceledHandler = () => {
    this.props.history.goBack();
  };
  continuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.canceledHandler}
          checkoutContinued={this.continuedHandler}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          render={() => (
            <ContactData
              ingre={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;

// Check the Route in the return it is a simple way to pass props to the from here to the component we want like normal but inside our Route
