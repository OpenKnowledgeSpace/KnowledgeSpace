import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

import DataSpaceSourceSummary from './data_space_source_summary';
import DataSpaceResults from './data_space_results';
import DataSpaceFilters from './data_space_filters';

import { CancelToken } from 'axios';


class DataSpacePage extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { results: [], numFound: 0, preloader: true, columns: {}, 
      entries: [], facets: [], keywordFilter: "", facetFilters: new Set() };
    
    this.getResultsFromDataSpace = this.getResultsFromDataSpace.bind(this); 
    this.onChangePage = this.onChangePage.bind(this); 
    this.onChangeFilters = this.onChangeFilters.bind(this); 
  }
  
  // this uses a list of terms to get results from this data space.
  getResultsFromDataSpace() {
   
    if ( 'cancelRequest' in this.state ) {  
      this.state.cancelRequest.cancel("Cancel..."); 
    }  
    
    let cancelRequest = CancelToken.source();
    this.setState({ preloader: true, cancelRequest:  cancelRequest });  
   
    
    let { sourceCurie, term_curies } =  this.props;
    
    // we build our request URL..
    let size = this.props.per_page,
      facetFilters = this.state.facetFilters, 
      keywords = "&keywords[]=" + this.state.keywordFilter, 
      page = this.state.page || 1,
      from = '&offset=' + ( size * ( page - 1 ) ),
      url = '/api/data_space/' + sourceCurie + '/' + term_curies.join(',') + "?count=" + size + from + keywords;     
      
      facetFilters.forEach( (filter) => url += "&facet=" + filter );

      axios.get(url, { cancelToken: cancelRequest.token })
        .then( function(response) {
          let entries = response.data.entries, 
            results = response.data[sourceCurie].data.result.results.row,
            facets = response.data[sourceCurie].facets,
            numFound = parseInt(response.data[sourceCurie].data.result["@attributes"].resultCount),
            columns = {};
          
          if ( typeof results == 'undefined' ) {
            results = []; 
          } else {
            results = results.map( (row) => row.data
              .reduce( (a,c) => { a[c.name] = c.value; return a }, {} )
            );
            
            [... new Set( results.map( (row) => Object.keys(row) )
              .reduce( (a,b) => a.concat(b) ) )
            ].forEach( (v) => columns[v] = v );
          
          } 
          
          
          this.setState({
            page: page, 
            results: results,
            columns: columns,
            entries: entries, 
            numFound: numFound,
            facets: facets,
            preloader: false
          })
          }.bind(this)
        ).catch( function(error) { 
          if ( axios.isCancel(error) ) { console.log("Request canceled..") }
          else { debugger; }
        }.bind(this) );
   }
 
  onChangePage(page) {
    if ( this.state.page == page ) { return null } 
    this.setState({ page: page, preloader: true, results: [] },  this.getResultsFromDataSpace );
  }
  
  onChangeFilters(facet, keywords) {
    let { facetFilters, keywordFilter } = this.state;
    
    if ( typeof keywords == 'undefined' ) { 
      keywords = this.state.keywordFilter 
    }
    
    if ( facetFilters.delete(facet) ) { 
      this.setState({ keywordFilter: keywords, facetFilters: facetFilters, page: 1 }, this.getResultsFromDataSpace)
    } else {
      if ( typeof facet != 'undefined') {
        facetFilters = facetFilters.add(facet);
      }
      this.setState({ keywordFilter: keywords, facetFilters: facetFilters, page: 1 }, this.getResultsFromDataSpace)
    }
  }


  componentWillMount () { 
    this.getResultsFromDataSpace(); 
	}
	
  render() {
    let { sourceCurie, termCurie } = this.props;

    let {  results, numFound, columns, facets, keywordFilter,
      preloader, entries } = this.state;

    let facetFilters = this.state.facetFilters,
      onChangePage = this.onChangePage,
      onChangeFilters = this.onChangeFilters;
    
    return( 
      <div className='section'>
        <div className="row">
            <h2 className='col s12 page-title' style={{ marginTop: "5px" }} >
              Data Space
            </h2>
        </div>
        <DataSpaceSourceSummary curie={sourceCurie} terms={entries} />
        <div className='row'>
          <DataSpaceResults results={ results } numFound={ numFound } columns={ columns } onChangePage={ onChangePage } preloader={ preloader } />
          <DataSpaceFilters facets={ facets } facetFilters={facetFilters} onChangeFilters={ onChangeFilters } preloader={ preloader }  keywordFilter={keywordFilter} /> 
        </div> 
      </div>
    )
  }

}



const defaultProps = { per_page: 20 };
DataSpacePage.defaultProps = defaultProps;
export default DataSpacePage;
if (document.getElementById('data-space-page')) {
  const el = document.getElementById('data-space-page'); 
  ReactDOM.render( <DataSpacePage sourceCurie={ el.attributes['data-source-curie'].value }
    term_curies={ el.attributes['data-term-curies'].value.split(',') } 
    keywords={ el.attributes['data-keywords'].value.split(',') }
    page={ el.attributes['data-page'].value } />,
    document.getElementById('data-space-page'));
}
