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
        console.log(res);
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
