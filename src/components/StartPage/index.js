import React from 'react'

import LoginPage from '../LoginPage'
import MainPage from '../MainPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/userActions'

class StartPageView extends React.Component{

  componentDidMount(){
    const { actions, user } = this.props
    const token = localStorage.getItem('token')
    if (token !== null && user.userLoggedIn === false) {
      actions.checkIfAuthorized()
    }
  }

  render(){
    const userAuthorized = localStorage.getItem('token') !== null
    const { actions, user, history } = this.props
    return(
      <div>
        {userAuthorized ?
         <MainPage
           user={user}
           actions={actions}
           history={history}
         />
         :
         <LoginPage />
        }
      </div>
    )
  }
}

const StartPage = connect(
  store => ({
    user: store.user,
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(StartPageView)

export default StartPage
