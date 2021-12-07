import * as types from "./actionTypes";
import { fetchIngredients } from "../../api/api";

export const getIngredients = () => {
  return async function (dispatch) {
    dispatch({ type: types.GET_INGREDIENTS_REQUEST });

    fetchIngredients()
      .then((items) => {
        if (items) dispatch({ type: types.GET_INGREDIENTS_SUCCESS, items });
      })
      .catch((err) => {
        dispatch({ type: types.GET_INGREDIENTS_FAILED });
        console.error("Error in getIngredients thunk ", err.message);
      });
  };
};
