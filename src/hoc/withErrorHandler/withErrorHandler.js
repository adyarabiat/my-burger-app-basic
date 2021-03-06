import React, { useEffect, useState } from "react";

import Model from "../../components/UI/Model/Model";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  // here we making class without name !!
  // that becouse we return it as anonymous
  return (props) => {
    const [error, setError] = useState(null);
    //  state = {
    //   error: null,
    // };

    // this request method to return it back to null
    const reqInterceptors = axios.interceptors.request.use((request) => {
      setError(null);
      return request;
    });
    // we set the first argumant to null which is the response but becouse we do not need it here that is why
    const resInterceptors = axios.interceptors.response.use(
      (response) => response,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.response.eject(resInterceptors);
        axios.interceptors.request.eject(reqInterceptors);
      };
    }, [resInterceptors, reqInterceptors]);

    const errorConfirmed = () => {
      setError(null);
    };

    return (
      <Aux>
        <Model checkShow={error} modelClose={errorConfirmed}>
          {/* we have to check first becouse it will run and it will get error.message before even find it  */}
          {error ? error.message : null}
        </Model>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
// Model
// here we want to use the model functionality by make backdrop and stuff like that here that is why we import it
// ********************
// Constructure instead of compoenetDidmount
// So we use componentDidMount to make the http request
// BUT in the Burgerbuilder if the get method have an error or something this one here will not find it WHY! becouse when we run the app we call componentDidMount after we run the render which is the child compoent of it which the Burgerbuilder! so it will not catch that error
// SOLUTION
// To add the http request or the catch here in the constructure so we run it when we first run the withErrorHandler instead of waiting until the child component finished

// componentWillUnmount()
// Why we have to do this ?
// becouse withErrorHandle we might use it in many other pages and wrrape the class or the function with it!!
// we wrrape the functions and classes with it to show an error if it is happen but actully we want to run axios.interceptors first time we run the app and that set ! After that no need to do this again and again becouse we already get the data from it so we have to unmount it to not take a place in memory everytime ! So we have to Unmount this after each cycle
