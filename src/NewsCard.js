import React, { useState, useEffect } from 'react';
import './bootstrap.min.css';

export default function NewsCard({article}) {
    const [views, setViews] = useState(localStorage.getItem(article.title) || Number(0));
    useEffect(() => {
        localStorage.setItem(article.title, Number(views));
        // eslint-disable-next-line
    }, [views]);
    return (
        <div className="card">
            <h1 className="card-title">{article.title}</h1>
            <img className="card-img-top" src={article.urlToImage} alt={article.title} />
            <div className="card-body">
                <p className="card-text">{article.description ? article.description : article.content}</p>
                <a href={article.url} className="btn btn-primary float-left" style={{display: "table-cell"}} target="_blank" rel="noopener noreferrer" onClick={() => setViews(Number(views) + 1)}>Read More</a>
                <p className="float-right">Views: {views}</p>
            </div>
            <br />
        </div>

    );
};