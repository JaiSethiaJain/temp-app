import React from 'react';
import './NewsApp.css';
import './bootstrap.min.css';

const newsapi = "https://newsapi.org/v2/";
const newsapiKey = "7e38d3a25cc74ddbacd9020dfee377c0";
let views = {};

function UpdateView(key){
  if(views.hasOwnProperty(key)){
    views[key] += 1;
  }
}

function RenderView(key){
  if(views.hasOwnProperty(key)){
    return views[key];
  }
  return 0;
}

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
            <div className="card" id={article.title} name={article.title}>
            <h1 className="card-title">{article.title}</h1>
            <img className="card-img-top" src={article.urlToImage} alt={article.title} />
            <div className="card-body">
            <p className="card-text">{article.content ? article.content : article.description}</p>
            <a href={article.url} className="btn btn-primary" onClick={UpdateView(article.title)} style={{display: "table-cell"}} target="_blank">Read More</a>
            <p className="float-right">Views: {RenderView(article.title)}</p>
            {/* <a  onClick={() => { views.clicks += 1; render();}}></a> */}
            {/* <div onClick={this.props.onClick}>This div has been clicked {this.props.clicks} times.</div> */}
            </div>
            <br/>
          </div>
          ))}
        </div>
      );
    }
  }
}

export default NewsApp;
