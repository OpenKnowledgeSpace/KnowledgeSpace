import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

import DataSpaceSourceSummary from './data_space_source_summary';
import DataSpaceResults from './data_space_results';

class DataSpacePage extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { results: [], numFound: 0, preloader: true };
    this.getResultsFromDataSpace = this.getResultsFromDataSpace.bind(this); 
    this.onChangePage = this.onChangePage.bind(this); 
  }
  
  // this uses a list of terms to get results from this data space.
  getResultsFromDataSpace(curie, terms) {
    curie = curie || this.props.curie;   
    terms = terms || this.props.terms;
    terms = terms.map( function(s) { return "terms[]=" + s } );
    let size = this.props.per_page,
      page = this.props.page || 1,
      from = '&from=' + ( size * ( page - 1 ) ),
      url = '/api/data_space/' + curie + '?' + terms.join("&") + "&size=" + size + from;     
    axios.get(url).then( function(response) { 
                                  this.setState({
                                      results: response.data.hits.hits.map((el) => el._source ),
                                      numFound: response.data.hits.total,
                                      preloader: false })
                                  }.bind(this))
        .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  }
 
  onChangePage(page) {
    if ( this.state.page == page ) { return null } 
    this.setState({ page: page, preloader: true, results: [] },  this.getResultsFromDataSpace );
  }

  getColumns() {
    switch(this.props.curie) {
      default: 
        return { 
          'dataset.title': "Title",
          'dataset.creators': 'Creators',
          'dataset.availability': 'Availability',
          'dataset.dateReleased': "Release Date",
        };
      case 'neuromorpho_20171102':
        return {
          'dataset.title': "Title",
          'dataset.creators': 'Creators',
          'dataset.availability': 'Availability',
        }
      case 'ks_ic_20160916':
        return {
          "pr_nlx_154697_8.database": 'Database',
          "pr_nlx_154697_8.notes": 'Notes',
        }
      case "neurosynth_20151112":
        return {
          "Data.title": 'Title',
          "Data.reference": 'Reference',
        }

    } 
  }

  componentWillMount () { 
    this.getResultsFromDataSpace(); 
	}
	

  render() {
    let curie = this.props.curie, 
      results = this.state.results,
      numFound = this.state.numFound,
      columns = this.getColumns(),
      onChangePage = this.onChangePage,
      preloader = this.state.preloader,
      termChips = this.props.terms.map( (term, i) => (<div key={i} className='chip'>{term}</div>) );
    return( 
      <div className='section'>
        <div className="row">
            <h2 className='col s12 page-title'>
              Data Space
            </h2>
        </div>
        <DataSpaceSourceSummary curie={curie} />
        <div className="row">
          <div className='col m12 s12'><span>Search Term:</span> { termChips }</div>
        </div>
        <DataSpaceResults results={ results } numFound={ numFound } columns={ columns } onChangePage={ onChangePage } preloader={ preloader } />
      </div>
    )
  }

}



const defaultProps = { per_page: 20 };
DataSpacePage.defaultProps = defaultProps;
export default DataSpacePage;
if (document.getElementById('data-space-page')) {
  const el = document.getElementById('data-space-page'); 
  ReactDOM.render( <DataSpacePage curie={ el.attributes['data-curie'].value }
    terms={ el.attributes['data-terms'].value.split(',') } page={ el.attributes['data-page'].value } />,
    document.getElementById('data-space-page'));
}
