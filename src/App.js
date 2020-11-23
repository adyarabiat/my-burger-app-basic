import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as authAction from "./store/actions/authAction";

// import Checkout from "./containers/Checkout/Checkout";
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
// import Orders from "./containers/Orders/Orders";
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
// import Auth from "./containers/Auth/Auth";
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        {/* <Route path="/auth" component={Auth} /> */}
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <Auth />
            </Suspense>
          )}
        />

        {/* this will work if go to any route like http://localhost:3000/orders and i have to permistion it will return me back or to anyother place*/}
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={Checkout} /> */}
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Checkout />
              </Suspense>
            )}
          />
          <Route path="/" exact component={BurgerBuilder} />
          {/* <Route path="/Orders" component={Orders} /> */}
          <Route
            path="/Orders"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Orders />
              </Suspense>
            )}
          />
          {/* <Route path="/auth" component={Auth} /> */}
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Auth />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => {
      dispatch(authAction.authCheckState());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
