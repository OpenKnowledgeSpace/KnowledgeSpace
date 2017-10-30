import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PreloaderCircle from '../shared/preloader_circle';
import List from "../shared/list";

class Lexicon extends Component {  

  getList( key, term,  i) {
    if ( term[key].length < 1 ) { return null; } 
    return ( 
      <div className='row' key={i}>
            <label className="col s2">{ key.toUpperCase() }</label>
            <div className="col s9 label-only">
              <List items={ term[key] } name={key} /> 
            </div> 
       </div>
     );
  }


  getLists() { 
    let term = this.props.term;
    let keys = this.props.keys;; 
    let getList = this.getList;
    return ( 
      <div>
        { keys.map( function(key, i) { if ( key in term ) { return ( getList(key, term, i)  ) } }) } 
      </div> ) 
    }

  render() {
    let preloader = this.props.preloader; 
    let classes = this.props.classes;
    let list = this.getLists();
    
    return (
    <div className={ classes } id='lexicon'>
      <div className="card light-blue lighten-5" >
        <div className="card-content"> 
          <span className="card-title text-white">Lexicon</span> 
          <PreloaderCircle enabled={ preloader } style={{ left: "40%"  }} /> 
          { list }
        </div>
      </div> 
    </div> 
    )}

}

const defaultProps = {
    keys: ['iri','categories','labels', 'synonyms'],
    classes: 'col m8 s12 scrollspy'
}

Lexicon.defaultProps = defaultProps;
export default Lexicon;
