import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { launchPadReducer, launchReducer } from "./reducers";

const appReducers = combineReducers({
  launch: launchReducer,
  launch_pad: launchPadReducer,
});

export const store = createStore(appReducers, composeWithDevTools());
