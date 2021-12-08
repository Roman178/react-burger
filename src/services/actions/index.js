import * as types from "./actionTypes";
import { fetchIngredients, createOrderApi } from "../../api/api";

export const getIngredients = () => {
  return async function (dispatch) {
    dispatch({ type: types.GET_INGREDIENTS_REQUEST });

    try {
      const items = await fetchIngredients();
      dispatch({ type: types.GET_INGREDIENTS_SUCCESS, items });
    } catch (err) {
      dispatch({ type: types.GET_INGREDIENTS_FAILED });
      console.error("Error in getIngredients thunk ", err.status);
    }
  };
};

export const createOrder = (ingredients) => {
  return async function (dispatch) {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    try {
      const order = await createOrderApi(ingredients);
      dispatch({ type: types.CREATE_ORDER_SUCCESS, order });
    } catch (err) {
      dispatch({ type: types.CREATE_ORDER_FAILED });
      console.error("Error in createOrder thunk ", err.status);
    }
  };
};
