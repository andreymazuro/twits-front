import React from 'react'
import Feed from '../Feed'
import Header from '../Header'
import LoginPage from '../LoginPage'
import UserWall from '../UserWall'
import { Route } from 'react-router-dom'

class MainPage extends React.Component{
  render(){
    return(
      <div>
        {/* <Header /> */}
        <Route exact path={'/'} component={LoginPage} />
        <Route path={'/:username'} component={UserWall} />
        <Route exact path={`/feed`} component={Feed} />
      </div>
    )
  }
}

export default MainPage
