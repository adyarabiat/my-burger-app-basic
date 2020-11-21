import * as actionType from "../actions/actionType";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionType.PURCHASE_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionType.PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionType.FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionType.FETCH_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default Reducer;
