import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  // We change layout to class based to manage a state here for the SideDrawer

  state = {
    sideDrawerClosed: false,
  };

  ChangeSideDrawer = () => {
    this.setState({ sideDrawerClosed: false });
  };

  sideDrawerToggle = () => {
    // I can do it like this:
    this.setState({ sideDrawerClosed: true });

    // Or I can do it like this:
    // this.setState((prevState) => {
    //   return { sideDrawerClosed: !prevState.sideDrawerClosed };
    // });
  };
  render() {
    return (
      <Aux>
        <SideDrawer
          open={this.state.sideDrawerClosed}
          closed={this.ChangeSideDrawer}
        />
        <Toolbar clicked={this.sideDrawerToggle} />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
