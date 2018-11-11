import React, {Component} from "react";
import { connect } from 'react-redux';
import {submitSearch, paginateSearch} from './searchActions';
import { isArray, keys, has } from 'lodash';

import SearchBox from './components/SearchBox';
import Facets from './components/Facets';
import Results from './components/Results';
import Pagination from './components/Pagination';

export class Search extends Component {
 
  componentDidMount() {
    const {params} = this.props;
    this.props.dispatch(submitSearch(params));
  }
  
  handleQuery({target}) {
    const {filters} = this.props.params;
    this.props.dispatch(submitSearch({q: target.value, filters, page: 1}));
  }
 
  handlePagination() {
    const {filters, q} = this.props.params;
    const page = this.props.params.page + 1; 
    this.props.dispatch(paginateSearch({q, filters, page}));
  }

  handleFacetToggle({target}) {
    const {facet,value} = target.dataset;
    const {filters, q} = this.props.params;
    if ( !has(filters, facet) ) {
      filters[facet] = new Set([value]); 
    } else if ( !filters[facet].delete(value) ) {
      filters[facet].add(value); 
    }
    this.props.dispatch(submitSearch({q, filters, page: 1}));
  }

  render() {
    const { params, facets, results, dispatch} = this.props; 
    return(
      <div>
        <SearchBox onChange={this.handleQuery.bind(this)} />
        <Facets facets={facets} selected={params.filters} handleFacetToggle={this.handleFacetToggle.bind(this)} />          
        <Results hits={results} />  
        <Pagination handlePagination={this.handlePagination.bind(this)} />
      </div>
    ); 
  }
}

const mapStateToProps = ({search}) => {
  return {...search};
}

export default connect(mapStateToProps)(Search);
