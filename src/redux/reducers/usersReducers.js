import { GET_ALL_USERS_BEGIN, GET_ALL_USERS_FAILURE, GET_ALL_USERS_SUCCESS, UPDATE_USERS } from "../constants/actionTypes";

const initialState = {
  isLoading: null,
  users: [],
  error: null,
};

export const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_BEGIN:
      return { ...state, isLoading: true };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload };
    case GET_ALL_USERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload, users: [] };
    case UPDATE_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
