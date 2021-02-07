import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialState, favouritesReducer } from "./reducers";

const appReducer = combineReducers({
  favourites: favouritesReducer,
});

export const store = createStore(
  appReducer,
  initialState,
  composeWithDevTools()
);

store.subscribe(() =>
  localStorage.setItem("reduxStore", JSON.stringify(store.getState()))
);
