import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PreloaderCircle from '../shared/preloader_circle';
import List from "../shared/list";

class Lexicon extends Component {  

  getList( key, term,  i) {
    let list = term[key],
      el = null;
    if ( list.length < 1 ) { return null; } 
    if ( key == 'iri' ) {
      el = <a href={list}>{list}</a> 
    } else { 
      el =<List items={ list } name={key} /> 
    }
    
    return ( 
      <div className='lexicon-list' key={i}>
            <h6 className="">{ key.toUpperCase() }</h6>
            <div className="lexicon-list">
              {el} 
            </div> 
       </div>
     );
  }


  getLists() { 
    let term = this.props.term;
    let keys = this.props.keys;; 
    let getList = this.getList;
    return ( 
      <div className='lexicon-lists'>
        { keys.map( function(key, i) { if ( key in term ) { return ( getList(key, term, i)  ) } }) } 
      </div> ) 
    }

  render() {
    let preloader = this.props.preloader; 
    let classes = this.props.classes;
    let list = this.getLists();
    
    return (
    <div className={ classes } id='lexicon'>
      <div className="card" >
        <div className="card-content"> 
          <span className="card-title">Lexicon</span> 
          <PreloaderCircle enabled={ preloader } style={{ left: "40%", padding: '6px', margin: '40px 0'  }} /> 
          { list }
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
