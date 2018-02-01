import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from '../shared/table';
import Pagination from '../shared/pagination';
import DidYouMean from './did_you_mean';

class SearchPage extends Component {  

  constructor(props) {
    super(props);
    this.state = { results: [], pageOfResults: [], page: 1, preloader: true}; 
    this.onChangePage = this.onChangePage.bind(this); 
  }
  
  onChangePage(page) {
    if (  !isNaN(page) && this.state.page !== page ) { 
      let offset = page * 20;
      let pageOfResults = this.state.results.slice(offset, offset + 20);
      this.setState({ page: page, pageOfResults: pageOfResults } );
    }
  }
 
  /* for this we only search once and just load all the records in since SG
   * doesn't seem to like pagination */
  searchScigraph() {
    axios.get('/api/search',{ params:  this.props })
      .then( function( response ){ 
        let termResults = response.data.term || [],
          keywordResults = response.data.keyword || [],
          redirect = this.props.redirect;
        
        // We want to push all results with a curie prefix of SCR to the
        // bottom of the pile.. 
        keywordResults = keywordResults
          .filter( (res) => !res.deprecated ) 
          .map( function(res) {
            res.weight = /^SCR\:/.test(res.curie) ? -1 : 0;
            return res
         }).sort( (a,b) => b.weight - a.weight )  
  
        let pageOfResults = keywordResults.slice(0, 0 + 20);
        // this there's only one termResult hit, let's just go there, man.
        // This is the default. It a redirect=true param ( like in a 
        // "Search Terms Like This" ) is passed, we display
        // the search results instead. 
        if ( termResults.length === 1 && redirect ) {
          window.location.replace("/wiki/" + termResults[0].curie );
          return; 
        } 
        
        this.setState({results: keywordResults, termResults: termResults, pageOfResults: pageOfResults, preloader: false } );
    
    }.bind(this));
  }
  
  componentWillMount () {
    this.searchScigraph();     
  }


  render() {
    
    let handleRowClick = function(event) {  window.location.href = "/wiki/" + event.currentTarget.childNodes[0].textContent }; 
    let termResults = this.state.termResults || [];

    return( 
    
      <div className="" id="search"> 
        <div className='section'> 
          <div className="row"> 
            <div className='col m12 s12'> 
              <div className="card horizontal blue-grey darken-1" id="summary">
                <div className="card-content white-text col s12 center-align"> 
                  <form action='/search' method='GET' className='form-inline pull-right'>
                    <div id='home-search'>	
                      <div className='input-field'>
                        <i className="material-icons prefix">search</i>	
                        <input id='main-page-search' className='form-control' defaultValue={ this.props.q } name='q' placeholder='SEARCH' type='text' />
                        <label htmlFor='main-page-search'>Search</label>
                      </div>
                    </div> 
                  </form>
                </div> 
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col m12 s12"> 
              <div className="card">
                <div className="card-content">
                  { termResults.length > 0 && <DidYouMean terms={termResults } /> }
                  <span className='chip right'>{ this.state.results.length } Records Found</span>
                  <Table columns={{ curie: "Curie", labels: "Labels", categories: "Categories", definitions: "Definitions"  }} 
                    rows={ this.state.pageOfResults }  handleRowClick={ handleRowClick } preloader={ this.state.preloader } />   
                  <div className='card-action center'> 
                  <Pagination items={ this.state.results.length } onChangePage={this.onChangePage}  / > 
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div> 
    );
  }

}

export default SearchPage;

if (document.getElementById('search-page')) {
  const el = document.getElementById('search-page') 
  ReactDOM.render( <SearchPage q={ el.attributes['data-q'].value } redirect={ el.attributes['data-redirect'].value === 1 } />, el );
}
