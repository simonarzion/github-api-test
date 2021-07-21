import { combineReducers } from "redux";
import { selectedUserReducer } from "../reducers/selectedUserReducer";
import { usersReducers } from "../reducers/usersReducers";

export const allReducers = combineReducers({
  users: usersReducers,
  selectedUser: selectedUserReducer,
});
