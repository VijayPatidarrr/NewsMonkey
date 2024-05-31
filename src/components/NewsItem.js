import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { tittle, discription, imageUrl ,newsUrl } = this.props;

    return (
     
        <div className="container my-3">
          <div className="card" style={{ width: "18rem" }}>
            <img src={!imageUrl?"https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{tittle}</h5>
              <p className="card-text">{discription}</p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
                Read More
              </a>
            </div>
          </div>
        </div>
    );
  }
}

export default NewsItem;
