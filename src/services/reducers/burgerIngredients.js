import * as types from "../actions/actionTypes";

const initialState = {
  items: [
    {
      _id: "60d3b41abdacab0026a733cc",
      name: "Соус Spicy-X",
      type: "sauce",
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: "https://code.s3.yandex.net/react/code/sauce-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      __v: 0,
    },
  ],
  bun: {},
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_BUN_BURGER: {
      return { ...state, bun: action.bun };
    }
    case types.ADD_INGREDIENT_BURGER: {
      return { ...state, items: [...state.items, action.addedIngredient] };
    }
    case types.REMOVE_INGREDIENT_BURGER: {
      return {
        ...state,
        items: [...state.items].filter(
          (item) => item.id !== action.removedItemId
        ),
      };
    }
    default:
      return state;
  }
};
