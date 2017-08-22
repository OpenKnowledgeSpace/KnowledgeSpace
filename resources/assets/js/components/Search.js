import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchResultsTable from './SearchResultsTable';


class Search extends Component {  

  constructor(props) {
    super(props);
    this.state = { results: [] }; 
  }
  
  searchScigraph() {
		var _this = this; 
    $.ajax({  url: '/api/search',
              data: this.props, 
              dataType: 'json', 
    }).then( function( data ){ 
      _this.setState({results: data});
    });
  }
  
  componentWillMount () { 
    this.searchScigraph();     
  }




  render() {
    return( 
     <section> 
      <h3>Search Results for: <span className='label label-primary'>{ this.props.q } 
					{ this.state.results.length > 0 && <span className='badge'>{ this.state.results.length} records</span> }
					</span> 
					<form action='/search' method='GET' className='form-inline pull-right'>
						<div id='home-search'>	
							<div className='input-group col-md-12'>
								<input id='main-page-search' className='form-control input-lg' name='q' placeholder='SEARCH' type='text' />
								<span className="input-group-btn">
									<button className="btn btn-info btn-lg" type="submit">
										<i className='glyphicon glyphicon-search'></i>	
									</button>
								</span>
							</div>
						</div> 
					</form>
      
      
      
      </h3>
		 
			<SearchResultsTable results={this.state.results} />

     </section> 
    );
  }

}

export default Search;

if (document.getElementById('search')) {
  const el = document.getElementById('search') 
  ReactDOM.render( <Search q={ el.attributes['data-q'].value } />, el );
}
