import {
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_SUCCESS,
  UPDATE_USERS,
  GET_SELECTED_USER_BEGIN,
  GET_SELECTED_USER_FAILURE,
  GET_SELECTED_USER_SUCCESS,
} from "../constants/actionTypes";

// GET ALL USERS
export const getAllUsersBegin = () => {
  return {
    type: GET_ALL_USERS_BEGIN,
  };
};

export const getAllUsersSuccess = (users) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: users,
  };
};

export const getAllUsersFailure = (err) => {
  return {
    type: GET_ALL_USERS_FAILURE,
    payload: err,
  };
};

export const updateUsers = (users) => {
  return {
    type: UPDATE_USERS,
    payload: users,
  };
};

// GET SELECTED USER
export const getSelectedUserBegin = () => {
  return {
    type: GET_SELECTED_USER_BEGIN,
  };
};

export const getSelectedUserSuccess = (user) => {
  return {
    type: GET_SELECTED_USER_SUCCESS,
    payload: user,
  };
};

export const getSelectedUserFailure = (err) => {
  return {
    type: GET_SELECTED_USER_FAILURE,
    err: err,
  };
};
