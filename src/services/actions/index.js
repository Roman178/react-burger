import * as types from "./actionTypes";
import { fetchIngredients } from "../../api/api";

export const getIngredients = () => {
  return async function (dispatch) {
    dispatch({ type: types.GET_INGREDIENTS_REQUEST });
    try {
      const items = await fetchIngredients();
      dispatch({ type: types.GET_INGREDIENTS_SUCCESS, items });
    } catch (error) {
      console.error("Error in getIngredients thunk ", error.message);
      dispatch({ type: types.GET_INGREDIENTS_FAILED });
    }
  };
};
