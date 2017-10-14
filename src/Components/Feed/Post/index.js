import React from 'react'

class Post extends React.Component{
  render(){
    const { post } = this.props
    return(
      <div className="Post">
        <img src={post.user.avatarurl} alt="" className="Avatar"/>
        <div className="Post-body">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p className="Post-footer-text">{post.user.fullname}</p>
            <p className="Post-footer-text" style={{ marginLeft: 10 }}>{post.created_at}</p>
          </div>
          <p className="Post-content">{post.content}</p>
        </div>
      </div>
    )
  }
}

export default Post
