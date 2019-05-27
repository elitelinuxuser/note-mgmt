// store.js

import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
// import profileReducer from "./reducers/profileReducer";
import notesReducer from "./reducers/notesReducer";
import alertReducer from "./reducers/alertReducer.js";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  //   profile: profileReducer,
  note: notesReducer
});

const configureStore = createStore(rootReducer, {}, applyMiddleware(thunk));

export default configureStore;
