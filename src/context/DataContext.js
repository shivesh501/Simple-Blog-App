import {createContext, useState, useEffect} from 'react';

//custom hooks
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([]);
 
  
   //custom hooks
  const {data, fetchError, isLoading} = useAxiosFetch('https://simple-blog-app-2oxx.onrender.com/posts');

  useEffect(()=>{
    setPosts(data);
  },[data])

  /*   no need since we are now using a custom axiosfetch hook
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try{
        const response = await api.get('/posts');
        setPosts(response.data)
      }
      catch(err)
      {
        //from the documentation
        if(err.response){
          //Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        }
        else
        {//for remaining errors
          console.log(`Error: ${err.message}`);

        }

      }
    }
    fetchPosts(); //calling the fetchPosts function
  },[]);  */

  useEffect(()=>{
      const filteredResults = posts.filter(post=>(
        (post.body).toLowerCase()).includes(search.toLowerCase())
        ||  (post.title).toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
     
},[posts,search]);


 /*

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const id = String(posts.length >0 ? Number(posts[posts.length-1].id) +1 : 1);
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body:postBody};
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
      }
  }*/
 /*
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, datetime, title:editTitle, body: editBody}
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
    }
  }


*/

  return (
    <DataContext.Provider value={{
     search,setSearch,
      searchResults,fetchError,isLoading,

        posts, setPosts,
        
    }}>
        {children}
        </DataContext.Provider>
  )
} 

export default DataContext;
