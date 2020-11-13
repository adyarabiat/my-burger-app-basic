import React, { Component } from "react";
import axiosInstance from "../../../axios-orders";
import { withRouter } from "react-router-dom";

import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import InputComp from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
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
        value: "",
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (e) => {
    // console.log(this.props.ingre);

    // we do this to not submit the form and to see that we are getting the props data from checkout by the ingre that we added to it
    e.preventDefault();

    // alert("You are Continuing!!");
    // So Remmember here we want to post data and store it in our database (firebase)
    // Becouse we start sending the data we want to set the loading to true
    this.setState({ loading: true });

    // Here we are Submitting the form :
    const forData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      // formElementIdentifier it is like the keys in the object : name , street ,email ....
      forData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    // Then after we create those objects we will go to the order here down and we set orderData to : forData
    // console.log(forData);
    const order = {
      ingredients: this.props.ingre,
      price: this.props.price,
      orderData: forData,
    };
    axiosInstance
      .post("/orders.json", order)
      .then((response) => {
        // console.log(response);
        // Here when we send the data we have to turn the loading to false becouse we finished
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        // console.log(err);
        // same here even if we catch an error we have to stop loading
        this.setState({
          loading: false,
        });
      });
  };

  checkValidity(value, rules) {
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
  }
  inputChangedHandler = (event, inputIdentifier) => {
    // Copy of the orderForm
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    // Copy of the values for the id's of the orderForm
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    // Changing the values inside that id's safely now
    updatedFormElement.value = event.target.value;

    // Check Vality :
    updatedFormElement.valid = this.checkValidity(
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
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    // console.log(formElementsArray);

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((forElement) => {
          return (
            <InputComp
              key={forElement.id}
              elementType={forElement.config.elementType}
              elementConfig={forElement.config.elementConfig}
              value={forElement.config.value}
              change={(event) => this.inputChangedHandler(event, forElement.id)}
              invalid={!forElement.config.valid}
              shouldValidate={forElement.config.validation}
              touched={forElement.config.touched}
            />
          );
        })}

        <Button
          className={styles.Input}
          btnType="Success"
          click={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Info:</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
