import { ADD_FAVOURITE, REMOVE_FAVOURITE } from "./actions";

export let initialState = {
  favourites_launches: [],
  favourites_launch_pads: [],
};

const persistedState = localStorage.getItem("reduxStore");

if (persistedState) initialState = JSON.parse(persistedState);

export const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      if (action.payload.flight_number) {
        return {
          ...state,
          favourites_launches: [...state.favourites_launches, action.payload],
        };
      }

      if (action.payload.site_id) {
        return {
          ...state,
          favourites_launch_pads: [
            ...state.favourites_launch_pads,
            action.payload,
          ],
        };
      }
      return state;
    }
    case REMOVE_FAVOURITE: {
      if (action.payload.flight_number) {
        const newFavourtieLaunches = removeFavourite(
          state.favourites_launches,
          action.payload
        );
        return {
          ...state,
          favourites_launches: newFavourtieLaunches,
        };
      }
      if (action.payload.site_id) {
        const newFavourtieLaunchPads = removeFavourite(
          state.favourites_launch_pads,
          action.payload
        );
        return {
          ...state,
          favourites_launch_pads: newFavourtieLaunchPads,
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};
function removeFavourite(array, itemToRemove) {
  // eslint-disable-next-line array-callback-return
  return array.filter((element) => {
    if (element.flight_number) {
      return element.flight_number !== itemToRemove.flight_number;
    }

    if (element.site_id) {
      return element.site_id !== itemToRemove.site_id;
    }
  });
}
