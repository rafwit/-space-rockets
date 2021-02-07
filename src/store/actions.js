export function addToFavourites(data) {
  return {
    type: ADD_FAVOURITE,
    payload: data,
  };
}

export function removeFromFavourites(data) {
  return {
    type: REMOVE_FAVOURITE,
    payload: data,
  };
}

export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
