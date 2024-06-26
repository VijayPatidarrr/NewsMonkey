import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import axios from "axios";

export class News extends Component {

  // static defaultProps=
  // {
  //   country:'in',
  //   pageSize:8,
  //   category:"general"
  // }
  
  // static PropTypes=
  // {
  //   country:PropTypes.string,
  //   pageSize:PropTypes.number,
  //   category:PropTypes.string
  // }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async componentDidMount()
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=438bdfefd2714c069339fc089dfaec47&pageSize=${this.props.pageSize}`;
    let data;
    this.setState({loading:true})
    await axios
      .get(url)
      .then(function(res){
        data = res.data;
      })
    let parsedData = data;
    console.log(parsedData);
     this.setState({loading:true})
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  }

 

   handlePrevClick=async()=>{
    let url=`https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=438bdfefd2714c069339fc089dfaec47&page=${this.state.page-1}&pageSize=${this.props.pageSize}`; 
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    })

  }

 handleNextClick=  async()=>{
   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
   {
     let url=`https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=438bdfefd2714c069339fc089dfaec47&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true})
     let data = await fetch(url);
     let parsedData = await data.json();
    //  console.log(parsedData);
     this.setState({
       page:this.state.page+1,
       articles:parsedData.articles,
       loading:false
      })
    }
  

  }

  render() {
    return (
     
        <div className="container my-3">
          <h1 className="text-center" style={{fontSize: "35px", color: "green"}}>NewsMonkey-Top Headlines</h1>
          
          {this.state.loading &&<Spinner/>}
              <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {            
            return <div className="col-md-4" key={element.url}>          
                  <NewsItem
                    tittle={element.title?element.title.slice(0,45):""}
                    discription={element.description?element.description.slice(0,80):""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url} />
                 
                </div>
        
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;

