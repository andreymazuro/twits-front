import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/userActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class LoginPageView extends React.Component{
  constructor(){
    super();
    this.state= {
      currentUrl: 'https://static.pexels.com/photos/33045/lion-wild-africa-african.jpg',
      signUpErrors: {},
      logInErrors: {},
      showModal: false
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
    const { history } = this.props
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
          let errors = {}
          if (res.error.email) {
            this.emailSignUp.value = ''
            errors.email = 'Email ' + res.error.email[0]
          }
          if (res.error.username) {
            this.usernameSignUp.value = ''
            errors.username = 'Username ' + res.error.username[0]
          }
          if (res.error.password) {
            this.passwordSignUp.value = ''
            errors.password = res.error.password[0]
          }
          this.setState({ signUpErrors: errors })
          throw new Error('Failed to sign up')
        }
      })
      .then(() => this.setState({ showModal: true }) )
    .catch(err => console.log(err))
  }

  logIn = () => {
    const password = this.passwordLogIn.value
    const email = this.emailLogIn.value
    const { actions, history } = this.props
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
          let errors = {}
          if (res.error.email) {
            this.emailLogIn.value = ''
            errors.email = res.error.email
          }
          if (res.error.password) {
            this.passwordLogIn.value = ''
            errors.password = res.error.password
          }
          if (res.error.activation) {
            errors.activation = res.error.activation
          }
          this.setState({ logInErrors: errors })
        }
        else {
          localStorage.setItem('token', res.token)
          actions.authorizeUser(res.user)
          history.push('/')
        }
      })
    .catch(err => console.log(err))

  }

  handleClose = () => {
    this.setState({
      showModal: false,
      logInErrors: {},
      signUpErrors: {},
    })
    this.emailSignUp.value = ''
    this.passwordSignUp.value = ''
    this.usernameSignUp.value = ''
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  render(){
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    const { signUpErrors, logInErrors } = this.state
    return(
      <MuiThemeProvider>
        <div className="login-page" style={{ backgroundImage: `url(${this.state.currentUrl})` }}>
          <div className="login-page-form">
            <form>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input type="email" className="form-control" ref={(input) => {this.emailLogIn = input}} aria-describedby="emailHelp" placeholder="Email" />
                  {logInErrors.email && <small id="emailHelp" className="form-text text-muted">{logInErrors.email}</small> }
                  {logInErrors.activation && <small id="emailHelp" className="form-text text-muted">{logInErrors.activation}</small> }
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-2">
                  <input type="password" className="form-control" ref={(input) => {this.passwordLogIn = input}} placeholder="Password" />
                  {logInErrors.password && <small id="emailHelp" className="form-text text-muted">{logInErrors.password}</small> }
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
                  {signUpErrors.email && <small id="emailHelp" className="form-text text-muted">{signUpErrors.email}</small> }
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input className="form-control"  ref={(input) => {this.usernameSignUp = input}}  placeholder="Username" />
                  {signUpErrors.username && <small id="emailHelp" className="form-text text-muted">{signUpErrors.username}</small> }
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input type="password" className="form-control"  ref={(input) => {this.passwordSignUp = input}}  placeholder="Password" />
                  {signUpErrors.password && <small id="emailHelp" className="form-text text-muted">{signUpErrors.password}</small> }
                </div>
              </div>
              <input type="button" onClick={this.signUp} className="btn btn-primary" value="Submit" />
            </form>
          </div>
        </div>
        <Dialog
          title="Thank you for registration!"
          actions={actions}
          modal={false}
          open={this.state.showModal}
          onRequestClose={this.handleClose}
        >
          To complete registration confirm your account. Confirmation link was sent to your e-mail.
        </Dialog>
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
