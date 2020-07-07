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
    let cancel;
    axios({
      method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines',
      params: { q: query,
                page: pageNumber,
                apiKey: "7e38d3a25cc74ddbacd9020dfee377c0",
                pagesize: 10,
                category: cat !== '' ? cat : 'general' },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log(res);
      setArticles(prevArticles => {
        return [...prevArticles, ...res.data.articles];
      })
      setHasMore((pageNumber*10 < res.data.totalResults) && (pageNumber<10));
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) return;
      setError(true);
      console.log(e);
    })
    return () => cancel();
  }, [query, cat, pageNumber])

  return { loading, error, articles, hasMore };
}