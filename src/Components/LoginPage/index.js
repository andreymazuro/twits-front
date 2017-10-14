import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../Actions/userActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LoginPageView extends React.Component{

  signUp = () => {
  }

  logIn = () => {
    const password = this.passwordLogIn.value
    const email = this.emailLogIn.value
    const { actions } = this.props
    actions.logIn(email, password)
  }


  render(){
    return(
      <MuiThemeProvider>
        <div className="login-page">
          <form>
            <div className="form-row">
              <div className="form-group col-md-3">
                <input type="email" className="form-control" ref={(input) => {this.emailLogIn = input}} aria-describedby="emailHelp" placeholder="Email" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-2">
                <input type="password" className="form-control" ref={(input) => {this.passwordLogIn = input}} d="logInPassword" placeholder="Password" />
              </div>
              <div className="form-group col-md-1">
                <input type="button" className="log-in" onClick={this.logIn} value="Log in" />
              </div>
            </div>
          </form>
          <p>Don't have an account? Sign up here</p>
          <form>
            <div className="form-row">
              <div className="form-group col-md-3">
                <input type="email" className="form-control" id="signUpEmail" placeholder="Email" />
              </div>
             </div>
             <div className="form-row">
               <div className="form-group col-md-3">
                 <input className="form-control" id="signUpUsername" placeholder="Username" />
               </div>
             </div>
             <div className="form-row">
               <div className="form-group col-md-3">
                 <input type="password" className="form-control" id="logInPassword" placeholder="Password" />
               </div>
             </div>
            <button type="submit" onClick={this.signUp} className="btn btn-primary">Submit</button>
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

const LoginPage = connect(
  store => ({
    user: store.user,
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(LoginPageView);


export default LoginPage
