import { useEffect, useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updatePageTitle = () => {
        document.title = props.appName + "- " + capitalizeFirstLetter(props.category);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
        updatePageTitle();         
    }, []);

    const updateNews = async () => {
        setLoading(loading, true);
        let key = "getnews-country-" + props.country + "-category-" + props.category + "-page-" + page + "-pageSize-" + props.pageSize;
        let data = null;//localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
        if (data === null) {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
            let fetchdata = await fetch(url);
            let parseData = await fetchdata.json();
            localStorage.setItem(key, JSON.stringify(parseData));
            //data = parseData.articles;
            setPage(page + 1)
            setArticle(articles.concat(parseData.articles))
            setLoading(false);
            setTotalResults(parseData.totalResults)
        }        
    }

    const fetchMoreData = async () => {       
        let key = "getnews-country-" + props.country + "-category-" + props.category + "-page-" + page+1 + "-pageSize-" + props.pageSize;
        
        let data = null;//localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
        if (data === null) {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
            setPage(page + 1)
            let fetchdata = await fetch(url);
            let parseData = await fetchdata.json();
            localStorage.setItem(key, JSON.stringify(parseData));            
            setPage(page + 1)
            setArticle(articles.concat(parseData.articles))
            setTotalResults(parseData.totalResults)
        }
        
    }

    return (
        <>
            <h2 style={{marginTop:'90px',marginBottom:'30px'}} className="text-center">{props.appName} - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                {
                    <div className="container">
                        <div className="row">
                            {articles.map((e, index) => {
                                return e?.urlToImage && <div className="col-md-4" key={index}>
                                    <NewsItem title={e.title ? e.title : ""} description={e.description ? e.description : ""} imageUrl={e?.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source} />
                                </div>

                            })}
                        </div>
                    </div>
                }
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

