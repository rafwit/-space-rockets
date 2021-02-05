import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { favouritesReducer } from "./reducers";

const appReducer = combineReducers({
  favourites: favouritesReducer,
});

export const store = createStore(appReducer, composeWithDevTools());
