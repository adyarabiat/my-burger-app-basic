import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import * as action from "../../store/actions/authAction";
import { Redirect } from "react-router";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  });
  // componentDidMount() {
  //   if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
  //     this.props.onSetAuthRedirectPath();
  //   }
  // }

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid;
    }
    return isValid;
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const inputChangeValidity = (event, controlName) => {
    // [controlName]
    //  Here it alows me to to take the daynamic string and put it inside it becouse what we will recive is "email" or "password" so when I use [] it allows me to put a string inside it as a key

    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
    // this.setState({ controls: updatedControls });
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };
  //   this.setState((prevState) => {
  //     return { isSignup: !prevState.isSignup };
  //   });
  // };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map((formElement) => {
    return (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        change={(event) => inputChangeValidity(event, formElement.id)}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
      />
    );
  });

  if (props.loading) {
    form = <Spinner />;
  }

  //
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error}</p>;
  }

  // Redirect the use from the login page to the home page
  let authRedurect = null;
  if (props.isAuthenticated) {
    authRedurect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={styles.Auth}>
      {authRedurect}
      {errorMessage}
      <form onSubmit={onSubmitForm}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button click={switchAuthModeHandler} btnType="Danger">
        {isSignup ? "SIGNUP" : "SIGNIN"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => {
      dispatch(action.auth(email, password, isSignup));
    },
    onSetAuthRedirectPath: () => {
      dispatch(action.setAuthRedirectPath("/"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
