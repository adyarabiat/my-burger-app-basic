import * as actionType from "../actions/actionType";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 2,
  cheese: 1,
  meat: 2.3,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
      };
    case actionType.FETCHED_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
      };
    case actionType.FETCHED_INGREDIENTS_FAILS:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
