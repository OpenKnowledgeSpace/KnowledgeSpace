import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Preloader from '../shared/preloader';
import DataSpaceModal from './data_space_modal';

class DataSpaceCategory extends Component {  

  constructor(props) {
    super(props);
    this.state = { total_count: 0, preloader: true, source_count: {} }; 
  }

  sanitizeTerm (term) { 
    return term.replace(/\ cell|\ neuron$/g, ''); 
  }
  
	componentDidUpdate() { 
 		$('.modal:not(.init)').addClass('init').modal(); 
	}

  componentDidMount () { 
    let sanitizeTerm = this.sanitizeTerm,
      indexes = this.props.sources.map( (source, i) => {  return source.curie; } ),
      terms = this.props.terms.map( (term) => { return "terms[]=" + sanitizeTerm(term) } ),
      url = '/api/data_space/' + indexes.join(',') + '?' + terms.join("&") + "&size=0";     
  
    let aggMapper = (aggs) => {
      let results = {};
      aggs.forEach( (agg, i) => {  results[agg.key] = agg.doc_count  } );
      return results;
    }
    
    axios.get(url)
      .then( function(response) { this.setState({  total_count: response.data.hits.total, 
        source_count: aggMapper( response.data.aggregations.source_count.buckets ),
        serialized_terms: terms, 
        preloader: false }) }.bind(this) )
      .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  
  }

  render() {
    let preloader = this.state.preloader,
        category = this.props.category, 
        terms = this.state.serialized_terms,
        sources = this.props.sources,
        source_count = this.state.source_count;

    return (
      <li> 
        <a className="btn blue lighten-3 dataspace-category clearfix valign-wrapper waves-effect waves-light modal-trigger" href={ "#" + category }>
          <span className='left'>{ category }</span>
          <span className='badge category-counter right'>
            { preloader ? <Preloader enabled={ preloader }  wrapperStyle={{ top: "25%" }} /> : this.state.total_count}
          </span>
        </a>
        <DataSpaceModal category={ category } terms={ terms } sources={ sources } source_count={ source_count } />
      </li> 
    )}

}

export default DataSpaceCategory;
