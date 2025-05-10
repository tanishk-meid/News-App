import React,{ Component } from 'react'
import NewsItem from './Newsitem'
import PropTypes from 'prop-types'

export class News extends Component {
 static defaultProps = {
    country: 'us',
    pageSize: 5,
    category:'general',
  }
  
static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  
constructor(props) {
  super(props);
  this.state = {
    articles:[],
    loading: true,
    page: 1,
    totalResults: 0
  }
}




async updateNews() {
  this.props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5184056aca445a3a788e0e859dd0710&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  this.props.setProgress(30);
  let parsedData = await data.json();
  this.props.setProgress(70);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false,
  })
  this.props.setProgress(100);
}
async componentDidMount() {
  this.updateNews();
}
 handlePrevClick = async ()=>{
  this.setstate({ page: this.state.page - 1});
  this.updateNews();

}

handleNextClick = async ()=>{
 this.setState({ page: this.state.page + 1});
 this.updateNews()


}
render () {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'70px'}}>NewsApp - Top Headlines</h2>
        
          <div className="row">
          {this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title:""} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}
                  author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div> 
            
            })}

          </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" 
        onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
}
}


export default News
