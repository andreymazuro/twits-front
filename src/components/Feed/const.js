const token = localStorage.getItem('token')

export const postTwitReq = (content) => {
    return fetch('http://localhost:3000/posts', {
             method: 'post',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'token': token
             },
             body: JSON.stringify({ post_content: content })
           })
}
