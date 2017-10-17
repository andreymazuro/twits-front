import USER from '../action_types/user'
import { push } from 'react-router-redux'

export const logIn = (email, password) => {
  return (dispatch, store) => {
    fetch('http://localhost:3000/sign_in', {
      method: 'post',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error (res.error)
        }
        else {
          localStorage.setItem('token', res.token)
          dispatch(authorizeUser(res.user))
          dispatch(push('/'))
        }
      })
      .catch(err => console.log(err.message))
  }
}

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
