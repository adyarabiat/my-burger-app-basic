import React from "react";
import { connect } from "react-redux";

import * as actionType from "../../store/actions";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends React.Component {
  // We can use this
  // constructor(props){
  //   super(props)
  //   this.state ={..}
  // }

  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  // Fetch our data from Firebase
  componentDidMount() {
    // // We use here the the link from Firebase this link we get it from the data that we create it not the !== project baseURL
    // axiosInstance
    //   .get("https://react-my-burger-65308.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     // console.log(response);
    //     this.setState({ ingredients: response.data });
    //     // Now after we did this we will find that there is an error that is becouse when we start our app we start with ingredients:null so the app will work on this data not the fetched data in the first time
    //     // So I have to check if it is null or not in the render() here to do something when we run the app first
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  }

  DisableLess = () => {
    // Disable the less button
    const disableInfo = {
      ...this.props.ings,
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
    return purchaseAmount > 0;
  };

  Purchasing = () => {
    this.setState({ purchasing: true });
  };

  closeModel = () => {
    this.setState({ purchasing: false });
  };

  continueModel = () => {
    // here we do this to pass data that the user enter to the checkout page
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
      );
    }
    queryParams.push("price=" + this.props.ings);

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>The ingredients not loaded...</p>
    ) : (
      <Spinner />
    );

    // {orderSummary}
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    // {burger}

    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdd={this.props.onAddIngs}
            ingredientsRemove={this.props.onRemoveIngs}
            disable={this.DisableLess()}
            price={this.props.price}
            orderBtn={this.Purchasable(this.props.ings)}
            show={this.Purchasing}
          />
        </>
      );

      /* we added orderSummary here becouse it uses  ingredients so we have to make sure that ingredients not null and wait to fetch it then we can call it */

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.closeModel}
          continue={this.continueModel}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Model checkShow={this.state.purchasing} modelClose={this.closeModel}>
          {orderSummary}
        </Model>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngs: (ingName) => {
      dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName });
    },
    onRemoveIngs: (ingName) => {
      dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
