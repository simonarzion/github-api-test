import { GET_SELECTED_USER_BEGIN, GET_SELECTED_USER_FAILURE, GET_SELECTED_USER_SUCCESS } from "../constants/actionTypes";

const initialState = {
  isLoading: null,
  user: {},
  err: null,
};

export const selectedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_USER_BEGIN:
      return { ...state, isLoading: true };
    case GET_SELECTED_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          userData: [action.payload.userData],
          userRepos: [action.payload.userRepos],
          userOrgs: [action.payload.userOrgs],
        },
      };
    case GET_SELECTED_USER_FAILURE:
      return { ...state, isLoading: false, err: action.payload, user: [] };
    default:
      return state;
  }
};
