import axios from "axios";

import * as actionType from "./actionType";

export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};

// Here we are checking the Timeout 3600 that it comes from Firebase data
export const logout = () => {
  // Here we have to remove the localStorge after we logout
  localStorage.removeItem("token");
  localStorage.removeItem("expiractionDate");
  localStorage.removeItem("userId");
  return {
    type: actionType.AUTH_TIMEOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  // we return dispatch to use redux thunk becouse we are runing here async code
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
      // we *1000 to make the time more
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = null;
    if (isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZiTSLkNsmYtGVv2AEqlhepGGA42GABZg";
    }
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZiTSLkNsmYtGVv2AEqlhepGGA42GABZg";
    }
    axios
      .post(url, authData)
      .then((res) => {
        // console.log(res);

        // LocalStorage here I want to store the data to not logout after refreshing the page so we use the local storage for that
        // So here I need to save the token and the expirationDate
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiractionDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        // After storing check the application on the browser to check if it is save or not

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        // err.response
        // now if we  console.log(err); we will not find the returned object to know the path that is becouse it is wrapped by axios in the catch error so I have to put .response to see it
        // console.log(err.response);
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionType.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

// here I return dispatch not becouse I will run Async but becouse I want to dispatch objects
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiractionDate = new Date(localStorage.getItem("expiractionDate"));

      if (expiractionDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expiractionDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
// The Rules in Firebase we have to set it to :

// {
//   "rules": {
//     "ingredients":{
//           ".read": true,
//           ".write": true,
//     },
//       "orders":{
//        ".read": "auth != null",
//         ".write":"auth != null"
//       }
//   }
// }
