import React, { Component } from "react";

import Model from "../../components/UI/Model/Model";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  // here we making class without name !!
  // that becouse we return it as anonymous
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      // we set the first argumant to null which is the response but becouse we do not need it here that is why
      axios.interceptors.response.use(
        (response) => response,
        (err) => {
          this.setState({ error: err });
        }
      );

      // this request method to return it back to null
      axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
    }

    errorConfirmed = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Model checkShow={this.state.error} modelClose={this.errorConfirmed}>
            {/* we have to check first becouse it will run and it will get error.message before even find it  */}
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
// Model
// here we want to use the model functionality by make backdrop and stuff like that here that is why we import it
