import React, {Component} from "react";
import { connect } from 'react-redux';
import {reduce, has, reject, isEmpty} from "lodash";

import  DataSpaceCategory from './components/DataSpaceCategory';

import { DATASPACE_SOURCES } from '../dataSpace/dataSpaceConstants';

class DataSpaceAggs extends Component {
  
  render() {
    const { aggByType, entity } = this.props; 
    const types = reject( Object.keys(aggByType), o => isEmpty(aggByType[o].sources) );
    return (
      <div> 
        <h2>DataSpace</h2>
        <ul>
          { 
            types.map(type => { 
              const {sources, doc_count} = aggByType[type];
              return(<DataSpaceCategory
                        entity={entity}
                        key={type} label={type}
                        sources={sources} doc_count={doc_count}
                      />); 
            })
          }
        </ul>
      </div>
    ); 
  }

}

// We take our bucket aggs coming in from ES and merge that with our
// DataSpace source definitions. 
const mapStateToProps = ({dataSpaceAggs, entity}) => {
  // first lets take our ES buckets and flatten them to a dictionary.
  // { source_id: 1 } 
  const aggs = reduce(dataSpaceAggs, (memo, {key, doc_count}) => {
    memo[key] = doc_count;
    return memo;
  },{});
  // now we take our DATASPACE_SOURCES, group by type, and add our agg counts
  const aggByType = reduce(DATASPACE_SOURCES, (memo, value, key) => { 
    const {type} = value;
    value.id = key; 
    if (!has(memo, type)) {
      memo[type] = { sources: [], doc_count: 0 }; 
    }
    if ( has(aggs, key) ) {
      memo[type].doc_count = memo[type].doc_count + aggs[key];
      value.doc_count = aggs[key]; 
      memo[type].sources.push(value);
    } 
    return memo;
  }, {});
  return { aggByType, entity };
}

export default connect(mapStateToProps)(DataSpaceAggs);
