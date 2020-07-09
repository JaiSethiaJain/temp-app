import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useArticleSearch(query, cat, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setArticles([]);
  }, [query, cat]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: 'http://ec2-18-222-83-136.us-east-2.compute.amazonaws.com:4500/v2/top-headlines',
      params: { q: query,
                page: pageNumber,
                apiKey: "7e38d3a25cc74ddbacd9020dfee377c0",
                pagesize: 10,
                category: cat !== '' ? cat : 'general' }
    }).then(res => {
      console.log(res);
      setArticles(prevArticles => {
        return [...prevArticles, ...res.data.articles];
      });
      setHasMore((pageNumber*10 < res.data.totalResults) && (pageNumber<10));
      setLoading(false);
      if(res.data.totalResults === 0){
        alert("No Results Found For This Keyword !!! Try Again")
      }
    }).catch(e => {
      setError(true);
      console.log(e);
    })
  }, [query, cat, pageNumber])

  return { loading, error, articles, hasMore };
}