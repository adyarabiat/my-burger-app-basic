import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import InputComp from "../../../components/UI/Input/Input";
import * as action from "../../../store/actions/OrdersActions";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP CODE",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxlength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", display: "Fastest" },
          { value: "slower", display: "Slower" },
        ],
      },
      validation: {},
      value: "Fastest",
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const [loading, setLoading] = useState(false);

  const orderHandler = (e) => {
    // console.log(this.props.ingre);

    // we do this to not submit the form and to see that we are getting the props data from checkout by the ingre that we added to it
    e.preventDefault();

    // Here we are Submitting the form :
    const forData = {};
    for (let formElementIdentifier in orderForm) {
      // formElementIdentifier it is like the keys in the object : name , street ,email ....
      forData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    // console.log(forData);
    // Then after we create those objects we will go to the order here down and we set orderData to : forData
    // console.log(forData);
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: forData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

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

  const inputChangedHandler = (event, inputIdentifier) => {
    // Copy of the orderForm
    const updatedOrderForm = {
      ...orderForm,
    };
    // Copy of the values for the id's of the orderForm
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    // Changing the values inside that id's safely now
    updatedFormElement.value = event.target.value;

    // Check Vality :
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    // then we give the values for the whole form
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    // then we update the state
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
    // setOrderForm({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  // console.log(formElementsArray);

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((forElement) => {
        return (
          <InputComp
            key={forElement.id}
            elementType={forElement.config.elementType}
            elementConfig={forElement.config.elementConfig}
            value={forElement.config.value}
            change={(event) => inputChangedHandler(event, forElement.id)}
            invalid={!forElement.config.valid}
            shouldValidate={forElement.config.validation}
            touched={forElement.config.touched}
          />
        );
      })}

      <Button
        className={styles.Input}
        btnType="Success"
        click={orderHandler}
        disabled={!formIsValid}
      >
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Info:</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(action.purchaseBurgerPost(orderData, token));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
