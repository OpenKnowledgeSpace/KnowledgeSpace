import React, {Component} from "react";
import { connect } from 'react-redux';
import {submitSearch, paginateSearch} from './entitySearchActions';
import { isArray, keys, has } from 'lodash';

import SearchBox from 'common/components/search/SearchBox';
import Facets from 'common/components/search/Facets';
import Results from 'common/components/search/Results';
import Pagination from 'common/components/search/Pagination';

import {ENTITY_RESULTS_COLUMNS} from './entitySearchConstants';

export class EntitySearch extends Component {
 
  componentDidMount() {
    this.props.dispatch(submitSearch(this.props));
  }
  
  handleQuery({target}) {
    const {filters} = this.props;
    this.props.dispatch(submitSearch({q: target.value, filters, page: 1}));
  }
 
  handlePagination() {
    const {filters, q} = this.props;
    const page = this.props.page + 1; 
    this.props.dispatch(paginateSearch({q, filters, page}));
  }

  handleFacetToggle({target}) {
    const {facet,value} = target.dataset;
    const {filters, q} = this.props;
    if ( !has(filters, facet) ) {
      filters[facet] = new Set([value]); 
    } else if ( !filters[facet].delete(value) ) {
      filters[facet].add(value); 
    }
    this.props.dispatch(submitSearch({q, filters, page: 1}));
  }

  handleRowClick({target}) {
    const {history}  = this.props;
    const {link} = target.tagName == 'TR' ? target.dataset : target.parentElement.dataset; 
    history.push(`/wiki/${link}`) 
  }

  render() {
    const { filters, facets, results} = this.props; 
    const  cols = ENTITY_RESULTS_COLUMNS;  
    return(
      <div>
        <SearchBox onChange={this.handleQuery.bind(this)} />
        <Facets facets={facets} selected={filters} handleFacetToggle={this.handleFacetToggle.bind(this)} />          
        <Results hits={results} cols={cols} onRowClick={this.handleRowClick.bind(this)} linkCol={'curie'} />  
        <Pagination handlePagination={this.handlePagination.bind(this)} />
      </div>
    ); 
  }
}

const mapStateToProps = ({entitySearch}) => {
  return {...entitySearch};
}

export default connect(mapStateToProps)(EntitySearch);
