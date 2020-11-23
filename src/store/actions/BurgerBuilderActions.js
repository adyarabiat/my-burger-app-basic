import * as actionType from "../actions/actionType";

import axiosInstance from "../../axios-orders";

export const onAddIngs = (ingName) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const onRemoveIngs = (ingName) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

// Fetch our data from Firebase

export const fetchIngredients = () => {
  return (dispatch) => {
    axiosInstance
      .get("/ingredients.json")
      .then((response) => {
        // this.setState({ ingredients: response.data });
        // console.log(response.data);
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFails());
      });
  };
};

export const setIngredients = (Ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: Ingredients,
  };
};

export const fetchIngredientsFails = () => {
  return {
    type: actionType.FETCHED_INGREDIENTS_FAILS,
  };
};
