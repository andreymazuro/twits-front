import React from 'react'
import Post from './Post'

class Feed extends React.Component{
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    fetch('http://localhost:3000/feed', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      },
    })
      .then(res => res.json())
      .then(posts => this.setState({ posts: posts}) )
    .catch(err => console.log(err))
  }

  render(){
    const { posts } = this.state
    return(
      <div className="Feed">
        <ul>
        {posts.map(post =>
          <li key={post.post_id} style={{ listStyleType: 'none'}}>
            <Post post={post} />
          </li>
        )}
        </ul>
      </div>
    )
  }
}

export default Feed
