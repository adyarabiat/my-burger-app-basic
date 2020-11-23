import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import BurgerBuilderReducer from "./store/reducers/BurgerBuilderReducer";
import OrderReducer from "./store/reducers/OrderReducer";
import AuthReducer from "./store/reducers/authReducer";
import App from "./App";
import "./index.css";

// we use this rocess.env.NODE_ENV === "development" .....
// to not let anyone access the redux dev tool when it is not in the development mode
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: BurgerBuilderReducer,
  order: OrderReducer,
  auth: AuthReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="my-burger">
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
