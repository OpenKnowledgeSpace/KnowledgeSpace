import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Article extends Component {  


  render() {
    var article = this.props.article;  
    return( 
        <li className='article'>
          <h4><a href={ 'http://www.ncbi.nlm.nih.gov/pubmed?term=' + article.pmid }>{ article.title }</a></h4>
          <div className="">{ article.author.join(", ") }</div>
          <div className=""><b>{ article.journal }</b> ({ article.year }-{ article.month}-{article.day})</div>
          <div className="">DOI:{ article.doi } PMID:{ article.pmid}</div>
        </li>
       )
    
    }; 
   

}

export default Article;
