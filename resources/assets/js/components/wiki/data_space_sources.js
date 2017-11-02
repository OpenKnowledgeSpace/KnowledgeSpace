import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* A single Data Space source */
class DataSpaceSource extends Component { 
 
  render() { 
    let count = this.props.count, 
      source = this.props.source,
      terms = this.props.terms,
      url = "/data_space/" + source.curie + "?" + terms;

    return ( 
      <li  className='collection-item'>
        <span className='title'>
          <h6><a href={ url }>{source.source_name}</a>
          <span className='new badge red' data-badge-caption="Records Found">{ count }</span></h6>	
        </span>
        <p className='flow-text description' dangerouslySetInnerHTML={ { __html:  source.description } } />
      </li>)
  }

}

DataSpaceSource.defaultProps = { count: 0  };


/* A list of sources that belong to a Data Space Category */
class DataSpaceSources extends Component {  

  render() {
    let category = this.props.category,
      source_count = this.props.source_count,
      terms = this.props.terms;

    var dsList =  this.props.sources.map( function( source, i) { 
      return  <DataSpaceSource  key={i} source={ source } count={ source_count[source.curie]  } terms={ terms } />  
    });

    return (
        <ul id={ category } className="collection with-header">
						<li className='collection-header'><h5>{ category.charAt(0).toUpperCase() + category.slice(1) } Data Space</h5></li>
						{ dsList }
  			</ul> 
    )}

}

export default DataSpaceSources;
