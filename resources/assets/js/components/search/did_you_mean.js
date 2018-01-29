import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DidYouMean extends Component {  

  
  render() {
    return <div className='row'>
        <div className="col m12 s12"> 
          <div className="card">
            <div className="card-content">
              <h6>Did You Mean?</h6> 
              <span className=''>{ this.props.terms.map( (term) => {
                return (<span className='chip'><a href={ '/wiki/' + term.curie }>{term.labels[0]}</a></span> ) 
              }) }</span>
            </div>
          </div>
        </div>
      </div>
  }
}

export default DidYouMean;
