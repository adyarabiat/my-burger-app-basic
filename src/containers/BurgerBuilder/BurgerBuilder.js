import React from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 2,
  cheese: 1,
  meat: 2.3,
};
class BurgerBuilder extends React.Component {
  // We can use this
  // constructor(props){
  //   super(props)
  //   this.state ={..}
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  Addingredients = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIng = {
      ...this.state.ingredients,
    };
    updatedIng[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIng });
    this.Purchasable(updatedIng);
  };

  Removeingredients = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    let updatedCount = oldCount - 1;
    const updatedIng = {
      ...this.state.ingredients,
    };
    updatedIng[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIng });
    this.Purchasable(updatedIng);
  };

  DisableLess = () => {
    // Disable the less button
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    // console.log(disableInfo);
    return disableInfo;
  };

  Purchasable = (ing) => {
    const purchaseAmount = Object.keys(ing)
      .map((key) => {
        return ing[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // console.log(purchaseAmount);
    this.setState({ purchasable: purchaseAmount > 0 });
  };

  Purchasing = () => {
    this.setState({ purchasing: true });
  };

  closeModel = () => {
    this.setState({ purchasing: false });
  };

  continueModel = () => {
    // alert("You are Continuing!!");

    // Becouse we start sending the data we want to set the loading to true
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Ady Arabiat",
        address: {
          street: "Al Ruwais",
          zipCode: "234",
          country: "Jordan",
        },
        email: "test@gmail.com",
      },
      deliveryMethod: "Fastest",
    };

    axiosInstance
      .post("/orders", order)
      .then((response) => {
        // console.log(response);
        // Here when we send the data we have to turn the loading to false becouse we finished
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        // console.log(err);
        // same here even if we catch an error we have to stop loading
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        cancel={this.closeModel}
        continue={this.continueModel}
        price={this.state.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Model checkShow={this.state.purchasing} modelClose={this.closeModel}>
          {orderSummary}
        </Model>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdd={this.Addingredients}
          ingredientsRemove={this.Removeingredients}
          disable={this.DisableLess()}
          price={this.state.totalPrice}
          orderBtn={this.state.purchasable}
          show={this.Purchasing}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);
