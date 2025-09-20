import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);

    // 👇 Cap totalResults at 100 (NewsAPI limit)
    setTotalResults(Math.min(parsedData.totalResults, 100));
    setLoading(false);

    console.log("UpdateNews:", {
      articlesLength: parsedData.articles.length,
      totalResults: parsedData.totalResults
    });

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
  setPage(page + 1);
  let data = await fetch(url);
  let parsedData = await data.json();

  // If API returns no new articles, lock totalResults to current length
  if (!parsedData.articles || parsedData.articles.length === 0) {
    setTotalResults(articles.length); 
    console.log("No more articles from API. Forcing end.");
    return;
  }

  setArticles(articles.concat(parsedData.articles));
  setTotalResults(Math.min(parsedData.totalResults, 100));

  console.log("FetchMoreData:", {
    newArticles: parsedData.articles.length,
    totalResults: parsedData.totalResults,
    currentArticles: articles.length + parsedData.articles.length
  });
};


  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            <b>Yay! You have seen it all 🎉</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
