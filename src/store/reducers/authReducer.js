import * as actionType from "../actions/actionType";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: null,
      };

    case actionType.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionType.AUTH_TIMEOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actionType.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
