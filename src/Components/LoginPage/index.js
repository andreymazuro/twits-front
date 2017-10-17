import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/userActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LoginPageView extends React.Component{
  constructor(){
    super();
    this.state= {
      currentUrl: 'https://static.pexels.com/photos/33045/lion-wild-africa-african.jpg'
    }
  }

  componentDidMount(){
    const urls = ['https://static.pexels.com/photos/33045/lion-wild-africa-african.jpg', 'https://images7.alphacoders.com/411/thumb-1920-411820.jpg','https://images7.alphacoders.com/399/thumb-1920-399813.jpg']
    this.timer = setInterval(() => {
      const { currentUrl } = this.state
      const num = urls.indexOf(currentUrl)
      if (num === urls.length - 1) {
        this.setState({ currentUrl: urls[0] })
      }
      else {
        this.setState({ currentUrl: urls[num +1] })
      }
    },15000)
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  signUp = () => {
    const password = this.passwordSignUp.value
    const email = this.emailSignUp.value
    const username = this.usernameSignUp.value
    fetch('http://localhost:3000/users', {
      method: 'post',
      body: JSON.stringify({
        password: password,
        email: email,
        username: username,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error)
        }
      })
    .catch(err => console.log(err))
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
        <div className="login-page" style={{ backgroundImage: `url(${this.state.currentUrl})` }}>
          <div className="login-page-form">
            <form>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input type="email" className="form-control" ref={(input) => {this.emailLogIn = input}} aria-describedby="emailHelp" placeholder="Email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-2">
                  <input type="password" className="form-control" ref={(input) => {this.passwordLogIn = input}} placeholder="Password" />
                </div>
                <div className="form-group col-md-1">
                  <input type="button" className="log-in" onClick={this.logIn} value="Log in" />
                </div>
              </div>
            </form>
            <p style={{ color: 'white' }}>Don't have an account? Sign up here</p>
            <form>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input type="email" className="form-control"  ref={(input) => {this.emailSignUp = input}}  placeholder="Email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input className="form-control"  ref={(input) => {this.usernameSignUp = input}}  placeholder="Username" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input type="password" className="form-control"  ref={(input) => {this.passwordSignUp = input}}  placeholder="Password" />
                </div>
              </div>
              <input type="button" onClick={this.signUp} className="btn btn-primary" value="Submit" />
            </form>
          </div>
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
