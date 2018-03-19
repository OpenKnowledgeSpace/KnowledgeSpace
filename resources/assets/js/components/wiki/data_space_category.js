import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataSpaceSources from './data_space_sources';

class DataSpaceCategory extends Component {  

  constructor(props) {
    super(props);
    this.state = { total_count: 0, source_count: {}, expand: 'expand_more' }; 
  }

  sanitizeTerm (term) { 
    return term.replace(/\ cell|\ neuron$/g, ''); 
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
    
    axios.get(url).then(
      function(response) { 
        this.setState({ total_count: response.data.hits.total, source_count: aggMapper( response.data.aggregations.source_count.buckets ),
          serialized_terms: terms, 
        })
      }.bind(this)
    ).catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  
  }

  render() {
    let { category, sources, curie } = this.props, 
      {source_count, serialized_terms}  = this.state;

    return (
      <li> 
        <div className="collapsible-header">
          <i className="material-icons">expand_more</i>
          <h6>{category.charAt(0).toUpperCase() + category.slice(1)}</h6>
          <span className='new badge blue' data-badge-caption="Records Found">
             { this.state.total_count}
          </span>
        </div>
        <div className="collapsible-body">
          <DataSpaceSources curie={ curie } category={ category } terms={ serialized_terms } sources={ sources } source_count={ source_count } />
        </div>   
      </li> 
    )}

}
export default DataSpaceCategory;
