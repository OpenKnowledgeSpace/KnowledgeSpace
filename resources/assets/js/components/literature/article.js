import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Article extends Component {  

  render() {
    let meta = this.props.article._source.dc;
    let link; 
    let [ ns, id ] = meta.identifier.split(':');
    switch ( ns ) {
      case "arxiv":
        link = "https://arxiv.org/abs/" + id;
        break; 
      default:
        link = 'http://www.ncbi.nlm.nih.gov/pubmed?term=' + id;  
    } 

    let idFix = (id) => id.replace(/^arxiv\:/, "arXiv:").replace(/^pmid\:/, "PMID:")
    
    let ids = [],
        publishers = [];
    ids.push(<li key={1} className='valign-wrapper'>Identifier: <span className='red badge white-text'>{idFix( meta.identifier )}</span></li>); 
    if ( meta.doi ) {
      ids.push(<li key={2} className='valign-wrapper'>DOI: <span className='blue badge white-text'>{meta.doi}</span></li>); 
    }
    
    
    if ( meta.publishers ) { 
      publishers = meta.publishers.map( function(pub, i) { return( <span key={i}>Published In: { pub.name }<br/> </span>   )   } ); 
    }

    return( 
        <li className='collection-item'>
          <span className="title"><a target='_blank' href={ link }>{ meta.title }</a></span>
         <p className="publisher-info">
            { meta.creators.map( function(c,i) { return c.name } ).join(', ') }<br/>
            { publishers } 
            { meta.publicationYear }<br/>
          </p>
          <ul className=''>{ids}</ul> 
        </li>
       )
    }; 
}

export default Article;
