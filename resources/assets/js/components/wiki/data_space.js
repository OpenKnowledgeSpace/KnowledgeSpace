import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataSpaceCategory from './data_space_category';

import $ from "jquery";

class DataSpace extends Component {  
  
	constructor(props) {
    super(props);
    this.state = { categories: {} };
  }

  componentDidUpdate() { 
    $('.collapsible').collapsible('destroy');
    $('.collapsible').collapsible();
  }
	
  render() {
    let { classes, categories, terms, curie } = this.props; 

    return (
      <div className={ classes } id='data-space'>
        <div className="card">
          <div className="card-content"> 
            <span className="card-title text-white">Data Space</span> 
            <ul id='dataspace-categories' className='collapsible popout' data-collapsible="expandable">
              { Object.keys(categories).map( function(cat, i) { 
                return <DataSpaceCategory key={i} curie={curie} terms={ terms } category={cat} sources={ categories[cat] } /> 
              })}
            </ul> 
          </div>
        </div> 
      </div> 
    )
  }

}

const defaultProps = {
    categories: [ 'anatomy', 'expression', 'models', 'morphology', 'physiology' ],
    classes: 'col m12 s12 scrollspy'
}

DataSpace.defaultProps = defaultProps;
export default DataSpace;
