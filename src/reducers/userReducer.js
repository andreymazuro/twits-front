import USER from '../action_types/user'

const initialState={
  userInfo: {},
  userLoggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type){
    case USER.AUTHORIZE_USER:
      return {
        ...state,
        userInfo: action.userInfo,
        userLoggedIn: true,
      }

    case USER.LOGOUT_USER:
      return {
        ...state,
        userInfo: {},
        userLoggedIn: false,
      }

    default:
      return state;
  }
}
