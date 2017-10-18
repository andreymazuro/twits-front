import USER from '../action_types/user'
import { push } from 'react-router-redux'

export const checkIfAuthorized = () => {
  return (dispatch, store) => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:3000/get_user', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      },
    })
        .then(res => res.json())
        .then(res => {
          dispatch(authorizeUser(res.user))
        })
      .catch(err => {
        localStorage.removeItem('token')
        console.log(err)
      })
  }
}

export const authorizeUser = (userInfo) => {
  return {
    type: USER.AUTHORIZE_USER,
    userInfo: userInfo,
  }
}

export const logOutUser = () => {
  return {
    type: USER.LOGOUT_USER,
  }
}
