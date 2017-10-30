import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Literature from './literature';

class LiteraturePage extends Component {  

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
          <div className='col m12 s12'><span>Search Term:</span> { termChips }</div>
        </div>
        <Literature terms={ this.props.terms } per_page={20} embedded={false} />
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
