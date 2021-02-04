import { ADD_FAVOURITE, REMOVE_FAVOURITE } from "./actions";

const initialState = {
  favourites_launches: [],
  favourites_launch_pads: [],
};

export const launchReducer = (
  state = initialState.favourites_launches,
  action
) => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      return [...state, action.payload];
    }
    case REMOVE_FAVOURITE: {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
      if (state.length === 0) return [];
      else return state;
    }
    default: {
      return state;
    }
  }
};

export const launchPadReducer = (
  state = initialState.favourites_launch_pads
) => {
  return state;
};
