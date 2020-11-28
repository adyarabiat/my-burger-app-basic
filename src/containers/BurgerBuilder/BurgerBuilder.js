import React, { useEffect, useState } from "react";
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

const BurgerBuilder = (props) => {
  // We can use this
  // constructor(props){
  //   super(props)
  //   this.state ={..}
  // }

  const [purchasing, setPurchasing] = useState(false);
  // state = {
  //   purchasing: false,
  // };

  // Fetch our data from Firebase
  const { onInitIngredients } = props;
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);
  // componentDidMount() {
  //   this.props.onInitIngredients();
  // }

  const DisableLess = () => {
    // Disable the less button
    const disableInfo = {
      ...props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    // console.log(disableInfo);
    return disableInfo;
  };

  const Purchasable = (ing) => {
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

  const Purchasing = () => {
    // To check and redirect to the auth page to sign up
    if (props.isAuthenticated) {
      setPurchasing(true);
      // this.setState({ purchasing: true });
    } else {
      // Here I will pass to it the checkout to navigate to it if once i signed in So simply here I'm just going to save it there if I was added or removed ing becouse it will be building:true or false so depend on this it will work So check the burgerBuilder state in Redux
      props.history.push("/auth");
      props.onSetAuthRedirectPath("/checkout");
    }
  };

  const closeModel = () => {
    setPurchasing(false);
    // this.setState({ purchasing: false });
  };

  const continueModel = () => {
    // We call this dispatch here becouse:
    // we want to set purchased to false and not to keep me in the home page so then when I do sucess post the info set it again to true..
    props.onPurchaseInit();
    props.history.push("/checkout");
  };

  let orderSummary = null;
  let burger = props.error ? <p>The ingredients not loaded...</p> : <Spinner />;

  // {burger}
  if (props.ings) {
    burger = (
      <>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientsAdd={props.onAddIngs}
          ingredientsRemove={props.onRemoveIngs}
          disable={DisableLess()}
          price={props.price}
          orderBtn={Purchasable(props.ings)}
          show={Purchasing}
          isAuth={props.isAuthenticated}
        />
      </>
    );

    /* we added orderSummary here becouse it uses  ingredients so we have to make sure that ingredients not null and wait to fetch it then we can call it */

    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        cancel={closeModel}
        continue={continueModel}
        price={props.price}
      />
    );
  }

  return (
    <Aux>
      <Model checkShow={purchasing} modelClose={closeModel}>
        {orderSummary}
      </Model>
      {burger}
    </Aux>
  );
};

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
