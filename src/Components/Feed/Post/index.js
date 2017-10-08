import React from 'react'

class Post extends React.Component{
  render(){
    const { post } = this.props
    return(
      <div className="Post">
        <img src={post.imageUrl} className="Avatar"/>
        <div className="Post-body">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p className="Post-footer-text" style={{ marginLeft: '10px'}}>{post.author}</p>
            <p className="Post-footer-text">{post.date}</p>
          </div>
          <p>{post.content}</p>
        </div>
      </div>
    )
  }
}

export default Post
