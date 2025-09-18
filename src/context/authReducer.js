// Authentication reducer to handle state transitions for auth-related actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "AUTH_CHECK_COMPLETE":
      return {
        ...state,
        isLoading: false,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        error: null,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "UPDATE_TOKEN":
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
