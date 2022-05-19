import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,
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
            loading: true,
            page: 1,
            totalResults:0
        }
    }

    componentDidMount() {
        this.updateNews();
        this.updatePageTitle();
    }

    async updateNews() {
        this.setState({
            loading: true
        })        
        let key = "getnews-country-" + this.props.country + "-category-" + this.props.category +"-page-" + this.state.page+ "-pageSize-" + this.props.pageSize;
        let data = null;//localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
        if (data === null) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;           
            let fetchdata = await fetch(url);
            let parseData = await fetchdata.json();
            localStorage.setItem(key, JSON.stringify(parseData));
            //data = parseData.articles;
            this.setState({
                page: this.state.page + 1,
                articles: this.state.articles.concat(parseData.articles),
                totalResults: parseData.totalResults,
                loading: false                
            });
        }
        else {
            this.setState({
                page: this.state.page + 1,
                articles: this.state.articles.concat(data.articles),
                totalResults: data.totalResults,
                loading: false                
            });
        }        
    }
    

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    fetchMoreData=async ()=>{
        this.setState({
            page: this.state.page + 1                         
        });
        let key = "getnews-country-" + this.props.country + "-category-" + this.props.category +"-page-" + this.state.page+ "-pageSize-" + this.props.pageSize;
        let data = null;//localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
        if (data === null) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;           
            let fetchdata = await fetch(url);
            let parseData = await fetchdata.json();
            localStorage.setItem(key, JSON.stringify(parseData));
            //data = parseData.articles;
            this.setState({
                page: this.state.page + 1,
                articles: this.state.articles.concat(parseData.articles),
                totalResults: parseData.totalResults                           
            });
        }
        else {
            this.setState({
                page: this.state.page + 1,
                articles: this.state.articles.concat(data.articles),
                totalResults: data.totalResults                
            });
        } 
    }

    updatePageTitle(){
        document.title=this.props.appName +"- "+  this.capitalizeFirstLetter(this.props.category);
    }

    // handlePreviousClick = async () => {        
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews();        
    // }

    // handleNextClick = async () => {        
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews();       
    // }

    render() {
        return (
            <div>
                
                    <h2 className="text-center my-5 mx-5">{this.props.appName} - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}>

                        {
                            <div className="container">
                                <div className="row">
                                    {this.state.articles.map((e,index) => { 
                                        return e.urlToImage && <div className="col-md-4" key={index}>
                                            <NewsItem title={e.title ? e.title : ""} description={e.description ? e.description : ""} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source} />
                                        </div>

                                    })}
                                </div>
                            </div>
                        }
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between my-2">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button disabled={(this.state.page > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}               
            </div>
        )
    }
}


