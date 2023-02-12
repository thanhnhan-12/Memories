import { AUTH, LOGOUT } from '../constants/actionTypes.js';

const initalState = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  user: JSON.parse(localStorage.getItem("user")) || null
}

const authReducer = (state = initalState, action) => {
  switch(action.type) {
    case AUTH:
      const {token, result} = action.data
      localStorage.setItem("token", JSON.stringify(token))
      localStorage.setItem("user", JSON.stringify(result))

      return { ...state, token, user: result };
    case LOGOUT:
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      return { ...state, token: null, user: null };

    default:
      return state;
  }
};


export default authReducer;