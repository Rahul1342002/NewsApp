import React, {
  Component
} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {

    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles:0}


  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a90026fb017f48d78e237ad38216d045&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles, 
      totalArticles:parsedData.totalResults , 
      loading:false})
    console.log(parsedData);
  }

   handlePrevClick = async() =>{
    console.log("previous")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a90026fb017f48d78e237ad38216d045&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles})
    this.setState({
      page : this.state.page-1,
      loading :false
    })
  }

   handleNextClick = async () => {

  if (this.state.page + 1 <= Math.ceil(this.state.totalArticles/ this.props.pageSize)) {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a90026fb017f48d78e237ad38216d045&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading :false
      
    });
    console.log("next");
  }
}


  render() {

    return (
      <div className='container my-3' >
        <h1 className='text-center' > NewsChimp - Top Headlines </h1>
        {this.state.loading && <Spinner />}
        <div className="row" > {
          !this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 mt-4" key={element.url}>
              <NewsItem 
                title={
                  element.title
                }
                description={
                  element.description
                }
                newsURL={element.url}
                imageUrl={
                  element.urlToImage
                }
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
                
              />

            </div>
          })
        }
        

        </div>
        <div className='container flex d-flex justify-content-between '>
        <button disabled={this.state.page<=1} type='button' onClick={this.handlePrevClick} className='btn btn-dark'>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/ this.props.pageSize)} type='button' onClick={this.handleNextClick} className='btn btn-dark'>Next &rarr;</button>
        </div>
      </div>
      
    )
  }
}