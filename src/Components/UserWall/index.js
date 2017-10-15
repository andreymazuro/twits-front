import React from 'react'
import Post from '../Feed/Post'

class UserWall extends React.Component{
  constructor(){
    super();
    this.state={
      posts: []
    }
  }

  componentDidMount(){
    const username = this.props.match.params.username
    fetch(`http://localhost:3000/user/${username}`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error (res.error)
        }
        else {
          this.setState({ posts: res })
        }
      })
    .catch(err => console.log(err))
  }

  render(){
    const { posts } = this.state
    return(
      <div>
        <ul>
          {posts.map(post =>
          <li key={post.post_id} >
            <Post post={post} />
          </li>
          )}
        </ul>
      </div>
    )
  }
}

export default UserWall
