import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Literature from './literature';


class LiteratureSearch extends Component {
  render() {
    return (
    <div className='search'>
      <div className='search-wrapper input-field'>  
        <i className='material-icons prefix'>search</i> 
        <input ref='query' type='text' className='form-control' name='query' placeholder='Keyword Search' onChange={ this.props.submitQuery } /> 
      </div> 
    </div>
    ) 
  }
}

class LiteraturePage extends Component {  
  
  constructor(props) {
    super(props);
    this.keywordQuery = this.keywordQuery.bind(this); 
    this.state = { keywords: null } 
  }

  keywordQuery(event, timeout) {
    let keywords = event.target.value 
    if ( keywords !== this.state.keywords ) { 
      this.setState({keywords});
    }
  }

  render() {
    let termChips = this.props.terms.map( (term, i) => (<div key={i} className='chip'>{term}</div>) );
    
    return( 
      <div className='section'>
        <div className="row">
            <h2 className='col s12 page-title'>
              Literature
            </h2>
        </div>
        <div className="row"> 
          <div className='col m12 s12'> 
            <div className="card horizontal blue-grey darken-1" id="summary">
              <div className="card-content white-text col s12"> 
                <div className='input-field'>
                  <span>Search Term:</span> { termChips }
                </div>
                <div id='home-search'>	
                  <LiteratureSearch submitQuery={ this.keywordQuery } /> 
                </div> 
              </div> 
            </div>
          </div>
        </div>
        <Literature terms={ this.props.terms } keywords={this.state.keywords} per_page={20} embedded={false} />
      </div>
    )
  }

}

if (document.getElementById('literature-page')) {
  const el = document.getElementById('literature-page'); 
  ReactDOM.render( <LiteraturePage
    terms={ el.attributes['data-terms'].value.split(',') } page={ el.attributes['data-page'].value } />,
    el) ;
}
