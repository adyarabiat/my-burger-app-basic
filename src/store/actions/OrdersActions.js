import * as actionType from "./actionType";
import axiosInstance from "../../axios-orders";

// **********************************************************
// Posting the Order:

// Starting #before Posting the form
export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_START,
  };
};

// When we post the data
export const purchaseBurgerSucess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

// If the posting did not work
export const purchaseBurgerFail = (error) => {
  return {
    type: actionType.PURCHASE_FAIL,
    error: error,
  };
};

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT,
  };
};

// Posting the data
export const purchaseBurgerPost = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axiosInstance
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response.data);
        // Here we dispatch purchaseBurgerSucess and we give it id and orderData
        dispatch(purchaseBurgerSucess(response.data.name, orderData));
      })
      .catch((err) => {
        // console.log(err);
        // same here even if we catch an error we have to stop loading
        dispatch(purchaseBurgerFail(err));
      });
  };
};

// **********************************************************
// Get the order:

export const fetchOrderStart = () => {
  return {
    type: actionType.FETCH_START,
  };
};

export const fetchOrderFail = () => {
  return {
    type: actionType.FETCH_SUCCESS,
  };
};

export const fetchOrderSucess = (orders) => {
  return {
    type: actionType.FETCH_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderInit = () => {
  return {
    type: actionType.FETCH_INIT,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axiosInstance
      .get("/orders.json")
      .then((res) => {
        // console.log(res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        // console.log(fetchedOrders);

        dispatch(fetchOrderSucess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
