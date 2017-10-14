import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from './Actions/userActions'

import './App.css';
import MainPage from './Components/MainPage'

class AppView extends Component {

  componentDidMount(){
    const { actions } = this.props
    actions.checkIfAuthorized()
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <MainPage />
      </div>
    );
  }
}

const App = connect(
  store => ({
    user: store.user,
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(AppView);

export default App
