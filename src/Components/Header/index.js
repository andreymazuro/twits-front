import React from 'react'

import Headroom from 'react-headroom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

class Header extends React.Component{

  logOut = () => {
    const { actions, history } = this.props
    actions.logOutUser()
    localStorage.removeItem('token')
    history.push('/')
  }

  render(){
    const { user, history } = this.props
    const avatarUrl = user.userInfo && user.userInfo.avatarurl
    return(
      <MuiThemeProvider>
        <Headroom>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <p onClick={() => history.push('/')} className="nav-button">Home</p>
            <img src="https:/encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSasCE_nJe-V5nouXMCOBSDCZhWwQ37tbz59xzu_JAP2lF4nhL2WQ" className="twits-icon" alt="" />
            <div style={{ display: 'flex', flexDirection: 'row', marginRight: 20 }}>
              <input type="text" className="form-control" style={{ width: 200, marginRight: 20 }} id="inlineFormInput" placeholder="Search" />
              <IconMenu
                iconButtonElement={
                  <Avatar src={avatarUrl} />
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="More info" />
                <MenuItem onClick={this.logOut} primaryText="Log out" />
              </IconMenu>
            </div>
          </div>
        </Headroom>
      </MuiThemeProvider>
    )
  }
}

export default Header
