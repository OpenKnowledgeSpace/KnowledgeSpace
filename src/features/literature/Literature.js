import React, {Component} from "react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// import { updateCurieAndSource, updateFilters  } from './literatureActions';
import { isArray, keys, isEmpty } from 'lodash';

const LiteratureContainer = (props) => { 
  return(
    <Literature />
   );
}

class Literature extends Component {

  handleRowClick({target}) {
    const link = 'https://www.ncbi.nlm.nih.gov/pubmed/' + target.dataset.pubid; 
    window.open(link, '_blank'); 
  }


  render() {
    const {literature, curie} = this.props;
    const {hits, total} = literature.results; 
    return (
      <div> 
        <h2>Literature ( {total || 0} results found ) <Link to={`${curie}/literature`}>See More</Link> </h2>
        <ul>
          { hits.map( hit => <li onClick={this.handleRowClick} data-pubid={hit._id} key={hit._id}>{hit._source.title}</li> ) }
        </ul>
      </div>
    ); 
  }

}

const mapStateToProps = ({literature, entity}) => {
  const {curie} = entity; 
  return {literature, curie};
}

export default connect(mapStateToProps)(Literature);
