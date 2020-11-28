import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import * as action from "../../../store/actions/authAction";

const Logout = (props) => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);
  // componentDidMount() {
  //   this.props.onLogout();
  // }

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
