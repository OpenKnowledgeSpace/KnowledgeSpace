import React, {Component} from "react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { updateCurieAndSource, updateFilters  } from './dataSpaceActions';
import { isArray, keys } from 'lodash';

import DataSpaceResults from './DataSpaceResults';
import DataSpaceSearch from './DataSpaceSearch';
import DataSpaceSourceDescription from './components/DataSpaceSourceDescription';

import Pagination from '../search/components/Pagination';

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
  
  handlePagination() {
    const { dataSpace, entity } = this.props;
    const { filters, source } = dataSpace;
    const page = dataSpace.page + 1;
    this.props.dispatch(updateFilters({page, source, entity, filters}));
  }


  render() {
    const {entity,dataSpace} = this.props;
    const { source } = dataSpace;
    return (
      <div> 
        <h2>DataSpace</h2>
        <DataSpaceSourceDescription source={source} />
        <Detail entity={entity} />
        <DataSpaceSearch /> 
        <DataSpaceResults /> 
        <Pagination handlePagination={this.handlePagination.bind(this)}  />
      </div>
    ); 
  }

}

const mapStateToProps = ({entity, dataSpace}) => {
  return {entity,dataSpace};
}

export default connect(mapStateToProps)(DataSpace);
