import React, {Component} from "react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { updateCurie } from '../entity/entityActions';
import { submitSearch, paginateSearch } from './literatureActions';

import { isArray, keys, isEmpty, has } from 'lodash';

import Detail from '../entity/components/Detail';

import SearchBox from 'common/components/search/SearchBox';
import Facets from 'common/components/search/Facets';
import LiteratureResults from './components/LiteratureResults';
import Pagination from 'common/components/search/Pagination';

class LiteratureSearch extends Component {
  
  componentDidMount() {
    if ( isEmpty(this.props.curie) ) {
      this.props.dispatch(updateCurie(this.props.match.params.curie));
    } 
  }
  
  handlePagination() {
    const { entity, filters,source,  q} = this.props;
    const page = this.props.page + 1; 
    this.props.dispatch(paginateSearch({q, entity, filters, source, page}));
  }
  
  handleFacetToggle({target}) {
    const {facet,value} = target.dataset; 
    const { curie, filters, q } = this.props;
    
    if ( !has(filters, facet) ) {
      filters[facet] = new Set([value]); 
    } else if ( !filters[facet].delete(value) ) {
      filters[facet].add(value); 
    }
    this.props.dispatch(submitSearch({q,filters,curie}));
  }



  render() {
    const {results, entity, filters, facets} = this.props;
    return (
      <div> 
        <h2>Literature</h2>
        <Detail entity={entity} />
        <Facets facets={facets} selected={filters} handleFacetToggle={this.handleFacetToggle.bind(this)} />          
        <LiteratureResults hits={results} />  
        { results.total > 20 && <Pagination handlePagination={this.handlePagination.bind(this)} /> }
      </div>
    ); 
  }

}

const mapStateToProps = ({literature, entity}) => {
  const {curie} = entity; 
  return {...literature, curie, entity};
}

export default connect(mapStateToProps)(LiteratureSearch);
