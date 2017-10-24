import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataspaceCategory from './DataspaceCategory';

class Dataspace extends Component {  

  constructor(props) {
    super(props);
    this.state = { terms: this.props.terms, categories: {}  }; 
  }
  
  componentWillReceiveProps(newProps) {
    if ( newProps.terms[0] !== this.state.terms[0] ) {
      $.ajax({ url: '/api/dataspace',
               dataType: 'json', 
               success: function(data) { 
                  this.setState( { categories: data });
               }.bind(this)
      });
    }
  }
  
  render() {
    var state = this.state; 
    var props = this.props; 
    return (
      <div className="card light-blue lighten-5" id="dataspace">
        <div className="card-content"> 
          <span className="card-title text-white">Data Space</span> 
          <ul id='dataspace-categories' >
            { Object.keys(state.categories).map( function(cat, i) { 
              return <DataspaceCategory key={i} termCurie={ props.termCurie } category={cat} sources={state.categories[cat]} term={props.terms[0]} /> 
            })}
          </ul>
        </div>
      </div> 
    )}

}

export default Dataspace;

if (document.getElementById('dataspace-box')) {
  const el = document.getElementById('dataspace-box') 
  ReactDOM.render( <Dataspace curie={ el.attributes['data-curie'].value } />, el );
}
