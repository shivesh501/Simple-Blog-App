
import {useEffect} from 'react'
import {format} from 'date-fns';
import {useParams, Link} from 'react-router-dom'
// import { useContext } from 'react';
// import DataContext from './context/DataContext'; // no longer needed since we are using easy-peasy
// import api from './API/posts'
import {useNavigate} from 'react-router-dom'

import {useStoreActions, useStoreState} from 'easy-peasy';
const EditPost = () => {

  // const {posts, setPosts} = useContext(DataContext)
  const {id} = useParams();
  const navigate = useNavigate();

  // const [editTitle, setEditTitle] = useState('');
  // const [editBody, setEditBody] = useState('');

   
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);


  const handleEdit =  (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, datetime, title:editTitle, body: editBody}
    /*
    try {
     const response =  await api.put(`posts/${id}`, updatedPost);///instead of put we could use patch if we wanted to update specific fields
      setPosts(posts.map(post => 
        post.id === id ? {...response.data} : post
       
      ))
       setEditTitle('')
        setEditBody('')
        navigate('/')
    }
    catch (err)
    {
      console.log(err.message);
    } */
   editPost(updatedPost);
   navigate(`/post/${id}`);
  }


    //const post = posts.find(post => (post.id).toString() === id)
    
    useEffect(()=>{
        if(post)
        {
            setEditTitle(post.title)
            setEditBody(post.body)

        }

    },[post, setEditBody, setEditTitle])
  return (
      <main className="NewPost">
        {editTitle &&
        <>
        <h2>Edit Post</h2>
        <form onSubmit={(e) =>{e.preventDefault()}} className="newPostForm">
          <label htmlFor="postTitle">Title:</label>
          <input 
          type="text" 
          id="postTitle"
          required
          value={editTitle}
          onChange={(e)=>{setEditTitle(e.target.value)}}
          />
        
        <label htmlFor="postBody">Body:</label>
        <textarea 
        id="postBody"
        type="text"
        required
        value={editBody}
        onChange={(e)=>{setEditBody(e.target.value)}}
        />
        <button type="button" onClick={()=>handleEdit(post.id)}>Submit</button>
        </form>
      </>}
      {!editTitle && <><h2>Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit Our HomePage</Link></p>    </>}
    </main>
  )
}

export default EditPost
