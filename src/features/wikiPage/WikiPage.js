import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { updateEntity, loadEntity } from './wikiPageActions';


const WikiPageContainer = (props) => { 
  return(
    <WikiPage />
   );
}

class WikiPage extends Component {
  
  componentDidMount() {
    const curie = this.props.match.params.curie; 
    console.log(curie);
    this.props.dispatch(updateEntity(curie));
  }
  
  render() {
    const curie = this.props.match.params.curie; 
    const {title, description} = this.props; 
    return (<span>Looking for {curie} {title} <Link to={`/wiki/curie:456`} >curie:456</Link></span> );
  }

}

const actions = {
  updateEntity,
  loadEntity
}


const mapStateToProps = ({wikiPage}) => {
  return {...wikiPage}
}

export default connect(mapStateToProps)(WikiPage);
