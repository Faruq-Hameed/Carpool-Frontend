/**Auth reducer */
//PLEASE I JUST COPIED THE CODE, NOTHING IS FUNCTIONAL

export const authReducer = (state, action) => {
  switch (action.type) {
    case "set_token":
      return {  token: action.payload, errorMessage: '' };
    case "clear_token":
      return { ...state, token: null };
    case "set_error_message":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};
