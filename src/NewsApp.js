import React, { useState, useRef, useCallback } from 'react';
import useArticleSearch from './useArticleSearch';
import NewsCard from './NewsCard';
import './bootstrap.min.css';

export default function NewsApp() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [cat, setCat] = useState('');

  let temp = '';
  let {
    articles,
    hasMore,
    loading,
    error
  } = useArticleSearch(query, cat, pageNumber);

  const observer = useRef();
  const lastArticleElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleCat(e) {
    setQuery('');
    setCat(e);
    setPageNumber(1);
  }

  function handleSearch(e) {
    temp = e.target.value;
  }

  function handleSearchCall(e){
    e.preventDefault();
    if(temp === ''){
      alert("Please Enter Some Keyword To Search For !!! Empty Strings Are Not Accepted");
    }
    else{
      setQuery(temp);
      setCat('');
      setPageNumber(1);
    }
  }

  function render(){
    return (
      <div className="NewsApp">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><a href="/" className="nav-link" value="general" onClick={(e) => {e.preventDefault(); handleCat('general')}}>General</a></li>
              <li className="nav-item"><a href="/" className="nav-link" value="business" onClick={(e) => {e.preventDefault(); handleCat('business')}}>Business</a></li>
              <li className="nav-item"><a href="/" className="nav-link" value="entertainment" onClick={(e) => {e.preventDefault(); handleCat('entertainment')}}>Entertainment</a></li>
              <li className="nav-item"><a href="/" className="nav-link" value="health" onClick={(e) => {e.preventDefault(); handleCat('health')}}>Health</a></li>
              <li className="nav-item"><a href="/" className="nav-link" value="science" onClick={(e) => {e.preventDefault(); handleCat('science')}}>Science</a></li>
              <li className="nav-item"><a href="/" className="nav-link" value="sports" onClick={(e) => {e.preventDefault(); handleCat('sports')}}>Sports</a></li>
              <li className="nav-item"><a href="/" className="nav-link" value="technology" onClick={(e) => {e.preventDefault(); handleCat('technology')}}>Technology</a></li>
            </ul>
          </div>
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchCall}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
        {
          articles.map((item, index) => {
            return(
              <div ref={(articles.length === index+1) ? lastArticleElementRef : undefined } key={index}>
                <NewsCard article={item} />
              </div>
            );
          })
        }
        <div>{loading && 'Loading...'}</div>
        <div>{error && 'Error: Something Went Wrong !!! Try Again In Few Moments'}</div>
      </div>
    );
  }
return render();
}