import React, { Component } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
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
          ingredients={this.props.ings}
          checkoutCanceled={this.canceledHandler}
          checkoutContinued={this.continuedHandler}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);

// Check the Route in the return it is a simple way to pass props to the from here to the component we want like normal but inside our Route
