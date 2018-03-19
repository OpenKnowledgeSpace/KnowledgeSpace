import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* A single Data Space source */
class DataSpaceSource extends Component { 
 
  render() { 
    let { count, source, terms, curie } = this.props, 
      url = "/data_space/" + source.curie + "?termCurie=" + curie + "&" + terms;

    return ( 
      <li  className='collection-item'>
        <span className='title'>
          <h5><a href={ url }>{source.source_name}</a><span className='new badge red' data-badge-caption="Records Found">{ count }</span></h5>	
        </span>
        <p className='description' dangerouslySetInnerHTML={ { __html:  source.description } } />
      </li>)
  }
}

DataSpaceSource.defaultProps = { count: 0  };


/* A list of sources that belong to a Data Space Category */
class DataSpaceSources extends Component {  

  render() {
    let { category, source_count, terms, sources, curie } = this.props;
    return (
        <ul id={ category } className="collection with-header">
          {
            sources.map( function( source, i) {
              return  <DataSpaceSource  key={i} curie={ curie } source={ source } count={ source_count[source.curie]  } terms={ terms } />
            })
          }
  			</ul>
    )}

}

export default DataSpaceSources;
