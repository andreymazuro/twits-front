import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/userActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class UserSettingsView extends React.Component{
  render(){
    const { user } = this.props
    const userInfo = user.userInfo

    return(
      <MuiThemeProvider>
        <div style={{ backgroundColor: '#e6ecf0', height: '90vh' }} >
          <br/>
          {user.userLoggedIn
           &&
           <Paper
             zDepth={4}
             style={style}
             >
             <h4>Your account info</h4>
             <div className="user-info-edit-textfield">
               <TextField
                 id="text-field-fullname"
                 defaultValue={userInfo.fullname}
               />
               <h4 style={{ marginLeft: 20, fontSize: 16}} >Fullname</h4>
             </div>
             <div className="user-info-edit-textfield">
               <TextField
                 id="text-field-avatarurl"
                 defaultValue={userInfo.avatarurl}
               />
               <h4 style={{ marginLeft: 20, fontSize: 16}} >AvatarUrl</h4>
             </div>
             <div className="user-info-edit-textfield">
               <TextField
                 id="text-field-email"
                 defaultValue={userInfo.email}
               />
               <h4 style={{ marginLeft: 20, fontSize: 16}} >E-mail</h4>
             </div>
             <div className="user-info-edit-textfield">
               <TextField
                 id="text-field-password"
                 defaultValue={userInfo.password}
               />
               <h4 style={{ marginLeft: 20, fontSize: 16}} >Password</h4>
             </div>
           </Paper>
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

const style = {
  width: '50%',
  margin: '0 auto',
  textAlign: 'center',
};

const UserSettings = connect(
  store => ({
    user: store.user,
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(UserSettingsView)

export default UserSettings
