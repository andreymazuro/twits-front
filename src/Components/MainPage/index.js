import React from 'react'
import Header from '../Header'
import Feed from '../Feed'
import UserSettings from '../UserSettings'

import { Route } from 'react-router'

class MainPage extends React.Component{
  render(){
    const { user, history, actions } = this.props
    return(
      <div>
        <Header
          user={user}
          actions={actions}
          history={history}
        />
        <Route exact path={'/'} component={Feed} />
        <Route exact path={'/settings/user_info'} component={UserSettings} />
      </div>
    )
  }
}

export default MainPage
