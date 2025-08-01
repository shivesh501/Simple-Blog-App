import React from 'react'
import {Link} from 'react-router-dom';
// import { useContext } from 'react';
// import DataContext from './context/DataContext'; // no longer needed since we are now using easy peasy

import {useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy'
const Nav = () => {
  // const {search, setSearch}= useContext(DataContext) //no longer needed since we are now using easy-peasy

  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults);


  useEffect(()=>{
      const filteredResults = posts.filter(post=>(
        (post.body).toLowerCase()).includes(search.toLowerCase())
        ||  (post.title).toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
     
},[posts,search,setSearchResults]);

  return (
    <nav className="Nav">

        <form onSubmit={(e)=>e.preventDefault()} className="searchForm">
          <label htmlFor="search">Search Post</label>
          <input type="text" id="search" placeholder="Search Posts" 
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}/>
        </form>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='post'>Post</Link></li>
          <li><Link to='about'>About</Link></li>
        </ul>
      
    </nav>
  )
}

export default Nav
