import React, { Component } from "react";
import axiosInstance from "../../../axios-orders";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
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
    const order = {
      ingredients: this.props.ingre,
      price: this.props.price,
      customer: {
        name: "Ady Arabiat",
        address: {
          street: "Al Ruwais",
          zipCode: "234",
          country: "Jordan",
        },
        email: "test@gmail.com",
      },
      deliveryMethod: "Fastest",
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

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={styles.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button
          className={styles.Input}
          btnType="Success"
          click={this.orderHandler}
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
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
