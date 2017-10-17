import React from 'react'
import Header from '../Header'
import Feed from '../Feed'

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
        <Feed
          history={history}
        />
      </div>
    )
  }
}

export default MainPage
