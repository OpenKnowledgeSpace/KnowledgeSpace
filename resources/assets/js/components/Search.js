import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import Pagination from './Pagination';

class Search extends Component {  

  constructor(props) {
    super(props);
    this.state = { results: [], pageOfResults: [], page: 1 }; 
    this.onChangePage = this.onChangePage.bind(this); 
  }
  
  onChangePage(page) {
    if (  !isNaN(page) && this.state.page !== page ) { 
      let offset = page * 20;
      let pageOfResults = this.state.results.slice(offset, offset + 20);
      this.setState({ page: page, pageOfResults: pageOfResults },  this.searchScigraph );
    }
  }
  
  searchScigraph() {
    $.ajax({  url: '/api/search',
              data: this.props, 
              dataType: 'json', 
    }).then( function( data ){ 
      let pageOfResults = data.slice(0, 0 + 20);
      this.setState({results: data, pageOfResults: pageOfResults } );
    }.bind(this));
  }
  
  componentWillMount () { 
    this.searchScigraph();     
  }


  render() {
    var handleRowClick = function(event) {  window.location.href = "/wiki/" + event.currentTarget.childNodes[0].textContent }; 
 
    return( 
    <div className="" id="search-page"> 
      <div className='section'> 
        <div className="row"> 
          <div className="row"> 
            <h2 className='col s12 term-title'>Search Results for: { this.props.q }
              <span className='new badge right' data-badge-caption="Records Found">{ this.state.results.length }</span>
            </h2> 
          </div> 
					<form action='/search' method='GET' className='form-inline pull-right'>
						<div id='home-search'>	
							<div className='input-field col s6'>
							  <i className="material-icons prefix">search</i>	
                <input id='main-page-search' className='form-control' defaultValue={ this.props.q } name='q' placeholder='SEARCH' type='text' />
                <label htmlFor='main-page-search'>Search</label>
							</div>
						</div> 
					</form>
	      </div> 
	    </div>	
      <div className='row'>
        <div className="col m12 s12"> 
          <div className="card">
            <div className="card-content">
              <Table columns={{ curie: "Curie", labels: "Labels", categories: "Categories", definitions: "Definitions"  }} 
                rows={ this.state.pageOfResults }  handleRowClick={ handleRowClick }/>              <div className='card-action center'> 
                <Pagination items={ this.state.results.length } onChangePage={this.onChangePage}  / > 
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div> 
    );
  }

}

export default Search;

if (document.getElementById('search')) {
  const el = document.getElementById('search') 
  ReactDOM.render( <Search q={ el.attributes['data-q'].value } />, el );
}
