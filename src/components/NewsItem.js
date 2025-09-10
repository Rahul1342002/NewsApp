import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsURL ,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img src={!imageUrl?"https://2.img-dpreview.com/files/p/E~C0x403S7728x4347T1200x675~articles/0747202957/fujifilm_x100v_sample_gallery_01.jpeg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
    {source?source:"Unknown"}
    <span className="visually-hidden">unread messages</span>
  </span>
          </div>
        </div>
      </div>
    );
  }
}
