import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  // We change layout to class based to manage a state here for the SideDrawer

  const [sideDrawerClosed, setSideDrawerClosed] = useState(false);
  // state = {
  //   sideDrawerClosed: false,
  // };

  const ChangeSideDrawer = () => {
    setSideDrawerClosed(false);
    // this.setState({ sideDrawerClosed: false });
  };

  const sideDrawerToggle = () => {
    // I can do it like this:
    setSideDrawerClosed(true);
    // this.setState({ sideDrawerClosed: true });

    // Or I can do it like this:
    // this.setState((prevState) => {
    //   return { sideDrawerClosed: !prevState.sideDrawerClosed };
    // });
  };

  return (
    <Aux>
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerClosed}
        closed={ChangeSideDrawer}
      />
      <Toolbar isAuth={props.isAuthenticated} clicked={sideDrawerToggle} />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
