import React from 'react';
import './NewsApp.css';
import './bootstrap.min.css';

const newsapi = "https://newsapi.org/v2/";
const newsapiKey = "7e38d3a25cc74ddbacd9020dfee377c0";

class NewsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: {}
    };
  }

  componentDidMount() {
    fetch(newsapi+"top-headlines?"+"country=in&apiKey="+newsapiKey)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
          console.log(result);
        }
      )
  }

  render() {
    const { isLoaded, data } = this.state;
    if (data.status === "error") {
      return <div>Error: {data.code} {data.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          { data.articles.map(article => (
            <div className="card"> 
            {/* <div style="width: 18rem;"></div> */}
            <img className="card-img-top" src={article.urlToImage} alt="Card image cap" />
            <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
              <a href={article.url} className="btn btn-primary">Read More</a>
            </div>
          </div>
          ))}
        <ul>
          {data.status}
          {/* {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))} */}
        </ul>
        </div>
      );
    }
  }
}

// function NewsApp() {
//   return (
//     <div>Hello</div>
//   );
// }

export default NewsApp;
