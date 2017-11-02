import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataSpaceCategory from './data_space_category';
import PreloaderCircle from '../shared/preloader_circle';

import $ from "jquery";

class DataSpace extends Component {  
  
	constructor(props) {
    super(props);
    this.state = { categories: {}, preloader: true };
  }

  componentDidUpdate() { 
    $('.collapsible').collapsible('destroy');
    $('.collapsible').collapsible();
  }
	
  /* First we get out Categories and Datasources */  
	componentDidMount() { 
    axios.get('/api/data_space')
      .then( function(response) { 
        this.setState({  categories: response.data, preloader: false }, this.getResultsFromDataSpace);
      }.bind(this) )
      .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  }
  
  render() {
    let categories = this.state.categories;
    let terms = this.props.terms; 
    let preloader = this.props.preloader; 
    let classes = this.props.classes;

    let list = preloader  ? null : 
      (  <ul id='dataspace-categories' className='collapsible' data-collapsible="expandable" >
            { Object.keys(categories).map( function(cat, i) { 
              return <DataSpaceCategory key={i} terms={ terms } category={cat} sources={ categories[cat] } /> 
            })}
        </ul> );


    return (
    <div className={ classes } id='data-space'>
      <div className="card">
        <div className="card-content"> 
          <span className="card-title text-white">Data Space</span> 
          <PreloaderCircle enabled={ preloader } style={{ left: "40%"  }} /> 
          { list }
        </div>
      </div> 
    </div> 
    )}

}

const defaultProps = {
    categories: [ 'anatomy', 'expression', 'models', 'morphology', 'physiology' ],
    classes: 'col m12 s12 scrollspy'
}

DataSpace.defaultProps = defaultProps;

export default DataSpace;
