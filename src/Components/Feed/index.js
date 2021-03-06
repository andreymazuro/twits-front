import React from 'react'
import Post from './Post'

import { postTwitReq } from './const'

import TextareaAutosize from 'react-autosize-textarea';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class Feed extends React.Component{
  constructor(){
    super();
    this.state = {
      posts: [],
      postText: ''
    }
  }

  componentDidMount(){
    this.fetchFeed()
  }

  fetchFeed = () => {
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
      .then(posts => {
        if (posts.status !== 404) {
          this.setState({ posts: posts})
        }
      })
      .catch(err => console.log(err))
  }

  postTwit = () => {
    const content = this.state.postText
    postTwitReq(content)
      .then(() => this.fetchFeed())
   }

  render(){
    const { posts, postText } = this.state
    const showFormControls = postText.length !== 0
    return(
      <MuiThemeProvider>
        <div className="Feed">
          <div style={{ flex: 1 }}>
          </div>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', backgroundColor: 'white', marginTop: 10, alignItems: 'center' }}>
            <TextareaAutosize
              onChange={(e) => this.setState({ postText: e.target.value }) }
              ref={elem => this.textArea = elem}
              style={{ maxHeight: 80}}
              className="add-post-textarea"
            />
            {showFormControls?
             <RaisedButton
               onClick={this.postTwit}
               style={{ marginTop: 5 }}
               label="Post twit"
               primary={true}
             />
            :
             null
            }
            <ul style={{ alignSelf: 'flex-start' }} >
              {posts.map(post =>
                <li key={post.post_id} style={{ listStyleType: 'none'}}>
                  <Post post={post} />
                </li>
              )}
            </ul>
          </div>
          <div style={{ flex: 1 }}>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Feed
