import Layout from './Layout';

//various react components
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';


import { Routes, Route } from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import {useEffect} from 'react';
import {useStoreActions} from 'easy-peasy';
//context api
//import {DataProvider} from './context/DataContext' ///we are now using easy peasy instead of ContextApi to provide data

function App() {
  /*
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  
  const {width} = useWindowSize();//custom hooks
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

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
/*
  useEffect(()=>{
      const filteredResults = posts.filter(post=>(
        (post.body).toLowerCase()).includes(search.toLowerCase())
        ||  (post.title).toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
     
},[posts,search]);

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
  }
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

  const handleDelete = async (id) => {
    

    try{
    await api.delete(`/posts/${id}`);
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList)
    navigate('/')
    }
    catch(err)
    {
      console.log(err.message);
    }
  } */
 const setPosts = useStoreActions((actions) => actions.setPosts);
  const {data, fetchError, isLoading} = useAxiosFetch('https://simple-blog-app-7zy6.onrender.com/posts');
  useEffect(()=>{setPosts(data)},[data, setPosts]);




  return (
    
      <Routes>
         <Route  path="/" element={<Layout/>} >

              <Route index element={<Home  isLoading={isLoading} fetchError={fetchError}/>} />
                  <Route path="post">
                  <Route index element={<NewPost />}/>
                  <Route path=":id" element={<PostPage />} />
           </Route>
              <Route path="edit/:id" element={<EditPost/>}/>
              <Route path="about" element={<About />} />
              <Route path="*" element={<Missing />} />
              </Route>
      </Routes>
 
     
  );
}

export default App;
