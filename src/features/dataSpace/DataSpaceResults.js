import React, {Component} from "react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { updateCurieAndSource } from './dataSpaceActions';
import { isNull, isUndefined } from 'lodash';

import { DataSpaceResultsHeader, DataSpaceResultsRow } from './components/DataSpaceResultsComponents';


class DataSpaceResults extends Component {
  
  render() {
    const {results, source} = this.props; 
    const {hits, total} = results;
    return (
      <div> 
        <h4>Results : { total } documents found</h4>
        <table>
          <tbody> 
            <DataSpaceResultsHeader source={source} />  
            { hits.map( hit => <DataSpaceResultsRow key={hit._id} source={source} result={hit} /> )}
          </tbody> 
        </table>
      </div>
    ); 
  }

}

const mapStateToProps = ({dataSpace}) => {
  const {results, source}  = dataSpace;
  if (isNull(results) || isUndefined(results)) { 
    return({results: { total: 0, hits: [] }, source }); 
  }
  return {results: results.hits, source}; 
}

export default connect(mapStateToProps)(DataSpaceResults);
