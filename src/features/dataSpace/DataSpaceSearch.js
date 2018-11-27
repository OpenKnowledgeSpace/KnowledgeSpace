import React, {Component} from "react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { updateCurieAndSource, submitSearch, paginateSearch } from './dataSpaceActions';
import { isNull, isUndefined, isEmpty, keys, has } from 'lodash';

import SearchBox from 'common/components/search/SearchBox';
import Facets from 'common/components/search/Facets';
import Results from 'common/components/search/Results';
import Pagination from 'common/components/search/Pagination';

import { DATASPACE_SOURCES } from './dataSpaceConstants';


class DataSpaceSearch extends Component {

  handleFacetToggle({target}) {
    const {facet,value} = target.dataset; 
    const { entity, source, filters, q } = this.props;
    if ( !has(filters, facet) ) {
      filters[facet] = new Set([value]); 
    } else if ( !filters[facet].delete(value) ) {
      filters[facet].add(value); 
    }
    this.props.dispatch(submitSearch({q, filters, entity, source}));
  }
  
  handlePagination() {
    const { entity, filters,source,  q} = this.props;
    const page = this.props.page + 1; 
    this.props.dispatch(paginateSearch({q, entity, filters, source, page}));
  }
   
  handleRowClick({target}) {
    const {link} = target.tagName == 'TR' ? target.dataset : target.parentElement.dataset; 
    window.open(link, '_blank'); 
  }
  
  
  render() {
    const {source, filters, facets, results} = this.props;
    const {columns} = this.props;
    return (
      <div> 
        <Facets facets={facets} selected={filters} handleFacetToggle={this.handleFacetToggle.bind(this)} />          
        <Results hits={results} cols={columns} onRowClick={this.handleRowClick.bind(this)} linkCol={'dc.identifier'} />  
        <Pagination handlePagination={this.handlePagination.bind(this)} />
      </div>
    ); 
  }
}

const mapStateToProps = ({dataSpace, entity}) => {
  const { source } = dataSpace; 
  const sourceConfig = DATASPACE_SOURCES[source] || {};
  const {columns} = sourceConfig; 
  return {...dataSpace, entity, columns}; 
}

export default connect(mapStateToProps)(DataSpaceSearch);
