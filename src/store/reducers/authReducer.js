import * as actionType from "../actions/actionType";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
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
    default:
      return state;
  }
};

export default reducer;
