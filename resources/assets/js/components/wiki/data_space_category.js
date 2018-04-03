import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataSpaceSources from './data_space_sources';

class DataSpaceCategory extends Component {  

  constructor(props) {
    super(props);
    this.state = { total_count: 0, source_count: {}, expand: 'expand_more', preloader: true }; 
  }

  // Unclear if we actually need this
  sanitizeTerm (term) { 
    return term
		// dont think we need to do this with NIF services	
		//.replace(/\ cell|\ neuron$/g, ''); 
  }
  
  componentDidMount () { 
    let sanitizeTerm = this.sanitizeTerm,
      indexes = this.props.sources.map( (source, i) => {  return source.curie; } ),
      terms = this.props.terms.map( (term) => { return "terms[]=" + sanitizeTerm(term) } ),
      url = '/api/data_space/' + indexes.join(',') + '?' + terms.join("&") + "&size=0";     
  
    let aggMapper = (aggs) => {
      let results = {};
      Object.keys(aggs).forEach( (agg,i) => results[agg] = aggs[agg]['data']['result']['@attributes']['resultCount'] ) 
      return results;
    }
    
    axios.get(url).then(
      function(response) { 
        let source_count = aggMapper( response.data ),
          total_count = Object.values(source_count).map( (val) => parseInt(val) ).reduce( (a,b) => a + b ),
          serialized_terms = terms;
        this.setState({ source_count, total_count, serialized_terms, preloader: false });
      }.bind(this)
    ).catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  
  }

  render() {
    let { category, sources, curie } = this.props, 
      {source_count, preloader }  = this.state;

    return (
      <li> 
        <div className="collapsible-header">
          <i className="material-icons">expand_more</i>
          <h6>{category.charAt(0).toUpperCase() + category.slice(1)}</h6>
          { preloader && <div className='loading'><span>.</span><span>.</span><span>.</span></div> }  
					{ !preloader && <span className='new badge blue' data-badge-caption="Records Found">
             { this.state.total_count}
          </span> }
        </div>
        <div className="collapsible-body">
          <DataSpaceSources curie={ curie } category={ category }  sources={ sources } source_count={ source_count } />
        </div>   
      </li> 
    )}

}
export default DataSpaceCategory;
