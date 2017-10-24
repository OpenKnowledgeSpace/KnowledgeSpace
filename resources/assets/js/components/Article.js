import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Article extends Component {  


  render() {
    var article = this.props.article;  
    return( 
        <li className='collection-item'>
          <span className="title"><a href={ 'http://www.ncbi.nlm.nih.gov/pubmed?term=' + article.pmid }>{ article.title }</a></span>
          <p className="">
            { article.author.join(", ") }<br/>
            <b>{ article.journal }</b> ({ article.year }-{ article.month}-{article.day})<br/>
            DOI:{ article.doi } PMID:{ article.pmid}
          </p>
        </li>
       )
    
    }; 
   

}

export default Article;
