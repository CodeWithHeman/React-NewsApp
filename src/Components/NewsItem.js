import React from 'react'

const NewsItem = (props) => {    
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', right: '0', position: 'absolute' }}>
                    <span className="badge rounded-pill bg-danger">
                        {source.name}
                    </span>
                </div>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>

                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on  {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
