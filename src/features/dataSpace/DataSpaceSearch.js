import React, {Component} from "react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { updateCurieAndSource, updateFilters } from './dataSpaceActions';
import { isNull, isUndefined, isEmpty, keys, has } from 'lodash';


import { DataSpaceFilters } from './components/DataSpaceSearchComponents';

import { DATASPACE_SOURCES } from './dataSpaceConstants';


class DataSpaceSearch extends Component {

  handleClick({target}) {
    const {field,value} = target.dataset; 
    const { entity, source, filters } = this.props;
    if ( has(filters, field) ) {
      if ( !filters[field].delete(value) ) {
        filters[field].add(value)
      }
    } else {
      filters[field] = new Set([value]); 
    } 
    this.props.dispatch(updateFilters({filters, entity, source}));
  }
    
  render() {
    const {source, aggregations} = this.props;
    const handleClick = this.handleClick.bind(this); 
    
    return (
      <div> 
        <h4>Filters</h4>
        { !isEmpty(source) && <DataSpaceFilters aggregations={aggregations} handleClick={handleClick} />  } 
      </div>
    ); 
  }

}

const mapStateToProps = ({dataSpace, entity}) => {
  const {results, source, filters}  = dataSpace;
  if (isNull(results) || isUndefined(results)) { 
    return({results: { total: 0, hits: [] }, aggregations: [], source }); 
  }
  
  const { aggs } = DATASPACE_SOURCES[source]; 
  const resAggs  = results.aggregations; 
  
  const aggregations = keys(aggs).map( field => {
    const { buckets } = resAggs[field];
    const selected = filters[field] || new Set();
    return ({label: aggs[field], field, buckets, selected})
  })  
  return {results: results.hits, aggregations, source, entity, filters}; 
}

export default connect(mapStateToProps)(DataSpaceSearch);
