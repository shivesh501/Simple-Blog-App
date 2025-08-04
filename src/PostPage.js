
import {useParams, Link} from "react-router-dom";
//import { useContext } from 'react';
// import api from './API/posts'
import {useNavigate} from 'react-router-dom'
// import  DataContext from './context/DataContext'; // no longer needed since we are now using easy-peasy
import {useStoreState, useStoreActions} from 'easy-peasy'


const PostPage = () => {
  // const {posts, setPosts} = useContext(DataContext);

 const {id} = useParams();
  const navigate = useNavigate();

  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);
  
    const handleDelete =  (id) => {
    /*

    try{
    await api.delete(`/posts/${id}`);
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList)
    navigate('/')
    }
    catch(err)
    {
      console.log(err.message);
    }*/
      deletePost(id);
      navigate('/');
  }

//  const post = posts.find(post=> (post.id).toString()===id);
  return (
    <main className="PostPage">
        <article className="post">
          {post &&
           <>
           <h2>{post.title}</h2>
           <p className="postDate">{post.datetime}</p>
           <p className="posBody">{post.body}</p>
           <Link to={`/edit/${post.id}`}> <button className="editButton">Edit Post</button></Link>
           <button className="deleteButton"onClick={() => handleDelete(post.id)}>Delete Post</button>
           </>
          }
          {!post && 
          <>
            <h2>Post not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Home-Page</Link>
            </p>
          </> }
        </article>
      
    </main>
  )
}

export default PostPage
