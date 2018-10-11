import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { updateEntity, loadEntity } from './entityActions';
import { isArray, keys } from 'lodash';


const EntityContainer = (props) => { 
  return(
    <Entity />
   );
}

class Entity extends Component {
  
  componentDidMount() {
    const curie = this.props.match.params.curie; 
    this.props.dispatch(updateEntity(curie));
  }
  
  render() {
    const curie = this.props.match.params.curie; 
    const {entity} = this.props; 
    const list = keys(entity)
                  .filter( k => k != 'tree' )
                  .map( k => {  
                      let v = entity[k]; 
                      if (isArray(v)) {
                          v = v.join("<br />"); 
                      }; 
                      return (<li key={k} >{k}  :  {v}</li>);
                  });
    return (
      <div> 
        <h2>{curie}</h2>
        <ul>{list}</ul> 
      </div>
    ); 
  }

}

const actions = {
  updateEntity,
  loadEntity
}


const mapStateToProps = ({entity}) => {
  return {entity}
}

export default connect(mapStateToProps)(Entity);
