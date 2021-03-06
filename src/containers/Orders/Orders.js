import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../store/actions/OrdersActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
  // Now here we want to fetch the data from the servier (firebase)

  const { onFetchOrders, token, userId } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  // componentDidMount() {
  //   this.props.onFetchOrders(this.props.token, this.props.userId);
  // }

  let orders = <Spinner />;
  if (!props.loading) {
    orders = (
      <div>
        {props.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          );
        })}
      </div>
    );
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(action.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

// So this one will show up instead of the BurgerBuilder or the Checkout pages
