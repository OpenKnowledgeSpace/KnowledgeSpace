import React, {Component} from "react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { updateCurieAndSource, updateFilters  } from './dataSpaceActions';
import { isArray, keys, isEmpty } from 'lodash';

import DataSpaceSearch from './DataSpaceSearch';
import DataSpaceSourceDescription from './components/DataSpaceSourceDescription';


import Detail from '../entity/components/Detail';


const DataSpaceContainer = (props) => { 
  return(
    <DataSpace />
   );
}

class DataSpace extends Component {
  
  componentDidMount() {
    const {curie, source} = this.props.match.params;  
    this.props.dispatch(updateCurieAndSource({curie, source}));
  }

  render() {
    const {entity,source, history} = this.props;
    return (
      <div> 
        <h2>DataSpace</h2>
        <DataSpaceSourceDescription source={source} />
        <Detail entity={entity} />
        { !isEmpty(source) && <DataSpaceSearch history={history} /> } 
      </div>
    ); 
  }

}

const mapStateToProps = ({entity, dataSpace}) => {
  const { source } = dataSpace; 
  return {entity,source};
}

export default connect(mapStateToProps)(DataSpace);
