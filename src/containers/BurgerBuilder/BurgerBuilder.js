import React from "react";
import { connect } from "react-redux";

import * as BurgerBuilderAction from "../../store/actions/BurgerBuilderActions";
import * as orderAction from "../../store/actions/OrdersActions";
import * as AuthAction from "../../store/actions/authAction";
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
  };

  // Fetch our data from Firebase
  componentDidMount() {
    this.props.onInitIngredients();
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
    // To check and redirect to the auth page to sign up
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      // Here I will pass to it the checkout to navigate to it if once i signed in So simply here I'm just going to save it there if I was added or removed ing becouse it will be building:true or false so depend on this it will work So check the burgerBuilder state in Redux
      this.props.history.push("/auth");
      this.props.onSetAuthRedirectPath("/checkout");
    }
  };

  closeModel = () => {
    this.setState({ purchasing: false });
  };

  continueModel = () => {
    // We call this dispatch here becouse:
    // we want to set purchased to false and not to keep me in the home page so then when I do sucess post the info set it again to true..
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>The ingredients not loaded...</p>
    ) : (
      <Spinner />
    );

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
            isAuth={this.props.isAuthenticated}
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngs: (ingName) => {
      dispatch(BurgerBuilderAction.onAddIngs(ingName));
    },
    onRemoveIngs: (ingName) => {
      dispatch(BurgerBuilderAction.onRemoveIngs(ingName));
    },
    onInitIngredients: () => {
      dispatch(BurgerBuilderAction.fetchIngredients());
    },
    onPurchaseInit: () => {
      dispatch(orderAction.purchaseInit());
    },
    onSetAuthRedirectPath: (path) => {
      dispatch(AuthAction.setAuthRedirectPath(path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
