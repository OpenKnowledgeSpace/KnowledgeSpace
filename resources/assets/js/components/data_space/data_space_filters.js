import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

class DataSpaceFacet extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange({target}) { 
    this.props.onChangeFilters( this.props.category + ":" + this.props.facet.value ) 
  }

  render() { 
    let { category, facet, facetFilters, preloader } = this.props;
    let attr = facetFilters.has( category + ":" + facet.value ) ? 'checked' : ''

    return (
        <li className="collection-item">
          <label>
            <input type="checkbox" checked={attr} disabled={preloader} className="filled-in" value={ facet.value } onChange={ this.handleChange } />
            <span style={{ width: '100%', display: 'inline-table' }}>
              { facet.value }
              <i className='chip right' style={{ top: '-5px', position: 'relative' }}>{ facet.count }</i>
            </span>
          </label> 
        </li>
    ) 
  }

}

class DataSpaceFacetCategory extends Component { 
  
  render() { 
    let { category, onChangeFilters, facetFilters, preloader } = this.props; 
    let facets = this.props.facets.map( (facet, i) =>
      <DataSpaceFacet
        facet={facet} 
        facetFilters={facetFilters}
        category={category} 
        key={i}
        onChangeFilters={onChangeFilters}
        preloader={preloader} />
    );
    
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h6>{ this.props.category}</h6></li>
        { facets } 
      </ul>
    ) 
  }
}

class DataSpaceFilters extends Component {  
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange({target}) { 
    this.props.onChangeFilters( undefined, target.value  ) 
  }

  render() { 
    let { facets, onChangeFilters, facetFilters, preloader, keyword } = this.props;
    let categories =  Object.keys(facets).map( (category, i) => 
      <DataSpaceFacetCategory 
        key={i}
        category={ category }
        onChangeFilters={onChangeFilters}
        facets={facets[category]}
        preloader={preloader}
        facetFilters={facetFilters} />
    ); 


    return( 
      <div className='col m3 data-space-facets'>
        <ul className="collection with-header">
          <li className="collection-header"><h6>Search</h6></li>
          <li className="search">
            <div className='search-wrapper input-field'>  
              <i className='material-icons prefix'>search</i> 
              <input type="text" ref='query' className='form-control' id="dspace-keyword" placeholder="keyword" value={ keyword } onChange={ this.handleChange } />
            </div>
          </li>
        </ul> 
        {categories} 
      </div>
    ) 
   }
}

export default DataSpaceFilters;
