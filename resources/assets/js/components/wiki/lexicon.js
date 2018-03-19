import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from "../shared/list";

class LexiconList extends Component {  
 
  render() {  
    let { entry, term  } = this.props, 
      list = term[entry],
      el = null;
    
    if ( list.length < 1 ) { return null; } 
    if ( entry == 'iri' ) {
      el = <a href={list}>{list}</a> 
    } else { 
      el =<List items={ list } name={entry} /> 
    }
    
    return ( 
      <div className='lexicon-list'>
            <h6 className="">{ entry.toUpperCase() }</h6>
            <div className="lexicon-list">
              {el} 
            </div> 
       </div>
     );
  }
}  

class Lexicon extends Component {  

  render() {
    let { classes, term, keys } = this.props;

    return (
    <div className={ classes } id='lexicon'>
      <div className="card" >
        <div className="card-content"> 
          <span className="card-title">Lexicon</span> 
          <div className='lexicon-lists'>
            { keys.map( function(entry, i) {
              if ( entry in term ) {
                return ( <LexiconList entry={entry} term={term} key={i} />)  
              }
            })} 
          </div> 
        </div>
      </div> 
    </div> 
    )}

}

const defaultProps = {
    keys: ['iri','categories','labels', 'synonyms'],
    classes: 'col m4 s12 right scrollspy'
}

Lexicon.defaultProps = defaultProps;
export default Lexicon;
