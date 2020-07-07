import React, { useState, useRef, useCallback } from 'react';
import useArticleSearch from './useArticleSearch';
import './bootstrap.min.css';

export default function NewsApp() {
  let temp = '';

  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [cat, setCat] = useState('');

  const {
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
    setQuery(temp);
    setCat('');
    setPageNumber(1);
  }

  return (
  <div className="NewsApp">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
                 <li className="nav-item"><div className="nav-link" value="general" onClick={() => {handleCat('general')}}>General</div></li>
                 <li className="nav-item"><div className="nav-link" value="business" onClick={() => {handleCat('business')}}>Business</div></li>
                 <li className="nav-item"><div className="nav-link" value="entertainment" onClick={() => {handleCat('entertainment')}}>Entertainment</div></li>
                 <li className="nav-item"><div className="nav-link" value="health" onClick={() => {handleCat('health')}}>Health</div></li>
                 <li className="nav-item"><div className="nav-link" value="science" onClick={() => {handleCat('science')}}>Science</div></li>
                 <li className="nav-item"><div className="nav-link" value="sports" onClick={() => {handleCat('sports')}}>Sports</div></li>
                 <li className="nav-item"><div className="nav-link" value="technology" onClick={() => {handleCat('technology')}}>Technology</div></li>
        </ul>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchCall}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    {
      articles.map((item, index) => {
        return(
          <div ref={(articles.length === index+1) ? lastArticleElementRef : undefined } className="card" key={item.title}>
            <h1 className="card-title">{item.title}</h1>
            <img className="card-img-top" src={item.urlToImage} alt={item.title} />
            <div className="card-body">
              <p className="card-text">{item.content ? item.content : item.description}</p>
              <a href={item.url} className="btn btn-primary float-left" style={{display: "table-cell"}} target="_blank" rel="noopener noreferrer">Read More</a>
              <p className="float-right">Views: 0</p>
            </div>
            <br />
          </div>
        );
      })
    }
    <div>{loading && 'Loading...'}</div>
    <div>{error && 'Error'}</div>
  </div>
  );
}