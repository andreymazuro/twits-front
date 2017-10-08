import React from 'react'
import Post from './Post'

class Feed extends React.Component{
  constructor(){
    super();
    this.state = {
      posts: [{
        author: 'Andrey',
        imageUrl: 'https://www.maybelline.com/~/media/mny/us/face-makeup/modules/masthead/maybelline-fit-me-foundation-powder-face-herieth-paul-1x1.jpg?w=320&hash=D3168A3056062A2093CD0E7A02834EE514C14EF8',
        date: '2012/08/15',
        content: 'hello dsfsd sdfsdfs sdf sd',
        id: 1
      },
      {
        author: 'Loh',
        imageUrl: 'http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32).jpg',
        date: '2015/02/12',
        content: 'assdf dsfs sdfsdf',
        id: 2,
      }]
    }
  }

  render(){
    const { posts } = this.state
    return(
      <div className="Feed">
        <ul>
        {posts.map(post =>
          <li index={post.id} style={{ listStyleType: 'none'}}>
            <Post post={post} />
          </li>
        )}
        </ul>
      </div>
    )
  }
}

export default Feed
