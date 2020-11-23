import React, { Component } from "react";
import { Redirect, Route, withRouter } from "react-router";
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
    // If we refresh the page and there will be no ingredients so we have to solve this by check this before

    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      // Here I dispatch purchased in the BurgerBuilder.js in the continueModel()
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCanceled={this.canceledHandler}
            checkoutContinued={this.continuedHandler}
          />
          <Route
            path={`${this.props.match.url}/contact-data`}
            component={ContactData}
          />
        </>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));

// Check the Route in the return it is a simple way to pass props to the from here to the component we want like normal but inside our Route
