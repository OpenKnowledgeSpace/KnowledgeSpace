import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from "./Pagination";
import Table from "./Table";

class DataspacePage extends Component {  

  constructor(props) {
    super(props);
    this.state = { 
      source_info: { source_name: '', description: '' },
      results: [], columns: {}, numFound: 0,
      labels: [], synonyms: [], page: 1
    };
    this.getResultsFromDataspace = this.getResultsFromDataspace.bind(this); 
    this.onChangePage = this.onChangePage.bind(this); 
  }

  onChangePage(page) {
    if (  !isNaN(page) && this.state.page !== page ) { 
      this.setState({ page: page },  this.getResultsFromDataspace );
    }
  }
  
  sanitizeTerm ( ) { 
    return this.state.synonyms[0].replace(/\ cell|\ neuron$/g, ''); 
  }

  // this uses a list of terms to get results from scicrunch.
  getResultsFromDataspace() { 
    let curie = this.props.curie; 
    var offset = ( 20 * ( this.state.page - 1 ) );
    if ( isNaN( offset ) ) { offset = 0; }

    $.ajax({ url: '/api/dataspace/' + this.props.data_source + '?q=' + this.sanitizeTerm() + "&offset=" + offset,
             dataType: 'json', 
    }).then( function(data) { 
      this.setState({ numFound: data.result.resultCount, results: data.result.result, columns: this.getColumns(data.result.result) } )
    }.bind(this))
  };

  componentWillMount () { 
    
    $.ajax( { url: '/api/dataspace/' + this.props.data_source + '/info', dataType:'json'}).then( function(data)  {
      this.setState({ source_info: data } ); 
    }.bind(this));
    
    // First we use the provided curie to get a list of synonyms to q scicrunch 
    $.ajax({ url: '/api/terms/' + this.props.curie,
             dataType: 'json', 
    }).then( function(data) { 
        data['page'] = 1;
			  this.setState(data, this.getResultsFromDataspace );
		}.bind(this));
	}

  // A very basic hash, since keys == labels in this situation
  getColumns(results) { 
    let cols = {};
    results.forEach( function(result) { 
      Object.keys(result).forEach( function(key){
        cols[key] = key; 
      });
    });
    return cols;
   }

	render() {
    return (
    <div className="" id="dataspace"> 
      <div className="row page-only"> 
          <div className='col s12'> 
            <div className="card horizontal blue-grey darken-1" id="summary">
              <div className="card-content white-text"> 
                <span className="card-title activator white-text">{ this.state.source_info.source_name }</span> 
                <div className='form-group'>
                  <label className="col s2">Description:</label>
                  <div className="col s9 label-only" dangerouslySetInnerHTML={ { __html: this.state.source_info.description } }></div>
                </div>
              </div> 
            </div>
          </div>
      </div>
      <div className="row page-only"> 
          <div className='col s12'> 
            <div className="card horizontal blue-grey darken-1" id="summary">
              <div className="card-content white-text"> 
                <span className="card-title activator white-text">{ this.state.labels[0] }</span> 
                <div className='form-group'>
                  <label className="col s2">Definition:</label>
                  <div className="col s9 label-only">{ this.state.definitions ? this.state.definitions[0] : "" }</div>
                </div>
              </div> 
            </div>
          </div>
      </div>
      <div className='row'>
        <div className="col m12 s12"> 
          <div className="card">
            <div className="card-content">
              <span className="card-title activator">Data Space</span> 
              <Table columns={ this.state.columns } rows={ this.state.results } />
              <div className='card-action center'> 
                <Pagination items={ this.state.numFound } onChangePage={this.onChangePage}  / > 
              </div> 
            </div>
          </div>
        </div>
      </div>
     </div>
    )}

}

export default DataspacePage;

if (document.getElementById('dataspace-page-box')) {
  const el = document.getElementById('dataspace-page-box') 
  ReactDOM.render( 
    <DataspacePage curie={ el.attributes['data-curie'].value } 
    data_source= { el.attributes['data-datasource'].value } 
  page={ parseInt( el.attributes['data-page'].value ) }  />, el );
}
