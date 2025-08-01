import {useNavigate} from 'react-router-dom'
// import { useContext,useState } from 'react'
import {format} from 'date-fns';
// import DataContext from './context/DataContext'
// import api from './API/posts'

import {useStoreState, useStoreActions} from 'easy-peasy';
const NewPost = () => {
  // const {posts,setPosts} = useContext(DataContext);
   
  //  const [postTitle, setPostTitle] = useState('');
  //   const [postBody, setPostBody] = useState('');
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

    const navigate = useNavigate();


    const handleSubmit =  (e)=>{
    e.preventDefault();
    const id = String(posts.length >0 ? Number(posts[posts.length-1].id) +1 : 1);
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body:postBody};
    /*
    try{
        const response = await api.post('/posts',newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/')
      }
      catch(err)
      {
        console.log(err.message);
      }*/
     savePost(newPost);
     navigate('/');
  }

  return (
    <main className="NewPost">
        <h2>New Post</h2>
        <form onSubmit={(e) =>{handleSubmit(e)}} className="newPostForm">
          <label htmlFor="postTitle">Title:</label>
          <input 
          type="text" 
          id="postTitle"
          required
          value={postTitle}
          onChange={(e)=>{setPostTitle(e.target.value)}}
          />
        
        <label htmlFor="postBody">Body:</label>
        <textarea 
        id="postBody"
        type="text"
        required
        value={postBody}
        onChange={(e)=>{setPostBody(e.target.value)}}
        />
        <button type="submit">Submit</button>
        </form>
      
    </main>
  )
}

export default NewPost
