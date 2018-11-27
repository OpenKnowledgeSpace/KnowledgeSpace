import React, {Component} from "react";

import { connect } from 'react-redux';
import { updateCurie } from './entityActions';
import { isArray, keys } from 'lodash';

import Detail from './components/Detail';
import DataSpaceAggs from '../dataSpaceAggs/DataSpaceAggs';
import Literature from '../literature/Literature';

const EntityContainer = (props) => { 
  return(
    <Entity />
   );
}

class Entity extends Component {
  
  componentDidMount() {
    const curie = this.props.match.params.curie; 
    this.props.dispatch(updateCurie(curie));
  }
  
  render() {
    const curie = this.props.match.params.curie; 
    const {entity} = this.props; 
    return (
      <div> 
        <h2>{curie}</h2>
        <Detail entity={entity} />
        <DataSpaceAggs />
        <Literature />    
      </div>
    ); 
  }

}

const mapStateToProps = ({entity}) => {
  return {entity}
}

export default connect(mapStateToProps)(Entity);
